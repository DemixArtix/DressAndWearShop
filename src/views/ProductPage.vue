<template lang="pug">
  div(class="product-block")
    CartPopup(v-if="showCartPopup" @closePopup="closePopup")
    div(class="product-image")
      div(class="product-image__current")
        img( :src="src || defaultImage")
      div(class="product-slider")
        div(class="product-slider__item" v-for="(image, index) in images" @mouseover="showImage(index)")
          img(:src="image")
      FeedbackForm(v-if="evaluationValue" :evaluationValue="evaluationValue")
    div(class="product-block__right")
      div(class="product-info")
        span(class="product-info__title") {{product.brand}}
      div(class="product-feedback")
        RatingArea(@evaluationValue="onSetEvaluationValue" :productId="product._id")
      div(class="product-order")
        span(class="product-order__price") {{product.price}} ₽
        div(class="product-order__size" @click.stop)
          span(class="product-order__label")  Выберите размер:
          div(class="product-order__title" :class="activeClass" @click="togglePanel(panelOfSizes)") {{size || defaultSize}} RU
          ul(class="product-order__list" v-if="panelOfSizes")
            li(class="product-order__select" v-for="(size, i) in sizes" @click="chooseSize(i)")
              span  {{size}} RU
        div(class="product-order__add")
          div(class="product-order__add-cart" @click="onAddToCart")
            span Добавить в корзину
          div(class="product-order__add-favorites" :class="fillHeart" @click="onAddToFavorites")
            svg(xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="-6 0 450.775 437.774")
              path(d="M316.722,29.761c66.852,0,121.053,54.202,121.053,121.041c0,110.478-218.893,257.212-218.893,257.212S0,266.569,0,150.801C0,67.584,54.202,29.761,121.041,29.761c40.262,0,75.827,19.745,97.841,49.976C240.899,49.506,276.47,29.761,316.722,29.761z")

</template>

<script>
  import api from '@/plugins/api';
  import {mapGetters, mapActions} from 'vuex';
  import CartPopup from "../components/CartPopup";
  import getToken from "../mixins/getToken";
  import RatingArea from "../components/RatingArea";
  import FeedbackForm from "../components/FeedbackForm";

  export default {
    name: "ProductPage",
    components: {FeedbackForm, RatingArea, CartPopup},
    beforeMount() {
      this.setCurrentProduct({
          categoryName:this.categoryName,
          subcategoryName:this.subcategoryName,
          productId:this.productId
      });
    },
    data: () => ({
      src: null,
      size: '',
      addedToFavorites: false,
      showCartPopup: false,
      evaluationValue: null,
    }),
    mixins: [getToken],
    methods: {
      ...mapActions('categories', ["setCurrentProduct"]),
      ...mapActions('eventData', ['togglePanelOfSizes']),
      ...mapActions('cart', ['addToCart']),
      ...mapActions('favorites', ['addFavoriteItem', 'switchFavoritesLabel']),
      async onAddToCart() {
        const product = Object.assign({},
          this.product,
          {
            size: (this.size || this.defaultSize),
            path: this.$route.path,
          });
        delete product.sizes;
        product.productId = product._id + '_' + product.size;
        console.log(this.$route);
        console.log(this.token());
        if(this.token()) {
          const response = await api.post('/add_to_cart',
            {
              data: {
                product
              }
            },
            {
              headers: {
                'Authorization': this.token()
              }
            }
          );
          console.log(response);
        }

        this.addToCart(product);


        this.showCartPopup = true;
      },
      closePopup(value) {
        this.showCartPopup = value;
      },
      async onAddToFavorites() {
        const productId = this.product._id;
        if(localStorage.getItem('token')) {
          const response = await api.post('/toggle_favorites',
            {
              data: {
                productId
              }
            },
            {
              headers: {
                'Authorization': this.token()
              }
            }).then(res => {
            const product = res.data.product;
            if(product) {
              product.path = this.$route.path;
              this.addFavoriteItem(product)
            } else {
              this.switchFavoritesLabel({
                bool: false,
                productId,
                path: this.$route.path
              })
            }
          });
        } else {
          const favorites = JSON.parse(localStorage.getItem('favorites'));
          if(favorites) {
            const item = favorites.find(item => item === productId);

            if(item) {
              favorites.splice(favorites.indexOf(item), 1);
              this.switchFavoritesLabel({
                bool: false,
                productId
              })
            } else {
              favorites.unshift(productId);
              const product = await api.post('/find_favorites_item',
                {
                  data: {
                    productId
                  }
                }
              ).then(res => {
                this.addFavoriteItem(res.data.product);
              });
            }
            localStorage.setItem('favorites', JSON.stringify(favorites));
          } else {
            const favArr = [productId];
            console.log(favArr);
            localStorage.setItem('favorites', JSON.stringify(favArr));
          }
        }

      },
      togglePanel(bool) {
        this.togglePanelOfSizes(!bool);
      },
      showImage(index) {
        this.src = this.images[index];
      },
      chooseSize(index) {
        this.size = this.sizes[index];
        this.togglePanelOfSizes(false)
      },
      onSetEvaluationValue(value) {
        this.evaluationValue = value;
      }
    },
    computed: {
      ...mapGetters('categories',
        ["getCurrentProduct"]),
      ...mapGetters('eventData', ['panelOfSizes']),
      ...mapGetters('favorites', ['favorites', 'booleanSwitch']),
      activeClass() {
        return {
          'active': this.panelOfSizes,
          null : !this.panelOfSizes
        }
      },
      fillHeart() {
        return {
          'filled': this.addedToFavorites,
          null : !this.addedToFavorites
        }
      },
      categoryName() {
        return this.$route.params.category
      },
      subcategoryName() {
        return this.$route.params.subcategory
      },
      productId() {
        return this.$route.params.id - 1
      },
      product() {
        return this.getCurrentProduct
      },
      images() {
        return this.product.images
      },
      defaultImage() {
        return this.images[0]
      },
      sizes() {
        return this.product.sizes
      },
      defaultSize() {
        return this.sizes[0];
      },
    },
    watch: {
      $route: function() {
        return this.src = null;
      },
      booleanSwitch: function() {
        if(this.favorites && this.favorites.length) {
          this.addedToFavorites = this.favorites.find(item => {
            if(item._id === this.product._id) {
              return item.inFavorites
            }
          });
        }
      },
      // favorites: function() {
      //   if(this.favorites && this.favorites.length) {
      //     console.log('click');
      //     this.addedToFavorites = this.favorites.some(item => item._id === this.product._id);
      //     return this.favorites.some(item => item.id === this.product._id);
      //   }
      //   return false
      // },
      product: function() {
        if(this.favorites && this.favorites.length) {
          this.addedToFavorites = this.favorites.find(item => {
            if(item._id === this.product._id) {
              return item.inFavorites
            }
          });
        }
      },
    }
  }
</script>

<style scoped lang="sass">
  .product-
    &block
      display: flex
      &__right
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1)
        padding: 25px
        border-radius: 15px
        display: flex
        flex-direction: column
    &image
      display: flex
      flex-basis: 70%
      flex-direction: column
      align-items: center
      &__current
        img
          height: 500px
    &slider
      display: flex
      padding: 20px
      &__item
        height: 100px
        padding: 10px
        &:hover
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.3)
        img
          height: 100%
    &info
      &__title
        display: flex
        justify-content: flex-start
        font-size: 1.5rem
        font-weight: 700
        margin-bottom: 20px
    &order
      display: flex
      flex-direction: column
      &__
        &label
          font-size: .7rem
          align-self: flex-start
          color: rgba(black, .3)
          margin-bottom: 3px
        &price
          display: flex
          justify-content: flex-start
          font-weight: bolder
          font-size: 1.7rem
          padding-bottom: 10px
        &size
          width: 250px
          border-top: 1px solid rgba(0, 0, 0, 0.3)
          padding-top: 20px
          display: flex
          flex-direction: column
          position: relative
        &title
          position: relative
          padding: 7px 7px 7px 10px
          border: 2px solid rgba(black, .2)
          border-radius: 3px
          font-size: .8rem
          text-align: left
          background-color: #fff
          transition: .5s
          cursor: pointer
          &:after
            content: ''
            position: absolute
            right: 20px
            top: 50%
            transform: translateY(-50%)
            border-top: 6px solid rgba(black, .8)
            border-left: 4px solid transparent
            border-right: 4px solid transparent
            transition: .5s
          &.active
            border-color: rgba(orangered, .8)
            &:after
              border-top-color: rgba(orangered, .8)
              transform: rotate(180deg) translateY(50%)
        &list
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.3)
          border-radius: 3px
          position: absolute
          top: 100%
          width: inherit
          z-index: 2
        &select
          cursor: pointer
          height: 20px
          padding: 10px
          border-top: 1px solid rgba(black, .1)
          font-size: .8rem
          display: flex
          align-items: center
          background-color: #fff
          transition: .2s
          &:first-child
            border-top: none
            border-radius: 3px 3px 0 0
          &:last-child
            border-radius: 0 0 3px 3px
          &:hover
            background-color: rgba(orangered, 1)
            color: #fff
        &add
          margin-top: 20px
          display: flex
          align-items: center
          justify-content: flex-start
          color: #ffffff
          font-size: .9rem
          &-cart
            cursor: pointer
            background-color: rgba(orangered, 0.8)
            padding: 10px 20px
            flex-basis: 60%
            border-radius: 3px
            box-shadow: 0 0 10px rgba(orangered, 0.3)
            transition: .3s
            margin-right: 10px
            &:hover
              background-color: orangered
          &-favorites
            cursor: pointer
            width: 20px
            border-radius: 3px
            padding: 6px 10px
            border: 1px solid rgba(black, .1)
            z-index: 1
            &.filled
              path
                animation: fill-heart 1s linear forwards
            svg
              transform: translateY(10%)
            &:hover
              border: 1px solid rgba(orangered, .5)
            path
              animation: animate-heart 1s linear forwards
              fill: transparent
              stroke: orangered
              stroke-width: 10px
              stroke-dasharray: 1310
              stroke-dashoffset: 0


  @keyframes animate-heart
    0%
      stroke-dashoffset: 0
      fill: orangered
    50%
      fill: transparent
    100%
      stroke-dashoffset: 2620


  @keyframes fill-heart
    0%
      stroke-dashoffset: 2620
    50%
      fill: transparent
    100%
      fill: orangered
      stroke-dashoffset: 0



</style>
<template lang="pug">
  div(class="cart-info")
    div(
      class="cart-logo"
      @mouseover="showMiniCart = true"
      @mouseleave="showMiniCart = false"
      @click="")
      div(v-if="totalQuantity" class="cart-quantity")
        span {{totalQuantity}}
      svg(
        enable-background="new 0 0 512 512"
        viewBox="-9 0 530 520"
        xmlns="http://www.w3.org/2000/svg")
        path(d="m504.399 185.065c-6.761-8.482-16.904-13.348-27.83-13.348h-98.604l-53.469-122.433c-3.315-7.591-12.157-11.06-19.749-7.743-7.592 3.315-11.059 12.158-7.743 19.75l48.225 110.427h-178.458l48.225-110.427c3.315-7.592-.151-16.434-7.743-19.75-7.591-3.317-16.434.15-19.749 7.743l-53.469 122.434h-98.604c-10.926 0-21.069 4.865-27.83 13.348-6.637 8.328-9.086 19.034-6.719 29.376l52.657 230c3.677 16.06 17.884 27.276 34.549 27.276h335.824c16.665 0 30.872-11.216 34.549-27.276l52.657-230.001c2.367-10.342-.082-21.048-6.719-29.376zm-80.487 256.652h-335.824c-2.547 0-4.778-1.67-5.305-3.972l-52.657-229.998c-.413-1.805.28-3.163.936-3.984.608-.764 1.985-2.045 4.369-2.045h85.503l-3.929 8.997c-3.315 7.592.151 16.434 7.743 19.75 1.954.854 3.99 1.258 5.995 1.258 5.782 0 11.292-3.363 13.754-9l9.173-21.003h204.662l9.173 21.003c2.462 5.638 7.972 9 13.754 9 2.004 0 4.041-.404 5.995-1.258 7.592-3.315 11.059-12.158 7.743-19.75l-3.929-8.997h85.503c2.384 0 3.761 1.281 4.369 2.045.655.822 1.349 2.18.936 3.983l-52.657 230c-.528 2.301-2.76 3.971-5.307 3.971z")
        path(d="m166 266.717c-8.284 0-15 6.716-15 15v110c0 8.284 6.716 15 15 15s15-6.716 15-15v-110c0-8.284-6.715-15-15-15z")
        path(d="m256 266.717c-8.284 0-15 6.716-15 15v110c0 8.284 6.716 15 15 15s15-6.716 15-15v-110c0-8.284-6.716-15-15-15z")
        path(d="m346 266.717c-8.284 0-15 6.716-15 15v110c0 8.284 6.716 15 15 15s15-6.716 15-15v-110c-.001-8.284-6.716-15-15-15z")
      div(class="cart-mini" v-if="showMiniCart && totalQuantity !== 0")
        div(class="cart-mini__title") Товары в корзине
        div(class="cart-mini__list")
          div(class="cart-mini__item" v-for="{productId, brand, images, price, size, quantity, path } in allCart")
            div(class="cart-mini__image" @click="toProductPage(path)")
              img(:src="images[0]")
            div(class="cart-mini__properties")
              div(class="cart-mini__brand property")
                div(class="description") Бренд
                div(class="value") {{brand}}
              div(class="cart-mini__price property")
                div(class="description") Цена
                div(class="value") {{price}} ₽
              div(class="cart-mini__size property")
                div(class="description") Размер
                div(class="value") {{size}} RUS
              div(class="cart-mini__quantity property")
                div(class="description") Кол-во
                div(class="value")
                  div(class="quantity-button minus" v-if="quantity > 1" @click="onChangeQuantity(productId, -1)")
                  div(class="quantity-button hidden" v-else)
                  div {{quantity}} шт.
                  div(class="quantity-button plus" @click="onChangeQuantity(productId, 1)")
                  div(class="delete-button" @click="onDeleteCartItem(productId)")
                    svg(
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 5 384 384"
                      xml:space="preserve")
                      g
                      g
                      g
                        path(d="M64 341.333C64 364.8 83.2 384 106.667 384h170.667C300.8 384 320 364.8 320 341.333v-256H64V341.333z M116.587 189.44l30.187-30.187L192 204.48l45.227-45.227l30.187 30.187l-45.227 45.227l45.227 45.227l-30.187 30.187L192 264.853l-45.227 45.227l-30.187-30.187l45.227-45.227L116.587 189.44z")
                        polygon(points="266.667,21.333 245.333,0 138.667,0 117.333,21.333 42.667,21.333 42.667,64 341.333,64 341.333,21.333 			")




</template>

<script>
  // import api from '@/plugins/api';
  import {mapGetters, mapActions} from 'vuex';
  import getToken from "../mixins/getToken";
  import cart from "../mixins/cart";

  export default {
    name: "CartInfo",
    data: () => ({
      showMiniCart: false,
    }),
    mixins: [getToken, cart],
    computed: {
      ...mapGetters('cart', ['allCart', 'totalQuantity']),
    },
    methods: {
      ...mapActions('categories', ['setCurrentProduct']),
      ...mapActions('cart', ['changeQuantity', 'deleteCartItem']),
/*      toProductPage(path) {
        if(path !== this.$route.path) {
          this.$router.push({path});
          this.setCurrentProduct({
            categoryName: this.$route.params.category,
            subcategoryName: this.$route.params.subcategory,
            productId: this.$route.params.id - 1,
          })
        }
        return;
      },*/
/*      onChangeQuantity(productId, value) {
        console.log(productId, value);
        if(this.token()) {
          api.post('/change_quantity_in_cart',
            {
              data: {
                productId,
                value,
              }
          },
            {
              headers: {
                'Authorization': this.token()
              }
            }).then(res => {
            if(res.data.success === true) {
              this.changeQuantity({productId, value})
            }
          }).catch(err => {
            console.log(err)
          });
        }
      },*/
/*      onDeleteCartItem(productId) {
        if(this.token()) {
          api.post('/delete_item_in_cart',
            {
              data: {
                productId,
              }
            },
            {
              headers: {
                'Authorization': this.token()
              }
            }).then(res => {
            if(res.data.success === true) {
              this.deleteCartItem(productId)
            }
          }).catch(err => {
            console.log(err)
          });
        }
      }*/
    }
  }
</script>

<style scoped lang="sass">
  .property
    position: relative
    min-width: 40px
    margin-top: 3px
  .description
    position: absolute
    top: 0
    left: 0
    font-size: 10px
  .value
    text-align: left
    margin-top: 12px
    font-size: 14px
  .quantity-button
    opacity: 0
    cursor: pointer
    padding: 5px
    border-radius: 50%
    background-color: rgba(orangered, 0.7)
    width: 8px
    height: 8px
    position: relative
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.16)
    &:hover
      background-color: orangered
    &:before, &:after
      content: ''
      position: absolute
      left: 50%
      top: 50%
      transform: translate(-50%, -50%)
      background-color: white
    &:before
      height: 2px
      width: 8px
  .minus
    margin-right: 5px
  .plus
    margin-left: 5px
    &:after
      height: 8px
      width: 2px
  .hidden
    opacity: 0
    margin-right: 5px
    cursor: default


  .cart
    &-info
      position: relative
      z-index: 6
      &:hover
        z-index: 8
    &-logo
      width: 35px
      border-radius: 3px
      padding: 6px 10px
      transition: .5s
      cursor: pointer
      background-color: white
      path
        fill: transparent
        stroke: orangered
        stroke-width: 10px
        transition: 3s
        stroke-dasharray: 2000
        stroke-dashoffset: 0
      &:hover
        border-bottom-right-radius: 0
        border-bottom-left-radius: 0
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1)
        path
          transition: 1s
          fill: rgba(orangered, .2)
          stroke-dasharray: 2000
          stroke-dashoffset: 4000
    &-quantity
      position: absolute
      font-size: 12px
      min-width: 18px
      height: 18px
      padding-left: 2px
      padding-right: 2px
      background-color: orangered
      color: white
      border-radius: 9px
      right: -9px
      top: -9px
      display: flex
      align-items: center
      justify-content: center
      span
        display: block
    &-mini
      position: absolute
      cursor: default
      width: 300px
      right: 0
      top: 50px
      background-color: white
      padding: 10px
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1)
      border-radius: 5px 0 5px 5px
      &__title
        text-align: left
        padding: 5px
      &__list
        max-height: 275px
        overflow-y: auto
      &__item
        display: flex
        &:hover
          .cart-mini__properties
            >.cart-mini__quantity
              >.value
                >.plus,.minus,.delete-button
                  opacity: 1
      &__image
        cursor: pointer
        width: 100px
        img
          width: 100%
      &__properties
        margin-left: 10px
        display: flex
        flex-direction: column
        align-items: flex-start
      &__quantity
        .value
          display: flex
          align-items: center
        .delete-button
          opacity: 0
          cursor: pointer
          margin-left: 10px
          width: 20px
          padding: 2px 5px
          &:hover
            path
              fill: rgba(orangered, 1)
            polygon
              fill: rgba(orangered, 1)
          path
            fill: rgba(orangered, .7)
            stroke-width: 0
            transition: 0s
          polygon
            fill: rgba(orangered, .7)


</style>
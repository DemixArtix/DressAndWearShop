<template lang="pug">
  li(class="card-block" @click="onCardSelect(productId)")
    ul(class="card-list")
      li(class="card-item" @mouseleave="src = defaultImage")
        div(
          class="card-link"
          v-for="(image, index) in images"
          :key="index"
          :style="{ width: widthOfLink + 'px'}"
          @mouseover="showImage(index)")
          div
        img(class="card-image" :src="src || defaultImage")
    div(class="card-info")
      span(class="card-price") {{good.price}} ₽
      span(class="card-label") {{good.brand}}
      ul(class="card-size__list")
        li(class="card-size__title")
          span Размеры:
        li(class="card-size__item" v-for="(size, i) in sizes" :key="i")
          template(v-if="i === sizes.length - 1")
            span  {{size}}
          template(v-else)
            span  {{size}},

</template>

<script>
  export default {
    name: "ProductCard",
    props: {
      good: {
        type: Object,
        default: () => ({}),
      },
      productId: {
        type: Number,
        default: 0,
      }
    },
    data:() => ({
      src: '',
    }),
    computed: {
      images() {
        return this.good.images;
      },
      sizes() {
        return this.good.sizes;
      },
      defaultImage() {
        return this.images[0];
      },
      widthOfLink() {
        return (250 / this.images.length).toFixed(2) || 250
      },
    },
    methods: {
      onCardSelect(productId) {
        this.$router.push({name: 'ProductPage', params: {id: productId + 1}})
      },
      showImage(index) {
        this.src = this.images[index];
      },
      clearSource() {
        this.src = ''
      }
    },
    watch: {
      $route: 'clearSource'
    }

  }
</script>

<style scoped lang="sass">
  .card-
    &block
      padding: 5px
      &:hover
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3)
    &title
    &list
    &item
      position: relative
      display: flex
      & .card-link
        opacity: 0
      &:hover
        & .card-link
          opacity: 1
    &link
      height: 333.33px
      z-index: 3
      &:hover
        div
          background-color: orangered
      div
        margin: 3px
        height: 3px
        border-radius: 5px
        background-color: rgba(orangered, 0.5)
    &image
      z-index: 2
      position: absolute
      width: 100%
    &info
      display: flex
      flex-direction: column
    &label
      margin: 2px 15px 6px 0
      align-self: flex-start
    &price
      align-self: flex-start
      margin: 10px 15px 6px 0
      font-size: 1.5rem
      font-weight: bold
    &size__
      &list
        display: flex
        font-size: .8rem
        opacity: 0.7
      &title
        margin-right: 10px
      &item
        margin-right: 5px
</style>
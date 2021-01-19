<template lang="pug">
  div(class="favorites-info")
    div(
      class="favorites-logo"
      @mouseover="showFavorites = true"
      @mouseleave="showFavorites = false"
      )
      div(class="favorites-patch" v-if="showFavorites")
      div(v-if="favorites && favorites.length" class="favorites-quantity")
        span {{favorites.length}}
      svg(
        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="-9 0 530 511.97"
        enable-background="new 0 0 512 512")
        g
          path(d="M240.7 453.6C32 267.8 46.2 280.6 43.3 277.8c0 0 0 0 0 0C4.3 240.4 0 193.9 0 193.9s-4.1-44.4 28.9-91.4c0 0 9.7-13.8 27.2-24.3C63 74 69 71.7 74.8 73.5c5.1 1.5 7.8 5.4 8.2 6c2.6 3.8 4.1 9.4 2.1 13.8c-2 4.3-6.8 6.1-8.2 6.6c-14.8 6-35.9 35.4-43.4 63.8c-2.2 8.3-6.2 24.3-2 43.4c6 27.3 24.2 43.6 30.9 49c92.5 74.9 181.3 154.2 187.3 163.9c0.4 0.6 2.4 4.2 6.2 5.4c2.6 0.8 5.2 0.2 7.2-0.6l0 0c-1.7 1.7 3.5-3.4 5.2-5c8.8-8.4 21.4-27.8 41.2-38.9c10.7-6 16-5.5 19.1-4.3c1.3 0.5 6.4 2.6 9 8.2c3.7 8-1 15.6-1.4 16.2c-19.6 17.5-39.3 35-58.9 52.4c-1.6 1.4-8.2 7-18.3 7C248.9 460.5 242.3 454.9 240.7 453.6z M354.8 374.6c-8.2-2.6-12.2-11.3-11.8-17.8c0.4-7.9 7.3-13.2 12.3-17.1c31.5-24.4 49.9-38.8 61.3-48.6c10.3-8.9 18.8-17.5 24.4-23.1c10.9-11 18.1-18.4 23.5-25.5c24.4-32.5 19.9-70.5 19.9-70.5c-0.6-4.7-4.6-34.9-29.6-58.2c-15.3-14.2-31.5-19.5-41.5-22.8c-10.2-3.3-23.3-7.6-39.1-6.3c-29 2.3-65.8 23.2-78.9 54.4c-3.7 8.7-7.8 23.8-20.8 31.4c-2.2 1.3-7.8 4.5-15.2 4.1c-4.4-0.2-9.2-1.7-15.3-6.1c-10.5-7.7-14.3-16.5-20.3-26.2c-0.7-1.1-12.6-20.3-30.8-35c-9.2-7.4-18.5-15-32.7-18.9c-18.9-5.2-37.1-1.6-52.6-9.7c-3.8-2-7.5-4.8-8.7-9.1c-1.3-4.9 1.2-9.4 1.7-10.2c3.4-5.8 9.6-7.8 12.1-8.6c22.9-7.4 57.5 5.8 57.5 5.8c19.1 7.3 48.5 18.4 71 49.1c7.4 10.1 13.5 21.5 17.8 33.8c8-22.5 22-42.6 40.6-57.9C352.5 38 432 42 479.1 92.7c26.1 28.2 39.7 68 35 107.2c-1.3 10.6-3.8 20.8-7.6 30.6c-9.7 25.1-25.1 40.5-35.8 51c-41.4 40.6-83.2 76-99.9 89.9C370 372 362.9 377.1 354.8 374.6z" )
      div(class="favorites-mini" v-if="showFavorites && favorites")
        div(class="favorites-mini__title") Избранное
        div(class="favorites-mini__list")
          div(class="favorites-mini__item" v-for="{ _id, inFavorites, brand, images, price, sizes, path } in favorites")
            div(class="favorites-mini__image" @click="toProductPage(path)")
              img(:src="images[0]")
            div(class="favorites-mini__properties")
              div(class="favorites-mini__brand property")
                div(class="description") Бренд
                div(class="value") {{brand}}
              div(class="favorites-mini__price property")
                div(class="description") Цена
                div(class="value") {{price}} ₽
              div(class="favorites-mini__size property")
                div(class="description") Размеры
                div(class="value") {{sizes}} RUS
              FavoritesButton(:productId="_id" :inFavorites="inFavorites")
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import FavoritesButton from "./FavoritesButton";

  export default {
    name: "Favorites",
    components: {FavoritesButton},
    data: () => ({
      showFavorites: false
    }),
    computed: {
      ...mapGetters('favorites', ['favorites'])
    },
    methods: {
      ...mapActions('categories', ['setCurrentProduct']),
      toProductPage(path) {
        if(path !== this.$route.path) {
          this.$router.push({path});
          this.setCurrentProduct({
            categoryName: this.$route.params.category,
            subcategoryName: this.$route.params.subcategory,
            productId: this.$route.params.id - 1,
          })
        }
        return
      }
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
  .favorites
    &-info
      position: relative
      z-index: 7
      margin-right: 5px
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
      &__image
        width: 100px
        img
          width: 100%
      &__properties
        margin-left: 10px
        display: flex
        flex-direction: column
        align-items: flex-start

</style>

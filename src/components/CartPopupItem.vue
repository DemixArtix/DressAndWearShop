<template lang="pug">
  div(class="cart-popup__item")
    div(class="cart-popup__image")
      img(:src="image")
    div(class="cart-popup__properties")
      div(class="cart-popup__brand")
        div(class="property")
          span Брэнд:
        span {{brand}}
      div(class="cart-popup__size")
        div(class="property")
          span Размер:
        span {{size}} (RUS)

    div(class="cart-popup__quantity")
      span  {{quantity}}
    div(class="cart-popup__price")
      span {{price}} ₽
</template>

<script>
  export default {
    name: "CartPopupItem",
    props: {
      item: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      image() {
        return this.item.images[0]
      },
      brand() {
        return this.item.brand
      },
      size() {
        return this.item.size
      },
      quantity() {
        return this.item.quantity
      },
      price() {
        return this.item.price
      },

    }
  }
</script>

<style scoped lang="sass">
  .property
    font-size: 10px
  .cart-popup__
    &item
      display: flex
      font-size: 14px
      margin-bottom: 10px
      padding-top: 10px
      padding-bottom: 10px
    &image
      width: 100px
      img
        width: 100%
    &properties
      width: 200px
      text-align: left
      margin-left: 10px
    &brand
    &size
      margin-top: 5px
    &quantity
      width: 50px
    &price
      margin-left: auto
      font-weight: bold
</style>
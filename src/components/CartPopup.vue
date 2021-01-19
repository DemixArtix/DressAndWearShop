<template lang="pug">
  div(class="cart-popup__section" @click="closePopup")
    div(class="cart-popup__block" @click.stop)
      div(class="cart-popup__header")
        span Товар добавлен в корзину
        div(class="cart-popup__close" @click="closePopup")
      div(class="cart-popup__body")
        CartPopupItem(:item="lastAddedItem")
        template(v-if="lengthWithoutLastItem !== 0")
          hr
          div(class="cart-popup__count-cart")
            span у вас в корзине еще {{lengthWithoutLastItem}} товар{{ending}}
          CartPopupItem(v-for="(item, index) in cartWithoutLastItem" :item="item" :key="index")
      div(class="cart-popup__footer")
        div(class="cart-popup__button continue_shopping" @click="closePopup")
          span Продолжать покупки
        div(class="cart-popup__button to_cart"
          @click="$router.push({name: 'Cart'})")
          span Перейти в корзину
</template>

<script>
  import CartPopupItem from "./CartPopupItem";
  import {mapGetters} from 'vuex'
  export default {
    name: "CartPopup",
    components: {CartPopupItem},
    computed: {
      ...mapGetters('cart', ['allCart', 'lastAddedItemId']),
      objToArr() {
        return Object.values(this.allCart);
      },
      cartWithoutLastItem() {
        return this.objToArr.filter(item => item.productId !== this.lastAddedItemId)
      },
      lastAddedItem() {
        return this.allCart[this.lastAddedItemId];
      },
      lengthWithoutLastItem() {
        return this.cartWithoutLastItem.reduce((acc, item) => acc + item.quantity, 0);
      },
      numeralsToString() {
        return this.lengthWithoutLastItem.toString()
      },
      stringLength() {
        return this.numeralsToString.length
      },
      simpleNumerals() {
        return + this.numeralsToString[this.stringLength - 1]
      },
      tens() {
        return + this.numeralsToString[this.stringLength - 2]
      },
      ending() {
        if(this.simpleNumerals === 1 && this.tens !== 1) {
            return ''
        }
        if(this.simpleNumerals >= 2 && this.simpleNumerals <= 4 && this.tens !== 1) {
            return 'a'
        }
        else {
            return 'ов'
        }
      }
    },
    methods: {
      closePopup() {
        this.$emit('closePopup', false)
      },
      goToCart() {
        this.$router.push()
      }
    }
  }
</script>

<style scoped lang="sass">
  .cart-popup__
    &section
      position: fixed
      top: 0
      left: 0
      height: 100%
      width: 100%
      background-color: rgba(black, .5)
      z-index: 10
      display: flex
      justify-content: center
    &block
      width: 500px
      max-height: 95%
      background-color: #fff
      align-self: center
      overflow-y: auto
      overflow-x: hidden
      position: relative
      padding-left: 10px
      padding-right: 10px
      margin-top: 5px
      margin-bottom: 5px
    &header
      position: sticky
      top: 0
      left: 0
      padding: 10px
      background-color: #fff
      text-align: left
      span
        text-transform: uppercase
        font-weight: 700
    &body
    &count-cart
      padding: 10px
      text-align: left
      text-transform: uppercase
      font-weight: 700
    &footer
      position: sticky
      display: flex
      justify-content: flex-end
      bottom: 0
      left: 0
      padding: 10px
      background-color: #fff
    &button
      padding: 10px
      border-radius: 3px
      &.continue_shopping
        color: rgba(orangered, .7)
        &:hover
          color: orangered
      &.to_cart
        color: #fff
        background-color: rgba(orangered, .7)
        &:hover
          background-color: orangered
          box-shadow: 0 0 15px rgba(orangered, .5)
    &close
      height: 35px
      width: 35px
      margin-left: auto
      position: absolute
      color: white
      top: 0
      right: 0
      &:before
        content: ''
        position: absolute
        left: 0
        top: 50%
        height: 2px
        width: 100%
        transform: rotate(-45deg)
        background-color: orangered

      &:after
        content: ''
        position: absolute
        height: 2px
        width: 100%
        left: 0
        top: 50%
        transform: rotate(45deg)
        background-color: orangered




</style>
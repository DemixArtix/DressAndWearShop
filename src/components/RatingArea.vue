<template lang="pug">
  div(class="rating__block")
    div(class="rating__body")
      div(class="rating__active" ref="active")
      div(class="rating__items")
        input(class="rating__item" type="radio" @click="evaluateProduct(1)" name="rating")
        input(class="rating__item" type="radio" @click="evaluateProduct(2)" name="rating")
        input(class="rating__item" type="radio" @click="evaluateProduct(3)" name="rating")
        input(class="rating__item" type="radio" @click="evaluateProduct(4)" name="rating")
        input(class="rating__item" type="radio" @click="evaluateProduct(5)" name="rating")
    div(class="rating__value" ref="value") {{rating}}
    div(class="rating__no-access" v-if="noAccess") чтобы оценить товар <a href="/">войдите</a> в свой аккаунт

</template>

<script>
  import getToken from "../mixins/getToken";
  import api from "@/plugins/api";

  export default {

    name: "RatingArea",
    mounted() {
      this.activeWidth();
    },
    data:() => ({
      rating: 3.6,
      noAccess: false,
    }),
    props: {
      productId: {
        type: String,
        default: '',
      }
    },
    mixins: [getToken],
    methods: {
      activeWidth() {
        return this.$refs.active.style.width = `${this.rating * 20}%`
      },
      evaluateProduct(value) {
        console.log(value);
        if(this.token()) {
          this.$emit('evaluationValue', value)
        } else {
          this.noAccess = true;
          setTimeout(() => {this.noAccess = false}, 3000)
        }
      }
    }
  }
</script>

<style scoped lang="sass">
  .rating
    &__
      &block
        display: flex
        align-items: flex-end

        font-size: 20px
        line-height: .75
        position: relative
      &body
        position: relative
        &:before
          content: "★★★★★"
          display: block
          color: lightgrey
      &active
        position: absolute
        height: 100%
        width: 0%
        top: 0
        left: 0
        overflow: hidden
        &:before
          content: "★★★★★"
          display: block
          position: absolute
          height: 100%
          width: 100%
          top: 0
          left: 0
          color: orangered

      &items
        display: flex
        position: absolute
        width: 100%
        height: 100%
        left: 0
        top: 0
      &value
        font-size: 80%
        line-height: 1
        padding: 0 0 0 10px
      &item
        flex: 0 0 20%
        margin: 0
        opacity: 0
      &no-access
        position: absolute
        top: -25px
        left: 0
        padding: 10px 5px
        border-radius: 15px
        font-size: 10px


</style>
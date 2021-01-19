<template lang="pug">
  div(class="photo-popup__block")
    div(class="photo-popup__close" @click="$emit('closePopup', false)")
    div(class="photo-popup__image")
      img(:src="source")
</template>

<script>
  export default {
    name: "PhotoPopupCRM",
    props: {
      source: {
        type: String,
        default: ''
      },
      photoId: {
        type: Number,
        default: 0
      },

    }
  }
</script>

<style scoped lang="sass">
  .photo-popup__
    &block
      position: fixed
      background-color: rgba(#000, .5)
      left: 0
      top: 0
      width: 100%
      z-index: 100
      display: flex
    &close
      position: absolute
      right: 20px
      top: 20px
      z-index: 101
      width: 50px
      height: 50px
      &:after, &:before
        content: ''
        position: absolute
        left: 0
        top: 50%
        height: 2px
        width: 100%
        background-color: #fff
      &:after
        transform: rotate(45deg)
      &:before
        transform: rotate(-45deg)
    &image
      margin-left: auto
      margin-right: auto
  img

    overflow-y: auto
    height: 100vh
</style>
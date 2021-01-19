<template lang="pug">
  div(class="header")
    div(class="header-logo")
      h1(class="header-title") Dress&Wear
    div(class="header-navigation")
      Auth
      Favorites
      CartInfo

</template>

<script>
  import CartInfo from "./CartInfo";
  import Favorites from "./Favorites";
  import Auth from "./Auth";
  export default {
    name: "Header",
    components: {Auth, Favorites, CartInfo}
  }
</script>

<style scoped lang="sass">
  .header
    &-
      &title
        margin-top: 0
        padding-top: 20px
      &navigation
        padding: 5px 20px
        display: flex
        justify-content: flex-end

</style>
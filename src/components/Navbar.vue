<template lang="pug">
  div(class="nav-block")
    ul(class="nav-list" )
      template(v-for="category in categories")
        NavbarItem(:category="category")
</template>

<script>
  import {mapGetters} from 'vuex';
  import NavbarItem from "./NavbarItem";

  export default {
    name: "Navbar",
    components: {
      NavbarItem
    },
    methods: {

    },
    computed: {
      ...mapGetters('categories', ['categories']),
    }
  }
</script>

<style scoped lang="scss">
  .nav- {
    &list {
      position: relative;
      list-style: none;
      display: flex;
      z-index: 4;
      li {
        &:first-child  {
          margin-left: 30px;
        }
      }
    }
  }
</style>
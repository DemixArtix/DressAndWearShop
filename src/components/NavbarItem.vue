<template lang="pug">
  li(class='nav-item'
    @mouseover="showSubcategories=true"
    @mouseleave="showSubcategories=false"
    @click="$router.push({name: 'Category', params: {category: category.name}})")
    a(class='nav-item__link') {{category.description}}
    SubcategoriesList(
      v-if="showSubcategories && category.subcategories.length"
      :categoryParent="category.name"
      :subcategories="category.subcategories")

</template>

<script>
  import {mapGetters} from 'vuex';
  import SubcategoriesList from "./SubcategoriesList";

  export default {
    name: "NavbarItem",
    components: {SubcategoriesList},
    props: {
      category: {
        type: Object,
        default: () => ({}),
      }
    },
    data: () => ({
      showSubcategories: false
    }),
    computed: {
    },
    methods: {
    }

  }
</script>

<style scoped lang="scss">
  .nav-item {
    padding: 5px 10px;
    border: 1px solid transparent;
    transition: 0.5s;
    cursor: pointer;
    &:hover {
      color: orangered;
      border-color: orangered;
    }
    &__link {
      text-transform: capitalize;
    }
  }

</style>
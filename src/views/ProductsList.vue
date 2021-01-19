<template lang="pug">
  div(class="products-block")
    h1(class="products-title") {{categoryLabel}}
    ul(class="products-list")
      template(v-for="(good, index) in goods")
        ProductCard(:good="good", :productId="index")
</template>

<script>
  import {mapGetters} from 'vuex'
  import ProductCard from "../components/ProductCard";

  export default {
    name: "ProductsList",
    components: {ProductCard},
    computed: {
      ...mapGetters('categories', ['getCurrentCategory', "getCurrentSubcategory"]),
      categoryName() {
        return this.$route.params.category
      },
      subcategoryName() {
        return this.$route.params.subcategory
      },
      currentCategory() {
        return this.getCurrentCategory(this.categoryName);
      },
      currentSubcategory() {
        return this.getCurrentSubcategory(this.currentCategory, this.subcategoryName);
      },
      categoryLabel() {
        return this.currentSubcategory.description
      },
      goods() {
        return this.currentSubcategory.goods;
      },
    }

  }
</script>

<style scoped lang="sass">
  .products-
    &block
    &title
    &list
      display: grid
      grid-template-columns: repeat(auto-fit, 250px)
      grid-gap: 10px
      justify-content: center
</style>
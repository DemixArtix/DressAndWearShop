<template lang="pug">
  div(class="category-block")
    h2(class="category-title") {{categoryLabel}}
    ul(class="subcategory-list" )
      template(
        v-for="{name, description} in subcategories")
        li(class="subcategory-item"
          @click="$router.push({name: 'ProductsList', params: {category: categoryName, subcategory: name}})")
          div(class="subcategory-card")
            h3(class="subcategory-title") {{subcategoryLabel(description)}}

</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "Category",
    data: () => ({}),
    computed: {
      ...mapGetters('categories', ['getCurrentCategory']),
      params() {
        return this.getCurrentCategory(this.$route.params.category);
      },
      subcategories() {
        return this.params.subcategories;
      },
      categoryLabel() {
        const description = this.params.description;
        return description[0].toUpperCase() + description.slice(1);
      },
      categoryName() {
        return this.params.name;
      },
      subcategoryLabel:() => (description) => description[0].toUpperCase() + description.slice(1),
    }
  }
</script>

<style scoped lang="sass">
  .subcategory-
    &list
      display: grid
      grid-gap: 20px
      grid-template-columns: repeat(auto-fit, 300px)
      justify-content: center
    &item
      height: 350px
      background-color: orangered
    &card
</style>
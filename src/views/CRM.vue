<template lang="pug">
  div(class="crm-block")
    ul(class="crm-category__list")
      template(v-for="({name, description, subcategories}, index) in categoriesList")
        CategoryCRM(:name="name", :description="description", :subcategories="subcategories" :index="index")
      AddWrapper(
        :nameAction="'addCategory'",
        :length="categoriesList.length"
      )

</template>

<script>
  import {mapGetters} from 'vuex'
  import CategoryCRM from "../components/crm-components/CategoryCRM";
  import AddWrapper from "../components/crm-components/AddWrapper";

  export default {
    name: "CRM",
    components: {AddWrapper, CategoryCRM},
    computed: {
      ...mapGetters('categories', ['categories']),
      categoriesList() {
        return this.categories
      },
    },
    data: () => ({
      addCategory: false,
    }),
    methods: {

    }
  }
</script>

<style scoped lang="sass">
  .crm-
    &block
      text-align: left
      margin: 20px

</style>
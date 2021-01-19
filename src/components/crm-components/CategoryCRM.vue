<template lang="pug">
  li(class="crm-category__item" @click="showSubcategories = !showSubcategories")
    div(class="crm-category__block")
      span(class="crm-category__name") {{description}} ({{name}}) - {{subcategories.length}} подкатегорий
      ul(class="crm-subcategory__list" v-if="showSubcategories" @click.stop)
        EditTemplateCRM(
          :name="name",
          :description="description",
          :type="'category'"
          :index="index")
        template(v-for="({name: subname ,description: subdescription, goods}, subcategoryIndex) in subcategories")
          SubcategoryCRM(
            :subname="subname",
            :subdescription="subdescription",
            :categoryIndex="index",
            :index="subcategoryIndex",
            :goods="goods")
        AddWrapper(
          :nameAction="'addSubcategory'"
          :prefix="'под'"
          :categoryIndex="index",
          )
</template>

<script>
  import SubcategoryCRM from "./SubcategoryCRM";
  import EditTemplateCRM from "./EditTemplateCRM";
  import AddWrapper from "./AddWrapper";


  export default {
    name: "CategoryCRM",
    components: {AddWrapper, EditTemplateCRM, SubcategoryCRM},
    props: {
      name: {
        type: String,
        default: ''
      },
      description: {
        type: String,
        default: ''
      },
      subcategories: {
        type: Array,
        default: () => ([]),
      },
      index: {
        type: Number,
        default: 0
      }
    },
    data: () => ({
      showSubcategories: false,
    }),
    methods: {

    }
  }
</script>

<style scoped lang="sass">
  .crm-
    &category__
      &block
      &name
        display: block
        padding: 10px
        background-color: rgba(green, .3)
        margin: 5px
        cursor: pointer
        border-radius: 3px
        transition: .1s
        &:hover
          box-shadow: 0 0 5px rgba(#000, .5)
          transform: scale(1.01)


</style>
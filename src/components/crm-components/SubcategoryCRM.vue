
<template lang="pug">
  li(class="crm-subcategory__item")
    div(class="crm-subcategory__block" @click="showGoods = !showGoods")
      span(class="crm-subcategory__name") {{subdescription}} ( {{subname}} ) - {{goods.length}} товаров
      ul(class="crm-goods__list" v-if="showGoods" @click.stop)
        EditTemplateCRM(
          :name="subname",
          :description="subdescription",
          :type="'subcategory'"
          :index="index"
          :categoryIndex="categoryIndex",
          :prefix="'под'")
        AddGoods(
          :subcategoryIndex="index"
          :categoryIndex="categoryIndex"
        )
        template(v-for="(good, goodIndex) in goods")
          GoodsCRM(
            :good="good",
            :goodIndex="goodIndex",
            :subcategoryIndex="index"
            :categoryIndex="categoryIndex"
          )
</template>

<script>
  import GoodsCRM from "./GoodsCRM";
  import EditTemplateCRM from "./EditTemplateCRM";
  import AddGoods from "./AddGoods";
  export default {
    name: "CategoryCRM",
    components: {AddGoods, EditTemplateCRM, GoodsCRM},
    props: {
      subname: {
        type: String,
        default: ''
      },
      subdescription: {
        type: String,
        default: ''
      },
      index: {
        type: Number,
        default: 0
      },
      categoryIndex: {
        type: Number,
        default: 0
      },
      goods: {
        type: Array,
        default: () => ([])
      }
    },
    data: () => ({
      showGoods: false,
    })
  }
</script>

<style scoped lang="sass">
  .crm-
    &subcategory__
      &item
        margin-left: 20px
      &name
        display: block
        margin: 6px
        padding: 10px
        background-color: lightblue
        border-radius: 3px
        transition: .1s
        &:hover
          box-shadow: 0 0 5px rgba(#000, .5)
          transform: scale(1.01)

</style>
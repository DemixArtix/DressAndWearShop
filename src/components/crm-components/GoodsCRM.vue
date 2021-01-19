<template lang="pug">
  li(class="crm-goods__item")
    div(class="crm-goods__block" @click="showDetails = !showDetails")
      GoodsDetailCRM(
        :name="'Брэнд'"
        :data="brand"
        :keyOfData="'brand'"
        :className="'crm-goods__brand'"
        :goodIndex="goodIndex"
        :subcategoryIndex="subcategoryIndex"
        :categoryIndex="categoryIndex"
      )

      div(@click.stop class="crm-goods__details" v-if="showDetails")
        button(v-if="!deleteTemplate" @click="deleteTemplate = !deleteTemplate") удалить товар
        template(v-if="deleteTemplate")
          span вы уверены?
          button(@click="onDelete") ok
          button(@click="deleteTemplate = !deleteTemplate") cancel

        GoodsDetailCRM(
          :name="'Цена'"
          :data="price"
          :keyOfData="'price'"
          :className="'crm-goods__price'"
          :goodIndex="goodIndex"
          :subcategoryIndex="subcategoryIndex"
          :categoryIndex="categoryIndex"
        )
        div(class="crm-goods__sizes")
          span(class="crm-goods__sizes_title") Размеры:
          ul(class="crm-goods__sizes_list")
            li(class="crm-goods__sizes_item" v-for="(size, sizeId) in sizes" :key="sizeId")
              SizeItemCRM(
                :size="size"
                :sizeId="sizeId"
                :goodIndex="goodIndex"
                :subcategoryIndex="subcategoryIndex"
                :categoryIndex="categoryIndex"
                )
            li
              button(v-if="!addSizeTemplate" @click="addSizeTemplate = !addSizeTemplate") Добавить размер
              div(v-if="addSizeTemplate")
                input(ref="sizeInput" placeholder="enter size")
                button(@click="onAddSize")  ok
                button(@click="addSizeTemplate = !addSizeTemplate")  cancel
        div(class="crm-goods__images")
          span(class="crm-goods__images_title") Изображения:
          ul(class="crm-goods__images_list")
            template(v-for="(source, photoId) in images")
              PhotoItemCRM(
                :source="source"
                :photoId="photoId"
                :goodIndex="goodIndex"
                :subcategoryIndex="subcategoryIndex"
                :categoryIndex="categoryIndex"
                )

</template>

<script>
  import GoodsDetailCRM from "./GoodsDetailCRM";
  import SizeItemCRM from "./SizeItemCRM";
  import PhotoItemCRM from "./PhotoItemCRM";
  import {mapActions} from 'vuex';

  export default {
    name: "GoodsCRM",
    components: {PhotoItemCRM, SizeItemCRM, GoodsDetailCRM},
    props: {
      good: {
        type: Object,
        default: () => ({}),
      },
      goodIndex: {
        type: Number,
        default: 0
      },
      subcategoryIndex: {
        type: Number,
        default: 0
      },
      categoryIndex: {
        type: Number,
        default: 0
      },
    },
    data: () => ({
      showDetails: false,
      deleteTemplate: false,
      addSizeTemplate: false,
    }),
    computed: {
      brand() {
        return this.good.brand
      },
      price() {
        return this.good.price
      },
      sizes() {
        return this.good.sizes
      },
      images() {
        return this.good.images
      },
    },
    methods: {
      ...mapActions('categories', ['deleteGoodsItem', 'addSize']),
      onDelete() {
        this.deleteGoodsItem({
          goodsItemIndex: this.goodIndex,
          subcategoryIndex: this.subcategoryIndex,
          categoryIndex: this.categoryIndex,
        });
        this.deleteTemplate = false;
      },
      onAddSize() {
        const size = + this.$refs.sizeInput.value;
        if(size) {
          this.addSize({
            size,
            goodsItemIndex: this.goodIndex,
            subcategoryIndex: this.subcategoryIndex,
            categoryIndex: this.categoryIndex,
          })
        }
        this.addSizeTemplate = false;
      }
    }
  }
</script>

<style scoped lang="sass">
  .crm-goods__
    &item
      margin-left: 20px
    &brand
      padding: 10px
      border-radius: 3px
      margin: 5px
      background-color: lavender
      transition: .1s
      &:hover
        box-shadow: 0 0 5px rgba(#000, .5)
        transform: scale(1.01)
    &details
      margin-left: 20px
    &sizes_
      &list
        display: flex
        flex-wrap: wrap
      &item
        padding: 10px
        margin: 5px
        box-shadow: 0 0 5px rgba(#000, .5)
        transition: .1s
        &:hover
          box-shadow: 0 0 10px rgba(#000, .5)
          transform: scale(1.01)
    &images_
      &list
        display: flex
        flex-wrap: wrap
</style>
<template lang="pug">
  li(class="crm-goods__images_item")
    img(:src="source" @click="showPopup = !showPopup")
    PhotoPopupCRM(
      v-if="showPopup"
      :source="source"
      @closePopup="(bool) => {this.showPopup = bool}")
    button(v-if="!edit" @click="edit = !edit") редактировать
    div(class="crm-goods__images_edit" v-if="edit")
      span url картинки
      textarea(class="crm-goods__images_area" ref="input" :value="source")
      div
        button(@click="onChangeImage") ok
        button(@click="edit = !edit") close
        button(@click="onDeleteImage") delete
</template>

<script>
  import PhotoPopupCRM from "./PhotoPopupCRM";
  import {mapActions} from "vuex";
  export default {
    name: "PhotoItemCRM",
    components: {PhotoPopupCRM},
    data: () => ({
      showPopup: false,
      edit: false
    }),
    props: {
      source: {
        type: String,
        default: ''
      },
      photoId: {
        type: Number,
        default: 0
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
    computed: {
      params() {
        return {
          keyOfData: 'images',
          itemIndex: this.photoId,
          goodsItemIndex: this.goodIndex,
          subcategoryIndex: this.subcategoryIndex,
          categoryIndex: this.categoryIndex,
        }
      }
    },
    methods: {
      ...mapActions('categories', ['changeDetailInArray', 'deleteDetailInArray']),
      onChangeImage() {
        const newData = this.$refs.input.value;
        if(newData && newData !== this.size) {
          this.changeDetailInArray(Object.assign({}, {newData}, this.params));
        }
        this.edit = false;
      },
      onDeleteImage() {
        this.deleteDetailInArray(this.params);
        this.edit = false;
      }
    }

  }
</script>

<style scoped lang="sass">
  .crm-goods__images
    &_item
      padding: 10px
      margin: 5px
      box-shadow: 0 0 5px rgba(#000, .5)
      transition: .1s
      display: flex
      flex-direction: column
      &:hover
        box-shadow: 0 0 10px rgba(#000, .5)
    &_edit
      display: flex
      flex-direction: column
    &_area
      min-width: 450px

  img
    width: 100px
</style>
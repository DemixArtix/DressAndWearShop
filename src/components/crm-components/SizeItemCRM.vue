<template lang="pug">
  div()
    div(class="" @click="edit = !edit" v-if="!edit")
      span {{size}}
    div(v-if="edit")
      input(ref="input" :value="size")
      button(@click="onChangeSize") ok
      button(@click="edit = !edit") cancel
      button(@click="onDeleteSize") delete
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: "SizeItemCRM",
    data: () => ({
      edit: false
    }),
    props: {
      size: {
        // type: Number,
        // default: 0,
      },
      sizeId: {
        type: Number,
        default: 0,
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
          keyOfData: 'sizes',
          itemIndex: this.sizeId,
          goodsItemIndex: this.goodIndex,
          subcategoryIndex: this.subcategoryIndex,
          categoryIndex: this.categoryIndex,
        }
      }
    },
    methods: {
      ...mapActions('categories', ['changeDetailInArray', 'deleteDetailInArray']),
      onChangeSize() {
        const newData = this.$refs.input.value;
        if(newData && newData !== this.size) {
          this.changeDetailInArray(Object.assign({}, {newData}, this.params));
        }
        this.edit = false;
      },
      onDeleteSize() {
        this.deleteDetailInArray(this.params);
        this.edit = false;
      }
    }
  }
</script>

<style scoped lang="sass">
  input
    width: 30px
  span
    color: red
    font-weight: 700
</style>
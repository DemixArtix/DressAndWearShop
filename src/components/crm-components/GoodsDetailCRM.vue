<template lang="pug">
  div(:class="className")
    template(v-if="!edit")
      span(class="crm-goods__detail_title") {{name}}: {{data}}
      button(class="crm-goods__detail_button" @click.stop="edit = !edit") редактировать
    template(v-if="edit" )
      input(ref="input" :value="data" @click.stop)
      button(class="crm-goods__detail_button" @click.stop="onChangeDetail") сохранить
      button(class="crm-goods__detail_button" @click.stop="edit = !edit") закрыть
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: "GoodsDetailCRM",
    data:() => ({
      edit: false,
    }),
    props: {
      name: {
        type: String,
        default: ''
      },
      data: {
        type: String,
        default: ''
      },
      keyOfData: {
        type: String,
        default: ''
      },
      className: {
        type: String,
        default: ''
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
    methods: {
      ...mapActions('categories', ['changeDetail']),
      onChangeDetail() {
        const newData = this.$refs.input.value;
        if(newData && newData !== this.data) {
          this.changeDetail({
            newData: this.keyOfData === 'price' ? newData.replace(/\D/g, '') : newData,
            keyOfData: this.keyOfData,
            goodIndex: this.goodIndex,
            subcategoryIndex: this.subcategoryIndex,
            categoryIndex: this.categoryIndex,
          })
        }
        this.edit = false;
      }
    }
  }
</script>

<style scoped>

</style>
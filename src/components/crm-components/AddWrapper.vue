<template lang="pug">
  div(class="crm-category__add")
    template(v-if="!add")
      button(@click="add = !add") Добавить {{prefix}}категорию
    template(v-if="add")
      input(ref="description" class="crm-category__add_input" :placeholder="'название '+ prefix + 'категории(на русском)'")
      input(ref="name" class="crm-category__add_input" placeholder='Системное имя (должно быть на английском без пробелов)')
      input(ref="index" class="crm-category__add_input" placeholder="номер места в списке категорий ")
      div(class="crm-category__add_buttons")
        button(@click="onAdd") ok
        button(@click="add = !add") close
</template>

<script>
  import {mapActions} from 'vuex';
  export default {
    name: "AddWrapper",
    data: () => ({
      add: false
    }),
    props: {
      nameAction: {
        type: String,
        default: '',
      },
      prefix: {
        type: String,
        default: '',
      },
      categoryIndex: {
        type: Number,
        default: 0
      },
      length: {
        type: Number,
        default: 0
      }
    },
    methods: {
      ...mapActions('categories', ['addCategory', 'addSubcategory']),
      onAdd() {
        console.log(this.length);
        const name = this.$refs.name.value;
        const description = this.$refs.description.value;
        const index = this.$refs.index.value - 1;
        if(name && description) {
          if(this.nameAction === 'addCategory') {
            this.addCategory({
              name,
              description,
              index,
              length: this.length
            })
          }
          if(this.nameAction === 'addSubcategory') {
            this.addSubcategory({
              name,
              description,
              index,
              categoryIndex: this.categoryIndex,
            })
          }

        }
      }
    }
  }
</script>

<style scoped lang="sass">
  .crm-category__
    &add
      display: flex
      flex-direction: column
      max-width: 500px
      &_input
        max-width: 500px
        padding: 10px
        margin: 5px
      &_buttons
        align-self: flex-end
        button
          padding: 10px 20px
          margin: 5px

</style>
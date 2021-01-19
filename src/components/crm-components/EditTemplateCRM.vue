<template lang="pug">
  div
    template(v-if="!deleteTemplate")
      button(v-if="!editTemplate" @click="editTemplate = !editTemplate")  редактировать {{prefix}}категорию
      template(v-if="editTemplate")
        div
          span Описание категории
          input(ref="description" :value="description")
        div
          span Системное имя (должно быть на английском без пробелов)
          input(ref="name" :value="name")
        div
          button(@click="onSaveChanges")  сохранить изменения
          button(@click="editTemplate = !editTemplate")  скрыть панель
        div
          button(@click="deleteTemplate = !deleteTemplate") удалить {{prefix}}категорию
    template(v-if="deleteTemplate")
      input(v-model="confirmDelete" :placeholder="'введите название ' + prefix + 'категории чтобы удалить'")
      button(@click="onDelete") delete

</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: "EditTemplateCRM",
    data: () => ({
      editTemplate: false,
      deleteTemplate: false,
      confirmDelete: ''
    }),
    props: {
      name: {
        type: String,
        default: ''
      },
      description: {
        type: String,
        default: ''
      },
      type: {
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
      prefix: {
        type: String,
        default: '',
      }

    },
    methods: {
      ...mapActions('categories',
        ['changeCategory', 'changeSubcategory', 'deleteCategory', 'deleteSubcategory']),
      onSaveChanges() {
        const name = this.$refs.name.value;
        const description = this.$refs.description.value;
        const currentName = this.name;
        const currentDescription = this.description;
        if(name && description && (name !== currentName || description !== currentDescription)) {
          if(this.type === 'category') {
            this.changeCategory({
              name,
              description,
              index: this.index
            });
          }
          if(this.type === 'subcategory') {
            this.changeSubcategory({
              name,
              description,
              index: this.index,
              categoryIndex: this.categoryIndex
            })
          }
        }
      },
      onDelete() {
        if(this.confirmDelete === this.name) {
          if(this.type === 'category') {
            this.deleteCategory({
              index: this.index
            });
          }
          if(this.type === 'subcategory') {
            this.deleteSubcategory({
              index: this.index,
              categoryIndex: this.categoryIndex
            })
          }
        }
        this.deleteTemplate = false
      }
    }
  }
</script>

<style scoped>

</style>
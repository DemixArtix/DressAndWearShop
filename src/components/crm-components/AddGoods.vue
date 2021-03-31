<template lang="pug">
  div(class="add-goods__block")
    template(v-if="!add")
      button(@click="add = !add") добавить товар
    template(v-if="add")
      label Брэнд
        input(v-model="brand" placeholder='brand')
      label Цена
        input(v-model="price" placeholder='price')
      div
        label Размеры
        div(v-for="(size, sizeId) in sizes" :key="sizeId")
          input(v-model="size.item" placeholder='size')
          button(@click="sizes.splice(sizeId, 1)") delete
        button(@click="sizes.push({item: ''})") plus
      div
        label Изображения
        div(v-for="(image, imageId) in images" :key="imageId")
          input(v-model="image.src" placeholder="source")
          button(@click="images.splice(imageId, 1)") delete
          img(width="100px" :src="image.src")
        button(@click="images.push({src: ''})") plus
      div
        label Номер позиции в списке
          input(v-model="index" placeholder="index")
      button(@click="onAdd") add
      button(@click="add = !add") close

</template>

<script>
  import {mapActions} from 'vuex';
  export default {
    name: "AddGoods",
    data: () => ({
      add: false,
      brand: '',
      price: '',
      sizes: [{item: ''}],
      images: [{src: ''}],
      index: 0
    }),
    props: {
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
      ...mapActions('categories', ['addGoods']),
      onAdd() {
        function restructureArray(arr, key) {
          let newArr = [];
         arr.forEach((item) => {
           const value = item[key];
           if(value) {
             newArr.push(value)
           }
          });
          return newArr;
        }
        const sizes = restructureArray(this.sizes, 'item').sort((prev, next) => prev - next);
        const images = restructureArray(this.images, 'src');
        if(this.brand && this.price && sizes.length !== 0 && images.length !== 0) {
          this.addGoods({
            goodsItem: {
              brand: this.brand,
              price: this.price.replace(/\D/g, ''),
              sizes,
              images
            },
            categoryIndex: this.categoryIndex,
            subcategoryIndex: this.subcategoryIndex,
            index: this.index,
          })
        }
      }
    }
  }
</script>

<style scoped lang="sass">
  .add-goods__
    &block
      display: flex
      flex-direction: column
</style>
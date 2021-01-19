<template lang="pug">
  div(class="nav-subcategories")
    ul(class="nav-subcategories__list")
      template(v-for="{name, description} in subcategories")
        li(class="nav-subcategories__item"
        @click.stop="$router.push({name: 'ProductsList', params: {category: categoryParent, subcategory: name}})")
          a(class="nav-subcategories__link") {{description}}

</template>

<script>
  export default {
    name: "Subcategories",
    props: {
      subcategories: {
        type: Array,
        default: () => ([])
      },
      categoryParent: {
        type: String,
        default: '',
      }
    }
  }
</script>

<style scoped lang="scss">
  .nav-subcategories {
    position: absolute;
    background-color: #fff;
    left: 0;
    top: 100%;
    width: 100%;
    box-shadow: 0 6px 8px 0 rgba(0,0,0,.16);
    &__ {
      &list {
        list-style: none;
        padding: 10px;
        margin: 5px 30px;
        border-top: 1px solid orangered;
      }
      &item {
        font-size: .8rem;
        padding: 3px;
        display: flex;
        color: lightsalmon;
        &:hover {
          color: orangered;
        }
      }
      &link {
        text-transform: capitalize;
      }
    }
  }
</style>
<template>
  <div v-if="categories" id="app" @click="hideSizes">
    <router-link to="/crm">crm</router-link>
    <Header/>
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
  import Navbar from "./components/Navbar";
  import Header from "./components/Header";
  import {mapGetters, mapActions} from 'vuex'
  export default {
    components: {Header, Navbar},
    async mounted() {
      await this.loadCategories();
    },
    methods: {
      ...mapActions('eventData', ['togglePanelOfSizes']),
      ...mapActions('categories', ['loadCategories']),
      hideSizes() {
        this.togglePanelOfSizes(false);
      },
    },
    computed: {
      ...mapGetters('categories', ['categories'])
    }
  }
</script>

<style lang="scss">
  body {
    margin: 0;
  }
  ul {
    list-style: none;
    padding: 0;
  }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  z-index: 1;
  position: relative;
}

</style>

<template>
  <div
      v-if="categories"
      id="app"
      @click="() => {
        hideSizes();
        hideAddresses();
      }">
    <div class="container">
      <router-link to="/crm">crm</router-link>
      <Header/>
      <Navbar/>
      <router-view/>
    </div>
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
      ...mapActions('eventData', ['togglePanelOfSizes', 'togglePanelOfAddresses']),
      ...mapActions('categories', ['loadCategories']),
      hideSizes() {
        this.togglePanelOfSizes(false);
      },
      hideAddresses() {
        this.togglePanelOfAddresses(false);
      },
    },
    computed: {
      ...mapGetters('categories', ['categories'])
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;600;700;800;900&display=swap');

  body {
    margin: 0;
  }
  ul {
    list-style: none;
    padding: 0;
  }
#app {
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  z-index: 1;
  position: relative;
}
  .container {
    max-width: 1240px;
    margin: 0 auto;
  }

  button {
    font: 400 13.3px 'Nunito'
  }

</style>

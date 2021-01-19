import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import categories from "./modules/categories"
import eventData from "./modules/eventData"
import cart from './modules/cart'
import favorites from './modules/favorites'
import userData from './modules/userData'

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    categories,
    eventData,
    cart,
    favorites,
    userData,
  }
})

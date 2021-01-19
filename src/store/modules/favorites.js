import api from '@/plugins/api'
import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    favorites: null,
    booleanSwitch: false,
  },
  getters: {
    favorites: ({favorites}) => favorites,
    booleanSwitch: ({booleanSwitch}) => booleanSwitch,

  },
  mutations: {
    LOAD_FAVORITES(state, arr) {
      arr.forEach(item => {
        item.inFavorites = true
      });
      state.booleanSwitch = !state.booleanSwitch;
      state.favorites = arr;
    },
    ADD_FAVORITE_ITEM(state, product) {
      const itemInStore = state.favorites.find(item => item._id === product._id);
      if(itemInStore) {
        itemInStore.inFavorites = true;
      } else {
        product.inFavorites = true;
        state.favorites.unshift(product);
      }
      state.booleanSwitch = !state.booleanSwitch;
    },
    // REMOVE_FAVORITE_ITEM (state, _id) {
    //   const productId = state.favorites.indexOf(state.favorites.find(item => item._id === _id));
    //   Vue.delete(state.favorites, productId);
    // },
    REMOVE_FAVORITE_LIST (state) {
      state.favorites = null;
    },
    SWITCH_FAVORITES_LABEL (state, { bool, productId }) {
      const item = state.favorites.find(item => item._id === productId);
      item.inFavorites = bool;
      state.booleanSwitch = !state.booleanSwitch;
      console.log(item);
    }
  },
  actions: {
    async loadFavorites({commit}, favorites) {
      const fav = await api.post('/find_favorites', favorites);
      commit('LOAD_FAVORITES', fav.data.result)
    },
    addFavoriteItem({commit}, product) {
      commit('ADD_FAVORITE_ITEM', product)
    },
    // removeFavoriteItem({commit}, _id) {
    //   commit('REMOVE_FAVORITE_ITEM', _id)
    // },
    removeFavoriteList({commit}) {
      commit('REMOVE_FAVORITE_LIST')
    },
    switchFavoritesLabel({commit}, params) {
      commit('SWITCH_FAVORITES_LABEL', params);
    }
  }
}
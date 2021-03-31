import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    userData: null,
  },
  getters: {
    getUserData:({userData}) => userData,

  },
  mutations: {
    SET_USER_DATA(state, data) {
      state.userData = data;
    },
    REMOVE_USER_DATA(state) {
      state.userData = null;
    },
    REFRESH_ADDRESSES(state, addresses) {
      Vue.set(state.userData, 'addresses', addresses);
    }
  },
  actions: {
    setUserData({commit}, data) {
      commit('SET_USER_DATA', data)
    },
    removeUserData({commit}) {
      commit('REMOVE_USER_DATA')
    },
    refreshAddresses({commit}, addresses) {
      commit('REFRESH_ADDRESSES', addresses)
    }
  }
}
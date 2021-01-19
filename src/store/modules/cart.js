import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    cart: {},
    lastAddedItemId: {},
    quantity: 0,
  },
  getters: {
    lastAddedItemId: ({lastAddedItemId}) => lastAddedItemId,
    allCart: ({cart}) => {
      return cart},
    totalQuantity: ({quantity}) => quantity,
  },
  mutations: {
    ADD_TO_CART(state, product) {
      state.cart[product.productId] = product;
      state.lastAddedItemId = product.productId;
    },
    INCREASE_QUANTITY(state, productId) {
      state.cart[productId].quantity++;
      state.lastAddedItemId = productId;
    },
    TOTAL_QUANTITY(state) {
      let result = Object.values(state.cart).reduce((acc, item) => acc + item.quantity, 0);
      Vue.set(state, 'quantity', result);
    },
    SET_CART(state, cart) {
      Vue.set(state, 'cart', cart);
    },
    CHANGE_QUANTITY(state, {productId, value}) {
      state.quantity += value;
      state.cart[productId].quantity += value;
    },
    DELETE_CART_ITEM(state, productId) {
      state.quantity -= state.cart[productId].quantity;
      Vue.delete(state.cart, productId);
    }
  },
  actions: {
    addToCart({commit, getters}, product) {
      console.log(getters.allCart);
      if(Object.keys(getters.allCart).find(id => id === product.productId)) {
        commit('INCREASE_QUANTITY', product.productId);
      } else {
        product.quantity = 1;
        commit('ADD_TO_CART', product);
      }
      commit('TOTAL_QUANTITY');
    },
    setCart({commit}, cart) {
      cart = cart.reduce((acc, item) => {
        acc[item.productId] = item;
        return acc
      }, {});
      commit('SET_CART', cart);
      commit('TOTAL_QUANTITY');
    },
    changeQuantity({commit}, params) {
      commit('CHANGE_QUANTITY', params)
    },
    deleteCartItem({commit}, productId) {
      commit('DELETE_CART_ITEM', productId)
    },

  }
}
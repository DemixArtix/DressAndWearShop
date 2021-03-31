import Vue from 'vue';
import api from '@/plugins/api'


export default {
  namespaced: true,
  state: {
    orders: null,
  },
  getters: {
    orders: ({orders}) => orders,
  },
  mutations: {
    SET_ORDERS(state, data) {
      state.orders = data;
    },
    REFRESH_ORDER(state, {index, params}) {

      const orderInState = state.orders[index];
      Object.entries(params).map(([key, value]) => {
        console.log(key, value);
        orderInState[key] = value;
      });

      state.orders.splice(index, 1, orderInState);
    }
  },
  actions: {
    async setOrders({commit}, data) {
      commit('SET_ORDERS', data);
      await data.forEach( (item, index) => {
        const { orderId, status: {value} } = item;
        if(value === 'WAITING') {
           api.post('/rechecking_order_status',
            {
              data: {
                orderId,
                index
              }
            },
            {
              headers: {
                'Authorization': localStorage.getItem('token') || null
              }
            })
            .then(res => {
              const { data } = res;
              console.log(data);
              commit('REFRESH_ORDER', {
                index,
                params: data
              })
            })
        }
      });

    },
  }
}
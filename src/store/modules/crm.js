import api from '@/plugins/api'

export default {
  state: {

  },
  getters: {
  },
  mutations: {
  },
  actions: {
    async addCategory({commit}, params) {
      const response = await api.post('/category',  params);
      console.log(response);
      commit('categories/ADD_CATEGORY', params, { root: true })
    },
    async addSubcategory({commit}, params) {
      const response = await api.post('/subcategory',  params);
      console.log(response);
      commit('categories/ADD_SUBCATEGORY', params, { root: true })
    },
    async addGoods({commit}, params) {
      const response = await api.post('/goods',  params);
      console.log(response);
      commit('categories/ADD_GOODS', params, { root: true })
    },
    async addSize({commit}, params) {
      const response = await api.post('/size',  params);
      console.log(response);
      commit('categories/ADD_SIZE', params, { root: true })
    },
    async changeCategory({commit}, params) {
      const response = await api.put('/category',  params);
      console.log(response);
      commit('categories/CHANGE_CATEGORY', params, { root: true })
    },
    async changeSubcategory({commit}, params) {
      const response = await api.put('/subcategory',  params);
      commit('categories/CHANGE_SUBCATEGORY', params, { root: true })
    },
    async changeDetail({commit}, params) {
      const response = await api.post('/detail',  params);
      console.log(response);
      commit('categories/CHANGE_DETAIL', params, { root: true })
    },
    async changeDetailInArray({commit}, params) {
      const response = await api.post('/detail_in_array',  params);
      console.log(response);
      commit('categories/CHANGE_DETAIL_IN_ARRAY', params, { root: true })
    },
    async deleteCategory({commit}, params) {
      console.log(params);
      const response = await api.delete('/category/' + params.index);
      console.log(response);
      commit('categories/DELETE_CATEGORY', params, { root: true })
    },
    async deleteSubcategory({commit}, params) {
      const response = await api.delete('/subcategory/' + params.categoryIndex + '/' + params.index);
      console.log(response);
      commit('categories/DELETE_SUBCATEGORY', params, { root: true })
    },
    async deleteGoodsItem({commit}, params) {
      const response = await api.post('/delete_goods_item', params);
      console.log(response);
      commit('categories/DELETE_GOODS_ITEM', params, { root: true })
    },
    async deleteDetailInArray({commit}, params) {
      const response = await api.post('/delete_detail_in_array', params);
      console.log(response);
      commit('categories/DELETE_DETAIL_IN_ARRAY', params, { root: true })
    },

  },
}

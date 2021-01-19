export default {
  namespaced: true,
  state: {
    panelOfSizes: false,
  },
  getters: {
    panelOfSizes:({panelOfSizes}) => panelOfSizes,
  },
  mutations: {
    TOGGLE_PANEL_OF_SIZES(state, bool) {
      state.panelOfSizes = bool;
    }
  },
  actions: {
    togglePanelOfSizes({commit}, bool) {
      commit('TOGGLE_PANEL_OF_SIZES', bool)
    }
  }
}

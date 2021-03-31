export default {
  namespaced: true,
  state: {
    panelOfSizes: false,
    panelOfAddresses: false,

  },
  getters: {
    panelOfSizes:({panelOfSizes}) => panelOfSizes,
    panelOfAddresses:({panelOfAddresses}) => panelOfAddresses,
  },
  mutations: {
    TOGGLE_PANEL_OF_SIZES(state, bool) {
      state.panelOfSizes = bool;
    },
    TOGGLE_PANEL_OF_ADDRESSES(state, bool) {
      state.panelOfAddresses = bool;
    }
  },
  actions: {
    togglePanelOfSizes({commit}, bool) {
      commit('TOGGLE_PANEL_OF_SIZES', bool)
    },
    togglePanelOfAddresses({commit}, bool) {
      commit('TOGGLE_PANEL_OF_ADDRESSES', bool)
    }
  }
}

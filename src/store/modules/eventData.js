export default {
  namespaced: true,
  state: {
    panelOfSizes: false,
    panelOfAddresses: false,
    activateFeedbackRange: false,
    mouseX: null,
  },
  getters: {
    panelOfSizes:({panelOfSizes}) => panelOfSizes,
    panelOfAddresses:({panelOfAddresses}) => panelOfAddresses,
    activateFeedbackRange: ({activateFeedbackRange}) => activateFeedbackRange,
    mouseX: ({mouseX}) => mouseX,
  },
  mutations: {
    TOGGLE_PANEL_OF_SIZES(state, bool) {
      state.panelOfSizes = bool;
    },
    TOGGLE_PANEL_OF_ADDRESSES(state, bool) {
      state.panelOfAddresses = bool;
    },
    TOGGLE_FEEDBACK_RANGE(state, bool) {
      state.activateFeedbackRange = bool;
    },
    SET_MOUSE_COORDINATE_X(state, x) {
      state.mouseX = x;
    }
  },
  actions: {
    togglePanelOfSizes({commit}, bool) {
      commit('TOGGLE_PANEL_OF_SIZES', bool)
    },
    togglePanelOfAddresses({commit}, bool) {
      commit('TOGGLE_PANEL_OF_ADDRESSES', bool)
    },
    toggleFeedbackRange({commit}, bool) {
      commit('TOGGLE_FEEDBACK_RANGE', bool)
    },
    setMouseCoordinateX({commit}, x) {
      commit('SET_MOUSE_COORDINATE_X', x)
    }
  }
}

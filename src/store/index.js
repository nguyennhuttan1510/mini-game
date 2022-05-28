import { createStore } from 'vuex'

export default createStore({
  state: {
    modeGame: {}  
  },
  getters: {
  },
  mutations: {
    selectMode (state, payload) {
      state.modeGame = payload
    }
  },
  actions: {
  },
  modules: {
  }
})

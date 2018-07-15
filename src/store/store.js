import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  state: {
    user: null,
    isUserLoggedIn: false
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      if (user) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    }
  },
  actions: {
    setUser ({commit}, user) {
      commit('setUser', user)
    }
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import { getLocalStorage, setLocalStorage } from '@/utils/util'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    city: getLocalStorage('city') || '广州'
  },
  mutations: {
    changeCity (state, city) {
      state.city = city
      setLocalStorage('city', city)
    }
  },
  actions: {
    changeCity ({ commit }, city) {
      commit('changeCity', city)
    }
  }
})

export default store
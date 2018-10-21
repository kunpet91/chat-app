import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    settingsWidth: 640,
    settingsHeight: 480,
    images: [],
    activeIndex: 0
  },
  mutations: {
      updateImages(state, images) {
        state.images = images;
      },
      updateActiveIndex(state, index) {
        state.activeIndex = index;
    }      
  }
})
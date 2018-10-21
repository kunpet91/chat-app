import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nickName: 'Anon',
    settingsWidth: 640,
    settingsHeight: 480,
    images: [],
    activeIndex: 0
  },
  mutations: {
    updateNickName(state, name) {
      state.userName = name;
    },    
    updateImages(state, images) {
      state.images = images;
    },
    updateActiveIndex(state, index) {
      state.activeIndex = index;
    },
    updateSettingsWidth(state, width) {
      state.settingsWidth = width;
    },
    updateSettingsHeight(state, height) {
      state.settingsHeight = height;
    }       
  }
})
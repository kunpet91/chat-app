import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nickName: 'Anon',
    photoWidth: 800,
    photoHeight: 600,
    carouselWidth: 100,
    carouselHeight: 100,
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
    updatePhotoWidth(state, width) {
      state.photoWidth = width;
    },
    updatePhotoHeight(state, height) {
      state.photoHeight = height;
    },
    updateCarouselWidth(state, width) {
      state.carouselWidth = width;
    },
    updateCarouselHeight(state, height) {
      state.carouselHeight = height;
    }      
  }
})
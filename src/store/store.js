import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nickName: 'Anon',
    photoWidth: 800,
    photoHeight: 600,
    carouselWidth: 100,
    carouselHeight: 100,
    images: [],
    activeIndex: 0,
    messages: [],
    socket : io('https://frontend-test-server.prmrgt.com/'),
    activeTab: 'Chat'
  },
  actions: {
    socketInit(context) {
      context.state.socket.on('message', (data) => {
        context.commit('storeNewMessage',
               Object.assign(data, {type: 'received'}));
      });  
    },
    sendNewMessage(context, message) {
      context.state.socket.emit('message', message);
      context.commit('storeNewMessage', message);
    }
  },
  mutations: {
    storeNewMessage(state, message) {
      state.messages = [...state.messages, message];
    },
    updateNickName(state, name) {
      state.nickName = name;
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
    },
    setActiveTab(store, tab) {
      store.activeTab = tab;
    }
  }
})
import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'
import Router from 'vue-router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nickName: 'Anon',
    photoWidth: 640,
    photoHeight: 480,
    carouselWidth: 100,
    carouselHeight: 100,
    images: [],
    activeIndex: 0,
    messages: [],
    socket : io('https://frontend-test-server.prmrgt.com/'),
    hasNewMessage: false,
    activeTab: ''
  },
  actions: {
    socketInit(context) {
      context.state.socket.on('message', (data) => {

        if (context.state.activeTab !== 'chat') {
          context.commit('setHasNewMessage', true);
        }

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
    setActiveTab(state, tab) {
      state.activeTab = tab;
    },
    storeNewMessage(state, message) {
      state.messages = [...state.messages, message];
    },
    setHasNewMessage(state, value) {
      state.hasNewMessage = value;
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
    }
  }
})
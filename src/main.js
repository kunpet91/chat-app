import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import Vuex from 'vuex'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

Vue.use(Vuex)
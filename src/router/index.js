import Vue from 'vue'
import Router from 'vue-router'

import ChatComponent from './../components/ChatComponent'
import PhotosComponent from './../components/PhotosComponent'
import SettingsComponent from './../components/SettingsComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'chat',
      component: ChatComponent
    },
    {
      path: '/photos',
      name: 'photos',
      component: PhotosComponent
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsComponent
    }
  ]
})
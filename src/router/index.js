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
      name: 'ChatComponent',
      component: ChatComponent
    },
    {
      path: '/photos',
      name: 'PhotosComponent',
      component: PhotosComponent
    },
    {
      path: '/settings',
      name: 'SettingsComponent',
      component: SettingsComponent
    }
  ]
})

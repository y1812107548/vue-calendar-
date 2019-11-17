import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/lock',
      name: 'lock',
      component: () => import('./views/Lock.vue')
    },
    {
      path: '/drag',
      name: 'drag',
      component: () => import('./views/Drag.vue')
    },
    {
      path: '/dialogdrag',
      name: 'dialogdrag',
      component: () => import('./views/DialogDrag.vue')
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import('./views/Upload.vue')
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('./views/Calendar.vue')
    },
    {
      path: '/previewpic',
      name: 'previewpic',
      component: () => import('./views/PreviewPic.vue')
    },

  ]
})

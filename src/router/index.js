import Vue from 'vue'
import VueRouter from 'vue-router'

import ViewLogin from '@/views/ViewLogin'
import ViewRegister from '@/views/ViewRegister'
import LayoutAuth from '@/layouts/LayoutAuth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: LayoutAuth,
    children: [
      {
        path: '',
        name: 'login',
        component: ViewLogin
      }
    ],
  },
  {
    path: '/register',
    component: LayoutAuth,
    children: [
      {
        path: '',
        name: 'register',
        component: ViewRegister
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

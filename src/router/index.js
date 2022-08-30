import Vue from 'vue'
import VueRouter from 'vue-router'

import ViewLogin from '@/views/ViewLogin'
import ViewRegister from '@/views/ViewRegister'
import ForgotPasswordView from '@/views/ForgotPasswordView'
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
    path: '/registrar',
    component: LayoutAuth,
    children: [
      {
        path: '',
        name: 'register',
        component: ViewRegister
      }
    ]
  },
  {
    path: '/esqueci-senha',
    component: LayoutAuth,
    children: [
      {
        path: '',
        name: 'forgotPassword',
        component: ForgotPasswordView
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'

import ViewLogin from '@/views/ViewLogin'
import HomeView from '@/views/HomeView'
import ProfileView from '@/views/ProfileView'
import ViewRegister from '@/views/ViewRegister'
import ForgotPasswordView from '@/views/ForgotPasswordView'
import ResetPasswordView from '@/views/ResetPasswordView'
import LayoutAuth from '@/layouts/LayoutAuth'
import LayoutDefault from '@/layouts/LayoutDefault'

import Guard from '@/service/middleware';

Vue.use(VueRouter)

const routes = [
  {
    path: '/', component: LayoutDefault,
    // executa esta função ao acessar esta rota 
    beforeEnter: Guard.redirectIfUnauthenticated,
    children: [
      { path: '', name: 'index', component: HomeView },
      { path: 'perfil', name: 'profile', component: ProfileView }
    ],
  },
  {
    path: '/login', component: LayoutAuth,
    // executa esta função ao acessar esta rota 
    beforeEnter: Guard.redirectIfAuthenticated,
    children: [
      { path: '', name: 'login', component: ViewLogin }
    ],
  },
  {
    path: '/registrar', component: LayoutAuth,
    // executa esta função ao acessar esta rota 
    beforeEnter: Guard.redirectIfAuthenticated,
    children: [
      { path: '', name: 'register', component: ViewRegister }
    ]
  },
  {
    path: '/esqueci-senha', component: LayoutAuth,
    // executa esta função ao acessar esta rota 
    beforeEnter: Guard.redirectIfAuthenticated,
    children: [
      { path: '', name: 'forgotPassword', component: ForgotPasswordView }
    ]
  },
  {
    path: '/recuperar-senha', component: LayoutAuth,
    children: [
      { path: '', name: 'resetPassword', component: ResetPasswordView }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

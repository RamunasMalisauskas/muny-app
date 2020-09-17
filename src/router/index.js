import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views//login/Register.vue')
  },
  {
    path: '/expences',
    name: 'expences',
    component: () => import(/* webpackChunkName: "expences" */ '../views//app/Expences.vue')
  },
  {
    path: '/income',
    name: 'income',
    component: () => import(/* webpackChunkName: "income" */ '../views//app/Income.vue')
  },
  {
    path: '/log',
    name: 'log',
    component: () => import(/* webpackChunkName: "log" */ '../views//app/Log.vue')
  },
  {
    path: '/summary',
    name: 'summary',
    component: () => import(/* webpackChunkName: "summary" */ '../views//app/Summary.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

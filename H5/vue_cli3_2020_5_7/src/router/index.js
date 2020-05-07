import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/index.vue'

Vue.use(VueRouter)

const routes = [
  // 首页模块 - 首页
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      isWhiteList: true, //是否白名单 默认false
    },
  },
  // demo
  {
    path: '/demo',
    name: 'Demo',
    meta: {
      isWhiteList: true, //是否白名单 默认false
    },
    component: () => import( /* webpackChunkName: "demo" */ '../views/demo.vue')
  },

  // 登录模块 - 登录
  {
    path: '/login',
    name: 'Login',
    meta: {
      isWhiteList: true, //是否白名单 默认false
    },
    component: () => import( /* webpackChunkName: "loginModule" */ '../views/Login/login.vue')
  },
  // 登录模块 - 注册
  {
    path: '/register',
    name: 'Register',
    meta: {
      isWhiteList: true, //是否白名单 默认false
    },
    component: () => import( /* webpackChunkName: "loginModule" */ '../views/Login/register.vue')
  },
  // Error模块
  {
    path: '/404',
    name: '404',
    meta: {
      isWhiteList: true, //是否白名单 默认false
    },
    component: () => import( /* webpackChunkName: "ErrorModule" */ '../views/Error/404.vue')
  },
  {
    path: '*',
    redirect: '/404',
  },

]

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
})

export default router
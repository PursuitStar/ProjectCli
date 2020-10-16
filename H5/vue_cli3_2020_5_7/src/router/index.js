import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home/index.vue'

Vue.use(VueRouter)


let routerList = [];

// 引入模块
let importAllModule = (requireContext) => {
  let moduleKeys = requireContext.keys();
  moduleKeys.forEach(ele => {
    let pathName = ele.substring(2);
    let moduleItem = require(`./module/${pathName}`).default;

    // 自定义处理
    routerList.push(moduleItem);
  });
};

try {
  importAllModule(require.context('./module', true, /\.js$/));
} catch (error) {
  console.log(error);
}

routerList = routerList.flat();
console.log(routerList)



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
    component: () => import( /* webpackChunkName: "demo" */ '@/views/demo.vue')
  },

  ...routerList,

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
/**
 * Desc: 路由配置
 */

import {
    createRouter,
    createWebHistory
} from "vue-router";

const routes = [
    // 首页模块 - 首页
    {
        path: '/',
        name: 'Home',
        meta: {
            isWhiteList: true, //是否白名单 默认false
        },
        component: () => import("../views/Home/index.vue")
    },
    { // demo
        path: '/demo',
        name: 'Demo',
        meta: {
            isWhiteList: true, //是否白名单 默认false
        },
        component: () => import("../views/Demo/demo.vue")
    },
    { // 登录模块 - 登录
        path: "/login",
        name: "Login",
        meta: {
            isWhiteList: true, //是否白名单 默认false
        },
        component: () => import("../views/Login/login.vue")
    },
    { // 登录模块 - 注册
        path: '/register',
        name: 'Register',
        meta: {
            isWhiteList: true, //是否白名单 默认false
        },
        component: () => import("../views/Login/register.vue")
    },
    { // Error模块 - 404
        path: '/404',
        name: '404',
        meta: {
            isWhiteList: true, //是否白名单 默认false
        },
        component: () => import("../views/Error/404.vue")
    },
    {
        path: '/:others',
        redirect: '/404',
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
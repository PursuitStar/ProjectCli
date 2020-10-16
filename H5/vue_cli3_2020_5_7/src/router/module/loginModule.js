/**
 * Desc: 登录模块
 */
const routeModule = [
    // 登录
    {
        path: '/login',
        name: 'Login',
        meta: {
            isWhiteList: true, //是否白名单 默认false
        },
        component: () => import( /* webpackChunkName: "loginModule" */ '@/views/Login/login.vue')
    },
    // 注册
    {
        path: '/register',
        name: 'Register',
        meta: {
            isWhiteList: true, //是否白名单 默认false
        },
        component: () => import( /* webpackChunkName: "loginModule" */ '@/views/Login/register.vue')
    },
]

export default routeModule
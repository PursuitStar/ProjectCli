/**
 * Desc: 错误模块
 */
const routeModule = [{
    path: '/404',
    name: '404',
    meta: {
        isWhiteList: true, //是否白名单 默认false
    },
    component: () => import( /* webpackChunkName: "errorModule" */ '@/views/Error/404.vue')
}, ]

export default routeModule
/**
 * Desc: 路由拦截
 */
import router from './index';
import {
    getToken
} from '@/utils/auth';

// 路由拦截
router.beforeEach((to, from, next) => {
    // 验权
    let token = getToken();
    if (!token) {
        if (to.meta && to.meta.isWhiteList) {
            next()
        } else {
            next('/login')
        }
    } else {
        next()
    }
})

router.afterEach((to, from) => {
    console.log(to, from)
})
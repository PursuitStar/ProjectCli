/**
 * Desc: vue全局依赖
 */

import {
    watch,
    reactive,
    ref,
    readonly
} from 'vue';

import Api from '../api';


/**
 * vue全局依赖初始化
 * @param {Object} app vue实例化对象
 */

const vueProvideInit = (app) => {

    /* Api 请求封装 */
    const $Api = reactive(Api); // 初始化
    app.provide('$Api', readonly($Api)); // 注册


    /* userInfo 用户信息 */
    const getUserInfo = () => { // 初始化
        let userInfo = localStorage.getItem("userInfo");
        return userInfo ? JSON.parse(userInfo) : {};
    };
    const $user_info = reactive(getUserInfo());
    watch($user_info, val => { // 监听
        console.log(val)
        let userInfo = val || {};
        localStorage.setItem("userInfo", JSON.stringify(userInfo))
    });
    app.provide('$user_info', $user_info); // 注册


}


export default vueProvideInit
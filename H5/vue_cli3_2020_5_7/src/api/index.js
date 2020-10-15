/**
 * Desc: 接口配置
 */

import http from '@/request/http';
import {
    urlHandle
} from '@/utils/tool';
import {
    STORE_GATEWAY
} from '../config/gateway';

const Api = {
    CommonApi: {
        // 登录接口
        login: (params) => http.postForm({
            url: urlHandle(STORE_GATEWAY, '/login'),
            params,
        }),

        // 获取用户信息
        getUserInfo: (params) => http.get({
            url: '/user/get_user_info',
            params,
        }),

        // 上传
        upload: (params) => http.postUpload({
            url: '/upload/files',
            params,
        }),

        // 下载
        download: (params) => http.get({
            url: '/commision/exportAgentCommMonth',
            params,
        }),

    },
    HomeApi: {
        // 获取背景
        getBg: (params) => http.postForm({
            url: '/regPageBanner/get',
            params,
        }),
    }
}

export default Api
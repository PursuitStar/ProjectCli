/**
 * Desc: 接口配置
 */

import http from '../request/http';
import {
    urlHandle
} from '../utils/tool';
import {
    STORE_GATEWAY
} from '../config/gateway';

const Api = {
    CommonApi: {
        // 登录接口
        login: (config) => http.postForm({
            ...config,
            url: urlHandle(STORE_GATEWAY, config.url)
        })
    }
}

export default Api
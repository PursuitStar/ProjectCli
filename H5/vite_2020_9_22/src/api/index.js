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
        login: (params) => http.postForm({
            url: urlHandle(STORE_GATEWAY, '/login'),
            params,
        })
    }
}

export default Api
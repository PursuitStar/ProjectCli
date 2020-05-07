"use strict";

import axios from "axios";

import qs from 'qs';
import {
  baseUrlArr
} from '@/config/index';
import {
  getToken
} from '@/utils/auth';
import {
  delRepeatHttpRequest
} from '@/utils/tool';



// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

const CancelToken = axios.CancelToken;
const requestMap = new Map(); //记录请求对象

// 请求拦截
_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    let token = getToken();
    config.headers['token'] = token;


    // 防重复提交: 原理：在请求还未返回内容时取消再次发起的请求
    delRepeatHttpRequest(requestMap, config, qs, CancelToken);

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 响应拦截
_axios.interceptors.response.use(
  function (response) {
    // 请求成功后重置requestMap
    requestMap.set(response.config._keyString, false);

    // Do something with response data
    return response.data;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);


// 自定义封装axios
const Api = {
  // get
  get: ({
    url = '',
    params = {},
    baseUrIndex = 0,
    axiosConfig = {}
  }) => {
    let config = {
      method: 'get',
      url,
      params,
      ...axiosConfig
    };
    config.baseURL = baseUrlArr[baseUrIndex];
    return _axios(config)

  },

  // post - application/x-www-form-urlencoded
  postForm: ({
    url = '',
    data = {},
    baseUrIndex = 0,
    axiosConfig = {}
  }) => {
    let config = {
      method: 'post',
      url,
      data: qs.stringify(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      ...axiosConfig
    };
    config.baseURL = baseUrlArr[baseUrIndex];
    return _axios(config)
  },

  // post - application/json
  postJson: ({
    url = '',
    data = {},
    baseUrIndex = 0,
    axiosConfig = {}
  }) => {
    let config = {
      method: 'post',
      url,
      data,
      headers: {
        'Content-Type': 'application/json',
      },
      ...axiosConfig
    };
    config.baseURL = baseUrlArr[baseUrIndex];
    return _axios(config)
  },

  // post - multipart/form-data
  postUpload: ({
    url = '',
    data = new FormData(),
    baseUrIndex = 0,
    axiosConfig = {}
  }) => {
    // data = new FormData();
    // data.append("file", file) 

    let config = {
      method: 'post',
      url,
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...axiosConfig
    };
    config.baseURL = baseUrlArr[baseUrIndex];
    return _axios(config)
  },

  // post - download
  postDownload: ({
    url = '',
    data = {},
    baseUrIndex = 0,
    axiosConfig = {}
  }) => {
    let config = {
      method: 'post',
      url,
      data,
      responseType: 'blob',
      ...axiosConfig
    };
    config.baseURL = baseUrlArr[baseUrIndex];
    return _axios(config)
  },

}

export default Api;
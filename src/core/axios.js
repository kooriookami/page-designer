import axios from 'axios';
import qs from 'qs';

// 请求拦截器
axios.interceptors.request.use(config => {
    // config.baseURL = Vue.prototype.baseURL;
    if (config.method === 'get') {
        config.paramsSerializer = params => qs.stringify(params, {arrayFormat: 'repeat'});
    }
    return config;
}, error => {
    return Promise.reject(error);
});
// 响应拦截器
axios.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error);
});

export default axios;

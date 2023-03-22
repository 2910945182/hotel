// 请求相关
import axios from 'axios'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'

// 导入接口根地址
import { BASE_URL } from '../config/conster.js'

var instance = axios.create({
    // 请求地址前缀
    baseURL: BASE_URL,
    // 请求超时时间
    timeout: 30000,
    // 自定义请求头
    headers: { 'token': sessionStorage.getItem('token') }
});

// 添加请求拦截器
instance.interceptors.request.use(
    function (config) {
        NProgress.start();
        // 在发送请求之前做些什么
        return config;
    }, function (error) {
        NProgress.done();
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    NProgress.done();
    return response;
}, function (error) {
    NProgress.done();
    return Promise.reject(error);
});

// 定义一个get请求方法
export let get = async (url, params) => {
    let { data } = await instance.get(url, { params })
    return data
}

// 定义一个post请求方法
export let post = async (url, params) => {
    let { data } = await instance.post(url,params)
    return data
}

// 设置token的方法，将浏览器缓存中的token信息，添加到请求头
export let setToken = () => {
    // 将token信息保存到请求头中
    instance.defaults.headers.common['token'] = sessionStorage.getItem('token');
}
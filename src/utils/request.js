import Vue from 'vue'
import axios from 'axios'
import { VueAxios } from './axios'

// 创建 axios 实例
console.log(222)
const service = axios.create({
    //baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
    timeout: 18000,// 请求超时时间
    withCredentials: true,
})

const err = (error) => {
    if (error.response) {
        
    } else {
        
    }
    return Promise.reject(error)
}
// request interceptor
service.interceptors.request.use(config => {
    
    return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
    return response.data
}, err)

const installer = {
    vm: {},
    install(Vue) {
        Vue.use(VueAxios, service)
    }
}

export {
    installer as VueAxios,
    service as axios
}

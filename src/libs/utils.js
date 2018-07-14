import axios from 'axios';

// 基本配置
const Utils = {
    imgPath:'http://127.0.0.1:8011/img/',
    apiPath:'http://127.0.0.1:8010/'
}

// Ajax通用配置
Utils.ajax = axios.create({
    baseURL:Utils.apiPath
})

// axios的全局拦截器

Utils.ajax.interceptors.response.use((res)=>{
    return res.data
})

export default Utils
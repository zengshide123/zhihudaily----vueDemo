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

// 获取今天的时间戳
Utils.getTodayTime = function () {
    const date = new Date();
          date.setHours(0,0,0,0);
          return date.getTime();
}
Utils.prevDay = function(timestamp=(new Date()).getTime()){
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    const day = date.getDate()<10?'0'+date.getDate():date.getDate();
    return year+''+month+''+day
}

export default Utils
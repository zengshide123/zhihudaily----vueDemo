
var Time = {
    // 获取当前的时间戳
    getUnix(){
        return Date.now();
    },
    // 获取今天0点0分0秒的时间戳、
    getTodayUnix(){
        var date = new Date();
        date.setHours(0,0,0,0);
        return date.getTime();
    },
    // 获取今年1月1日0点0分0秒的时间戳
    getYearUnix(){
        var date = new Date();
        date.setMonth(0);
        date.setDate(1);
        date.setHours(0,0,0,0);
        return date.getTime();
    },
    // 获取标准的年月日
    getLastDate(time){
        var date = new Date(time);
        var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return date.getFullYear()+'-'+month+'-'+day;     
    },
    // 转换时间
    getFormatTime(timestamp){
        var now = this.getUnix();
        var today= this.getTodayUnix();
        var year = this.getYearUnix();
        var timer = (now-timestamp)/1000;
        var tip = '';
        if(timer<0){
            tip='刚刚'
        }else if(timer<60){
            tip='刚刚'
        }else if(timer<3600){
            tip = Math.floor(timer/60)+'分前';
        }else if(timer>=3600&&(timestamp-today)>=0){
            tip = Math.floor(timer/3600)+'小时前';
        }else if(timer/86400<31){
            tip = Math.ceil(timer/86400)+'天前';
        }else{
            tip = this.getLastDate(timestamp)
        }
        return tip;
    }   
};
export default {
    bind:function (el,binding) {
        el.innerHTML = Time.getFormatTime(binding.value*1000);
        el.__timeout__ = setInterval(function(){
            el.innerHTML = Time.getFormatTime(binding.value*1000);
        },60000)      
    },
    unbind:function (el) {
        clearImmediate(el.__timeout__);
        delete el.__timeout__;
    }
}

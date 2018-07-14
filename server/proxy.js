
// 引入http和request模块
const http = require('http');
const request = require('request');

// 配置基础参数
const hostname = '127.0.0.1';
const port  = 8010;
const imgPort = 8011;

// 创建基础数据代理服务器

const apiServer = http.createServer((req,res)=>{
    
        const url = 'http://news-at.zhihu.com/api/4'+req.url;
        const options = {
            url
        }
        // 请求回调函数
        function callback(err,res1,body) {
            if(!err&& res1.statusCode===200){
                // 设置响应头
                res.setHeader('content-type','text/plain;charset=UTF-8');
                // 设置跨域
                res.setHeader('Access-Control-Allow-Origin','*');
                // 响应请求
                res.end(body);
            }
        }
        request.get(options,callback);
})
apiServer.listen(port,hostname,()=>{
    console.log(`接口代理运行在http://${hostname}:${port}/`)
})

// 图片数据代理服务器

const imgServer = http.createServer((req,res)=>{

        const url = req.url.split('/img/')[1];
        const options = {
            url,
            enconding:null
        };
        function callback(err,res1,body) {
            if(!err && res1.statusCode===200){
                const contentType = res1.headers['content-type'];
                res.setHeader('content-type',contentType);
                res.setHeader('Access-Control-Allow-Origin','*');
                res.end(body);
            }
        }
        request.get(options,callback);
})

imgServer.listen(imgPort,hostname,()=>{
    console.log(`图片代理运行在http://${hostname}:${imgPort}/`)
})
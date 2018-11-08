const Koa = require('koa');

const cors = require('koa-cors');

const logger = require('koa-logger');

const koaBody = require('koa-body');

const bodyParser = require('koa-bodyparser');

const router = require('koa-router')();

// const session = require('koa-session');

const rest = require('./rest');
const apiRouter = require('./router');

const app = new Koa();

// const isProduction = process.env.NODE_ENV === 'production';

// 默认首页
const index = router.get('/', ctx => {
    ctx.response.body = 'hello world';
}).routes();

app.use(index);

// 引入依赖 解决请求跨域问题
app.use(cors());

// 打印日志
app.use(logger());

// 文件上传
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024	// 设置上传文件大小最大限制，默认2M
    }
}));

// session maxAge设置会话保存时间{maxAge: 300000},maxAge: 'session'表示浏览器关闭会话结束
// app.keys = ['some secret hurr']; 
// app.use(session({maxAge: 'session'},app));

// 解析POST请求
app.use(bodyParser());

// 负责给ctx加上rest()来使用api接口REST
app.use(rest.restify()); 

// api
app.use(apiRouter.routes());

// 端口监听
app.listen(3000);
console.log("SERVER START... PORT 3000...");
console.log("------------------------------------>  _/\\__/\\__/\\__/\\__/\\__/\\_  <-------------------------------------- ");
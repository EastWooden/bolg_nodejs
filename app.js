const Koa = require('Koa');
const app = new Koa();
const path = require('path')
const bodyParser = require('koa-bodyparser'); //一个middleware来解析原始request请求，然后，把解析后的参数，绑定到ctx.request.body中。
const controller = require('./controller'); //控制器
const static = require('koa-static') //使用静态资源
const isProduction = process.env.NODE_ENV === 'production'; //判断是否是生产环境
const templating = require('./templating');
const model = require('./model');
const cors = require('koa2-cors');
//允许跨域
app.use(cors({
  origin: function (ctx) {
    return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

//计算请求时间
app.use(async (ctx, next) => {
  console.log(`${ctx.request.method} ${ctx.request.url}`);
  const start = new Date().getTime();
  await next();
  const ms = new Date().getTime() - start;
  ctx.response.set('X-Response-Time', `${ms}ms`);
})

app.use(static(__dirname, 'static')); //使用静态资源

app.use(bodyParser({
  enableTypes: ['json', 'form', 'text']
})); //post的params需要解析才能获取 到这时候就需要用的这个middleware

app.use(templating(path.resolve(__dirname, 'views'), {
  noCache: !isProduction,
  watch: !isProduction
}))

app.use(controller());

app.listen(8080)
console.log('Server is runnint at http://127.0.0.1:8080')
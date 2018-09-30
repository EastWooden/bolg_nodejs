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

// var now = Date.now();
// let Pet = model.Pet;
// (async () => {
//   let pets = await Pet.findAll({
//     where: {
//       name: 'Gaffey'
//     }
//   });
//   console.log(`find ${pets.length} pets:`)
//   for (let p of pets) {
//     console.log(JSON.stringify(p));
//   }
// })();

//如果要更新数据，可以对查询到的实例调用save()方法：
// (async () => {
//   let ps = await Pet.findAll({
//     where: {
//       name: 'Gaffey'
//     }
//   });
//   for (let p of ps) {
//     if (p.name == 'Gaffey') {
//       p.gender = true;
//       p.updatedAt = Date.now();
//       p.version++;
//       await p.save();
//     }
//   }
// })();

// 如果要删除数据， 可以对查询到的实例调用destroy() 方法：
// (async ()=> {
//    let ps = await Pet.findAll({
//      where: {
//        name: 'Gaffey'
//      }
//    })
//    for(let p of ps) {
//      await p.destroy();
//    }
// })();
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

app.listen(9090)
console.log('Server is runnint at http://127.0.0.1:9090')
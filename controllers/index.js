// 当请求连接为 '/'的时候
const model = require('../model');
let Pet = model.Pet;
var fn_index = async (ctx,next) => {
  ctx.render('index.html',{})
}
var now = Date.now();
var fn_addpets = async (ctx,next) => {
  let name = ctx.request.body.petname;
  if(name) {
     ctx.response.body = await (async () => {
       await Pet.create({
         id: now,
         name: name,
         birth: 0,
         gender: true
       })
       let data = {};
       data.entity = null;
       data.result = {
         resultCode: 0,
         resultMessage: '操作成功'
       }
       return data;
     })();
  } else {
    let data = {};
    data.entity = null;
    data.result = {
      resultCode: 0,
      resultMessage: '操作失败'
    }
    ctx.render('index.html', {data: data});
  }
}
var fn_findPets = async(ctx,next) => {
  ctx.response.body = await (async () => {
    return await Pet.findAll();
    console.log(ps);
  })();

}
var fn_signin = async (ctx,next)=> {
    let name = ctx.request.body.name || '';
    let password = ctx.request.body.password || '';
    console.log(`signin with name: ${name} and  password: ${password}`);
    if (name == 'Koa' && password == '123456') {
      ctx.render('singin_ok.html',{ name: 'jsdong'});
    } else {
      ctx.response.body = `<h1>login failed</h1>
      <p><a href="/">Try again</a></p>
    `
    }
}

module.exports = {
  'GET /': fn_index,
  'POST /signin': fn_signin,
  'POST /addpets': fn_addpets,
  'GET /findpets': fn_findPets
}
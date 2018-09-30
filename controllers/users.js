var model = require('../model');
var User = model.User
var now = Date.now();
var fn_register = async (ctx, next) => {
  let result = {
    entity: null,
    result: {
      resultCode: 0,
      resultMessage: '注册成功'
    }
  }
  let res = ctx.request.query;
  (async () => {
    await User.create({
      username: res.username || '',
      password: res.password || '',
      registerTime: now,
      telphone: res.telphone || '',
      sex: res.sex || '',
      email: res.email,
      userDesc: res.desc,
      createdAt: now,
    });
    ishaveuser = false;
  })();
  ctx.response.body = result
}
var fn_login = async (ctx, next) => {
  let result = {
    entity: null,
    result: {
      resultCode: 0,
      resultMessage: '登录成功'
    }
  }
  let res = ctx.request.query;
  let users = await (async () => {
    return await User.findAll({
      where: {
        username: res.username
      }
    });
  })();
  if (users.length > 0) {
    for (let i in users) {
      if (users[i].password !== res.password) {
        result.result.resultCode = 1;
        result.result.resultMessage = "用户名或者密码错误"
      } else {
        result.result.resultCode = 0;
        result.result.resultMessage = "登录成功";
        users[i].loginTime = Date.now();
        await users[i].save()
      }
    }
  } else {
    result.result.resultCode = 1;
    result.result.resultMessage = "用户不存在"
  }
  ctx.response.body = result;
}
var checkUsername = async (ctx, next) => {
  let result = {
    entity: null,
    result: {
      resultCode: 0,
      resultMessage: '可以使用该用户'
    }
  }
  let res = ctx.request.query;
  console.log(res);
  if (res.username.length >= 20) {
    result.result.resultMessage = '用户名太长';
    result.result.resultCode = 1;
    ctx.response.body = result;
    return false;
  }
  let users = await (async () => {
    return await User.findAll();
  })();
  for (let i in users) {
    if (users[i].username == res.username) {
      result.result.resultMessage = '该用户已经注册';
      result.result.resultCode = 1;
      break;
    }
  }
  ctx.response.body = result;
}
module.exports = {
  'POST /admin/register': fn_register,
  'POST /admin/login': fn_login,
  'POST /admin/checkUsername': checkUsername
}
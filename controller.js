
// 导入fs模块 对文件进行操作
const fs = require('fs');

function addMapping(router, mapping) {
  for (let url in mapping) {
    if (url.startsWith('GET')) {
      //如果是get的方式
      let path = url.substring(4);
      router.get(path, mapping[url]);
      console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith('POST')) {
      let path = url.substring(5);
      router.post(path, mapping[url]);
      console.log(`register URL mapping: POST ${path}`);
    } else {
      //
      console.log(`invaild URL: ${url}`)
    }
  }
}

function  addControllers(router,dir) {
  //这里可以用sync 是因为启动时只运行一次。不存在性能问题  readdirSync列出文件夹
  var files = fs.readdirSync(__dirname + `/${dir}`);

  //过滤出.js文件:
  var js_files = files.filter(f => {
    return f.endsWith('.js')
  })

  //处理每个js 文件
  for (let f of js_files) {
    console.log(`process controller: ${f}...`);
    // 导入js文件
    let mapping = require(__dirname + '/controllers/' + f);
    console.log(mapping);
    addMapping(router, mapping)
  }
}

module.exports = function (dir) {
  let
      controllers_dir = dir || 'controllers';
      router = require('koa-router')();
  addControllers(router, controllers_dir);
  return router.routes();
}
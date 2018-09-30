const nunjucks = require('nunjucks');
//创建nunjucks模板引擎对象
function createEnv(path, opts) {
  var autoescape = opts.autoescape === undefined ? true : opts.autoescape;
  var noCache = opts.noCache || false;
  var watch = opts.watch || false;
  var throwOnUndefined = opts.throwOnUndefined || false;
  var env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(path, {
      noCache: noCache,
      watch: watch,
    }), {
      autoescape: autoescape,
      throwOnUndefined: throwOnUndefined,
    });
  if (opts.filters) {
    for (var f in opts.filters) {
      env.addFilter(f, opts.filters[f]);
    }
  }
  return env;
}

function templating(path,opts) {
  var env = createEnv(path,opts);
  return async (ctx,next) => {
    ctx.render = function (view, model) {
      // 把render后的内容赋值给response.body:
      ctx.response.body = env.render(view ,Object.assign({},ctx.state || {},model || {}))

      //设置content-Type
      ctx.response.type = 'text/html'
    };
    await next();
  }
}

module.exports = templating;
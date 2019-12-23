var model = require('../model');
var Article = model.Article;
var result = {
  entity: {},
  result: {
    resultCode: 0,
    resultMessage: '执行成功'
  }
}

//添加文章接口
var fn_addArticle  = async (ctx,next) => {
  let query = ctx.request.query;
   await (async()=> {
    await Article.create({
      articleName: query.articleName,
      articleContent: query.articleContent,
      BlogClassification: query.BlogClassification,
      articleType: query.articleType,
      articleTags: query.articleTags
    });
  })();
  result.entity = null;
  ctx.response.body = result
}
//查询文章列表接口
var fn_getArticleList = async (ctx,next) => {
  result.entity = {};
  let pageSize = 10;
  let query  = ctx.request.query;
  let rows = [];
  if(query.pageSize) {
    pageSize = query.pageSize;
  }
  let pageNum = query.pageNum;
  let articles = await Article.findAll();
  //按照时间先后顺序排序
  articles.sort(function (a, b) {
     return b.createdAt - a.createdAt
   });
  let totalCount = articles.length;
  result.entity.totalCount = totalCount;
  if(pageNum > 1) {
    rows = articles.slice((pageNum - 1) * pageSize, pageSize * pageNum)
    // await Article.findAll({
    //   offset: ,
    //   limit:
    // })
  } else {
    rows = articles.slice(0,pageSize);
  }
  result.entity.rows = rows;
  ctx.response.body = result;
}



//获取文章内容
var fn_getArticleDetail = async (ctx, next) => {
  console.log(ctx.request.query);
  result.entity = {};
  ctx.response.body = result
}


//删除文章
var fn_deleteArticle = async (ctx,next) => {
  result.entity = {};
  let query = ctx.request.query;
  const articles = await Article.findAll({
    where: {
      id: query.id
    }
  })
  await articles[0].destroy();
  ctx.response.body = result;
}

//更新文章信息
var fn_updateArticleInfo = async (ctx,next) => {
  result.entity = {};
  const query = ctx.request.query;
  let articles = await Article.findAll({
    where: {
      id: query.id
    }
  })
  console.log(query.articleName);
  articles[0].articleName = query.articleName;
  articles[0].articleTags = query.articleTags;
  articles[0].articleContent = query.articleContent;
  articles[0].BlogClassification = query.BlogClassification;
  articles[0].articleType = query.articleType;
  articles[0].updatedAt = Date.now();
  console.log(articles[0]);
  await articles[0].save();
  ctx.response.body = result;

}

module.exports = {
  'POST /admin/addArticle': fn_addArticle,
  'POST /admin/getArticleList': fn_getArticleList,
  'POST /admin/getArticleDetail': fn_getArticleDetail,
  'POST /admin/deleteArticle': fn_deleteArticle,
  'POST /admin/updateArticle': fn_updateArticleInfo
}
var fs = require('fs');
var AipOcrClient = require("baidu-aip-sdk").ocr;
const Client = require('aliyun-api-gateway').Client;
const sclient = new Client('25798464', '024c72494e2105917cb0589a24183af1');
var WXBizDataCrypt = require('./WXBizDataCrypt')
var appId = 'wx0990efa71fd864b8'
var sessionKey = 'S3E3q1N1/00Ilv5mMtnToA=='


var result = {
  entity:{},
  result: {
    resultCode:0,
    resultMessage:'执行成功'
  }
}

// 设置APPID/AK/SK

var APP_ID = "15039808";

var API_KEY = "VgNIgMFcYTCn4rCtXVzX5Ckd";

var SECRET_KEY = "T4AI4TRmmrR4EbyZNaOPMLk3UC7oGUR1";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);
var  getIdcardInfo =  async (ctx,next) =>  {
  var image = fs.readFileSync(__dirname + '/44.jpg').toString("base64");
  var idCardSide = "front";
  // 调用身份证识别
  await client.idcard(image, idCardSide).then(async (res)=> {
   await res;
   result.entity = res;
 }).catch(function (err) {
   // 如果发生网络错误
   console.log(err);
   ctx.response.body = result;
 });
  ctx.response.body = result;
}

var getSuiInfo = async(ctx,next) => {
  const image = fs.readFileSync(__dirname + '/64190667585465425.jpg').toString('base64');
  await client.receipt(image).then(async (res) => {
    await res;
    result.entity = res;
  }).catch(err=> {
    console.log(err)
  })
  ctx.response.body = result;
}

async function aliyunpost(ctx) {
  var url = 'https://gcfp.market.alicloudapi.com/invoice/discern';
  console.log(ctx.request.body.url);
  var result = await sclient.post(url, {

    data: {
      'InvoiceBase64Data': ctx.request.body.url
    },
    headers: {
      accept: 'application/json'
    }
  });
  ctx.response.body = result;
}

async function getPhoneNumber(ctx) {
  // let res = ctx.request.query;
  // let encryptedData = res.encryptedData;
  // let iv = res.iv;
  // let sessionKey = res.sessionKey;

  var encryptedData =
    'LN7RS0UMT8l6aFpZblVeBGIrrd2wEcZHNRG0DqICwgZbR2weg/mAWRyBP5SgdUuPDKXu6G7pKzIrZ5Rz7NT4S257hDcThkpugalvi/H2l563roMXQGFcyfaSxi/D/txpUK1P9xFQF7BF9NfqXt1ICp2iT5qWBWllfg/PSsUIvoKgMrcOMErZeKgVpSq1QauL7Ykspl/d7NeBxw6sgkD1dg=='

  var iv = 'it/3yf2ROgOwdAv9siK+hw=='

  var pc = new WXBizDataCrypt(appId, sessionKey)

  var data = pc.decryptData(encryptedData, iv)
  result.entity = data;
  ctx.response.body = result;
}

module.exports = {
  'GET /admin/getIdcardInfo': getIdcardInfo,
  'GET /admin/getSuiInfo': getSuiInfo,
  'POST /admin/aliyunpost': aliyunpost,
  'GET /admin/getPhoneNumber' :getPhoneNumber
}


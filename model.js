const fs = require('fs');
const db = require('./db');
//读取文件
let files = fs.readdirSync(__dirname + '/models');

//筛选出后缀为js 的文件
let js_files = files.filter(f=> {
  return f.endsWith('.js');
},files);
module.exports ={}

for(let i  of js_files) {
  console.log(`import model from file ${i}...`);
  let name = i.substring(0,i.length - 3);
  module.exports[name] = require(__dirname + '/models/' + i);
}
module.exports.sync = ()=> {
   db.sync();
}
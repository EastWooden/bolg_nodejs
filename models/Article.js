const Sequelize = require('sequelize');
const db = require('../db');
var Articles = db.defineModel('articles',{
  articleName: Sequelize.STRING(100),
  articleTags: Sequelize.STRING(100),
  articleType: Sequelize.STRING(100),
  articleContent: Sequelize.TEXT,
  BlogClassification: Sequelize.STRING(100),
  articleReadNumber: Sequelize.BIGINT,
  publishState: Sequelize.INTEGER,
})
module.exports = Articles

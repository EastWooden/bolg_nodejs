const Sequelize = require('sequelize');
const db = require('../db');
var User = db.defineModel('users',{
  userId: Sequelize.BIGINT,
  username: Sequelize.STRING(50),
  password: Sequelize.STRING(50),
  registerTime: Sequelize.BIGINT,
  loginTime: Sequelize.BIGINT,
  loginIp: Sequelize.STRING(50),
  telphone: Sequelize.STRING(11),
  sex: Sequelize.STRING(10),
  userDesc: Sequelize.STRING(500),
  email: Sequelize.STRING(100)
})
module.exports = User;
const Sequelize = require('sequelize');
const db = require('../db');
var Pet = db.defineModel('pets', {
  name: Sequelize.STRING(100),
  gender: Sequelize.BOOLEAN,
  birth: Sequelize.STRING(10),
});
module.exports = Pet;
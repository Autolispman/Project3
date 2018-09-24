const config = require("../config/config.js");
const Sequelize = require("sequelize");

module.exports = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  config.db.details
);

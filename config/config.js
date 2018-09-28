require("dotenv").config();

module.exports = {
  development: {
    database: "sams_care",
    username:"root",
    password: "root",
    host: "localhost",
    port: "3306",
    dialect: "mysql",
    define: {
      underscored: true
    }
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }
};

// const config = module.exports;

// config.db = {
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   name: process.env.DB_NAME
// };

// config.db.details = {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   dialect: "mysql"
// };

// config.keys = {
//   secret: "I'MASTRINGHAHAHAHAHA"
// };

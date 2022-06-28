require('dotenv').config();
module.exports = {
  development: {
    username: process.env.MYSQL_DEVELOPMENT_USERNAME,
    password: process.env.MYSQL_DEVELOPMENT_PASSWORD,
    database: process.env.MYSQL_DEVELOPMENT_DATABASE,
    host: process.env.MYSQL_DEVELOPMENT_HOST,
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: process.env.MYSQL_PRODUCTION_USERNAME,
    password: process.env.MYSQL_PRODUCTION_PASSWORD,
    database: process.env.MYSQL_PRODUCTION_DATABASE,
    host: process.env.MYSQL_PRODUCTION_HOST,
    dialect: 'mysql',
  },
};

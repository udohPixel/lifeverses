require("dotenv").config();

module.exports = {
  APP_DB: process.env.APP_DB,
  APP_PRIVATE_KEY: process.env.APP_PRIVATE_KEY,
  APP_LOGIN_TOKEN_EXPIRATION: process.env.APP_LOGIN_TOKEN_EXPIRATION,
  NODE_ENV: process.env.NODE_ENV,
};

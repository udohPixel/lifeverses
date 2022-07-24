// import required libraries
const config = require("../settings/config");

// import required loggers
const developmentLogger = require("./developmentLogger");
const productionLogger = require("./productionLogger");

let logger = null; // default

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (config.NODE_ENV === "development") {
  logger = developmentLogger();
} else {
  logger = productionLogger();
}

// export logger
module.exports = logger;

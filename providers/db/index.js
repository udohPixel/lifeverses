// import required libraries
const config = require("../../settings/config");
const mongoose = require("mongoose");
const logger = require("../../logger/index");
const apiResponse = require("../../common/ApiResponse");

// dbSetup module
const dbSetup = () => {
  const db = config.APP_DB;
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose
    .connect(db, connectionParams)
    .then(() => {
      logger.info("MongoDB connected successfully");
    })
    .catch((error) => {
      logger.error("MongoDB connection error: " + error?.message);
    });
};

// export dbSetup module
module.exports = dbSetup;

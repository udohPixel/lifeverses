// import required libraries
const config = require("../../settings/config");
const mongoose = require("mongoose");
const logger = require("../../logger/index");

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
    .catch((err) => {
      logger.error("MongoDB connection error: " + err?.message);
    });
};

// export dbSetup module
module.exports = dbSetup;

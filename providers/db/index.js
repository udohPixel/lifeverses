// import required libraries
const config = require("../../settings/settings.config");
const mongoose = require("mongoose");
const logger = require("../../logger/index");

// dbSetup module
const dbSetup = async () => {
  try {
    const db = config.APP_DB;
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(db, connectionParams);

    logger.info("MongoDB connected successfully");
  } catch (error) {
    let meta = "database";

    logger.error("MongoDB connection error: " + error.message, {
      ...error,
      meta,
    });
  }
};

// export dbSetup module
module.exports = dbSetup;

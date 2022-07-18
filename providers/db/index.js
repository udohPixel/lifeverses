// import required libraries
const config = require("../../settings/config");
const mongoose = require("mongoose");

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
      console.log("MongoDB connected successfully");
    })
    .catch((err) => {
      console.log("Error occurred in app:- Database connection failed: " + err);
    });
};

// export dbSetup module
module.exports = dbSetup;

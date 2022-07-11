// import required libraries
const config = require("./settings/config");
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");

// import required routes
const auth = require("./routes/api/auth");
const user = require("./routes/api/user");
const situation = require("./routes/api/situation");

// create express app and set port
const app = express();
const PORT = process.env.PORT || "3000";

// use bodyparser middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// connect to database - mongoDB
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

// passport middleware
app.use(passport.initialize());

// passport authentication strategy
require("./utils/jwtAuth")(passport);

// api routes setup
app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/situation", situation);

// listener setup
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}...`);
});

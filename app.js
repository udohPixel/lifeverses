// import required libraries
const express = require("express");
const logger = require("./logger/index");
const apiResponse = require("./common/ApiResponse");

// create express app and set port
const app = express();
const PORT = process.env.PORT || "3000";

// use express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to database - mongoDB
const dbSetup = require("./providers/db/index");
dbSetup();

const routes = require("./providers/routes/index");
app.use(routes);

app.use((err, _req, res, _next) => {
  if (err) {
    return apiResponse.errorObject(res, err);
  } else {
    return apiResponse.errorObject(res, err, 404);
  }
});

// listener setup
app.listen(PORT, () => {
  logger.info(`Server is running at ${PORT}...`);
});

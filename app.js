// import required libraries
const express = require("express");

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

// listener setup
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}...`);
});

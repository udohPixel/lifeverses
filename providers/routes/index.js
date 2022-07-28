// import required libraries
const express = require("express");
const passport = require("passport");

// import required routes
const auth = require("../../routes/api/auth");
const user = require("../../routes/api/user");
const situation = require("../../routes/api/situation");
const scripture = require("../../routes/api/scripture");

// create express router
const router = express.Router();

// passport middleware
router.use(passport.initialize());

// passport authentication strategy
require("../../utils/jwtAuth")(passport);

// api routes setup
router.use("/api/auth", auth);
router.use("/api/user", user);
router.use("/api/situation", situation);
router.use("/api/scripture", scripture);

module.exports = router;

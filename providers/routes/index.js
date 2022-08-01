// import required libraries
const express = require("express");
const passport = require("passport");

// import required routes
const auth = require("../../user/routes/api/auth.route");
const user = require("../../user/routes/api/user.route");
const situation = require("../../situation/routes/api/situation.route");
const scripture = require("../../scripture/routes/api/scripture.route");

// create express router
const router = express.Router();

// passport middleware
router.use(passport.initialize());

// passport authentication strategy
require("../../common/jwtAuth")(passport);

// api routes setup
router.use("/api/auth", auth);
router.use("/api/user", user);
router.use("/api/situation", situation);
router.use("/api/scripture", scripture);

module.exports = router;

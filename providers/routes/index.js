// import required libraries
const express = require("express");
const passport = require("passport");

// import required routes
const auth = require("../../user/routes/api/auth.route");
const user = require("../../user/routes/api/user.route");
const situation = require("../../situation/routes/api/situation.route");
const scripture = require("../../scripture/routes/api/scripture.route");
const product = require("../../product/routes/api/product.route");
const cart = require("../../cart/routes/api/cart.route");
const order = require("../../order/routes/api/order.route");

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
router.use("/api/product", product);
router.use("/api/cart", cart);
router.use("/api/order", order);

module.exports = router;

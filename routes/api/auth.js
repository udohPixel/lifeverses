// import required libraries
const express = require("express");

// import required middlewares
const {
  isLoginValidated,
  isRegistrationValidated,
} = require("../../middlewares/userValidator");

// import required controllers
const registrationController = require("../../controllers/auth/registrationController");
const loginController = require("../../controllers/auth/loginController");

// create router
const router = express.Router();

// use router
/**
 * @desc    - route for registration of users
 * @api     - /api/auth/register
 * @access  - PUBLIC
 * @type    - POST
 */
router.post("/register", isRegistrationValidated, registrationController);

/**
 * @desc    - route for login of users
 * @api     - /api/auth/login
 * @access  - PUBLIC
 * @type    - POST
 */
router.post("/login", isLoginValidated, loginController);

// export router
module.exports = router;

// import required libraries
const express = require("express");

// import required middlewares
const {
  isLoggedIn,
  isTheAdminOrSuperAdmin,
} = require("../../middlewares/auth");
const {
  isUpdatePersonalUserValidated,
  isUpdatePersonalPasswordValidated,
  isUpdateUserValidated,
  isAddToFavouriteValidated,
  isPasswordForgotValidated,
  isPasswordResetValidated,
} = require("../../middlewares/userValidator");

// import required controllers
const getPersonalUser = require("../../controllers/getPersonalUser.controller");
const updatePersonalUser = require("../../controllers/updatePersonalUser.controller");
const updatePersonalPassword = require("../../controllers/updatePersonalPassword.controller");
const updateUser = require("../../controllers/updateUser.controller");
const getUser = require("../../controllers/getUser.controller");
const getAllUsers = require("../../controllers/getAllUsers.controller");
const deleteUser = require("../../controllers/deleteUser.controller");
const addToFavourite = require("../../controllers/addToFavourite.controller");
const changeUserState = require("../../controllers/changeUserState.controller");
const passwordForgot = require("../../controllers/passwordForgot.controller");
const passwordReset = require("../../controllers/passwordReset.controller");
const getUserStats = require("../../controllers/getUserStats.controller");

// create router
const router = express.Router();

// use router
/**
 * @desc    - route for fetching personal user
 * @api     - /api/user
 * @access  - PRIVATE
 * @type    - GET
 */
router.get("/", isLoggedIn, getPersonalUser);

/**
 * @desc    - route for updating/saving personal user
 * @api     - /api/user
 * @access  - PRIVATE
 * @type    - PUT
 */
router.put("/", isLoggedIn, isUpdatePersonalUserValidated, updatePersonalUser);

/**
 * @desc    - route to update personal user password
 * @api     - /api/user/password/update"
 * @access  - PRIVATE
 * @type    - PUT
 */
router.put(
  "/password/update",
  isLoggedIn,
  isUpdatePersonalPasswordValidated,
  updatePersonalPassword
);

/**
 * @desc    - route for fetching any user by username
 * @api     - /api/user/:username
 * @access  - PUBLIC
 * @type    - GET
 */
router.get("/:username", getUser);

/**
 * @desc    - route for updating user
 * @api     - /api/user/:id
 * @access  - PRIVATE
 * @type    - PUT
 */
router.put(
  "/:id",
  isLoggedIn,
  isTheAdminOrSuperAdmin,
  isUpdateUserValidated,
  updateUser
);

/**
 * @desc    - route for fetching all users by username
 * @api     - /api/user/find/all
 * @access  - PRIVATE
 * @type    - GET
 */
router.get("/find/all", isLoggedIn, isTheAdminOrSuperAdmin, getAllUsers);

/**
 * @desc    - route for deleting any user
 * @api     - /api/user/:id
 * @access  - PRIVATE
 * @type    - DELETE
 */
router.delete("/:id", isLoggedIn, isTheAdminOrSuperAdmin, deleteUser);

/**
 * @desc    - route for add/remove user favourite scripture
 * @api     - /api/user/scripture/favourite
 * @access  - PRIVATE
 * @type    - PUT
 */
router.put(
  "/scripture/favourite",
  isLoggedIn,
  isAddToFavouriteValidated,
  addToFavourite
);

/**
 * @desc    - route for updating user active state
 * @api     - /api/user/:id/activate"
 * @access  - PRIVATE
 * @type    - PUT
 */
router.put(
  "/:id/activate",
  isLoggedIn,
  isTheAdminOrSuperAdmin,
  changeUserState
);

/**
 * @desc    - route for forgot user password (to send reset link email)
 * @api     - /api/user/password/forgot"
 * @access  - PUBLIC
 * @type    - POST
 */
router.post("/password/forgot", isPasswordForgotValidated, passwordForgot);

/**
 * @desc    - route to reset user password (to use reset link email)
 * @api     - /api/user/password/reset"
 * @access  - PUBLIC
 * @type    - PUT
 */
router.put("/password/reset/:token", isPasswordResetValidated, passwordReset);

/**
 * @desc    - route for fetching monthly users statistics
 * @api     - /api/user/find/stats
 * @access  - PRIVATE
 * @type    - GET
 */
router.get("/find/stats", isLoggedIn, isTheAdminOrSuperAdmin, getUserStats);

// export router
module.exports = router;

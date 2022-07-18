// import required libraries
const express = require("express");

// import required middlewares
const { isLoggedIn, isAdmin, isSuperAdmin } = require("../../middlewares/auth");
const {
  isUpdatePersonalUserValidated,
  isUpdateUserValidated,
  isAddToFavouriteValidated,
} = require("../../middlewares/userValidator");

// import required controllers
const getPersonalUserController = require("../../controllers/user/getPersonalUserController");
const updatePersonalUserController = require("../../controllers/user/updatePersonalUserController");
const updateUserController = require("../../controllers/user/updateUserController");
const getUserController = require("../../controllers/user/getUserController");
const getAllUsersController = require("../../controllers/user/getAllUsersController");
const deleteUserController = require("../../controllers/user/deleteUserController");
const addToFavouriteController = require("../../controllers/user/addToFavouriteController");

// create router
const router = express.Router();

// use router
/**
 * @desc    - route for fetching personal user
 * @api     - /api/user
 * @access  - PRIVATE
 * @type    - GET
 */
router.get("/", isLoggedIn, getPersonalUserController);

/**
 * @desc    - route for updating/saving personal user
 * @api     - /api/user
 * @access  - PRIVATE
 * @type    - POST
 */
router.post(
  "/",
  isLoggedIn,
  isUpdatePersonalUserValidated,
  updatePersonalUserController
);

/**
 * @desc    - route for fetching any user by username
 * @api     - /api/user/:username
 * @access  - PUBLIC
 * @type    - GET
 */
router.get("/:username", getUserController);

/**
 * @desc    - route for updating user
 * @api     - /api/user/:id
 * @access  - PRIVATE
 * @type    - POST
 */
router.post(
  "/:id",
  isLoggedIn,
  isAdmin && isSuperAdmin,
  isUpdateUserValidated,
  updateUserController
);

/**
 * @desc    - route for fetching all users by username
 * @api     - /api/user/find/all
 * @access  - PRIVATE
 * @type    - GET
 */
router.get(
  "/find/all",
  isLoggedIn,
  isAdmin && isSuperAdmin,
  getAllUsersController
);

/**
 * @desc    - route for deleting any user
 * @api     - /api/user/:id
 * @access  - PRIVATE
 * @type    - DELETE
 */
router.delete(
  "/:id",
  isLoggedIn,
  isAdmin && isSuperAdmin,
  deleteUserController
);

/**
 * @desc    - route for add/remove user favourite scripture
 * @api     - /api/user/favourite/:id/scripture
 * @access  - PRIVATE
 * @type    - PUT
 */
router.put(
  "/favourite/:id/scripture",
  isLoggedIn,
  isAddToFavouriteValidated,
  addToFavouriteController
);

// export router
module.exports = router;

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
const getPersonalUser = require("../../controllers/getPersonalUser.controller");
const updatePersonalUser = require("../../controllers/updatePersonalUser.controller");
const updateUser = require("../../controllers/updateUser.controller");
const getUser = require("../../controllers/getUser.controller");
const getAllUsers = require("../../controllers/getAllUsers.controller");
const deleteUser = require("../../controllers/deleteUser.controller");
const addToFavourite = require("../../controllers/addToFavourite.controller");

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
 * @type    - POST
 */
router.post("/", isLoggedIn, isUpdatePersonalUserValidated, updatePersonalUser);

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
 * @type    - POST
 */
router.post(
  "/:id",
  isLoggedIn,
  isAdmin && isSuperAdmin,
  isUpdateUserValidated,
  updateUser
);

/**
 * @desc    - route for fetching all users by username
 * @api     - /api/user/find/all
 * @access  - PRIVATE
 * @type    - GET
 */
router.get("/find/all", isLoggedIn, isAdmin && isSuperAdmin, getAllUsers);

/**
 * @desc    - route for deleting any user
 * @api     - /api/user/:id
 * @access  - PRIVATE
 * @type    - DELETE
 */
router.delete("/:id", isLoggedIn, isAdmin && isSuperAdmin, deleteUser);

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
  addToFavourite
);

// export router
module.exports = router;

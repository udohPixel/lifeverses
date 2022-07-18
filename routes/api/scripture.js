// import required libraries
const express = require("express");

// import required middlewares
const {
  isLoggedIn,
  isEditor,
  isAdmin,
  isSuperAdmin,
} = require("../../middlewares/auth");
const {
  isAddScriptureValidated,
  isUpdateScriptureValidated,
} = require("../../middlewares/scriptureValidator");

// import required controllers
const getScriptureController = require("../../controllers/scripture/getScriptureController");
const getAllScripturesController = require("../../controllers/scripture/getAllScripturesController");
const addScriptureController = require("../../controllers/scripture/addScriptureController");
const updateScriptureController = require("../../controllers/scripture/updateScriptureController");
const deleteScriptureController = require("../../controllers/scripture/deleteScriptureController");

// create router
const router = express.Router();

// use router
/**
 * @desc    - route for fetching scripture
 * @api     - /api/scripture/:id
 * @access  - PUBLIC
 * @type    - GET
 */
router.get("/:id", getScriptureController);

/**
 * @desc    - route for fetching all scriptures
 * @api     - /api/scripture/find/all
 * @access  - PUBLIC
 * @type    - GET
 */
router.get("/find/all", getAllScripturesController);

/**
 * @desc    - route for adding new scripture
 * @api     - /api/scripture/:situation_id/scripture
 * @access  - PRIVATE
 * @type    - POST
 */
router.post(
  "/:situation_id/scripture",
  isLoggedIn,
  isEditor && isAdmin && isSuperAdmin,
  // isAddScriptureValidated,
  addScriptureController
);

/**
 * @desc    - route for updating scripture
 * @api     - /api/scripture/:situation_id/scripture/:scripture_id"
 * @access  - PRIVATE
 * @type    - PUT
 */
router.put(
  "/:situation_id/scripture/:scripture_id",
  isLoggedIn,
  isEditor && isAdmin && isSuperAdmin,
  // isUpdateScriptureValidated,
  updateScriptureController
);

/**
 * @desc    - route for deleting scripture
 * @api     - /api/scripture/:situation_id/scripture/:scripture_id
 * @access  - PRIVATE
 * @type    - DELETE
 */
router.delete(
  "/:situation_id/scripture/:scripture_id",
  isLoggedIn,
  isAdmin && isSuperAdmin,
  deleteScriptureController
);

// export router
module.exports = router;

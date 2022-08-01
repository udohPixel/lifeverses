// import required libraries
const express = require("express");

// import required middlewares
const {
  isLoggedIn,
  isEditor,
  isAdmin,
  isSuperAdmin,
} = require("../../../user/middlewares/auth");
const {
  isAddScriptureValidated,
  isUpdateScriptureValidated,
} = require("../../middlewares/scriptureValidator");

// import required controllers
const getScripture = require("../../controllers/getScripture.controller");
const getAllScriptures = require("../../controllers/getAllScriptures.controller");
const addScripture = require("../../controllers/addScripture.controller");
const updateScripture = require("../../controllers/updateScripture.controller");
const deleteScripture = require("../../controllers/deleteScripture.controller");

// create router
const router = express.Router();

// use router
/**
 * @desc    - route for fetching scripture
 * @api     - /api/scripture/:id
 * @access  - PUBLIC
 * @type    - GET
 */
router.get("/:id", getScripture);

/**
 * @desc    - route for fetching all scriptures
 * @api     - /api/scripture/find/all
 * @access  - PUBLIC
 * @type    - GET
 */
router.get("/find/all", getAllScriptures);

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
  isAddScriptureValidated,
  addScripture
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
  isUpdateScriptureValidated,
  updateScripture
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
  deleteScripture
);

// export router
module.exports = router;

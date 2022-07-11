// import required libraries
const express = require("express");

// import required middlewares
const {
  isLoggedIn,
  isEditor,
  isAdmin,
  isSuperAdmin,
} = require("../../middlewares/auth");

// import required controllers
const getSituationController = require("../../controllers/situation/getSituationController");
const getAllSituationsController = require("../../controllers/situation/getAllSituationsController");
const addSituationController = require("../../controllers/situation/addSituationController");
const updateSituationController = require("../../controllers/situation/updateSituationController");
const deleteSituationController = require("../../controllers/situation/deleteSituationController");
const addScriptureController = require("../../controllers/situation/addScriptureController");
const deleteScriptureController = require("../../controllers/situation/deleteScriptureController");

// create router
const router = express.Router();

// use router
/**
 * @desc    - route for fetching situation
 * @api     - /api/situation/:id
 * @access  - PUBLIC
 * @type    - GET
 */
router.get("/:id", getSituationController);

/**
 * @desc    - route for fetching all situations
 * @api     - /api/situation/find/all
 * @access  - PUBLIC
 * @type    - GET
 */
router.get("/find/all", getAllSituationsController);

/**
 * @desc    - route for adding new situation
 * @api     - /api/situation
 * @access  - PRIVATE
 * @type    - POST
 */
router.post("/", isLoggedIn, isAdmin && isSuperAdmin, addSituationController);

/**
 * @desc    - route for updating situation
 * @api     - /api/situation/:id
 * @access  - PRIVATE
 * @type    - POST
 */
router.post(
  "/:id",
  isLoggedIn,
  isAdmin && isSuperAdmin,
  updateSituationController
);

/**
 * @desc    - route for deleting situation
 * @api     - /api/situation/:id
 * @access  - PRIVATE
 * @type    - DELETE
 */
router.delete(
  "/:id",
  isLoggedIn,
  isAdmin && isSuperAdmin,
  deleteSituationController
);

/**
 * @desc    - route for adding new scripture
 * @api     - /api/situation/:situation_id/scripture
 * @access  - PRIVATE
 * @type    - POST
 */
router.post(
  "/:situation_id/scripture",
  isLoggedIn,
  isEditor && isAdmin && isSuperAdmin,
  addScriptureController
);

/**
 * @desc    - route for deleting scripture
 * @api     - /api/situation//:situation_id/scripture/:scripture_id
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

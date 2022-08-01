// import required libraries
const express = require("express");

// import required middlewares
const {
  isLoggedIn,
  isAdmin,
  isSuperAdmin,
} = require("../../../user/middlewares/auth");
const {
  isAddSituationValidated,
  isUpdateSituationValidated,
} = require("../../middlewares/situationValidator");

// import required controllers
const getSituationCtrl = require("../../controllers/getSituation.controller");
const getAllSituationsCtrl = require("../../controllers/getAllSituations.controller");
const addSituationCtrl = require("../../controllers/addSituation.controller");
const updateSituationCtrl = require("../../controllers/updateSituation.controller");
const deleteSituationCtrl = require("../../controllers/deleteSituation.controller");

// create router
const router = express.Router();

// use router
/**
 * @desc    - route for fetching situation
 * @api     - /api/situation/:id
 * @access  - PUBLIC
 * @type    - GET
 */
router.get("/:id", getSituationCtrl);

/**
 * @desc    - route for fetching all situations
 * @api     - /api/situation/find/all
 * @access  - PUBLIC
 * @type    - GET
 */
router.get("/find/all", getAllSituationsCtrl);

/**
 * @desc    - route for adding new situation
 * @api     - /api/situation
 * @access  - PRIVATE
 * @type    - POST
 */
router.post(
  "/",
  isLoggedIn,
  isAdmin && isSuperAdmin,
  isAddSituationValidated,
  addSituationCtrl
);

/**
 * @desc    - route for updating situation
 * @api     - /api/situation/:id
 * @access  - PRIVATE
 * @type    - PUT
 */
router.put(
  "/:id",
  isLoggedIn,
  isAdmin && isSuperAdmin,
  isUpdateSituationValidated,
  updateSituationCtrl
);

/**
 * @desc    - route for deleting situation
 * @api     - /api/situation/:id
 * @access  - PRIVATE
 * @type    - DELETE
 */
router.delete("/:id", isLoggedIn, isAdmin && isSuperAdmin, deleteSituationCtrl);

// export router
module.exports = router;

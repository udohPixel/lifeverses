// import required libraries
const express = require("express");

// import required middlewares
const {
  isLoggedIn,
  isTheAdminOrSuperAdmin,
} = require("../../../user/middlewares/auth");
const {
  isAddSituationValidated,
  isUpdateSituationValidated,
} = require("../../middlewares/situationValidator");

// import required controllers
const getSituation = require("../../controllers/getSituation.controller");
const getAllSituations = require("../../controllers/getAllSituations.controller");
const addSituation = require("../../controllers/addSituation.controller");
const updateSituation = require("../../controllers/updateSituation.controller");
const deleteSituation = require("../../controllers/deleteSituation.controller");

// create router
const router = express.Router();

// use router
/**
 * @desc    - route for fetching situation
 * @api     - /api/situation/:id
 * @access  - PUBLIC
 * @type    - GET
 */
router.get("/:id", getSituation);

/**
 * @desc    - route for fetching all situations
 * @api     - /api/situation/find/all
 * @access  - PUBLIC
 * @type    - GET
 */
router.get("/find/all", getAllSituations);

/**
 * @desc    - route for adding new situation
 * @api     - /api/situation
 * @access  - PRIVATE
 * @type    - POST
 */
router.post(
  "/",
  isLoggedIn,
  isTheAdminOrSuperAdmin,
  isAddSituationValidated,
  addSituation
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
  isTheAdminOrSuperAdmin,
  isUpdateSituationValidated,
  updateSituation
);

/**
 * @desc    - route for deleting situation
 * @api     - /api/situation/:id
 * @access  - PRIVATE
 * @type    - DELETE
 */
router.delete("/:id", isLoggedIn, isTheAdminOrSuperAdmin, deleteSituation);

// export router
module.exports = router;

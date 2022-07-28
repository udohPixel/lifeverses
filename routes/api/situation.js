// import required libraries
const express = require("express");

// import required middlewares
const { isLoggedIn, isAdmin, isSuperAdmin } = require("../../middlewares/auth");
const {
  isAddSituationValidated,
  isUpdateSituationValidated,
} = require("../../middlewares/situationValidator");

// import required controllers
const getSituationController = require("../../controllers/situation/getSituationController");
const getAllSituationsController = require("../../controllers/situation/getAllSituationsController");
const addSituationController = require("../../controllers/situation/addSituationController");
const updateSituationController = require("../../controllers/situation/updateSituationController");
const deleteSituationController = require("../../controllers/situation/deleteSituationController");

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
router.post(
  "/",
  isLoggedIn,
  isAdmin && isSuperAdmin,
  isAddSituationValidated,
  addSituationController
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

// export router
module.exports = router;

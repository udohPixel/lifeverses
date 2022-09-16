// import required libraries
const express = require("express");

// import required middlewares
const {
  isLoggedIn,
  isTheAdminOrSuperAdmin,
  isTheEditorOrMerchantOrAdminOrSuperAdmin,
} = require("../../../user/middlewares/auth");
const {
  isAddScriptureValidated,
  isUpdateScriptureValidated,
} = require("../../middlewares/scriptureValidator");

// import required controllers
const getScripture = require("../../controllers/getScripture.controller");
const getScriptureBySlug = require("../../controllers/getScriptureBySlug.controller");
const getAllScriptures = require("../../controllers/getAllScriptures.controller");
const getAllPersonalScriptures = require("../../controllers/getAllPersonalScriptures.controller");
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
 * @desc    - route for fetching scripture by slug
 * @api     - /api/scripture/:situation_slug/:slug
 * @access  - PUBLIC
 * @type    - GET
 */
router.get("/:situation_slug/:slug", getScriptureBySlug);

/**
 * @desc    - route for fetching all scriptures
 * @api     - /api/scripture/find/all
 * @access  - PUBLIC
 * @type    - GET
 */
router.get("/find/all", getAllScriptures);

/**
 * @desc    - route for fetching all personal scriptures
 * @api     - /api/scripture/find/user
 * @access  - PRIVATE
 * @type    - GET
 */
router.get(
  "/find/user",
  isLoggedIn,
  isTheEditorOrMerchantOrAdminOrSuperAdmin,
  getAllPersonalScriptures
);

/**
 * @desc    - route for adding new scripture
 * @api     - /api/scripture/:situation_id/scripture
 * @access  - PRIVATE
 * @type    - POST
 */
router.post(
  "/:situation_id/scripture",
  isLoggedIn,
  isTheEditorOrMerchantOrAdminOrSuperAdmin,
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
  isTheEditorOrMerchantOrAdminOrSuperAdmin,
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
  isTheAdminOrSuperAdmin,
  deleteScripture
);

// export router
module.exports = router;

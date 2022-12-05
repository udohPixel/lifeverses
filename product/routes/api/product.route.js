// import required libraries
const express = require("express");

// import required middlewares
const {
  isLoggedIn,
  isTheAdminOrSuperAdmin,
  isTheMerchantOrAdminOrSuperAdmin,
} = require("../../../user/middlewares/auth");
const {
  isAddProductValidated,
  isUpdateProductValidated,
} = require("../../middlewares/productValidator");

// import required controllers
const getProduct = require("../../controllers/getProduct.controller");
const getProductBySlug = require("../../controllers/getProductBySlug.controller");
const getAllProducts = require("../../controllers/getAllProducts.controller");
const getAllPersonalProducts = require("../../controllers/getAllPersonalProducts.controller");
const addProduct = require("../../controllers/addProduct.controller");
const updateProduct = require("../../controllers/updateProduct.controller");
const deleteProduct = require("../../controllers/deleteProduct.controller");
const changeProductState = require("../../controllers/changeProductState.controller");
const addProductReview = require("../../controllers/addProductReview.controller");
const deleteProductReview = require("../../controllers/deleteProductReview.controller");
const getProductReviews = require("../../controllers/getProductReviews.controller");
const changeProductReviewState = require("../../controllers/changeProductReviewState.controller");

// create router
const router = express.Router();

// use router
/**
 * @desc    - route for fetching product
 * @api     - /api/product/:id
 * @access  - PUBLIC
 * @type    - GET
 */
router.get("/:id", getProduct);

/**
 * @desc    - route for fetching product by slug
 * @api     - /api/product/:slug/product
 * @access  - PUBLIC
 * @type    - GET
 */
router.get("/:slug/product", getProductBySlug);

/**
 * @desc    - route for fetching all products
 * @api     - /api/product/find/all
 * @access  - PUBLIC
 * @type    - GET
 */
router.get("/find/all", getAllProducts);

/**
 * @desc    - route for fetching all personal products
 * @api     - /api/product/find/:username
 * @access  - PUBLIC
 * @type    - GET
 */
router.get("/find/:username", getAllPersonalProducts);

/**
 * @desc    - route for adding new product
 * @api     - /api/product
 * @access  - PRIVATE
 * @type    - POST
 */
router.post(
  "/",
  isLoggedIn,
  isTheMerchantOrAdminOrSuperAdmin,
  isAddProductValidated,
  addProduct
);

/**
 * @desc    - route for updating product
 * @api     - /api/product/:id"
 * @access  - PRIVATE
 * @type    - PUT
 */
router.put(
  "/:id",
  isLoggedIn,
  isTheMerchantOrAdminOrSuperAdmin,
  isUpdateProductValidated,
  updateProduct
);

/**
 * @desc    - route for deleting product
 * @api     - /api//product/:id
 * @access  - PRIVATE
 * @type    - DELETE
 */
router.delete("/:id", isLoggedIn, isTheAdminOrSuperAdmin, deleteProduct);

/**
 * @desc    - route for updating product active state
 * @api     - /api/product/:id/activate"
 * @access  - PRIVATE
 * @type    - PUT
 */
router.put(
  "/:id/activate",
  isLoggedIn,
  isTheAdminOrSuperAdmin,
  changeProductState
);

/**
 * @desc    - route for adding/updating product review
 * @api     - /api/product/:id/review
 * @access  - PRIVATE
 * @type    - PUT
 */
router.put("/:id/review", isLoggedIn, addProductReview);

/**
 * @desc    - route for removing product review from array
 * @api     - /api/product/:id/review/:review_id
 * @access  - PRIVATE
 * @type    - PUT
 */
router.put(
  "/:id/review/:review_id",
  isLoggedIn,
  isTheAdminOrSuperAdmin,
  deleteProductReview
);

/**
 * @desc    - route for fetching product reviews
 * @api     - /api/product/:id/reviews
 * @access  - PRIVATE
 * @type    - GET
 */
router.get("/:id/reviews", getProductReviews);

/**
 * @desc    - route for updating product review active state
 * @api     - /api/product/:id/review/:review_id/activate"
 * @access  - PRIVATE
 * @type    - PUT
 */
router.put(
  "/:id/review/:review_id/activate",
  isLoggedIn,
  isTheAdminOrSuperAdmin,
  changeProductReviewState
);

// export router
module.exports = router;

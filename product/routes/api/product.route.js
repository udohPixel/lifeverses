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
  isProductStateValidated,
} = require("../../middlewares/productValidator");

// import required controllers
const getProduct = require("../../controllers/getProduct.controller");
const getAllProducts = require("../../controllers/getAllProducts.controller");
const addProduct = require("../../controllers/addProduct.controller");
const updateProduct = require("../../controllers/updateProduct.controller");
const deleteProduct = require("../../controllers/deleteProduct.controller");
const changeItemState = require("../../controllers/changeProductState.controller");

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
 * @desc    - route for fetching all products
 * @api     - /api/product/find/all
 * @access  - PUBLIC
 * @type    - GET
 */
router.get("/find/all", getAllProducts);

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
  isProductStateValidated,
  isTheAdminOrSuperAdmin,
  changeItemState
);

// export router
module.exports = router;

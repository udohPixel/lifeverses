// import required libraries
const express = require("express");

// import required middlewares
const {
  isLoggedIn,
  isTheAdminOrSuperAdmin,
} = require("../../../user/middlewares/auth");
const { isAddToCartValidated } = require("../../middlewares/cartValidator");

// import required controllers
const getAllCarts = require("../../controllers/getAllCarts.controller");
const getAllPersonalCarts = require("../../controllers/getAllPersonalCarts.controller");
const addToCart = require("../../controllers/addToCart.controller");
const updateCart = require("../../controllers/updateCart.controller");
const deleteCart = require("../../controllers/deleteCart.controller");

// create router
const router = express.Router();

// use router
/**
 * @desc    - route for fetching all carts
 * @api     - /api/cart/find/all
 * @access  - PRIVATE
 * @type    - GET
 */
router.get("/find/all", isLoggedIn, isTheAdminOrSuperAdmin, getAllCarts);

/**
 * @desc    - route for fetching all personal carts
 * @api     - /api/cart/find/user
 * @access  - PRIVATE
 * @type    - GET
 */
router.get("/find/user", isLoggedIn, getAllPersonalCarts);

/**
 * @desc    - route for adding product to cart
 * @api     - /api/cart
 * @access  - PRIVATE
 * @type    - POST
 */
router.post("/", isLoggedIn, isAddToCartValidated, addToCart);

/**
 * @desc    - route for updating cart
 * @api     - /api/cart/:id
 * @access  - PRIVATE
 * @type    - PUT
 */
router.put("/:id", isLoggedIn, updateCart);

/**
 * @desc    - route for deleting product from cart
 * @api     - /api/cart/:id
 * @access  - PRIVATE
 * @type    - DELETE
 */
router.delete("/:id", isLoggedIn, deleteCart);

// export router
module.exports = router;

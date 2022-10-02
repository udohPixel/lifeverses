// import required libraries
const express = require("express");

// import required middlewares
const {
  isLoggedIn,
  isTheAdminOrSuperAdmin,
} = require("../../../user/middlewares/auth");
const {
  isAddOrderValidated,
  isUpdateOrderStatusValidated,
} = require("../../middlewares/orderValidator");

// import required controllers
const getOrder = require("../../controllers/getOrder.controller");
const getAllOrders = require("../../controllers/getAllOrders.controller");
const getAllPersonalOrders = require("../../controllers/getAllPersonalOrders.controller");
const addOrder = require("../../controllers/addOrder.controller");
const updateOrderStatus = require("../../controllers/updateOrderStatus.controller");
const deleteOrder = require("../../controllers/deleteOrder.controller");
const getOrderStats = require("../../controllers/getOrderStats.controller");

// create router
const router = express.Router();

// use router
/**
 * @desc    - route for fetching order
 * @api     - /api/order/:id
 * @access  - PRIVATE
 * @type    - GET
 */
router.get("/:id", isLoggedIn, getOrder);

/**
 * @desc    - route for fetching all orders
 * @api     - /api/order/find/all
 * @access  - PRIVATE
 * @type    - GET
 */
router.get("/find/all", isLoggedIn, isTheAdminOrSuperAdmin, getAllOrders);

/**
 * @desc    - route for fetching all personal orders
 * @api     - /api/order/find/user
 * @access  - PRIVATE
 * @type    - GET
 */
router.get("/find/user", isLoggedIn, getAllPersonalOrders);

/**
 * @desc    - route for adding new order
 * @api     - /api/order
 * @access  - PRIVATE
 * @type    - POST
 */
router.post("/", isLoggedIn, isAddOrderValidated, addOrder);

/**
 * @desc    - route for updating order status
 * @api     - /api/order/:id/status
 * @access  - PRIVATE
 * @type    - PUT
 */
router.put(
  "/:id/status",
  isLoggedIn,
  isTheAdminOrSuperAdmin,
  isUpdateOrderStatusValidated,
  updateOrderStatus
);

/**
 * @desc    - route for deleting order
 * @api     - /api//order/:id
 * @access  - PRIVATE
 * @type    - DELETE
 */
router.delete("/:id", isLoggedIn, isTheAdminOrSuperAdmin, deleteOrder);

/**
 * @desc    - route for fetching monthly user's income statistics
 * @api     - /api/order/find/stats
 * @access  - PRIVATE
 * @type    - GET
 */
router.get("/find/stats", isLoggedIn, isTheAdminOrSuperAdmin, getOrderStats);

// export router
module.exports = router;

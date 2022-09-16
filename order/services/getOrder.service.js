// import required modules
const ApplicationException = require("../../common/ApplicationException");
const Order = require("../models/Order");
const { isAdmin, isSuperAdmin } = require("../../common/helpers");

// get order service
const getOrderService = async (theUserId, theRole, orderId) => {
  // fetch order by id
  let order = await Order.findOne({ _id: orderId }).exec();

  // check if order exists
  if (!order) {
    throw new ApplicationException("Order does not exist", 404);
  }

  //check if currently logged in editor is creator of order
  let isCreator =
    theUserId === order.userId || isAdmin(theRole) || isSuperAdmin(theRole);

  if (!isCreator) {
    throw new ApplicationException("Unauthorised", 401);
  }

  return order;
};

// export service
module.exports = getOrderService;

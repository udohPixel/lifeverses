// import required modules
const Order = require("../models/Order");
const ApplicationException = require("../../common/ApplicationException");

// delete order service
const updateOrderService = async (orderId) => {
  // fetch order by id
  let order = await Order.findOne({ _id: orderId }).exec();

  // check order exists
  if (!order) {
    throw new ApplicationException("Order does not exist", 404);
  }

  // delete order
  order = await Order.findOneAndRemove({ _id: orderId });

  return order;
};

// export service
module.exports = updateOrderService;

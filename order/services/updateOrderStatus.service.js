// import required modules
const Order = require("../models/Order");
const Product = require("../../product/models/Product");
const ApplicationException = require("../../common/ApplicationException");

// update order status service
const updateOrderStatusService = async (orderId, theOrderStatus) => {
  // fetch order by id
  let order = await Order.findOne({ _id: orderId }).exec();

  // check order exists
  if (!order) {
    throw new ApplicationException("Order does not exist", 404);
  }

  // set shipment date and reduce product's stock
  if (theOrderStatus === "Shipped") {
    order.shippedAt = Date.now();

    // update product's stock
    const queries = order.orderProducts.map((product) => {
      return Product.findOneAndUpdate(
        { _id: p.productId },
        { $inc: { stock: -p.quantity } }
      ).exec();
    });

    await Promise.all(queries);
  }

  // set delivery date
  if (theOrderStatus === "Delivered") {
    order.deliveredAt = Date.now();
  }

  // update order status
  order.orderStatus = theOrderStatus;
  order = await order.save();

  return order;
};

// export service
module.exports = updateOrderStatusService;

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
  };

  // set shipment date and reduce product's stock
  if (theOrderStatus === "Shipped") {
    // update product's stock
    const queries = order.orderProducts.map((product) => {
      return Product.findOneAndUpdate(
        { _id: product.productId },
        { $inc: { stock: -product.quantity } }
      ).exec();
    });

    await Promise.all(queries);
  }

  // set delivery date
  let theDeliveredAt = null;
  let theShippedAt = null;
  if (theOrderStatus === "Delivered") {
    theDeliveredAt = Date.now();
  };
  if (theOrderStatus === "Shipped") {
    theShippedAt = Date.now();
  };

  // pass fields to be updated into orderValues object
  const orderValues = {
    orderStatus: theOrderStatus,
    deliveredAt: theDeliveredAt ?? undefined,
    shippedAt: theShippedAt ?? undefined,
  };

  // update order status
  order = await Order.findOneAndUpdate(
    { _id: orderId },
    { $set: orderValues },
    { new: true }
  )

  return order;
};

// export service
module.exports = updateOrderStatusService;

// import required modules
const Order = require("../models/Order");

// add order service
const addOrderService = async (
  userId,
  orderProducts,
  shippingInfo,
  paymentInfo,
  shippingPrice
) => {
  // calculate products price
  let productsPrice = 0;
  orderProducts.forEach((product) => {
    const productsDiscountedPrice = product.price - product.discount;
    productsPrice += productsDiscountedPrice * product.quantity;
  });

  // calculate totalPrice
  let totalPrice = productsPrice + shippingPrice;

  // create new order
  const order = await Order.create({
    userId,
    orderProducts,
    shippingInfo,
    paymentInfo,
    productsPrice,
    shippingPrice,
    totalPrice,
  });

  return order;
};

// export service
module.exports = addOrderService;

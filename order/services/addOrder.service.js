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
  let productsDiscountedPrice = 0;
  orderProducts.forEach((product) => {
    productsDiscountedPrice = product.price - product.discount;
    productsPrice += productsDiscountedPrice;
    productsPrice = productsPrice * product.quantity;
  });

  // calculate totalPrice
  let totalPrice = productsPrice + shippingPrice;

  // create a new instance of Order to store the user-imputed values
  const newOrder = new Order({
    userId,
    orderProducts,
    shippingInfo,
    paymentInfo,
    productsPrice,
    shippingPrice,
    totalPrice,
  });

  // save new order object to dB
  let order = await newOrder.save();

  return order;
};

// export service
module.exports = addOrderService;

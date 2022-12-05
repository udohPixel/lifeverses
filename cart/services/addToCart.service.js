// import required modules
const Product = require("../../product/models/Product");
const Cart = require("../models/Cart");
const ApplicationException = require("../../common/ApplicationException");

const addToCartService = async (userId, productId, quantity) => {
  // fetch product by id from dB
  let product = await Product.findOne({ _id: productId }).exec();

  // check if product exists
  if (!product) {
    throw new ApplicationException("Product does not exist", 404);
  }

  // create new cart
  const cart = await Cart.create({
    userId,
    productId,
    quantity,
  });

  return cart;
};

// export service
module.exports = addToCartService;

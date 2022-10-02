// import required modules
const Cart = require("../models/Cart");
const ApplicationException = require("../../common/ApplicationException");

// update cart service
const updateCartService = async (theUserId, cartId) => {
  // fetch cart by id from dB
  let cart = await Cart.findOne({ _id: cartId }).exec();

  // check if cart exists
  if (!cart) {
    throw new ApplicationException("Cart does not exist", 404);
  }

  //check if currently logged in user is creator of cart
  let isCreator = theUserId === cart.userId;

  if (!isCreator) {
    throw new ApplicationException("Unauthorised", 401);
  }

  // increase cart quantity
  cart.quantity = cart.quantity + 1;

  // update cart
  cart = await cart.save();

  return cart;
};

// export service
module.exports = updateCartService;

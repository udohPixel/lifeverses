// import required modules
const Cart = require("../models/Cart");
const ApplicationException = require("../../common/ApplicationException");

// delete cart service
const deleteCartService = async (theUserId, cartId) => {
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

  if (cart.quantity > 1) {
    // decrease cart quantity
    cart.quantity = cart.quantity - 1;

    // pass fields to be updated into cartValues object
    const cartValues = { quantity: cart.quantity };

    cart = await Cart.findOneAndUpdate(
      { _id: cartId },
      { $set: cartValues },
      { new: true }
    )

    return cart;
  }

  // delete from cart
  cart = await Cart.findOneAndRemove({ _id: cartId });

  return cart;
};

module.exports = deleteCartService;

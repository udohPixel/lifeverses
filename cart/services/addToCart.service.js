// import required modules
const Cart = require("../models/Cart");
const ApplicationException = require("../../common/ApplicationException");

const addToCartService = async (userId, productId, quantity) => {
  // check if user exists
  if (!productId) {
    throw new ApplicationException("Product does not exist", 404);
  }

  // create a new instance of Cart to store the user-imputed values
  const newCart = new Cart({
    userId,
    productId,
    quantity,
  });

  // save new cart to dB
  const cart = await newCart.save();

  return cart;
};

// export service
module.exports = addToCartService;

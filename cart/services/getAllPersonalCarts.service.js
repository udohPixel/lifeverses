// import required modules
const Cart = require("../models/Cart");

// get all carts services
const getAllPersonalCartsService = (theUserId) => {
  // fetch carts from dB
  return Cart.find({ userId: theUserId }).exec();
};

// export service
module.exports = getAllPersonalCartsService;

// import required modules
const Cart = require("../models/Cart");

// get all carts services
const getAllCartsService = () => {
  // fetch carts from dB
  return Cart.find().exec();
};

// export service
module.exports = getAllCartsService;

// import required modules
const Product = require("../models/Product");

// get all products service
const getAllProductsService = () => {
  // fetch all products
  return Product.find().exec();
};

// export service
module.exports = getAllProductsService;

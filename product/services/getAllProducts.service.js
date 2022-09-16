// import required modules
const productFilters = require("../helpers/ProductFilters");
const Product = require("../models/Product");

// get all products service
const getAllProductsService = (queryStr) => {
  // fetch products
  let query = Product.find();

  // filter products
  return productFilters.filterItems(query, queryStr);
};

// export service
module.exports = getAllProductsService;

// import required modules
const productFilters = require("../helpers/ProductFilters");

// get all products service
const getAllProductsService = (queryStr) => {
  // filter products
  return productFilters.filterItems(queryStr);
};

// export service
module.exports = getAllProductsService;

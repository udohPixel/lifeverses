// import required modules
const productFilters = require("../helpers/ProductFilters");
const User = require("../../user/models/User");
const Product = require("../models/Product");
const ApplicationException = require("../../common/ApplicationException");

// get all products service
const getAllPersonalProductsService = async (theUsername, queryStr) => {
  // fetch user
  let user = await User.findOne({ username: theUsername }).exec();

  // check if user exist
  if (!user) {
    throw new ApplicationException("User does not exist", 404);
  }

  // fetch products
  let query = Product.find({ userId: user.id });

  // filter products
  return productFilters.filterItems(query, queryStr);
};

// export service
module.exports = getAllPersonalProductsService;

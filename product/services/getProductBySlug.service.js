// import required modules
const ApplicationException = require("../../common/ApplicationException");
const Product = require("../models/Product");

// get product service
const getProductBySlugService = async (theSlug) => {
  // fetch product by slug
  let product = await Product.findOne({ slug: theSlug }).exec();

  // check if product exists
  if (!product) {
    throw new ApplicationException("Product does not exist", 404);
  }

  return product;
};

// export service
module.exports = getProductBySlugService;

// import required modules
const ApplicationException = require("../../common/ApplicationException");
const Product = require("../models/Product");

// get product reviews service
const getProductReviewsService = async (productId) => {
  // fetch product reviews
  let product = await Product.findOne({ _id: productId }).exec();

  // check if product exists
  if (!product) {
    throw new ApplicationException("Product does not exist", 404);
  }

  return product.reviews;
};

// export service
module.exports = getProductReviewsService;

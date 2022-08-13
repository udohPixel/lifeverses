// import required modules
const ApplicationException = require("../../common/ApplicationException");
const Product = require("../models/Product");

// get product service
const getProductService = async (productId) => {
  // fetch product by id
  let product = await Product.findOne({ _id: productId }).exec();

  // check if product exists
  if (!product) {
    throw new ApplicationException("Product does not exist", 404);
  }

  return product;
};

// export service
module.exports = getProductService;

// import required modules
const Product = require("../models/Product");
const ApplicationException = require("../../common/ApplicationException");

// change product state service
const changeProductStateService = async (productId) => {
  // fetch current item state
  let product = await Product.findOne({ _id: productId }).exec();

  if (!product) throw new ApplicationException("Product does not exist", 404);

  product.isActive = !product.isActive;

  await product.save();

  return product.isActive;
};

// export service
module.exports = changeProductStateService;

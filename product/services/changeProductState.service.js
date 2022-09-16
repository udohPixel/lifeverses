// import required modules
const Product = require("../models/Product");
const ApplicationException = require("../../common/ApplicationException");

// change product state service
const changeProductStateService = async (productId) => {
  // fetch current item state
  let product = await Product.findOne({ _id: productId }).exec();

  // check if product exists
  if (!product) throw new ApplicationException("Product does not exist", 404);

  // toggle product state
  product.isActive = !product.isActive;

  // save product state
  await product.save();

  return product.isActive;
};

// export service
module.exports = changeProductStateService;

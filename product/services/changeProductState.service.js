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
  let theIsActive = (product.isActive = !product.isActive);

  const theReviewValues = {
    "isActive": theIsActive
  };

  // update product state
  await Product.updateOne(
    { _id: productId },
    { $set: theReviewValues }
  );

  return product.isActive;
};

// export service
module.exports = changeProductStateService;

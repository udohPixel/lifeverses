// import required modules
const Product = require("../models/Product");
const ApplicationException = require("../../common/ApplicationException");
const { isAdmin, isSuperAdmin } = require("../../common/helpers");

// delete product service
const updateProductService = async (theRole, theUserId, productId) => {
  // fetch product by id
  let product = await Product.findOne({ _id: productId }).exec();

  // check product exists
  if (!product) {
    throw new ApplicationException("Product does not exist", 404);
  }

  //check if currently logged in editor is creator of product
  const creatorId = product.userId;

  let isCreator =
    theUserId === creatorId || isAdmin(theRole) || isSuperAdmin(theRole);

  if (!isCreator) {
    throw new ApplicationException("Unauthorised", 401);
  }

  // delete product
  product = await Product.findOneAndRemove({ _id: productId });

  return product;
};

// export service
module.exports = updateProductService;

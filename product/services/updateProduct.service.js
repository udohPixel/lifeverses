// import required modules
const Product = require("../models/Product");
const ApplicationException = require("../../common/ApplicationException");
const {
  isEditor,
  isAdmin,
  isSuperAdmin,
  titleToSlug,
} = require("../../common/helpers");

// update product service
const updateProductService = async (
  theRole,
  theUserId,
  productId,
  productInfo
) => {
  // object destructuring assignment
  const {
    title,
    aboutAuthor,
    authors,
    pages,
    publicationDate,
    isbn,
    category,
    overview,
    description,
    price,
    discount,
    coverPic,
    previewPages,
    stock,
  } = productInfo;

  // fetch product by id
  let product = await Product.findOne({ _id: productId }).exec();

  // check product exists
  if (!product) {
    throw new ApplicationException("Product does not exist", 404);
  }

  //check if currently logged in editor is creator of product
  let isCreator =
    theUserId === product.userId || isAdmin(theRole) || isSuperAdmin(theRole);

  if (!isCreator) {
    throw new ApplicationException("Unauthorised", 401);
  }

  // get other data
  let userId;
  let slug = titleToSlug(title) + "-" + isbn;

  // check if user is editor, admin or super admin
  // to allow anonymous edit of product by admin or super admin
  if (isEditor(theRole)) {
    userId = theUserId;
  }
  if (isAdmin(theRole) || isSuperAdmin(theRole)) {
    userId = product.userId;
  }

  // create a new instance of Product to store the user-imputed values
  const productValues = {
    userId,
    slug,
    ...productInfo,
    // publicationDate: new Date(publicationDate),
  };

  // update product with productValues from product
  product = await Product.findOneAndUpdate(
    { _id: productId },
    { $set: productValues },
    { new: true }
  );

  return product;
};

// export service
module.exports = updateProductService;

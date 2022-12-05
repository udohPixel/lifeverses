// import required modules
const Product = require("../models/Product");
const ApplicationException = require("../../common/ApplicationException");
const { titleToSlug } = require("../../common/helpers");

// add product service
const addProductService = async (userId, productInfo) => {
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

  // fetch product by title
  let product = await Product.findOne({ title }).exec();

  // check if title exists or not in dB
  if (product) {
    throw new ApplicationException("Title has already been taken. Try another");
  };

  let slug = titleToSlug(title) + "-" + isbn;

  // create a new instance of Product to store the user-imputed values
  const theProduct = await Product.create({
    userId,
    slug,
    ...productInfo,
    // publicationDate: new Date(publicationDate),
  });

  return theProduct;
};

// export service
module.exports = addProductService;

// import require libraries
const Joi = require("joi");

// product validator schema
const productValidatorSchema = {
  // add product validator schema
  addProduct: Joi.object({
    title: Joi.string().min(3).max(50).required(),
    aboutAuthor: Joi.string().max(250).allow(""),
    authors: Joi.string().max(50).required(),
    pages: Joi.number().integer().greater(23).less(829).required(),
    publicationDate: Joi.string().required(),
    isbn: Joi.string().min(10).max(13).required(),
    category: Joi.string()
      .valid(
        "Devotional",
        "Christian Life",
        "Bible Study",
        "Ministry and Evangelism",
        "Music and Hymns",
        "History & Biography",
        "Christian Education",
        "Children Books",
        "Young Adult"
      )
      .required(),
    overview: Joi.string().min(3).max(150).required(),
    description: Joi.string().max(4000).allow(""),
    price: Joi.number().required(),
    discount: Joi.number().allow(""),
    coverPic: Joi.string().trim(true).required(),
    previewPages: Joi.string().trim(true).required(),
    stock: Joi.number().required(),
  }),

  // update product validator schema
  updateProduct: Joi.object({
    format: Joi.string().valid("Physical Book", "eBook"),
    title: Joi.string().min(3).max(50).required(),
    aboutAuthor: Joi.string().max(250),
    authors: Joi.string().max(50).required(),
    pages: Joi.number().integer().greater(23).less(829).required(),
    publicationDate: Joi.string().required(),
    isbn: Joi.string().min(10).max(13).required(),
    category: Joi.string()
      .valid(
        "Devotional",
        "Christian Life",
        "Bible Study",
        "Ministry and Evangelism",
        "Music and Hymns",
        "History & Biography",
        "Christian Education",
        "Children Books",
        "Young Adult"
      )
      .required(),
    overview: Joi.string().min(3).max(150).required(),
    description: Joi.string().max(4000).allow(""),
    price: Joi.number().required(),
    discount: Joi.number().allow(""),
    coverPic: Joi.string().trim(true).required(),
    previewPages: Joi.string().trim(true).required(),
    stock: Joi.number().required(),
  }),

  // add product review validator schema
  addProductReview: Joi.object({
    reviewerId: Joi.string().required(),
    reviewTitle: Joi.string().min(2).max(50).required(),
    reviewRating: Joi.number(),
    comment: Joi.string().min(2).max(250).required(),
  }),

  // update product review validator schema
  updateProductReview: Joi.object({
    reviewerId: Joi.string().required(),
    reviewTitle: Joi.string().min(2).max(50).required(),
    reviewRating: Joi.number(),
    comment: Joi.string().min(2).max(250).required(),
  }),

  // product state validator schema
  changeProductState: Joi.object({
    isActive: Joi.boolean().required(),
  }),
};

// export product validation schema
module.exports = productValidatorSchema;

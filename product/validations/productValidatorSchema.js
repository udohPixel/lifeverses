// import require modules
const Joi = require("joi");
const validatorConfig = require("../../settings/validator.config");

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
      .valid(...validatorConfig.PRODUCT_CATEGORY_ARRAY)
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
      .valid(...validatorConfig.PRODUCT_CATEGORY_ARRAY)
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
    reviewTitle: Joi.string().min(2).max(50).required(),
    reviewRating: Joi.number(),
    comment: Joi.string().min(2).max(250).required(),
  }),
};

// export product validation schema
module.exports = productValidatorSchema;

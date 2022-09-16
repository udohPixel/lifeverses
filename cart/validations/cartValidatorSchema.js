// import require libraries
const Joi = require("joi");

// cart validator schema
const cartValidatorSchema = {
  // add cart validator schema
  addToCart: Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().required(),
  }),
};

// export cart validation schema
module.exports = cartValidatorSchema;

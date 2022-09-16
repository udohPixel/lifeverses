// import require modules
const Joi = require("joi");
const validatorConfig = require("../../settings/validator.config");

// order validation schema
const orderValidatorSchema = {
  addOrder: Joi.object({
    orderProducts: Joi.array()
      .items(
        Joi.object({
          productId: Joi.string().required(),
          title: Joi.string().required(),
          price: Joi.number().required(),
          discount: Joi.number().required(),
          coverPic: Joi.string().required(),
          quantity: Joi.number().required(),
        })
      )
      .required(),
    shippingInfo: Joi.object({
      contactName: Joi.string().required(),
      streetAddress: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      country: Joi.string()
        .valid(...validatorConfig.COUNTRY_ARRAY)
        .required(),
      zipCode: Joi.number(),
      phoneNo: Joi.string().required(),
    }).required(),
    paymentInfo: Joi.object({
      paymentId: Joi.string(),
      paymentStatus: Joi.string().valid(
        ...validatorConfig.PAYMENT_STATUS_ARRAY
      ),
    }).required(),
    shippingPrice: Joi.number().required(),
  }),

  updateOrderStatus: Joi.object({
    orderStatus: Joi.string()
      .valid(...validatorConfig.ORDER_STATUS_ARRAY)
      .required(),
    shippedAt: Joi.date(),
    deliveredAt: Joi.date(),
  }),
};

// export order validation schema
module.exports = orderValidatorSchema;

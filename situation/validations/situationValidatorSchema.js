// import require libraries
const Joi = require("joi");
const validatorConfig = require("../../settings/validator.config");

// situation validator schema
const situationValidatorSchema = {
  // add situation validator schema
  addSituation: Joi.object({
    title: Joi.string().min(3).max(50).required(),
    colour: Joi.string()
      .valid(...validatorConfig.SITUATION_COLOUR_ARRAY)
      .required(),
    icon: Joi.string().max(50).required(),
  }),

  // update situation validator schema
  updateSituation: Joi.object({
    title: Joi.string().min(3).max(50).required(),
    colour: Joi.string()
      .valid(...validatorConfig.SITUATION_COLOUR_ARRAY)
      .required(),
    icon: Joi.string().max(50).required(),
  }),
};

// export situation validation schema
module.exports = situationValidatorSchema;

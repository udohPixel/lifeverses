// import require libraries
const Joi = require("joi");

// situation validator schema
const situationValidatorSchema = {
  // add situation validator schema
  addSituation: Joi.object({
    title: Joi.string().min(3).max(50).required(),
    colour: Joi.string()
      .valid(
        "bg-orange-1 color-orange",
        "bg-red-1 color-red",
        "bg-pink-1 color-pink",
        "bg-purple-1 color-purple",
        "bg-yellow-1 color-yellow",
        "bg-blue-1 color-blue",
        "bg-snow text-dark",
        "bg-green-1 color-green",
        "bg-cyan-1 color-cyan"
      )
      .required(),
    icon: Joi.string().max(50).required(),
  }),

  // update situation validator schema
  updateSituation: Joi.object({
    title: Joi.string().min(3).max(50).required(),
    colour: Joi.string()
      .valid(
        "bg-orange-1 color-orange",
        "bg-red-1 color-red",
        "bg-pink-1 color-pink",
        "bg-purple-1 color-purple",
        "bg-yellow-1 color-yellow",
        "bg-blue-1 color-blue",
        "bg-snow text-dark",
        "bg-green-1 color-green",
        "bg-cyan-1 color-cyan"
      )
      .required(),
    icon: Joi.string().max(50).required(),
  }),
};

// export situation validation schema
module.exports = situationValidatorSchema;

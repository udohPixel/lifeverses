// import require  modules
const Joi = require("joi");
const validatorConfig = require("../../settings/validator.config");

// scripture validator schema
const scriptureValidatorSchema = {
  // add scripture validator schema
  addScripture: Joi.object({
    bibleTitle: Joi.string()
      .valid(...validatorConfig.BIBLE_TITLE_ARRAY)
      .required(),
    bibleChapter: Joi.number().integer().greater(0).less(120).required(),
    bibleVerses: Joi.string().required(),
  }),

  // update scripture validator schema
  updateScripture: Joi.object({
    bibleTitle: Joi.string()
      .valid(...validatorConfig.BIBLE_TITLE_ARRAY)
      .required(),
    bibleChapter: Joi.number().integer().greater(0).less(120).required(),
    bibleVerses: Joi.string().required(),
  }),
};

// export scripture validation schema
module.exports = scriptureValidatorSchema;

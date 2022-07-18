// import require libraries
const Joi = require("joi");

// scripture validator schema
const scriptureValidatorSchema = {
  // add scripture validator schema
  addScripture: Joi.object({
    bibleTitle: Joi.string().min(6).max(50),
    bibleChapter: Joi.number().min(1).max(119),
    bibleVerses: Joi.number(),
  }),

  // update scripture validator schema
  updateScripture: Joi.object({
    bibleTitle: Joi.string().min(6).max(50),
    bibleChapter: Joi.number().min(1).max(119),
    bibleVerses: Joi.number(),
  }),
};

// export scripture validation schema
module.exports = scriptureValidatorSchema;

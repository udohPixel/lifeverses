// import require libraries
const Joi = require("joi");

// scripture validator schema
const scriptureValidatorSchema = {
  // add scripture validator schema
  addScripture: Joi.object({
    bibleTitle: Joi.string().min(4).max(50),
    bibleChapter: Joi.number().min(1).max(119),
    bibleVerses: Joi.string(),
  }),

  // update scripture validator schema
  updateScripture: Joi.object({
    bibleTitle: Joi.string().min(4).max(50),
    bibleChapter: Joi.number().min(1).max(119),
    bibleVerses: Joi.string(),
  }),
};

// export scripture validation schema
module.exports = scriptureValidatorSchema;

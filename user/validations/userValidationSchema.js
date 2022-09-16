// import require modules
const Joi = require("joi");
const validatorConfig = require("../../settings/validator.config");

// user validation schema
const userValidatorSchema = {
  // login validator schema
  login: Joi.object({
    email: Joi.string()
      .lowercase()
      .min(6)
      .max(50)
      .email({ minDomainSegments: 2 })
      .trim(true)
      .required(),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{6,100}$/)
      .required(),
  }),

  // registration validator schema
  registration: Joi.object({
    firstname: Joi.string().min(2).max(50).trim(true).required(),
    lastname: Joi.string().min(2).max(50).trim(true).required(),
    gender: Joi.string().valid("Male", "Female").required(),
    username: Joi.string().alphanum().min(3).max(50).trim(true).required(),
    email: Joi.string()
      .lowercase()
      .min(6)
      .max(50)
      .email({
        minDomainSegments: 2,
      })
      .trim(true)
      .required(),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{6,100}$/)
      .required(),
    profilePic: Joi.string().trim(true).allow(""),
    careerField: Joi.string()
      .valid(...validatorConfig.CAREER_FIELD_ARRAY)
      .required(),
  }),

  // update personal user validator schema
  updatePersonalUser: Joi.object({
    firstname: Joi.string().min(2).max(50).trim(true).required(),
    lastname: Joi.string().min(2).max(50).trim(true).required(),
    gender: Joi.string().valid("Male", "Female").required(),
    username: Joi.string().alphanum().min(3).max(50).trim(true).required(),
    email: Joi.string()
      .lowercase()
      .min(6)
      .max(50)
      .email({
        minDomainSegments: 2,
      })
      .trim(true)
      .required(),
    profilePic: Joi.string().allow(""),
    careerField: Joi.string()
      .valid(...validatorConfig.CAREER_FIELD_ARRAY)
      .required(),
    bio: Joi.string().min(10).max(5000).allow(""),
    facebook: Joi.string().min(3).max(50).trim(true).allow(""),
    youtube: Joi.string().min(3).max(50).trim(true).allow(""),
    instagram: Joi.string().min(3).max(50).trim(true).allow(""),
    linkedIn: Joi.string().min(3).max(50).trim(true).allow(""),
    twitter: Joi.string().min(3).max(50).trim(true).allow(""),
  }),

  // update personal password validator schema
  updatePersonalPassword: Joi.object({
    oldPassword: Joi.string()
      .pattern(/^[a-zA-Z0-9]{6,100}$/)
      .required(),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{6,100}$/)
      .required(),
    confirmPassword: Joi.string()
      .pattern(/^[a-zA-Z0-9]{6,100}$/)
      .required(),
  }),

  // update user validator schema
  updateUser: Joi.object({
    firstname: Joi.string().min(2).max(50).trim(true).required(),
    lastname: Joi.string().min(2).max(50).trim(true).required(),
    gender: Joi.string().valid("Male", "Female").required(),
    username: Joi.string().alphanum().min(3).max(50).trim(true).required(),
    email: Joi.string()
      .lowercase()
      .min(6)
      .max(50)
      .email({
        minDomainSegments: 2,
      })
      .trim(true)
      .required(),
    profilePic: Joi.string().allow(""),
    careerField: Joi.string()
      .valid(...validatorConfig.CAREER_FIELD_ARRAY)
      .required(),
    role: Joi.string()
      .valid(...validatorConfig.USER_ROLE_ARRAY)
      .default("User"),
    bio: Joi.string().min(10).max(5000),
    facebook: Joi.string().min(3).max(50).trim(true).allow(""),
    youtube: Joi.string().min(3).max(50).trim(true).allow(""),
    instagram: Joi.string().min(3).max(50).trim(true).allow(""),
    linkedIn: Joi.string().min(3).max(50).trim(true).allow(""),
    twitter: Joi.string().min(3).max(50).trim(true).allow(""),
  }),

  // add to favourite validator schema
  addToFavourite: Joi.object({
    scriptureId: Joi.string(),
  }),

  // password forgot validator schema
  passwordForgot: Joi.object({
    email: Joi.string()
      .lowercase()
      .min(6)
      .max(50)
      .email({
        minDomainSegments: 2,
      })
      .trim(true)
      .required(),
  }),

  // password reset validator schema
  passwordReset: Joi.object({
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{6,100}$/)
      .required(),
    confirmPassword: Joi.string()
      .pattern(/^[a-zA-Z0-9]{6,100}$/)
      .required(),
  }),
};

// export user validator schema
module.exports = userValidatorSchema;

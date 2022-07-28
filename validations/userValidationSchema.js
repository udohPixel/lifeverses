// import require libraries
const Joi = require("joi");

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
      .pattern(new RegExp("^[a-zA-Z0-9]{6,100}$"))
      .trim(true)
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
      .pattern(new RegExp("^[a-zA-Z0-9]{6,100}$"))
      .trim(true)
      .required(),
    profilePic: Joi.string().trim(true),
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
    profilePic: Joi.string().trim(true),
    bio: Joi.string().min(10).max(5000),
    facebook: Joi.string().min(3).max(50).trim(true).trim(true),
    youtube: Joi.string().min(3).max(50).trim(true),
    instagram: Joi.string().min(3).max(50).trim(true),
    linkedIn: Joi.string().min(3).max(50).trim(true),
    twitter: Joi.string().min(3).max(50).trim(true),
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
    profilePic: Joi.string().trim(true),
    role: Joi.string()
      .valid("User", "Editor", "Admin", "SuperAdmin")
      .default("User")
      .trim(true),
    isActive: Joi.boolean().valid(true).default(true),
    bio: Joi.string().min(10).max(5000),
    facebook: Joi.string().min(3).max(50).trim(true).trim(true),
    youtube: Joi.string().min(3).max(50).trim(true),
    instagram: Joi.string().min(3).max(50).trim(true),
    linkedIn: Joi.string().min(3).max(50).trim(true),
    twitter: Joi.string().min(3).max(50).trim(true),
  }),

  // add to favourite validator schema
  addToFavourite: Joi.object({
    scriptureId: Joi.string(),
  }),
};

// export user validator schema
module.exports = userValidatorSchema;

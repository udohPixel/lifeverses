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
      .valid(
        "Education and Training",
        "Ministering, Counselling, Clergy",
        "Business Management and Administration",
        "Arts, Audio/Video Technology and Communications",
        "Finance",
        "Government and Public Administration",
        "Health Science",
        "Hospitality and Tourism",
        "Human Services",
        "Information Technology",
        "Law, Public Safety, Corrections and Security",
        "Manufacturing",
        "Marketing, Sales and Service",
        "Science, Technology, Engineering and Mathematics",
        "Transportation, Distribution and Logistics"
      )
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
      .valid(
        "Education and Training",
        "Ministering, Counselling, Clergy",
        "Business Management and Administration",
        "Arts, Audio/Video Technology and Communications",
        "Finance",
        "Government and Public Administration",
        "Health Science",
        "Hospitality and Tourism",
        "Human Services",
        "Information Technology",
        "Law, Public Safety, Corrections and Security",
        "Manufacturing",
        "Marketing, Sales and Service",
        "Science, Technology, Engineering and Mathematics",
        "Transportation, Distribution and Logistics"
      )
      .required(),
    bio: Joi.string().min(10).max(5000).allow(""),
    facebook: Joi.string().min(3).max(50).trim(true).allow(""),
    youtube: Joi.string().min(3).max(50).trim(true).allow(""),
    instagram: Joi.string().min(3).max(50).trim(true).allow(""),
    linkedIn: Joi.string().min(3).max(50).trim(true).allow(""),
    twitter: Joi.string().min(3).max(50).trim(true).allow(""),
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
      .valid(
        "Education and Training",
        "Ministering, Counselling, Clergy",
        "Business Management and Administration",
        "Arts, Audio/Video Technology and Communications",
        "Finance",
        "Government and Public Administration",
        "Health Science",
        "Hospitality and Tourism",
        "Human Services",
        "Information Technology",
        "Law, Public Safety, Corrections and Security",
        "Manufacturing",
        "Marketing, Sales and Service",
        "Science, Technology, Engineering and Mathematics",
        "Transportation, Distribution and Logistics"
      )
      .required(),
    role: Joi.string()
      .valid("User", "Editor", "Merchant", "Admin", "SuperAdmin")
      .default("User"),
    isActive: Joi.boolean().required(),
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
};

// export user validator schema
module.exports = userValidatorSchema;

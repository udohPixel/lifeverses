// import required modules
const mongoose = require("mongoose");
const validatorConfig = require("../../settings/validator.config");

// create schema object
const Schema = mongoose.Schema;

// create new instance of Schema
const UserSchema = new Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    profilePic: {
      type: String,
      // default: "https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg",
    },
    careerField: {
      type: String,
      enum: [...validatorConfig.CAREER_FIELD_ARRAY],
    },
    role: {
      type: String,
      default: "User",
      enum: [...validatorConfig.USER_ROLE_ARRAY],
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
    },
    socialLinks: {
      facebook: {
        type: String,
      },
      youtube: {
        type: String,
      },
      instagram: {
        type: String,
      },
      linkedIn: {
        type: String,
      },
      twitter: {
        type: String,
      },
    },
    favouriteScriptures: {
      type: Array,
      default: [],
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

// export schema
module.exports = User;

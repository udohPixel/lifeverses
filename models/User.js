// import required libraries
const mongoose = require("mongoose");

// create schema object
const Schema = mongoose.Schema;

// create new instance of Schema
const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: {
        values: ["Male", "Female"],
        message: "{VALUE} is not a valid gender",
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: false,
      // default: "https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg",
    },
    role: {
      type: String,
      default: "User",
      enum: {
        values: ["User", "Editor", "Admin", "SuperAdmin"],
        message: "{VALUE} is not a valid role",
      },
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      required: false,
    },
    socialLinks: {
      facebook: {
        type: String,
        required: false,
      },
      youtube: {
        type: String,
        required: false,
      },
      instagram: {
        type: String,
        required: false,
      },
      linkedIn: {
        type: String,
        required: false,
      },
      twitter: {
        type: String,
        required: false,
      },
    },
    favouriteScriptures: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// export schema
module.exports = User = mongoose.model("User", UserSchema);

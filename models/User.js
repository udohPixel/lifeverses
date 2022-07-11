// import required libraries
const mongoose = require("mongoose");

// create schema object
const Schema = mongoose.Schema;

// create new instance of Schema
const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please enter a first name"],
      maxlength: 50,
    },
    lastname: {
      type: String,
      required: [true, "Please enter a last name"],
      maxlength: 50,
    },
    gender: {
      type: String,
      required: [true, "Please select a gender"],
      enum: {
        values: ["Male", "Female"],
        message: "{VALUE} is not a valid gender",
      },
    },
    username: {
      type: String,
      required: [true, "Please enter a username"],
      max: 50,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please enter a valid email address"],
      minlength: 5,
      maxlength: 50,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a valid password"],
      minlength: 5,
      maxlength: 1024,
    },
    profilePic: {
      type: String,
      // default: "https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg",
    },
    role: {
      type: String,
      required: [true, "Please select a role"],
      default: "User",
      enum: {
        values: ["User", "Editor", "Admin", "SuperAdmin"],
        message: "{VALUE} is not a valid role",
      },
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    bio: {
      type: String,
    },
    socialLinks: {
      facebook: {
        type: String,
        max: 50,
      },
      youtube: {
        type: String,
        max: 50,
      },
      instagram: {
        type: String,
        max: 50,
      },
      linkedin: {
        type: String,
        max: 50,
      },
      twitter: {
        type: String,
        max: 50,
      },
    },
  },
  { timestamps: true }
);

// export schema
module.exports = User = mongoose.model("User", UserSchema);

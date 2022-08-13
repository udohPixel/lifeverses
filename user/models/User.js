// import required libraries
const mongoose = require("mongoose");

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
      required: true,
    },
    profilePic: {
      type: String,
      // default: "https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg",
    },
    careerField: {
      type: String,
      enum: [
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
        "Transportation, Distribution and Logistics",
      ],
    },
    role: {
      type: String,
      default: "User",
      enum: ["User", "Editor", "Merchant", "Admin", "SuperAdmin"],
    },
    isActive: {
      type: Boolean,
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
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

// export schema
module.exports = User;

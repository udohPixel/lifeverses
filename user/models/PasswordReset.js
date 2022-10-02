// import required modules
const mongoose = require("mongoose");

// create schema object
const Schema = mongoose.Schema;

// create new instance of Schema
const PasswordResetSchema = new Schema(
  {
    email: {
      type: String,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpirationDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const PasswordReset = mongoose.model("PasswordReset", PasswordResetSchema);

// export schema
module.exports = PasswordReset;

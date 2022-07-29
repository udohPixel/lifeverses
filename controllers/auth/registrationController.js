// import required libraries
const bcrypt = require("bcryptjs");
const logger = require("../../logger/index");

// import User model
const User = require("../../models/User");

// user registration controller
const registrationController = async (req, res) => {
  try {
    // object destructuring assignment
    const {
      firstname,
      lastname,
      gender,
      username,
      email,
      password,
      profilePic,
    } = req.body;

    // fetch user by email from dB
    let isExistingEmail = await User.findOne({
      email: email,
    }).exec();

    // check if email exists or not in dB
    if (isExistingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email has already been taken. Try another",
      });
    }

    // fetch user by username from dB
    let isExistingUsername = await User.findOne({
      username: username,
    }).exec();

    if (isExistingUsername) {
      return res.status(400).json({
        success: false,
        message: "Username has already been taken. Try another",
      });
    }

    // change profile picture if male or female
    var defaultProfilePic;
    if (gender == "Male") {
      defaultProfilePic =
        "https://st4.depositphotos.com/3265223/21282/v/600/depositphotos_212821870-stock-illustration-default-avatar-photo-placeholder-profile.jpg";
    } else {
      defaultProfilePic =
        "https://st4.depositphotos.com/3265223/21281/v/600/depositphotos_212811214-stock-illustration-profile-placeholder-default-avatar.jpg";
    }

    // create a new instance of User to store the user-imputed values
    const newUser = new User({
      firstname,
      lastname,
      gender,
      username,
      email,
      password,
      profilePic: profilePic ?? defaultProfilePic,
    });

    // encrypt password
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        res.json({
          success: false,
          message: "Something went wrong while registering user",
        });
      }
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        // Store hashed password in DB.
        if (err) {
          res.json({
            success: false,
            message: "Something went wrong while registering user",
          });
        }
        // store hashed password in new user object
        newUser.password = hash;

        // save new user object in DB
        newUser.save();

        return res.status(200).json({
          success: true,
          message: "Registration successful",
          data: newUser,
        });
      });
    });
  } catch (err) {
    logger.error(
      new Error("Error occurred while registering user: ") + err?.message,
      {
        meta: registration,
      }
    );
    return res.status(500).json({
      success: false,
      message: "Something went wrong while registering user",
    });
  }
};

// export registration controller
module.exports = registrationController;

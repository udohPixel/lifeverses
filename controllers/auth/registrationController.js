// import required libraries
const bcrypt = require("bcryptjs");

// import User model
const User = require("../../models/User");

// user registration controller
const registrationController = async (req, res) => {
  try {
    const email = req.body.email;

    // fetch user by email from dB
    let user = await User.findOne({
      email: email.toLowerCase().trim(),
    }).exec();

    // check if email exists or not in dB
    if (user) {
      return res.status(400).json({
        EmailExistsError: "Email is already registered in the dB",
      });
    }

    // change profile picture if male or female
    var theprofilepic;
    if (req.body.gender == "Male") {
      theprofilepic =
        "https://st4.depositphotos.com/3265223/21282/v/600/depositphotos_212821870-stock-illustration-default-avatar-photo-placeholder-profile.jpg";
    } else {
      theprofilepic =
        "https://st4.depositphotos.com/3265223/21281/v/600/depositphotos_212811214-stock-illustration-profile-placeholder-default-avatar.jpg";
    }

    // create a new instance of User to store the user-imputed values
    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      gender: req.body.gender,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      profilePic:
        req.body.profilePic == "" || req.body.profilePic == null
          ? theprofilepic
          : req.body.profilePic,
    });

    // encrypt password
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        throw "Error occurred during password salting: " + err;
      }
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        // Store hashed password in DB.
        if (err) {
          throw "Error occurred during password hashing: " + err;
        }
        // store hashed password in new user object
        newUser.password = hash;

        // save new user object in DB
        newUser.save();

        return res.status(200).json(newUser);
      });
    });
  } catch (err) {
    return res.status(500).json({
      RegistrationError:
        "Error occurred while registering user: " + err?.message,
    });
  }
};

// export registration controller
module.exports = registrationController;

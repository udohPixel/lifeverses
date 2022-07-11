// import required libraries
const bcrypt = require("bcryptjs");

// import User model
const User = require("../../models/User");

// user registration controller
const registrationController = async (req, res) => {
  const email = req.body.email;

  // fetch user by email from dB
  await User.findOne({ email: email.toLowerCase().trim() })
    .then((user) => {
      // check if email exists or not in dB
      // if email already exist in dB
      if (user) {
        return res.status(400).json({
          EmailExistsError: "Email is already registered in the dB",
        });
      }
      // if email does not exist in dB
      if (!user) {
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
            throw (
              "Error occurred in registration:- During password salting: " + err
            );
          }
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            // Store hashed password in DB.
            if (err) {
              throw (
                "Error occurred in registration:- During password hashing: " +
                err
              );
            }
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                return res.status(201).json(user);
              })
              .catch((err) => {
                return res.status(500).json({
                  ValidationError: err,
                });
              });
          });
        });
      }
    })
    .catch((err) => {
      console.log(
        "Error occurred in registration:- While fetching user by email: " + err
      );
    });
};

// export registration controller
module.exports = registrationController;

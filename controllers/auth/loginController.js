// import required libraries
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../../settings/config");

// import User model
const User = require("../../models/User");

// user login controller
const loginController = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  await User.findOne({ email: email.toLowerCase().trim() })
    .then((user) => {
      // check if email exist or not in dB
      // if email does not exist in dB
      if (!user) {
        return res.status(404).json({
          EmailError: "No user was found with this email",
        });
      }
      // if email already exists in dB
      if (user) {
        // check if user-imputed password matches password in dB
        bcrypt
          .compare(password, user.password)
          .then((isMatched) => {
            if (isMatched) {
              // use payload and create token for user
              const payload = {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                gender: user.gender,
                username: user.username,
                email: user.email,
                profilePic: user.profilePic,
              };
              const accessToken = jwt.sign(
                payload,
                key.APP_PRIVATE_KEY,
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) {
                    console.log(err);
                  }
                  if (token) {
                    res.json({ success: true, token: "Bearer " + token });
                    // redirect user to profile page
                  }
                }
              );
            } else {
              return res.status(403).json({
                PasswordError: "Password is not correct",
              });
            }
          })
          .catch((err) => {
            console.log("Error occurred in login-:password section: " + err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// export login controller
module.exports = loginController;

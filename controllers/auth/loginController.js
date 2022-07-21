// import required libraries
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../../settings/config");

// import User model
const User = require("../../models/User");

// user login controller
const loginController = async (req, res) => {
  try {
    // object destructuring assignment
    const { email, password } = req.body;

    let user = await User.findOne({
      email: email.toLowerCase().trim(),
    }).exec();

    // check if email exist or not in dB
    if (!user) {
      return res.status(404).json({
        EmailError: "No user was found with this email",
      });
    }

    // check if user-imputed password matches password in dB
    let isMatched = bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(403).json({
        PasswordError: "Password is not correct",
      });
    }

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
          res.json({
            TokenError: "Error occurred while signing token: " + err?.message,
          });
        }
        if (token) {
          res.json({ success: true, token: "Bearer " + token });
        }
      }
    );
  } catch (err) {
    return res.status(500).json({
      LoginError: "Error occurred while logging in: " + err?.message,
    });
  }
};

// export login controller
module.exports = loginController;

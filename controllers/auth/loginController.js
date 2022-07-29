// import required libraries
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../../settings/config");
const logger = require("../../logger/index");

// import User model
const User = require("../../models/User");

// user login controller
const loginController = async (req, res) => {
  try {
    // object destructuring assignment
    const { email, password } = req.body;

    let user = await User.findOne({
      email: email,
    }).exec();

    // check if email exist or not in dB
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // check if user-imputed password matches password in dB
    let isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(403).json({
        success: false,
        message: "Invalid email or password",
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
            success: false,
            message: "Something went wrong while logging in",
          });
        }
        if (token) {
          res.json({
            success: true,
            message: "Logged in successfully",
            token: "Bearer " + token,
          });
        }
      }
    );
  } catch (err) {
    logger.error("Error occurred while logging in: " + err?.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while logging in",
    });
  }
};

// export login controller
module.exports = loginController;

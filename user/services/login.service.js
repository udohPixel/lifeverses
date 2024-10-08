// import required libraries
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// import required modules
const User = require("../models/User");
const ApplicationException = require("../../common/ApplicationException");
const {
  APP_PRIVATE_KEY,
  APP_LOGIN_TOKEN_EXPIRATION,
} = require("../../settings/settings.config");

// login service
const loginService = async (email, password) => {
  let user = await User.findOne({
    email: email.toLowerCase(),
  }).exec();

  // check if email exist or not in dB
  if (!user) {
    throw new ApplicationException("Invalid email or password", 400);
  }

  // check if user-imputed password matches password in dB
  let isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    throw new ApplicationException("Invalid email or password", 400);
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

  // generate token
  let token = jwt.sign(payload, APP_PRIVATE_KEY, {
    expiresIn: APP_LOGIN_TOKEN_EXPIRATION,
  });

  return token;
};

// export service
module.exports = loginService;

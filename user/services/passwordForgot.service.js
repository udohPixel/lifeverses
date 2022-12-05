// import required modules
const User = require("../models/User");
const crypto = require("crypto");
const ApplicationException = require("../../common/ApplicationException");
const sendMail = require("../helpers/sendMail");
const { randomHash } = require("../helpers/checkers");
const PasswordReset = require("../models/PasswordReset");

// password forgot service
const passwordForgotService = async (email, protocol, host) => {
  // fetch user by email
  let user = await User.findOne({ email: email.toLowerCase() }).exec();

  // check if user exists
  if (!user) {
    throw new ApplicationException("User does not exist", 404);
  }

  // generate password reset token
  let token = crypto.randomBytes(20).toString("hex");
  let passwordResetToken = randomHash(token);

  let passwordResetExpirationDate = Date.now() + 3 * 24 * 60 * 60 * 1000; // Expiration date set to 3 days

  // create password reset token and email
  let passwordResetInfo = await PasswordReset.create({
    email: user.email,
    passwordResetToken,
    passwordResetExpirationDate,
  });

  // send mail to user containing password reset link
  let link = protocol + "://" + host + "/password/reset/" + passwordResetToken;

  let passwordResetLink =
    "<div style='background-color: #ffffff; color: #000000'><h2>Please confirm the reset of your password by clicking the button below:</h2></div> <div><a target='_blank'  href='" +
    link +
    "' data-saferedirecturl='https://www.google.com/url?q=" +
    link +
    "'>Reset Password</a></div>";

  let passwordResetMessage = passwordResetLink;

  await sendMail({
    email: user.email,
    subject: "LifeVerses account password reset",
    message: passwordResetMessage,
  });

  return passwordResetToken;
};

// export service
module.exports = passwordForgotService;

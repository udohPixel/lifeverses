// import required modules
const User = require("../models/User");
const crypto = require("crypto");
const ApplicationException = require("../../common/ApplicationException");
const sendMail = require("../helpers/sendMail");

// password forgot service
const passwordForgotService = async (email, protocol, host) => {
  // fetch user by email
  let user = await User.findOne({ email: email.toLowerCase() }).exec();

  // check if user exists
  if (!user) {
    throw new ApplicationException("User does not exist", 404);
  }

  // generate password reset token
  let token = await crypto.randomBytes(20).toString("hex");

  user.passwordResetToken = await crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  user.passwordResetTime = Date.now() + 15 * 60 * 1000;

  // save password reset token and time
  await user.save();

  // send mail to user containing password reset link
  let link =
    protocol + "://" + host + "/password/reset/" + user.passwordResetToken;

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

  return user.passwordResetToken;
};

// export service
module.exports = passwordForgotService;

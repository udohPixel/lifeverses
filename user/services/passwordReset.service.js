// import required modules
const PasswordReset = require("../models/PasswordReset");
const User = require("../models/User");
const ApplicationException = require("../../common/ApplicationException");
const sendMail = require("../helpers/sendMail");
const { hashPassword } = require("../helpers/checkers");

// password reset service
const passwordResetService = async (token, password) => {
  // fetch user by passwordResetToken
  let isToken = await PasswordReset.findOne({
    passwordResetToken: token,
    passwordResetExpirationDate: { $gte: Date.now() }, // expirationDate should be greater than or equal to today's date
  }).exec();

  // check if token exists
  if (!isToken) {
    throw new ApplicationException(
      "Password reset link is invalid or has expired",
      400
    );
  }

  // fetch user by email
  let user = await User.findOne({ email: isToken.email });

  // check if user exists
  if (!user) {
    throw new ApplicationException("User does not exist", 404);
  }

  user.password = await hashPassword(password);

  // save password, password reset token and time
  await user.save();

  // send mail to user informing him/her of successful password change
  let passwordResetMessage =
    "<div><h2>Your password was changed successfully.</h2><p>Your new password is " +
    password +
    "</p></div>";

  await sendMail({
    email: user.email,
    subject: "Your LifeVerses account password has been changed",
    message: passwordResetMessage,
  });

  return user.password;
};

// export service
module.exports = passwordResetService;

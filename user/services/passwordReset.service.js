// import required modules
const User = require("../models/User");
const ApplicationException = require("../../common/ApplicationException");
const sendMail = require("../helpers/sendMail");
const { hashPassword } = require("../helpers/checkers");

// password reset service
const passwordResetService = async (token, password, confirmPassword) => {
  // fetch user by passwordResetToken
  let user = await User.findOne({
    passwordResetToken: token,
    passwordResetTime: { $gt: Date.now() },
  }).exec();

  // check if token exists
  if (!user) {
    throw new ApplicationException(
      "Password reset link is invalid or has expired",
      400
    );
  }

  // check if user-imputed passwords match
  if (password !== confirmPassword) {
    throw new ApplicationException("Passwords do not match", 400);
  }

  // remove password reset token and time (so a new one can be set in future reset)
  user.passwordResetToken = undefined;
  user.passwordResetTime = undefined;

  user.password = await hashPassword(password);

  // save password, password reset token and time
  await user.save();

  // send mail to user informing him/her of successful password change
  let passwordResetMessage =
    "<div><h2>Sending some HTML to test. Your password was changed successfully.</h2><p></p></div>";

  await sendMail({
    email: user.email,
    subject: "Your LifeVerses account password has been changed",
    message: passwordResetMessage,
  });

  return user.password;
};

// export service
module.exports = passwordResetService;

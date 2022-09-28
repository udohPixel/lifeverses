// import required modules
const User = require("../models/User");
const ApplicationException = require("../../common/ApplicationException");
const sendMail = require("../helpers/sendMail");
const bcrypt = require("bcryptjs");
const { hashPassword } = require("../helpers/checkers");

// update personal user service
const updatePersonalPasswordService = async (userId, oldPassword, password) => {
  // fetch user by id from dB
  let user = await User.findOne({ _id: userId }).exec();

  // check if user already exits in dB
  if (!user) {
    throw new ApplicationException("User does not exist", 404);
  }

  // check if user-imputed old password matches password in dB
  let isMatched = await bcrypt.compare(oldPassword, user.password);

  if (!isMatched) {
    throw new ApplicationException("Invalid password", 400);
  }

  // hash password
  user.password = await hashPassword(password);

  // save password
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
module.exports = updatePersonalPasswordService;

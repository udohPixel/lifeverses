// import required modules
const ApplicationException = require("../../common/ApplicationException");
const { hashPassword } = require("../helpers/checkers");

// import User model
const User = require("../models/User");

// register service
const registrationService = async (userInfo) => {
  // object destructuring assignment
  const {
    firstname,
    lastname,
    gender,
    username,
    email,
    password,
    profilePic,
    careerField,
  } = userInfo;

  // fetch user by email from dB
  let isExistingEmail = await User.findOne({
    email: email.toLowerCase(),
  }).exec();

  // check if email exists or not in dB
  if (isExistingEmail) {
    throw new ApplicationException("Email has already been taken. Try another");
  }

  // fetch user by username from dB
  let isExistingUsername = await User.findOne({
    username: username.toLowerCase(),
  }).exec();

  // check if username exists or not in dB
  if (isExistingUsername) {
    throw new ApplicationException(
      "Username has already been taken. Try another"
    );
  }

  // change profile picture if male or female
  let defaultProfilePic;
  if (gender === "Male") {
    defaultProfilePic =
      "https://st4.depositphotos.com/3265223/21282/v/600/depositphotos_212821870-stock-illustration-default-avatar-photo-placeholder-profile.jpg";
  } else {
    defaultProfilePic =
      "https://st4.depositphotos.com/3265223/21281/v/600/depositphotos_212811214-stock-illustration-profile-placeholder-default-avatar.jpg";
  }

  // create a new instance of User to store the user-imputed values
  const newUser = new User({
    ...userInfo,
    profilePic: profilePic ?? defaultProfilePic,
  });

  // store hashed password in new user object
  newUser.password = await hashPassword(newUser.password);

  // save new user object in DB
  let user;
  user = await newUser.save();

  return user;
};

// export service
module.exports = registrationService;

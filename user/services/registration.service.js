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
  let isExistingUsername = await User.find({
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

  // hash the raw password
  let hashedPassword = await hashPassword(password);

  // save new user object in DB
  const newUser = User.create({
    ...userInfo,
    profilePic: profilePic ?? defaultProfilePic,
    password: hashedPassword
  });

  return newUser;
};

// export service
module.exports = registrationService;

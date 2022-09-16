// import required modules
const User = require("../models/User");
const ApplicationException = require("../../common/ApplicationException");

// update user service
const updateUserService = async (userId, currentUserId, userInfo) => {
  // object destructuring assignment
  const {
    firstname,
    lastname,
    gender,
    username,
    email,
    profilePic,
    careerField,
    role,
    bio,
    facebook,
    youtube,
    instagram,
    linkedIn,
    twitter,
  } = userInfo;

  // fetch user by id from dB
  let user = await User.findOne({ _id: userId }).exec();

  const socialLinks = {
    facebook,
    youtube,
    instagram,
    linkedIn,
    twitter,
  };

  // pass user-imputed values into userValues object
  const userValues = {
    firstname,
    lastname,
    gender,
    username,
    email,
    profilePic,
    careerField,
    role,
    bio,
    socialLinks,
  };

  // check if user already exits in dB
  if (!user) {
    throw new ApplicationException("User does not exist", 404);
  }

  // fetch user by email except current user from dB
  let isExistingEmail = await User.findOne({ email: email.toLowerCase() })
    .where("_id")
    .ne(currentUserId)
    .exec();

  // check if username already exists
  if (isExistingEmail) {
    throw new ApplicationException(
      "Email has already been taken. Try another",
      409
    );
  }

  // fetch user by username except current user from dB
  let isExistingUsername = await User.findOne({
    username: username.toLowerCase(),
  })
    .where("_id")
    .ne(currentUserId)
    .exec();

  // check if username already exists
  if (isExistingUsername) {
    throw new ApplicationException(
      "Username has already been taken. Try another",
      409
    );
  }

  // update user
  user = await User.findOneAndUpdate(
    { _id: userId },
    { $set: userValues },
    { new: true }
  );

  return user;
};

// export service
module.exports = updateUserService;

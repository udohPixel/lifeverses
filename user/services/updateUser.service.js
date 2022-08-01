// import required modules
const User = require("../models/User");
const ApplicationException = require("../../common/ApplicationException");

// update user service
const updateUserService = async (
  req,
  firstname,
  lastname,
  gender,
  username,
  email,
  profilePic,
  role,
  isActive,
  bio,
  facebook,
  youtube,
  instagram,
  linkedIn,
  twitter
) => {
  // fetch user by id from dB
  let user = await User.findOne({ _id: req.params.id }).exec();

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
    role,
    isActive,
    bio,
    socialLinks,
  };

  // check if user already exits in dB
  if (!user) {
    throw new ApplicationException("User does not exist", 404);
  }

  // fetch user by email except current user from dB
  let isExistingEmail = await User.findOne({ email: email })
    .where("_id")
    .ne(req.user.id)
    .exec();

  // check if username already exists
  if (isExistingEmail) {
    throw new ApplicationException(
      "Email has already been taken. Try another",
      409
    );
  }

  // fetch user by username except current user from dB
  let isExistingUsername = await User.findOne({ username: username })
    .where("_id")
    .ne(req.user.id)
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
    { _id: req.params.id },
    { $set: userValues },
    { new: true }
  );

  return user;
};

// export service
module.exports = updateUserService;

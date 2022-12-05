// import required modules
const User = require("../models/User");
const ApplicationException = require("../../common/ApplicationException");

// delete user service
const deleteUserService = async (userId) => {
  // fetch user by id from dB
  let user = await User.findOne({ _id: userId }).exec();

  // check if user exists with provided id
  if (!user) {
    throw new ApplicationException("User does not exist", 404);
  }

  // delete user
  user = await User.findOneAndRemove({ _id: userId });

  return user;
};

// export service
module.exports = deleteUserService;

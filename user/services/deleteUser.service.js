// import required modules
const User = require("../models/User");
const ApplicationException = require("../../common/ApplicationException");

// delete user service
const deleteUserService = async (userId) => {
  // fetch user by id from dB
  const user = await User.findOneAndRemove({ _id: userId }).exec();

  // check if user exists with provided id
  if (!user) {
    throw new ApplicationException("User does not exist", 404);
  }

  return user;
};

// export service
module.exports = deleteUserService;

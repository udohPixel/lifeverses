// import required modules
const User = require("../models/User");
const ApplicationException = require("../../common/ApplicationException");

// change user state service
const changeUserStateService = async (userId) => {
  // fetch current user state
  let user = await User.findOne({ _id: userId }).exec();

  // check if user exists
  if (!user) throw new ApplicationException("User does not exist", 404);

  // toggle user state
  let theIsActive = (user.isActive = !user.isActive);

  const theUserValues = {
    "isActive": theIsActive
  }

  // update user state
  await User.updateOne(
    { _id: userId },
    { $set: theUserValues }
  );

  return user.isActive;
};

// export service
module.exports = changeUserStateService;

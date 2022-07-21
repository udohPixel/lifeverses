// import User model
const User = require("../../models/User");

// fetch all users controller
const getAllUsersController = async (req, res) => {
  try {
    // fetch all users from dB
    let users = await User.find().exec();

    // check if users exist
    if (!users) {
      return res.status(404).json({ UsersNotFoundError: "Users do not exist" });
    }

    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({
      FetchAllError: "Error occurred while fetching all users: " + err?.message,
    });
  }
};

// export controller
module.exports = getAllUsersController;

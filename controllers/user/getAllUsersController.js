// import User model
const User = require("../../models/User");
const logger = require("../../logger/index");

// fetch all users controller
const getAllUsersController = async (req, res) => {
  try {
    // fetch all users from dB
    let users = await User.find().exec();

    return res.status(200).json({
      success: true,
      message: "Users found successfully",
      data: users,
    });
  } catch (err) {
    logger.error("Error occurred while fetching all users: " + err?.message, {
      meta: get_all_users,
    });
    return res.status(500).json({
      success: false,
      message: "Something went wrong while finding all users",
    });
  }
};

// export controller
module.exports = getAllUsersController;

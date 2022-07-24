// import User model
const User = require("../../models/User");
const logger = require("../../logger/index");

// fetch user controller
const getPersonalUserController = async (req, res) => {
  try {
    // fetch user by id from dB
    let user = await User.findOne({ id: req.user.id }).exec();

    // check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User found successfully",
      data: user,
    });
  } catch (err) {
    logger.error("Error occurred while fetching user: " + err?.message, {
      meta: get_personal_user,
    });
    return res.status(500).json({
      success: false,
      message: "Something went wrong while finding user",
    });
  }
};

// export controller
module.exports = getPersonalUserController;

// import User model
const User = require("../../models/User");

// delete user controller
const deleteUserController = async (req, res) => {
  try {
    // fetch user by id from dB
    const user = await User.findOneAndRemove({ _id: req.params.id }).exec();

    // check if user exists with provided id
    if (!user) {
      return res.status(404).json({
        UserNotFoundError: "No user was found with id of " + req.params.id,
      });
    } else {
      return res.status(200).json({ success: "User deleted successfully" });
    }
  } catch (err) {
    return res.status(500).json({
      DeleteError: "Error occurred while finding user " + err?.message,
    });
  }
};

// export controller
module.exports = deleteUserController;

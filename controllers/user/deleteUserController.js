// import User model
const User = require("../../models/User");

// delete user controller
const deleteUserController = async (req, res) => {
  // fetch user by id from dB
  await User.findOneAndRemove({ _id: req.params.id })
    .then((user) => {
      // check if user exists with provided id
      if (!user) {
        return res.status(404).json({
          UserNotFoundError: "No user was found with id of " + req.params.id,
        });
      } else {
        return res.status(200).json({ success: "User deleted successfully" });
      }
    })
    .catch((err) => {
      console.log(
        "Error occurred in deleteUserController:- While finding user " + err
      );
    });
};

// export controller
module.exports = deleteUserController;

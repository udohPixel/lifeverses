// import User model
const User = require("../../models/User");

// fetch all users controller
const getAllUsersController = async (req, res) => {
  // fetch all users from dB
  await User.find()
    .then((users) => {
      // check if users exist
      if (!users) {
        return res.status(404).json({
          UsersNotFoundError: "No users were found",
        });
      } else {
        return res.status(200).json(users);
      }
    })
    .catch((err) => {
      console.log("Error fetching all users: " + err);
    });
};

// export controller
module.exports = getAllUsersController;

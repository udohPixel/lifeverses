// import User model
const User = require("../../models/User");

// fetch user controller
const getUserController = async (req, res) => {
  // fetch user by username from dB
  await User.findOne({ username: req.params.username })
    .then((user) => {
      // check if user exists with provided username
      if (!user) {
        return res.status(404).json({
          UserNotFoundError:
            "No user was found with username of " + req.params.username,
        });
      } else {
        return res.status(200).json(user);
      }
    })
    .catch((err) => {
      console.log("Error in fetching user by username: " + err);
    });
};

// export controller
module.exports = getUserController;

// import User model
const User = require("../../models/User");

// fetch user controller
const getPersonalUserController = async (req, res) => {
  // fetch user by id from dB
  await User.findOne({ _id: req.user.id })
    .then((user) => {
      // check if user exists
      if (!user) {
        return res
          .status(404)
          .json({ UserNotFoundError: "No user was found with this id" });
      } else {
        return res.status(200).json(user);
      }
    })
    .catch((err) => {
      console.log("Error occurred in user:- While finding user " + err);
    });
};

// export controller
module.exports = getPersonalUserController;

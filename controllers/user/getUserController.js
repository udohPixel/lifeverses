// import User model
const User = require("../../models/User");

// fetch user controller
const getUserController = async (req, res) => {
  try {
    // fetch user by username from dB
    let user = await User.findOne({ username: req.params.username }).exec();

    // check if user exists with provided username
    if (!user) {
      return res.status(404).json({ UserNotFoundError: "User does not exist" });
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({
      FetchError: "Error occurred while fetching user: " + err?.message,
    });
  }
};

// export controller
module.exports = getUserController;

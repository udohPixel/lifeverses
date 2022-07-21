// import User model
const User = require("../../models/User");

// fetch user controller
const getPersonalUserController = async (req, res) => {
  try {
    // fetch user by id from dB
    let user = await User.findOne({ id: req.user.id }).exec();

    // check if user exists
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
module.exports = getPersonalUserController;

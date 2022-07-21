// import User model
const User = require("../../models/User");

// update/save user controller
const updateUserPersonalController = async (req, res) => {
  try {
    // object destructuring assignment
    const {
      firstname,
      lastname,
      gender,
      username,
      email,
      profilePic,
      bio,
      facebook,
      youtube,
      instagram,
      linkedIn,
      twitter,
    } = req.body;

    // fetch user by id from dB
    let user = await User.findOne({ _id: req.user.id }).exec();

    const socialLinks = {
      facebook,
      youtube,
      instagram,
      linkedIn,
      twitter,
    };

    // pass user-imputed values into userValues object
    const userValues = {
      firstname,
      lastname,
      gender,
      username,
      email,
      profilePic,
      bio,
      socialLinks,
    };

    // check if user already exits in dB
    if (!user) {
      return res.status(404).json({
        UserNotFoundError: "User does not exist",
      });
    }

    // update user
    user = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: userValues },
      { new: true }
    );

    return res.json(user);
  } catch (err) {
    return res.status(500).json({
      UpdateError: "Error occurred while updating user: " + err?.message,
    });
  }
};

// export controller
module.exports = updateUserPersonalController;

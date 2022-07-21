// import User model
const User = require("../../models/User");

// update/save user controller
const updateUserController = async (req, res) => {
  try {
    // object destructuring assignment
    const {
      firstname,
      lastname,
      gender,
      username,
      email,
      profilePic,
      role,
      isActive,
      bio,
      facebook,
      youtube,
      instagram,
      linkedIn,
      twitter,
    } = req.body;

    // fetch user by id from dB
    let user = await User.findOne({ _id: req.params.id }).exec();

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
      role,
      isActive,
      bio,
      socialLinks,
    };

    // check if user already exits in dB
    if (!user) {
      return res.status(404).json({
        UserNotFoundError: "No user was found with this id",
      });
    }

    // update user
    user = await User.findOneAndUpdate(
      { _id: req.params.id },
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
module.exports = updateUserController;

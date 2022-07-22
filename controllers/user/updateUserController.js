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
        UserNotFoundError: "User does not exist",
      });
    }

    // fetch user by username except current user from dB
    let isExistingUsername = await User.findOne({ username: username })
      .where("_id")
      .ne(req.user.id)
      .exec();

    // fetch user by email except current user from dB
    let isExistingEmail = await User.findOne({ email: email })
      .where("_id")
      .ne(req.user.id)
      .exec();

    // check if username already exists
    if (isExistingUsername) {
      return res.status(409).json({
        UsernameExistsError: "Username has already been taken. Try another",
      });
    }

    // check if username already exists
    if (isExistingEmail) {
      return res.status(409).json({
        EmailExistsError: "Email has already been taken. Try another",
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

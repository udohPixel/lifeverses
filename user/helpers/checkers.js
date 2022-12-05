// import required modules
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const ApplicationException = require("../../common/ApplicationException");
const User = require("../models/User");

const checkerService = {
  // check if favourite has been added already
  isFavouriteAdded: async (userId, scriptureId) => {
    // get user by id
    let user = await User.findById(userId).exec();

    return user.favouriteScriptures.includes(scriptureId);
  },

  // hash password
  hashPassword: async (thePassword) => {
    // encrypt password
    // generate salt
    let salt = await bcrypt.genSalt(10);

    // check if salt was generated
    if (!salt) {
      throw new ApplicationException(
        "Unexpected error occurred while processing your request"
      );
    }

    // generate hash
    let hash = await bcrypt.hash(thePassword, salt);

    // check if password was hashed
    if (!hash) {
      throw new ApplicationException(
        "Unexpected error occurred while processing your request"
      );
    }

    return hash;
  },

  // generate random
  randomHash: (token) => {
    token = token || crypto.randomBytes(20).toString("hex");

    return crypto.createHash("sha512").update(token).digest("hex");
  },
};

// export helper
module.exports = checkerService;

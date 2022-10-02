// import required modules

const User = require("../models/User");

// get user statistics service
const getUserStatsService = () => {
  const date = new Date();

  // last year's date
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  // monthly statistics
  return User.aggregate([
    //
    { $match: { createdAt: { $gte: lastYear } } },

    { $project: { month: { $month: "$createdAt" } } },

    { $group: { _id: "$month", total: { $sum: 1 } } },
  ]);
};

// export service
module.exports = getUserStatsService;

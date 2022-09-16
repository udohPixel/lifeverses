// import required modules

const Order = require("../models/Order");

// get order statistics service
const getOrderStatsService = () => {
  const date = new Date();

  // last year's date
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  // monthly statistics
  return Order.aggregate([
    { $match: { createdAt: { $gte: lastYear } } },

    { $project: { month: { $month: "$createdAt" }, sales: "$totalPrice" } },

    { $group: { _id: "$month", total: { $sum: "$sales" } } },
  ]);
};

// export service
module.exports = getOrderStatsService;

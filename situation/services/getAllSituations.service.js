// import required modules
const Situation = require("../models/Situation");

// get all situations services
const getAllSituationsService = () => {
  // fetch situations from dB
  return Situation.find();
};

// export service
module.exports = getAllSituationsService;

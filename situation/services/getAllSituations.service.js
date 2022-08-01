// import required modules
const Situation = require("../models/Situation");
const ApplicationException = require("../../common/ApplicationException");

// get all situations services
const getAllSituationsService = async () => {
  // fetch situations from dB
  let situations = await Situation.find().exec();

  // check if situations exist
  if (!situations) {
    throw new ApplicationException("Situations do not exist", 404);
  }

  return situations;
};

// export service
module.exports = getAllSituationsService;

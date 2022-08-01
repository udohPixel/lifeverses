// import required modules
const Situation = require("../models/Situation");
const ApplicationException = require("../../common/ApplicationException");

// update situation service
const updateSituationService = async (req, title, colour, icon) => {
  // fetch situation by id from dB
  let situation = await Situation.findOne({ _id: req.params.id }).exec();

  // check if situation exists
  if (!situation) {
    throw new ApplicationException("Situation does not exist", 404);
  }

  // pass user-imputed fields into situationValues object
  const situationValues = { title, colour, icon };

  // update situation
  situation = await Situation.findOneAndUpdate(
    { _id: req.params.id },
    { $set: situationValues },
    { new: true }
  );

  return situation;
};

// export service
module.exports = updateSituationService;

// import required modules
const Situation = require("../models/Situation");
const ApplicationException = require("../../common/ApplicationException");
const { titleToSlug } = require("../../common/helpers");

// update situation service
const updateSituationService = async (situationId, title, colour, icon) => {
  // fetch situation by id from dB
  let situation = await Situation.findOne({ _id: situationId });

  // check if situation exists
  if (!situation) {
    throw new ApplicationException("Situation does not exist", 404);
  }

  let slug = titleToSlug(title);

  // pass user-imputed fields into situationValues object
  const situationValues = { title, slug, colour, icon };

  // update situation
  situation = await Situation.findOneAndUpdate(
    { _id: situationId },
    { $set: situationValues },
    { new: true }
  );

  return situation;
};

// export service
module.exports = updateSituationService;

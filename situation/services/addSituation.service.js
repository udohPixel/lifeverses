// import required modules
const Situation = require("../models/Situation");
const ApplicationException = require("../../common/ApplicationException");

const addSituationService = async (title, colour, icon) => {
  // fetch situation by title from dB
  let situation = await Situation.findOne({ title }).exec();

  // check if situation exists
  if (situation) {
    throw new ApplicationException("Situation already exist. Try another", 400);
  }

  let slug = title.replace(/\s+/g, "-").toLowerCase();

  // create a new instance of Situation to store the user-imputed values
  const newSituation = new Situation({
    title,
    slug,
    colour,
    icon,
  });

  // save new situation to dB
  situation = await newSituation.save();

  return situation;
};

// export service
module.exports = addSituationService;

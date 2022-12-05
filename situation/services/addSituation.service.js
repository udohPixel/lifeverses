// import required modules
const Situation = require("../models/Situation");
const ApplicationException = require("../../common/ApplicationException");
const { titleToSlug } = require("../../common/helpers");

const addSituationService = async (title, colour, icon) => {
  // fetch situation by title from dB
  let situation = await Situation.findOne({ title }).exec();

  // check if situation exists
  if (situation) {
    throw new ApplicationException("Situation already exist. Try another", 400);
  }

  let slug = titleToSlug(title);

  // create new situation
  situation = await Situation.create({
    title,
    slug,
    colour,
    icon,
  });

  return situation;
};

// export service
module.exports = addSituationService;

// import required modules
const Scripture = require("../models/Scripture");

// add scripture service
const addScriptureService = async (req, bibleTitle, bibleChapter) => {
  // fetch scripture by id from dB
  let scripture = await Scripture.findOne({
    _id: req.params.situation_id,
  }).exec();

  // remember to check for repetition BELOW...//

  // get other data
  let userId = req.user.id;
  let situationId = req.params.situation_id;
  let bibleVerses = req.body.bibleVerses.split(",");

  // create a new instance of Scripture to store the user-imputed values
  const newScripture = new Scripture({
    userId,
    situationId,
    bibleTitle,
    bibleChapter,
    bibleVerses,
  });

  // update scripture scripture
  scripture = await newScripture.save();

  return scripture;
};

// export service
module.exports = addScriptureService;

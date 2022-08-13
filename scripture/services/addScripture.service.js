// import required modules
const Scripture = require("../models/Scripture");

// add scripture service
const addScriptureService = async (
  userId,
  situationId,
  bibleTitle,
  bibleChapter,
  bibleVerses
) => {
  // fetch scripture by id from dB
  let scripture = await Scripture.findOne({
    _id: situationId,
  }).exec();

  // remember to check for repetition BELOW...//

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

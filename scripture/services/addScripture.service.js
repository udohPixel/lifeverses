// import required modules
const ApplicationException = require("../../common/ApplicationException");
const { scriptureSlug } = require("../helpers/checkers");
const Scripture = require("../models/Scripture");

// add scripture service
const addScriptureService = async (
  userId,
  theSituationId,
  bibleTitle,
  bibleChapter,
  bibleVerses
) => {
  let theSlug = scriptureSlug(bibleVerses, bibleTitle, bibleChapter);

  // fetch scripture by id from dB
  let scripture = await Scripture.findOne({
    situationId: theSituationId,
    slug: theSlug,
  }).exec();

  // check if scripture exists
  if (scripture) {
    throw new ApplicationException(
      "Scripture already exists for this situation. Try another"
    );
  }

  // create a new instance of Scripture to store the user-imputed values
  const newScripture = new Scripture({
    userId,
    slug: theSlug,
    situationId: theSituationId,
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

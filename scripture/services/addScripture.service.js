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
  };

  // update scripture scripture
  const newScripture = await Scripture.create({
    userId,
    slug: theSlug,
    situationId: theSituationId,
    bibleTitle,
    bibleChapter,
    bibleVerses,
  });

  return newScripture;
};

// export service
module.exports = addScriptureService;

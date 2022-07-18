// import Scripture model
const Scripture = require("../../models/Scripture");

// add new scripture controller
const addScriptureController = async (req, res) => {
  try {
    // object destructuring assignment
    const { bibleTitle, bibleChapter } = req.body;

    // fetch scripture by id from dB
    let scripture = await Scripture.findOne({
      _id: req.params.situation_id,
    }).exec();

    // remember to check for repetition BELOW...//

    // get other data
    var userId = req.user.id;
    var situationId = req.params.situation_id;
    var bibleVerses = req.body.bibleVerses.split(",");

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

    return res.status(200).json(scripture);
  } catch (err) {
    return res.status(500).json({
      SaveError: "Error occurred while adding new scripture: " + err?.message,
    });
  }
};

// export controller
module.exports = addScriptureController;

// import Situation model
const Situation = require("../../models/Situation");

// add new scripture controller
const addScriptureController = async (req, res) => {
  // fetch situation by id from dB
  await Situation.findOne({ _id: req.params.situation_id })
    .then((situation) => {
      // check if situation exists
      if (!situation) {
        return res.status(404).json({
          SituationNotFoundError: "No situation was found with this id",
        });
      }
      if (situation) {
        // declare scriptureValues object
        const scriptureValues = {};

        // pass user-imputed values into scriptureValues object
        if (req.body.bibleTitle)
          scriptureValues.bibleTitle = req.body.bibleTitle;
        if (req.body.bibleVerse)
          scriptureValues.bibleVerse = req.body.bibleVerse;

        // update situation scripture
        situation
          .updateOne({ $push: { scriptures: scriptureValues } })
          .then((situation) => {
            return res.status(200).json(situation);
          })
          .catch((err) => {
            console.log(
              "Error occurred in addScriptureController:- While updating scripture " +
                err
            );
          });
      }
    })
    .catch((err) => {
      console.log(
        "Error occurred in addScriptureController:- While finding situation " +
          err
      );
    });
};

// export controller
module.exports = addScriptureController;

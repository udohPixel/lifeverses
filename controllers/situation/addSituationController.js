// import Situation model
const Situation = require("../../models/Situation");

// add situation controller
const addSituationController = async (req, res) => {
  await Situation.findOne({ title: req.body.title })
    .then((situation) => {
      // check if situation exists in dB with the title provided
      if (situation) {
        return res.status(404).json({
          TitleExistsError: "Situation found with the same title in dB",
        });
      }
      if (!situation) {
        // create a new instance of Situation to store the user-imputed values
        const newSituation = new Situation({
          title: req.body.title,
          colour: req.body.colour,
          icon: req.body.icon,
          bibleTitle: req.body.bibleTitle,
          bibleVerse: req.body.bibleVerse,
        });

        // save new situation to dB
        newSituation
          .save()
          .then((situation) => {
            return res.status(201).json(situation);
          })
          .catch((err) => {
            return res.status(500).json({
              SaveError:
                "Error occurred in addSituationController:- While saving new situation" +
                err,
            });
          });
      }
    })
    .catch((err) => {
      console.log(
        "Error occurred in registration:- While fetching situation by title: " +
          err
      );
    });
};

// export controller
module.exports = addSituationController;

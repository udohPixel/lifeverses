// import Situation model
const Situation = require("../../models/Situation");

// update situation controller
const updateSituationController = async (req, res) => {
  // declare situationValues
  const situationValues = {};

  // pass user-imputed fields into situationValues object
  if (req.body.title) situationValues.title = req.body.title;
  if (req.body.colour) situationValues.colour = req.body.colour;
  if (req.body.icon) situationValues.icon = req.body.icon;

  // fetch situation by id from dB
  await Situation.findOne({ _id: req.params.id })
    .then((situation) => {
      // check if situation exists in dB
      if (!situation) {
        return res.status(404).json({
          SituationNotFoundError: "No situation was found with this id",
        });
      }
      if (situation) {
        // update situation
        Situation.findOneAndUpdate(
          { _id: req.params.id },
          { $set: situationValues },
          { new: true }
        )
          .then((situation) => {
            return res.json(situation);
          })
          .catch((err) => {
            console.log(
              "Error occured in Situaation update:- While updating situation" +
                err
            );
          });
      }
    })
    .catch((err) => {
      console.log(
        "Error occurred in Situation update:- While fetching situation by id" +
          err
      );
    });
};

// export controller
module.exports = updateSituationController;

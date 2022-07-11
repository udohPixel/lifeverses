// import Situation model
const Situation = require("../../models/Situation");

// fetch situation controller
const getSituationController = async (req, res) => {
  // fetch situation by id from dB
  await Situation.findOne({ _id: req.params.id })
    .then((situation) => {
      // check if situation exists
      if (!situation) {
        return res.status(404).json({
          SituationNotFound: "No situation was found with this id",
        });
      } else {
        res.status(200).json(situation);
      }
    })
    .catch((err) => {
      console.log("Error in fetching situation by id:" + err);
    });
};

// export controller
module.exports = getSituationController;

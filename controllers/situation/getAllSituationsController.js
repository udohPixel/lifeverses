// import Situation model
const Situation = require("../../models/Situation");

// fetch all situations controller
const getAllSituationsController = async (req, res) => {
  // fetch situations from dB
  await Situation.find()
    .then((situations) => {
      // check if situations exist
      if (!situations) {
        return res.status(404).json({
          SituationsNotFoundError: "No situations were found",
        });
      } else {
        return res.status(200).json(situations);
      }
    })
    .catch((err) => {
      console.log("Error in fetching all situations" + err);
    });
};

// export controller
module.exports = getAllSituationsController;

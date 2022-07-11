// import Situation model
const Situation = require("../../models/Situation");

// delete situation controller
const deleteSituationController = async (req, res) => {
  // fetch situation from dB
  await Situation.findByIdAndRemove({ _id: req.params.id })
    .then((situation) => {
      // check if situation exist in dB
      if (!situation) {
        return res.status(404).json({
          SituationNotFoundError:
            "No situation was found with id of " + req.params.id,
        });
      } else {
        return res.status(200).json({
          success: "Situation deleted successfully",
        });
      }
    })
    .catch((err) => {
      console.log(
        "Error occurred in deleteSituationController:- While finding situation" +
          err
      );
    });
};

// export controller
module.exports = deleteSituationController;

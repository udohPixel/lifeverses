// import Situation model
const Situation = require("../../models/Situation");
const logger = require("../../logger/index");

// delete situation controller
const deleteSituationController = async (req, res) => {
  try {
    // fetch situation by id from dB
    let situation = await Situation.findOne({ _id: req.params.id }).exec();

    // check if situation exists
    if (!situation) {
      return res.status(404).json({
        success: false,
        message: "Situation does not exist",
      });
    }

    // delete situation
    situation = await Situation.findOneAndRemove({ _id: req.params.id });

    return res.status(200).json({
      success: true,
      message: "Situation deleted successfully",
      data: situation,
    });
  } catch (err) {
    logger.error("Error occurred while deleting situation: " + err?.message, {
      meta: delete_situation,
    });
    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting situation",
    });
  }
};

// export controller
module.exports = deleteSituationController;

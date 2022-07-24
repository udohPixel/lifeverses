// import Situation model
const Situation = require("../../models/Situation");
const logger = require("../../logger/index");

// fetch situation controller
const getSituationController = async (req, res) => {
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

    return res.status(200).json({
      success: true,
      message: "Situation found successfully",
      data: situation,
    });
  } catch (err) {
    logger.error("Error occurred while fetching situation: " + err?.message, {
      meta: get_situation,
    });
    return res.status(500).json({
      FetchError: "Something went wrong while finding situation",
    });
  }
};

// export controller
module.exports = getSituationController;

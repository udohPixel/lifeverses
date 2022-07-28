// import Situation model
const Situation = require("../../models/Situation");
const logger = require("../../logger/index");

// fetch all situations controller
const getAllSituationsController = async (req, res) => {
  try {
    // fetch situations from dB
    let situations = await Situation.find().exec();

    // check if situations exist
    if (!situations) {
      return res.status(404).json({
        success: false,
        message: "Situations do not exist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Situations found successfully",
      data: situations,
    });
  } catch (err) {
    logger.error("Error occurred while fetching situations: " + err?.message, {
      meta: get_all_situations,
    });
    return res.status.json(500).json({
      success: false,
      message: "Something went wrong while finding all situations",
    });
  }
};

// export controller
module.exports = getAllSituationsController;

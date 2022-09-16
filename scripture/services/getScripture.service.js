// import required modules
const ApplicationException = require("../../common/ApplicationException");
const Scripture = require("../models/Scripture");

// get scripture service
const getScriptureService = async (scriptureId) => {
  // fetch scripture by id
  let scripture = await Scripture.findOne({ _id: scriptureId }).exec();

  // check if scripture exists
  if (!scripture) {
    throw new ApplicationException("Scripture does not exist", 404);
  }

  return scripture;
};

// export service
module.exports = getScriptureService;

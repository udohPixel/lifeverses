// import required modules
const scriptureFilters = require("../helpers/ScriptureFilters");
const Scripture = require("../models/Scripture");

// get all scriptures service
const getAllPersonalScripturesService = (theUserId, queryStr) => {
  // fetch scriptures
  let query = Scripture.find({ userId: theUserId });

  // filter scriptures
  return scriptureFilters.filterItems(query, queryStr);
};

// export service
module.exports = getAllPersonalScripturesService;

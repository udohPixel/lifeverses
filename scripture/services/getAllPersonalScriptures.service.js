// import required modules
const scriptureFilters = require("../helpers/ScriptureFilters");

// get all scriptures service
const getAllPersonalScripturesService = (theUserId, queryStr) => {
  // filter scriptures
  return scriptureFilters.filterPersonalItems(theUserId, queryStr);
};

// export service
module.exports = getAllPersonalScripturesService;

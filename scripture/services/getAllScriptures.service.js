// import required modules
const scriptureFilters = require("../helpers/ScriptureFilters");

// get all scriptures service
const getAllScripturesService = (queryStr) => {
  // filter scriptures
  return scriptureFilters.filterItems(queryStr);
};

// export service
module.exports = getAllScripturesService;

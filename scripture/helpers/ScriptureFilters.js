const Scripture = require("../models/Scripture");

// app features
class ScriptureFilters {
  // scripture bibleTitle filter function
  filterItems(queryStr) {
    let queryObject = {};

    // find by bibleTitle
    if (queryStr.bibleTitle) {
      queryObject.bibleTitle = String(queryStr.bibleTitle).split(",");
    }

    return Scripture.find(queryObject).exec();
  }

  // personal scripture bibleTitle filter function
  filterPersonalItems(theUserId, queryStr) {
    let queryObject = {};

    // find by bibleTitle
    if (queryStr.bibleTitle) {
      queryObject.bibleTitle = String(queryStr.bibleTitle).split(",");
    }

    return Scripture.find(queryObject).where("userId").equals(theUserId).exec();
  }
}

const scriptureFilters = new ScriptureFilters();

// export
module.exports = scriptureFilters;

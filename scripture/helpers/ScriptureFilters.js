// app features
class ScriptureFilters {
  // scripture bibleTitle filter function
  filterItems(query, queryStr) {
    let queryObject = {};

    // find by bibleTitle
    if (queryStr.bibleTitle) {
      queryObject.bibleTitle = String(queryStr.bibleTitle).split(",");
    }

    return query;
  }
}

const scriptureFilters = new ScriptureFilters();

// export
module.exports = scriptureFilters;

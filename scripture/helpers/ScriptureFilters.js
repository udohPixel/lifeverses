// app features
class ScriptureFilters {
  // scripture bibleTitle filter function
  filterItems(query, queryStr) {
    let theBibleTitle = queryStr.bibleTitle && queryStr.bibleTitle.split(",");

    let queryObject = {};

    if (queryStr.bibleTitle) {
      queryObject = { bibleTitle: theBibleTitle };
    } else {
      queryObject = {};
    }

    // find by bibleTitle
    query = query.find(queryObject).exec();

    return query;
  }
}

const scriptureFilters = new ScriptureFilters();

// export
module.exports = scriptureFilters;

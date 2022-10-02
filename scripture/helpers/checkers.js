const checkerService = {
  // generate slug
  scriptureSlug: (bibleVerses, bibleTitle, bibleChapter) => {
    let theBibleVerses =
      bibleVerses.length > 1
        ? bibleVerses[0] + "-" + bibleVerses[bibleVerses.length - 1]
        : bibleVerses[0];

    return (
      bibleTitle.replace(/\s+/g, "-").toLowerCase() +
      bibleChapter +
      "-" +
      theBibleVerses
    );
  },
};

// export helper
module.exports = checkerService;

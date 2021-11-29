db.movies.aggregate([
  {
    $match: {
      $and: [
        { "imdb.rating": { $gte: 7 } },
        { $and: [
          { genres: { $ne: "Crime" } },
          { genres: { $ne: "Horror" } },
        ] },
        { rated: { $in: ["PG", "G"] } },
        { languages: { $all: ["English", "Spanish"] } },
      ],
    },
  },
]);

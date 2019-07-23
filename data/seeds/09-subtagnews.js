exports.seed = function(knex, Promise) {
  return knex("subtagnews").insert([
    {
      subtag_id: 1,
      news_id: 1,
    },
    {
      subtag_id: 2,
      news_id: 1,
    },
    {
      subtag_id: 3,
      news_id: 1,
    },
    {
      subtag_id: 4,
      news_id: 2,
    },
    {
      subtag_id: 5,
      news_id: 2,
    },
    {
      subtag_id: 6,
      news_id: 2,
    },
    {
      subtag_id: 7,
      news_id: 3,
    },
    {
      subtag_id: 8,
      news_id: 3,
    },
    {
      subtag_id: 9,
      news_id: 3,
    },
    {
      subtag_id: 1,
      news_id: 4,
    },
    {
      subtag_id: 4,
      news_id: 4,
    },
    {
      subtag_id: 7,
      news_id: 5,
    },
  ]);
};

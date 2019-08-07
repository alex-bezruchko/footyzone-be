exports.seed = function(knex, Promise) {
  return knex("tagnews").insert([
    {
      tag_id: 1,
      news_id: 1,
    },
    {
      tag_id: 2,
      news_id: 1,
    },
    {
      tag_id: 3,
      news_id: 1,
    },
    {
      tag_id: 4,
      news_id: 2,
    },
    {
      tag_id: 5,
      news_id: 2,
    },
    {
      tag_id: 6,
      news_id: 2,
    },
    {
      tag_id: 7,
      news_id: 3,
    },
    {
      tag_id: 8,
      news_id: 3,
    },
    {
      tag_id: 9,
      news_id: 3,
    },
    {
      tag_id: 1,
      news_id: 4,
    },
    {
      tag_id: 4,
      news_id: 4,
    },
    {
      tag_id: 7,
      news_id: 5,
    },
  ]);
};

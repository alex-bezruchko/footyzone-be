exports.seed = function(knex, Promise) {
  return knex("newslikes").insert([
    {
      user_id: 1,
      news_id: 1,
    },
    {
      user_id: 1,
      news_id: 2,
    },
    {
      user_id: 6,
      news_id: 2,
    },
    {
      user_id: 6,
      news_id: 1,
    },
    {
      user_id: 7,
      news_id: 1,
    },
    {
      user_id: 5,
      news_id: 1,
    },
    {
      user_id: 1,
      news_id: 3,
    },
    {
      user_id: 2,
      news_id: 1,
    },
    {
      user_id: 2,
      news_id: 2,
    },
    {
      user_id: 2,
      news_id: 3,
    },
    {
      user_id: 3,
      news_id: 1,
    },
    {
      user_id: 3,
      news_id: 2,
    },
    {
      user_id: 3,
      news_id: 3,
    },
    {
      user_id: 1,
      news_id: 4,
    },
    {
      user_id: 1,
      news_id: 5,
    },
    {
      user_id: 1,
      news_id: 6,
    },
    {
      user_id: 7,
      news_id: 6,
    },
    {
      user_id: 6,
      news_id: 3,
    },
    {
      user_id: 4,
      news_id: 3,
    },
    {
      user_id: 4,
      news_id: 2,
    },
  ]);
};

exports.seed = function (knex, Promise) {
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
      user_id: 4,
      news_id: 2,
    },
    {
      user_id: 1,
      news_id: 4,
    },
    {
      8
    },
    {
      user_id: 4,
      news_id: 6,
    },
    {
      user_id: 1,
      news_id: 7,
    },
    {
      user_id: 2,
      news_id: 8,
    },
    {
      user_id: 2,
      news_id: 9,
    },
    {
      user_id: 2,
      news_id: 6,
    },
    {
      user_id: 3,
      news_id: 9,
    },
    {
      user_id: 3,
      news_id: 5,
    },
    {
      user_id: 3,
      news_id: 6,
    },
    {
      user_id: 1,
      news_id: 9,
    },
    {
      user_id: 1,
      news_id: 10,
    },
    {
      user_id: 1,
      news_id: 12,
    },
    {
      user_id: 2,
      news_id: 7,
    },
    {
      user_id: 2,
      news_id: 9,
    },
    {
      user_id: 4,
      news_id: 8,
    },
    {
      user_id: 4,
      news_id: 13,
    },
    {
      user_id: 1,
      news_id: 14,
    },
    {
      user_id: 2,
      news_id: 5,
    },
    {
      user_id: 3,
      news_id: 8,
    },
  ]);
};

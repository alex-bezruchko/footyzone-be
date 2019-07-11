exports.seed = function(knex, Promise) {
  return knex("categories").insert([
    {
      category_name: "news",
    },
    { category_name: "videos" },
    { category_name: "blog" },
  ]);
};

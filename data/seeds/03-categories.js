exports.seed = function(knex, Promise) {
  return knex("categories").insert([
    {
      category_name: "news",
    },
    { category_name: "blog" },
    { category_name: "videos" },
    { category_name: "old-school" },
  ]);
};

exports.seed = function(knex, Promise) {
  return knex("categories").insert([
    { category_name: "Champions League" }, // 1
    { category_name: "Premier League" }, // 2
    { category_name: "La Liga" },
  ]);
};

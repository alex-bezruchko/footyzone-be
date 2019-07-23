exports.seed = function(knex, Promise) {
  return knex("tags").insert([
    {
      tag_name: "Teams",
      tag_slug: "teams",
    },
    {
      tag_name: "Players",
      tag_slug: "players",
    },
    {
      tag_name: "Transfers",
      tag_slug: "transfers",
    },
  ]);
};

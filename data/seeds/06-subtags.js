exports.seed = function(knex, Promise) {
  return knex("subtags").insert([
    {
      subtag_name: "Leo Messi",
      subcat_slug: "messi",
      tag_id: 2,
    },
    {
      subtag_name: "Ronaldo",
      subcat_slug: "ronaldo",
      tag_id: 2,
    },
    {
      subtag_name: "Manchester United",
      subcat_slug: "manutd",
      tag_id: 1,
    },
    {
      subtag_name: "Real Madrid",
      subcat_slug: "real-madrid",
      tag_id: 2,
    },
    {
      subtag_name: "Liverpool",
      subcat_slug: "liverpool",
      tag_id: 2,
    },
    {
      subtag_name: "Dembele",
      subcat_slug: "dembele",
      tag_id: 2,
    },

    {
      subtag_name: "Barcelona",
      subcat_slug: "barcelona",
      tag_id: 1,
    },
    {
      subtag_name: "Neymar Jr",
      subcat_slug: "neymar",
      tag_id: 2,
    },
    {
      subtag_name: "Raheem Sterling",
      subcat_slug: "raheem-sterling",
      tag_id: 2,
    },
  ]);
};

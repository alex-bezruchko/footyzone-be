exports.seed = function(knex, Promise) {
  return knex("subtags").insert([
    {
      subtag_name: "Leo Messi",
      subtag_slug: "messi",
      tag_id: 2,
    },
    {
      subtag_name: "Ronaldo",
      subtag_slug: "ronaldo",
      tag_id: 2,
    },
    {
      subtag_name: "Manchester United",
      subtag_slug: "manutd",
      tag_id: 1,
    },
    {
      subtag_name: "Real Madrid",
      subtag_slug: "real-madrid",
      tag_id: 1,
    },
    {
      subtag_name: "Liverpool",
      subtag_slug: "liverpool",
      tag_id: 1,
    },
    {
      subtag_name: "Dembele",
      subtag_slug: "dembele",
      tag_id: 2,
    },

    {
      subtag_name: "Barcelona",
      subtag_slug: "barcelona",
      tag_id: 1,
    },
    {
      subtag_name: "Neymar Jr",
      subtag_slug: "neymar",
      tag_id: 2,
    },
    {
      subtag_name: "Raheem Sterling",
      subtag_slug: "raheem-sterling",
      tag_id: 2,
    },
    {
      subtag_name: "PSG",
      subtag_slug: "psg",
      tag_id: 1,
    },
    {
      subtag_name: "Bayern Munich",
      subtag_slug: "bayern-munich",
      tag_id: 1,
    },
    {
      subtag_name: "Gareth Bale",
      subtag_slug: "gareth-bale",
      tag_id: 2,
    },
  ]);
};

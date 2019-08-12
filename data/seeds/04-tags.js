exports.seed = function (knex, Promise) {
  return knex("tags").insert([
    {
      tag_name: "Leo Messi",
      tag_slug: "messi",
    },
    {
      tag_name: "Ronaldo",
      tag_slug: "ronaldo",
    },
    {
      tag_name: "Manchester United",
      tag_slug: "manutd",
    },
    {
      tag_name: "Real Madrid",
      tag_slug: "real-madrid",
    },
    {
      tag_name: "Liverpool",
      tag_slug: "liverpool",
    },
    {
      tag_name: "Dembele",
      tag_slug: "dembele",
    },

    {
      tag_name: "Barcelona",
      tag_slug: "barcelona",
    },
    {
      tag_name: "Neymar Jr",
      tag_slug: "neymar",
    },
    {
      tag_name: "Raheem Sterling",
      tag_slug: "raheem-sterling",
    },
    {
      tag_name: "PSG",
      tag_slug: "psg",
    },
    {
      tag_name: "Bayern Munich",
      tag_slug: "bayern-munich",
    },
    {
      tag_name: "Gareth Bale",
      tag_slug: "gareth-bale",
    },
    {
      tag_name: "Kante",
      tag_slug: "kante",
    },
    {
      tag_name: "Arsenal",
      tag_slug: "arsenal",
    },
    {
      tag_name: "Chelsea",
      tag_slug: "chelsea",
    },
  ]);
};

exports.seed = function (knex, Promise) {
  return knex("subcategories").insert([
    {
      subcat_name: "Champions League",
      subcat_slug: "uefacl",
      category_id: 1,
      logo: "https://res.cloudinary.com/htg1iqq1p/image/upload/v1565535779/mmr1dusiwaotfis0oswj.svg"
    },
    {
      subcat_name: "Premier League",
      subcat_slug: "epl",
      category_id: 1,
      logo: "https://res.cloudinary.com/htg1iqq1p/image/upload/v1565535820/kwygegej0mgphyah0zg0.png"
    },
    {
      subcat_name: "La Liga",
      subcat_slug: "laliga",
      category_id: 1,
      logo: "https://res.cloudinary.com/htg1iqq1p/image/upload/v1565535814/nd2sp2hsx5yu7tjqqlfu.png"
    },
    {
      subcat_name: "Goals",
      subcat_slug: "goals",
      category_id: 2,
      logo: ""
    },
    {
      subcat_name: "Highlights",
      subcat_slug: "highlights",
      category_id: 2,
      logo: ""
    },
    {
      subcat_name: "Interviews",
      subcat_slug: "interviews",
      category_id: 2,
      logo: ""
    },

    {
      subcat_name: "Players",
      subcat_slug: "players",
      category_id: 3,
      logo: "https://res.cloudinary.com/htg1iqq1p/image/upload/v1565535951/fjz274henl8mpsq4hrdo.jpg"
    },
    {
      subcat_name: "Teams",
      subcat_slug: "teams",
      category_id: 3,
      logo: "https://res.cloudinary.com/htg1iqq1p/image/upload/v1565535932/esovm2caw3z6xzog2rsz.jpg"
    },
    {
      subcat_name: "Coaches",
      subcat_slug: "coaches",
      category_id: 3,
      logo: "https://res.cloudinary.com/htg1iqq1p/image/upload/v1565535942/gq2d79qxemb7znxigm3h.png"
    },
  ]);
};

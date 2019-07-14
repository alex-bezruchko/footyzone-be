exports.seed = function(knex, Promise) {
  return knex("subcategories").insert([
    {
      subcat_name: "Champions League",
      subcat_slug: "uefacl",
      category_id: 1,
    },
    {
      subcat_name: "Premier League",
      subcat_slug: "epl",
      category_id: 1,
    },
    {
      subcat_name: "La Liga",
      subcat_slug: "laliga",
      category_id: 1,
    },
    // {
    //   subcat_name: "Goals",
    //   subcat_slug: "goals",
    //   category_id: 2,
    // },
    // {
    //   subcat_name: "Highlights",
    //   subcat_slug: "highlights",
    //   category_id: 2,
    // },
    // {
    //   subcat_name: "Interviews",
    //   subcat_slug: "interviews",
    //   category_id: 2,
    // },
    {
      subcat_name: "Blog",
      subcat_slug: "blog",
      category_id: 3,
    },
    {
      subcat_name: "Old School",
      subcat_slug: "old-school",
      category_id: 3,
    },
  ]);
};

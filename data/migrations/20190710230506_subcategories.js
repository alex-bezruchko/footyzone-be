exports.up = function (knex, Promise) {
  return knex.schema.createTable("subcategories", function (subcategories) {
    subcategories.increments();
    subcategories
      .text("subcat_name", 255)
      .notNullable()
      .unique();
    subcategories.text("subcat_logo", 255).unique();
    subcategories.text("subcat_slug", 255).unique();
    subcategories.text("logo", 255);
    subcategories
      .integer("category_id")
      .unsigned()
      .references("id")
      .inTable("categories");
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("subcategories");
};

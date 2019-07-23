exports.up = function(knex, Promise) {
  return knex.schema.createTable("subtags", function(subtags) {
    subtags.increments();
    subtags
      .text("subtag_name", 255)
      .notNullable()
      .unique();
    subtags
      .text("subtag_slug", 255)
      .notNullable()
      .unique();
    subtags
      .integer("tag_id")
      .unsigned()
      .references("id")
      .inTable("tags");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("subtags");
};

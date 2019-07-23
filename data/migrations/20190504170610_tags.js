exports.up = function(knex, Promise) {
  return knex.schema.createTable("tags", function(tags) {
    tags.increments();
    tags
      .text("tag_name", 255)
      .notNullable()
      .unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("tags");
};

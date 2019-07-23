exports.up = function(knex, Promise) {
  return knex.schema.createTable("subtagnews", function(subtagnews) {
    subtagnews.increments();
    subtagnews
      .integer("news_id")
      .unsigned()
      .references("id")
      .inTable("news");
    subtagnews
      .integer("subtag_id")
      .unsigned()
      .references("id")
      .inTable("subtags");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("subtagnews");
};

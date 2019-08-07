exports.up = function(knex, Promise) {
  return knex.schema.createTable("tagnews", function(tagnews) {
    tagnews.increments();
    tagnews
      .integer("news_id")
      .unsigned()
      .references("id")
      .inTable("news");
    tagnews
      .integer("tag_id")
      .unsigned()
      .references("id")
      .inTable("tags");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("tagnews");
};

exports.up = function (knex, Promise) {
  return knex.schema.createTable("newslikes", function (newslikes) {
    newslikes.increments();
    newslikes
      .integer("user_id")
      .unsigned()
      // .notNullable()
      .references("id")
      .inTable("users");
    newslikes
      .integer("news_id")
      .unsigned()
      .references("id")
      .inTable("news");
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("newslikes");
};

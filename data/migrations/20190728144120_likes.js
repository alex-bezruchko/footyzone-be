exports.up = function(knex, Promise) {
  return knex.schema.createTable("likes", function(news) {
    news.increments();
    news
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
    news
      .integer("post_id")
      .unsigned()
      .references("id")
      .inTable("posts");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("likes");
};

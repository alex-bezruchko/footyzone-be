exports.up = function(knex, Promise) {
  return knex.schema.createTable("likes", function(likes) {
    likes.increments();
    likes
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
    likes
      .integer("post_id")
      .unsigned()
      .references("id")
      .inTable("posts");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("likes");
};

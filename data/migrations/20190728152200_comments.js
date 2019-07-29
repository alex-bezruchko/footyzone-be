exports.up = function(knex, Promise) {
  return knex.schema.createTable("comments", function(comments) {
    comments.increments();
    comments.text("comment", 5000).notNullable();
    comments.text("date", 5000).notNullable();
    comments
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
    comments
      .integer("post_id")
      .unsigned()
      .references("id")
      .inTable("posts");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("comments");
};

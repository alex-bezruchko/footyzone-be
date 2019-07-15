exports.up = function(knex, Promise) {
  return knex.schema.createTable("posts", function(posts) {
    posts.increments();
    posts.text("title", 5000).notNullable();
    posts.text("published", 57).notNullable();
    posts.text("summary", 300);
    posts.text("body", 5000);
    posts.text("postMainImg", 255);
    posts
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("posts");
};

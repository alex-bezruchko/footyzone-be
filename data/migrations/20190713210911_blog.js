exports.up = function(knex, Promise) {
  return knex.schema.createTable("blog", function(blog) {
    blog.increments();
    blog.text("title", 5000).notNullable();
    blog.text("published", 57).notNullable();
    blog.text("summary", 300);
    blog.text("body", 5000);
    blog.text("blogMainImg", 255);
    blog
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
    blog
      .integer("subcat_id")
      .unsigned()
      .references("id")
      .inTable("subcategories");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("blog");
};

exports.up = function(knex, Promise) {
  return knex.schema.createTable("news", function(news) {
    news.increments();
    news.text("title", 5000).notNullable();
    news.text("published", 57).notNullable();
    news.text("summary", 300);
    news.text("body", 5000);
    news.text("newsMainImg", 255);
    news
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
    news
      .integer("subcat_id")
      .unsigned()
      .references("id")
      .inTable("subcategories");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("news");
};

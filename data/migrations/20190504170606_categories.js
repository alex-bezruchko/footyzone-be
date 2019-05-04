
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('categories', function(categories) {
        categories.increments();
        categories
            .text('name', 255)
            .notNullable()
            .unique()
        categories
            .text('category_logo', 255)
            .unique()
      ;  

    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('categories')
};

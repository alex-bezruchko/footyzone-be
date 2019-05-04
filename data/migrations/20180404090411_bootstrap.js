exports.up = function(knex) {
  return knex.schema
    .createTable('roles', function(roles) {
      roles.increments();
      roles
        .text('name', 25)
        .notNullable()
        .unique()
    })
    .createTable('users', function(users) {
      users.increments();
      users
        .text('username', 255).notNullable().unique()
      users
        .text('password', 25).notNullable();
      users
        .integer('role_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('roles')
    })

    .createTable('categories', function(categories) {
      categories.increments();
      categories
        .text('name', 255)
        .notNullable()
        .unique();  
    })

    .createTable('posts', function(posts) {
      posts.increments();
      posts.text('title', 5000).notNullable();
      posts.text('body', 5000);
      posts.text('postMainImg', 255);
      posts
        .integer('user_id')
        .unsigned()
        // .notNullable()
        .references('id')
        .inTable('users');
      posts
        .integer('category_id')
        .unsigned()
        // .notNullable()
        .references('id')
        .inTable('categories');
    })

    
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('roles').dropTableIfExists('posts').dropTableIfExists('users').dropTableIfExists('categories');
};

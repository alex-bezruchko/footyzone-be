exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", function(users) {
    users.increments();
    users
      .text("username", 255)
      .notNullable()
      .unique();
    users.text("password", 25).notNullable();
    users.text("avatar", 255);

    users
      .integer("role_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("roles");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};

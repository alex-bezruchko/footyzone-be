exports.seed = function(knex, Promise) {
    return knex('roles').insert([
      { name: 'admin' }, // 1
      { name: 'moderator' }, // 2
      { name: 'blogger' }, // 3
      { name: 'user' }, // 4
    ]);
  };
  
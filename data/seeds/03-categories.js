exports.seed = function(knex, Promise) {
    return knex('categories').insert([
      { name: 'Champions League' }, // 1
      { name: 'Premier League' }, // 2
      { name: 'La Liga' }
    ]);
  };
  
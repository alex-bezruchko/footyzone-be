exports.seed = function(knex, Promise) {
  return knex('users').insert([
    { username: 'Frodo', password: 'frodopass', role_id: 1 }, // 1
    { username: 'Samwise', password: 'samwisepass', role_id: 3 }, // 2
    { username: 'Meriadoc', password: 'meriadocpass', role_id: 4 }, // 3
    { username: 'Peregrin', password: 'peregrinpass', role_id: 1 }, // 4
    { username: 'Mithrandir', password: 'mithrandirpass', role_id: 4 }, // 5
    { username: 'Boromir', password: 'boromirpass', role_id: 2 }, // 6
    { username: 'Legolas', password: 'legolaspass', role_id: 3 }, // 7
    { username: 'Gimly', password: 'gimlypass', role_id: 3 }, // 8
    { username: 'Aragorn', password: 'aragornpass', role_id: 4 }, // 9
  ]);
};

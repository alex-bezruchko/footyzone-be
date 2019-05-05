const db = require('../dbConfig.js');

module.exports = {
  welcomePosts,
  fetchAll,
  getByCategoryId
  getById,
  insert,
  update,
  remove,
  removeByUser,
};

function welcomePosts() {
  return db('posts').limit(5);
}

function fetchAll() {
  return knex('posts')
    .paginate(15, 1, true)
    .then(paginator => {
        console.log(paginator.current_page);
        console.log(paginator.data);
        return paginator.data
    });
}

function getByCategoryId(id) {
  return db('posts')
    .where({ category_id: id })
    // .then()
}

function getById(id) {
  return db('posts')
    .where({ id })
    .first();
}

function insert(post) {
  return db('posts')
    .insert(post)
    .then(ids => {
      return getById(ids[0]);
    });
}

function update(id, changes) {
  return db('posts')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('posts')
    .where('id', id)
    .del();
}

function removeByUser(user_id) {
  return db('posts')
    .where('user_id', user_id)
    .del();
}


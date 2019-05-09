const db = require('../dbConfig.js');

module.exports = {
  welcomePosts,
  fetchAll,
  getByCategoryId,
  getById,
  insert,
  update,
  remove,
  removeByUser,
};

function welcomePosts() {
  return db('posts').limit(5);
}

function latest() {
  return db('posts').limit(10);
}

function fetchAll() {
  return db('posts')
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
    .insert(post, 'id')
    .then(ids => {
      return getById(ids[0]);
    });
}

async function update(id, changes) {
  return db('posts')
    .where({ id })
    .update(changes)
    .then(function() {
      return getById(id);
    });
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


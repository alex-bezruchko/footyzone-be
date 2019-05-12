const db = require('../dbConfig.js');

module.exports = {
  welcomePosts,
  fetchAll,
  fetchAllCategories,
  getByCategoryId,
  getById,
  insert,
  update,
  remove,
  removeByUser,
};

function welcomePosts() {
  return db('posts').limit(5).orderBy('id');
}

function latest() {
  return db('posts').limit(10);
}

function fetchAll() {
  return db('posts')
}

function fetchAllCategories() {
  return db('categories')
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


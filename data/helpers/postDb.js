const db = require("../dbConfig.js");

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
  fetchUsersPosts,
};

function welcomePosts() {
  return db("posts")
    .limit(5)
    .orderBy("id");
}

function latest() {
  return db("posts").limit(10);
}

function fetchAll() {
  return db
    .select(
      "posts.title",
      "posts.summary",
      "posts.body",
      "posts.postMainImg",
      "posts.user_id",
      "posts.category_id",
      "users.username",
      "categories.category_name"
    )
    .from("posts")
    .leftJoin("users", "users.id", "=", "posts.user_id")
    .leftJoin("categories", "categories.id", "=", "posts.category_id");
}

function fetchUsersPosts(id) {
  return db("posts").where({ user_id: id });
}

function fetchAllCategories() {
  return db("categories");
}

function getByCategoryId(id) {
  return db("posts").where({ category_id: id });
  // .then()
}

function getById(id) {
  return db("posts")
    .where({ id })
    .first();
}

async function insert(post) {
  return db("posts")
    .insert(post, "id")
    .then(ids => {
      return getById(ids[0]);
    });
}

async function update(id, changes) {
  return db("posts")
    .where({ id })
    .update(changes)
    .then(function() {
      return getById(id);
    });
}

function remove(id) {
  return db("posts")
    .where("id", id)
    .del();
}

function removeByUser(user_id) {
  return db("posts")
    .where("user_id", user_id)
    .del();
}

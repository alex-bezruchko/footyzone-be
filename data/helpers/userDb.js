const db = require("../dbConfig.js");

module.exports = {
  get,
  getById,
  findBy,
  getUserPosts,
  insert,
  update,
  remove,
};

function get() {
  return db("users").select("id", "username", "avatar", "password", "role_id");
}

async function getById(id) {
  return db("users")
    .where({ id })
    .first();
}

function getUserPosts(userId) {
  return db("news as p")
    .join("users as u", "u.id", "p.user_id")
    .select("p.id", "p.text", "u.name as postedBy")
    .where("p.user_id", userId);
}

async function insert(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      return getById(ids[0]);
    });
}

async function findBy(nickname) {
  return db("users").where({ username: nickname }).first();
}

async function update(id, changes) {
  return db("users")
    .where({ id })
    .update(changes)
    .then(ids => {
      return getById(id);
    });
}

function remove(id) {
  return db("users")
    .where("id", id)
    .del();
}

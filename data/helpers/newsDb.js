const db = require("../dbConfig.js");

module.exports = {
  welcomeNews,
  latestNews,
  fetchAll,
  fetchAllCategories,
  getByCategoryId,
  getById,
  insert,
  update,
  remove,
  removeByUser,
  fetchUsersNews,
};

function welcomeNews() {
  return db("news")
    .limit(5)
    .orderBy("id");
}

function latestNews() {
  return db("news").limit(10);
}

function fetchAll() {
  return db
    .select(
      "news.title",
      "news.summary",
      "news.body",
      "news.newsMainImg",
      "news.user_id",
      "news.subcat_id",
      "users.username",
      "subcategories.subcat_name"
    )
    .from("news")
    .leftJoin("users", "users.id", "=", "news.user_id")
    .leftJoin("subcategories", "subcategories.id", "=", "news.subcat_id");
}

function fetchUsersNews(id) {
  return db("news").where({ user_id: id });
}

function fetchAllCategories() {
  return db("categories");
}

function getByCategoryId(id) {
  return db("news").where({ category_id: id });
}

function getById(news_id) {
  return db
    .select(
      "news.title",
      "news.summary",
      "news.published",
      "news.body",
      "news.newsMainImg",
      "news.user_id",
      "news.category_id",
      "users.username",
      "categories.category_name"
    )
    .from("news")
    .where("news.id", news_id)
    .innerJoin("users", "users.id", "=", "news.user_id")
    .innerJoin("categories", "categories.id", "=", "news.category_id")
    .first();
}

async function insert(news) {
  return db("news")
    .insert(news, "id")
    .then(ids => {
      return getById(ids[0]);
    });
}

async function update(id, changes) {
  return db("news")
    .where({ id })
    .update(changes)
    .then(function() {
      return getById(id);
    });
}

function remove(id) {
  return db("news")
    .where("id", id)
    .del();
}

function removeByUser(user_id) {
  return db("news")
    .where("user_id", user_id)
    .del();
}

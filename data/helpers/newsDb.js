const db = require("../dbConfig.js");

module.exports = {
  welcomeNews,
  latestNews,
  fetchAll,
  fetchAllCategories,
  fetchAllSubCategories,
  getBySubCategoryId,
  getById,
  insert,
  update,
  remove,
  removeByUser,
  fetchUsersNews,
};

function welcomeNews() {
  return db
    .select(
      "news.id",
      "news.title",
      "news.summary",
      "news.body",
      "news.newsMainImg",
      "news.user_id",
      "news.subcat_id",
      "users.username",
      "users.avatar",
      "subcategories.subcat_name",
      "subcategories.subcat_slug"
    )
    .from("news")
    .leftJoin("users", "users.id", "=", "news.user_id")
    .leftJoin("subcategories", "subcategories.id", "=", "news.subcat_id")

    .limit(5)
    .orderBy("news.id");
}

function latestNews() {
  return db("news").limit(10);
}

function fetchAll() {
  return db
    .select(
      "news.id",
      "news.title",
      "news.summary",
      "news.body",
      "news.newsMainImg",
      "news.user_id",
      "news.subcat_id",
      "users.username",
      "users.avatar",
      "subcategories.subcat_name",
      "subcategories.subcat_slug"
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
function fetchAllSubCategories() {
  return db("subcategories");
}

function getBySubCategoryId(subcat_id) {
  return db
    .select(
      "news.id",
      "news.title",
      "news.summary",
      "news.body",
      "news.subcat_id",
      "news.newsMainImg",
      "news.user_id",
      "users.username",
      "users.avatar",
      "subcategories.subcat_name",
      "subcategories.subcat_slug"
    )
    .from("news")
    .where({ subcat_id: subcat_id })
    .leftJoin("users", "users.id", "=", "news.user_id")
    .leftJoin("subcategories", "subcategories.id", "=", "news.subcat_id");
}

function getById(news_id) {
  return db
    .select(
      "news.id",
      "news.title",
      "news.summary",
      "news.published",
      "news.body",
      "news.newsMainImg",
      "news.user_id",
      "news.subcat_id",
      "users.username",
      "users.avatar",
      "subcategories.subcat_slug"
    )
    .from("news")
    .where("news.id", news_id)
    .innerJoin("users", "users.id", "=", "news.user_id")
    .innerJoin("subcategories", "subcategories.id", "=", "news.subcat_id")
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

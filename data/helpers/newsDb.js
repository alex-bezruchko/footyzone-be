const db = require("../dbConfig.js");

module.exports = {
  welcomeNews,
  latestNews,
  latestOldSchool,
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
  getTagsByNewsId,
  getLikesByNewsId,
  fetchAllLikes,
  fetchAllTags,
  insertTags,
  insertNewsTags,
};

function insertNewsTags(newsTag) {
  return db("tagnews").insert(newsTag, "id")
}
function getTagsById(tags_id) {
  return db("tags")
    .where({
      id: tags_id
    })
    .first();
}
async function insertNewsTags(tag) {
  return db("tags")
    .insert(tag, "id")
    .then(ids => {
      return getTagsById(ids[0]);
    });
}

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
      "subcategories.logo",
      "subcategories.subcat_slug"
    )
    .from("news")
    .leftJoin("users", "users.id", "=", "news.user_id")
    .leftJoin("subcategories", "subcategories.id", "=", "news.subcat_id")

    .limit(4)
    .orderBy("news.id");
}

function latestNews() {
  return db("news").limit(10);
}
function latestOldSchool() {
  return db("news").where(category_id, 3).limit(10);
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
      "subcategories.logo",
      "subcategories.subcat_slug"
    )
    .from("news")
    .leftJoin("users", "users.id", "=", "news.user_id")
    .leftJoin("subcategories", "subcategories.id", "=", "news.subcat_id")
    .orderBy("news.id", "desc");
}

function fetchAllLikes() {
  return db("newslikes");
}

function fetchUsersNews(id) {
  return db("news").where({
    user_id: id
  });
}

function fetchAllCategories() {
  return db("categories");
}

function fetchAllSubCategories() {
  return db("subcategories");
}

function fetchAllTags() {
  return db("tags");
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
      "subcategories.logo",
      "subcategories.subcat_slug"
    )
    .from("news")
    .where({
      subcat_id: subcat_id
    })
    .leftJoin("users", "users.id", "=", "news.user_id")
    .leftJoin("subcategories", "subcategories.id", "=", "news.subcat_id");
}

function getLikesByNewsId(news_id) {
  return db("newslikes").where({
    news_id: news_id
  });
}

function getTagsByNewsId(news_id) {
  // return db("tagnews").where({ news_id: news_id });

  return db.select("news.id", "tags.*")
    .from("news")
    .leftJoin("tagnews", "tagnews.news_id", "news.id")
    .leftJoin("tags", "tagnews.tag_id", "tags.id")
    .where("news.id", news_id);
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
      "subcategories.subcat_slug",
      "subcategories.logo",
      "subcategories.subcat_name"
    )
    .from("news")
    .where("news.id", news_id)
    .innerJoin("users", "users.id", "=", "news.user_id")
    .innerJoin("subcategories", "subcategories.id", "=", "news.subcat_id")

    .first();
}

function insert(news) {
  return db("news")
    .insert(news, "id")
    .then(ids => {
      return getById(ids[0]);
    });
}

function insertTags(tags) {
  return db("tags")
    .insert(tags, "id")
    .then(ids => {
      console.log();
      return db("tags");
    });
}

async function update(id, changes) {
  return db("news")
    .where({
      id
    })
    .update(changes)
    .then(function () {
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
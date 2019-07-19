const db = require("../dbConfig.js");

module.exports = {
  //   welcome,
  //   latestNews,
  fetchAll,
  //   fetchAllCategories,
  //   fetchAllSubCategories,
  //   getBySubCategoryId,
  fetchById,
  //   insert,
  //   update,
  //   remove,
  //   removeByUser,
  //   fetchUsersNews,
};

function fetchAll() {
  return db
    .select(
      "posts.id",
      "posts.title",
      "posts.summary",
      "posts.body",
      "posts.postMainImg",
      "posts.user_id",
      "users.username",
      "users.avatar"
    )
    .from("posts")
    .leftJoin("users", "users.id", "=", "posts.user_id");
}

function fetchById(post_id) {
  return db
    .select(
      "posts.id",
      "posts.title",
      "posts.summary",
      "posts.published",
      "posts.body",
      "posts.postMainImg",
      "posts.user_id",
      "users.username",
      "users.avatar"
    )
    .from("posts")
    .where("posts.id", post_id)
    .innerJoin("users", "users.id", "=", "posts.user_id")
    .first();
}

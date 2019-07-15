const db = require("../dbConfig.js");

module.exports = {
  //   welcome,
  //   latestNews,
  fetchAll,
  //   fetchAllCategories,
  //   fetchAllSubCategories,
  //   getBySubCategoryId,
  //   getById,
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
      "users.username"
    )
    .from("posts")
    .leftJoin("users", "users.id", "=", "posts.user_id");
}

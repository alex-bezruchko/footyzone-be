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
      "posts.subcat_id",
      "users.username",
      "subcategories.subcat_name",
      "subcategories.subcat_slug"
    )
    .from("posts")
    .leftJoin("users", "users.id", "=", "posts.user_id")
    .leftJoin("subcategories", "subcategories.id", "=", "posts.subcat_id");
}

const db = require("../dbConfig.js");

module.exports = {
  //   welcome,
  latestPosts,
  fetchAll,
  //   fetchAllCategories,
  //   fetchAllSubCategories,
  //   getBySubCategoryId,
  fetchById,
  getPostLikes,
  getPostComments,
  insertComments,
  getCommentById,
  deleteCommentById,
  insert,
  //   update,
  //   remove,
  //   removeByUser,
  //   fetchUsersNews,
};

function insertComments(comment) {
  return db("comments")
    .insert(comment, "id")
    .then(res => {
      return fetchById(comment.post_id);
    });
  // .then(ids => {
  //   return getCommentById(ids[0]);
  // });
}
function deleteCommentById(comment_id, post_id) {
  return db("comments")
    .where("id", comment_id)
    .del()
    .then(res => {
      return getPostComments(post_id);
    });
}
function getCommentById(comment_id) {
  return db("comments")
    .where({ id: comment_id })
    .first();
}
function latestPosts() {
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
    .leftJoin("users", "users.id", "=", "posts.user_id")

    .limit(4)
    .orderBy("posts.id");
}
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

function getPostLikes(post_id) {
  return db.from("likes").where({ post_id: post_id });
}

function getPostComments(postId) {
  return db
    .select(
      "comments.user_id",
      "comments.comment",
      "comments.date",
      "comments.id",
      "users.username",
      "users.avatar"
    )
    .from("comments")
    .where("comments.post_id", postId)
    .innerJoin("users", "users.id", "=", "comments.user_id");
}
async function insert(posts) {
  return db("posts")
    .insert(posts, "id")
    .then(ids => {
      return fetchById(ids[0]);
    });
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

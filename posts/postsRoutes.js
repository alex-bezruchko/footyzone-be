const express = require("express");
const postsDb = require("./../data/helpers/postsDb.js");

const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
  const news = await postsDb.fetchAll();
  try {
    if (news) {
      res.status(200).json(news);
    } else {
      res.status(404).json("There are no available news.");
    }
  } catch (e) {
    res.status(500).json(e);
  }
});
router.get("/welcome", async (req, res) => {
  const posts = await postsDb.latestPosts();
  try {
    if (posts) {
      res.status(200).json(posts);
    } else {
      res.status(404).json("There are no available posts.");
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await postsDb.fetchById(id);
    const postComments = await postsDb.getPostComments(id);
    const postLikes = await postsDb.getPostLikes(id);

    if (post && postComments && postLikes) {
      post.comments = postComments;
      post.likes = postLikes;

      res.status(200).json(post);
    } else {
      res.status(404).json("Post id is unavailable.");
    }
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});
module.exports = router;

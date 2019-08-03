const express = require("express");
const postsDb = require("./../data/helpers/postsDb.js");
const multer = require("multer");
const cloudinary = require("cloudinary");
const dataUri = require("datauri");
const path = require("path");
const newUri = new dataUri();
const restricted = require("../auth/restricted.js");

const router = express.Router();
router.use(express.json());

const storage = multer.memoryStorage();
// Multer Filter
const imageFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only jpeg, jpg, png files are allowed."), false);
  }
};

// Multer Upload Config
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
    fileFilter: imageFilter,
  },
});

// Cloudinary Config

cloudinary.config({
  cloud_name: "htg1iqq1p",
  api_key: "915419188456665",
  api_secret: "M7938KD1Akyo8XBTmf7jF68jiHA",
});

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

// upload.single("postMainImg")
router.post("/", restricted, (req, res) => {
  const newPost = req.body;

  // const imageUri = req =>
  //   newUri.format(
  //     path.extname(req.file.originalname).toString(),
  //     req.file.buffer
  //   );

  // const file = imageUri(req).content;

  // cloudinary.uploader.upload(file, result => {
  //   if (result) {
  //     newPost.postMainImg = result.secure_url;
  //   } else {
  //     newPost.postMainImg = "";
  //   }
  postsDb
    .insert(newPost)
    .then(addedPost => {
      if (addedPost) {
        res
          .status(201)
          .json({ addedPost, message: "News was successfully added." });
      } else {
        res.status(404).json("Please enter title and body.");
      }
    })
    .catch(err => {
      console.log(err);
      console.log(res);
      res.status(500).json(err);
    });
  // });
});

router.post("/comments", async (req, res) => {
  const comment = req.body;
  const post = await postsDb.insertComments(comment);
  const postComments = await postsDb.getPostComments(comment.post_id);
  const postLikes = await postsDb.getPostLikes(comment.post_id);
  try {
    if (post && postComments && postLikes) {
      post.comments = postComments;
      post.likes = postLikes;
      res.status(200).json(post);
    } else {
      res.status(404).json("Unable to save comment to this post.");
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

router.delete("/:post_id/comments/:id", async (req, res) => {
  const id = req.params.id;
  const post_id = req.params.post_id;

  try {
    const deleted = await postsDb.deleteCommentById(id, post_id);

    if (deleted) {
      res
        .status(200)
        .json({ deleted, message: "Comment was successfully deleted." });
    } else {
      req.status(404).json("Comment id is unavailable.");
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

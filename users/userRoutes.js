const express = require("express");
const newsDb = require("../data/helpers/newsDb.js");
const postsDb = require("../data/helpers/postsDb.js");

const userDb = require("../data/helpers/userDb.js");
const multer = require("multer");

const router = express.Router();
const restricted = require("../auth/restricted.js");
const cloudinary = require("cloudinary");
const dataUri = require("datauri");
const path = require("path");
const newUri = new dataUri();
router.use(express.json());

router.use((err, req, res, next) => {
  res.status(500).json({
    message: "There was an error performing the required operation",
    err: err,
  });
});

router.get("/", restricted, async (req, res) => {
  try {
    const users = await userDb.get();

    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json(`Users are not available.`);
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/:id/posts", async (req, res) => {
  const id = req.params.id;
  try {
    const usersPosts = await postsDb.fetchUsersPosts(id);

    if (usersPosts) {
      res.status(200).json(usersPosts);
    } else {
      res.status(404).json(`Users are not available.`);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.post("/", async (req, res) => {
  const newUser = req.body;

  try {
    const added = await userDb.insert(newUser);

    if (added) {
      res.status(201).json("New User added.");
    } else {
      res.status(404).json("User id is unavailable.");
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

router.put("/:avatar", async (req, res) => {
  console.log('req.body:')
  console.log(req.body)
  const avatar = req.params.avatar.toLowerCase();
  let updatedBody = req.body;
  let newInfo = {};
  try {
    let currentUser = await userDb.findBy(avatar);
    if (currentUser) {
      console.log(currentUser)
      newInfo.id = currentUser.id;
      newInfo.password = currentUser.password;
      newInfo.role_id = currentUser.role_id;
      newInfo.username = updatedBody.username;
      newInfo.avatar = updatedBody.avatar;

      let updatedUser = await userDb.update(newInfo.id, newInfo);
      if (updatedUser) {
        res.status(201).json({ updatedUser, message: "User was updated." });
      } else {
        res.status(404).json("Please enter title and body.");
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }


});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const postRemoved = await newsDb.removeByUser(id);
  try {
    const deleted = await userDb.remove(id);

    if (deleted) {
      res.status(200).json("User was successfully deleted");
    } else {
      res.status(404).json("User is not available");
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await userDb.getById(id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json(`User's posts are not available.`);
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;

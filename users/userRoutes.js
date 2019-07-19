const express = require("express");
const newsDb = require("../data/helpers/newsDb.js");
const userDb = require("../data/helpers/userDb.js");
const multer = require("multer");

const router = express.Router();
const restricted = require("../auth/restricted.js");
const cloudinary = require("cloudinary");
const dataUri = require("datauri");
const path = require("path");
const newUri = new dataUri();
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

cloudinary.config({
  cloud_name: "htg1iqq1p",
  api_key: "915419188456665",
  api_secret: "M7938KD1Akyo8XBTmf7jF68jiHA",
});

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
    const usersPosts = await newsDb.fetchUsersPosts(id);

    if (usersPosts) {
      res.status(200).json(usersPosts);
    } else {
      res.status(404).json(`Users are not available.`);
    }
  } catch (e) {
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

router.put("/:id", upload.single("avatar"), (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  console.log(updatedUser);
  console.log(req.body);

  const imageUri = req =>
    newUri.format(
      path.extname(req.file.originalname).toString(),
      req.file.buffer
    );

  const file = imageUri(req).content;

  cloudinary.uploader.upload(file, result => {
    if (result) {
      updatedUser.avatar = result.secure_url;
    } else {
      updatedUser.avatar = "";
    }

    userDb
      .update(id, updatedUser)
      .then(user => {
        if (user) {
          res.status(201).json({ user, message: "User was updated." });
        } else {
          res.status(404).json("Please enter title and body.");
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

  // try {
  //   const updated = await userDb.update(id, updatedUser);
  //   console.log(updated);

  //   if (updated) {
  //     res.status(201).json("User updated.");
  //   } else {
  //     res.status(404).json("User id is unavailable.");
  //   }
  // } catch (e) {
  //   console.log(e);
  //   res.status(500).json(e);
  // }
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

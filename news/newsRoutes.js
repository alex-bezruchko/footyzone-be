const express = require("express");
const newsDb = require("./../data/helpers/newsDb.js");
const multer = require("multer");
const fs = require("fs");
const cloudinary = require("cloudinary");
const router = express.Router();
const dataUri = require("datauri");
const path = require("path");
const newUri = new dataUri();
const restricted = require("../auth/restricted.js");

router.use(express.json());
// Multer Storage
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

router.get("/welcome", async (req, res) => {
  const news = await newsDb.welcomeNews();

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

router.get("/", async (req, res) => {
  const news = await newsDb.fetchAll();
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

router.get("/latest", async (req, res) => {
  const news = await newsDb.latestNews();

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

router.get("/categories", async (req, res) => {
  const categories = await newsDb.fetchAllCategories();

  try {
    if (categories) {
      res.status(200).json(categories);
    } else {
      res.status(404).json("There are no available categories.");
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/subcategories", async (req, res) => {
  const subcategories = await newsDb.fetchAllSubCategories();

  try {
    if (subcategories) {
      res.status(200).json(subcategories);
    } else {
      res.status(404).json("There are no available subcategories.");
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/:subcat_slug", async (req, res) => {
  // console.log(req.params.subcat_slug);
  let subcat_slug = req.params.subcat_slug;

  try {
    const allSubcats = await newsDb.fetchAllSubCategories();
    // console.log(allSubcats);
    let subcat_id = allSubcats.filter(
      subcat => subcat.subcat_slug === subcat_slug
    );
    console.log(subcat_id[0].id);
    if (subcat_id[0].id) {
      const news = await newsDb.getBySubCategoryId(subcat_id[0].id);
      if (news.length > 0) {
        res.status(200).json(news);
      } else {
        res.status(404).json("Category doesn't exist.");
      }
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/:subcat_slug/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const news = await newsDb.getById(id);
    if (news) {
      const newsTags = await newsDb.getTagsByNewsId(id);
      if (newsTags) {
        news.tags = newsTags;
      } else {
        news.tags = [];
      }
      res.status(200).json(news);
    } else {
      res.status(404).json("News id is unavailable.");
    }
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.post("/", upload.single("newsMainImg"), restricted, (req, res) => {
  const newNews = req.body;
  const imageUri = req =>
    newUri.format(
      path.extname(req.file.originalname).toString(),
      req.file.buffer
    );

  const file = imageUri(req).content;

  cloudinary.uploader.upload(file, result => {
    if (result) {
      newNews.newsMainImg = result.secure_url;
    } else {
      newNews.newsMainImg = "";
    }
    newsDb
      .insert(newNews)
      .then(addedNews => {
        if (addedNews) {
          res
            .status(201)
            .json({ addedNews, message: "News was successfully added." });
        } else {
          res.status(404).json("Please enter title and body.");
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
});

router.put("/:id", restricted, upload.single("newsMainImg"), (req, res) => {
  const id = req.params.id;
  const updatedNews = req.body;

  const imageUri = req =>
    newUri.format(
      path.extname(req.file.originalname).toString(),
      req.file.buffer
    );

  const file = imageUri(req).content;

  cloudinary.uploader.upload(file, result => {
    updatedNews.newsMainImg = result.secure_url;

    newsDb
      .update(id, updatedNews)
      .then(news => {
        if (news) {
          res.status(201).json({ news, message: "News was updated." });
        } else {
          res.status(404).json("Please enter title and body.");
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deleted = await newsDb.remove(id);

    if (deleted) {
      res.status(200).json("News successfully deleted.");
    } else {
      req.status(400).json("News id is unavailable.");
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;

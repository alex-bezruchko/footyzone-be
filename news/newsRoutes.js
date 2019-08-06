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
  try {
    let news = await newsDb.fetchAll();
    let likes = await newsDb.fetchAllLikes();
    if (news) {
      for (let i = 0; i < news.length; i++) {
        news[i].likes = [];
        for (let j = 0; j < likes.length; j++) {
          if (Number(news[i].id) === Number(likes[j].news_id)) {
            news[i].likes.push(likes[j]);
          }
        }
      }
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

router.get("/:id/subtags", async (req, res) => {
  let id = this.props.match.params.id;
  try {
    const allSubcats = await newsDb.fetch();

    if (allSubcats) {
      res.status(200).json(allSubcats);
    } else {
      res.status(404).json("Subcategories do not exist.");
    }
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.get("/subtags", async (req, res) => {
  try {
    const allSubcats = await newsDb.fetchAllTags();

    if (allSubcats) {
      res.status(200).json(allSubcats);
    } else {
      res.status(404).json("Subcategories do not exist.");
    }
  } catch (e) {
    console.log(e);
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
      const newsLikes = await newsDb.getLikesByNewsId(id);
      if (newsLikes) {
        news.likes = newsLikes;
      } else {
        news.likes = [];
      }
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

// Post Tags

router.post("/subtags", async (req, res) => {
  let subtags = req.body;
  try {
    let newSubtags = [];
    if (subtags.length > 0) {
      for (let t = 0; t < subtags.length; i++) {
        let insertedTag = await newsDb.insertNewsSubtag(tag);
        newSubtags.push(insertedTag);
      }
    }
    if (newSubtags && newSubtags.length > 0) {
      res.status(201).json({ newSubtags, message: "Tags added successfully" });
    } else {
      res.status(404).json({ message: "Error processing the request" });
    }

    // let insertedTags =
  } catch (e) {
    console.log(e);
    res.status(500).json({ e, message: "Server error" });
  }
});
router.post("/", restricted, async (req, res) => {
  const {
    user_id,
    title,
    body,
    subcat_id,
    summary,
    published,
    newsMainImg,
    tags,
  } = req.body;
  console.log(req.body.tags);
  let newNews = {
    title: title,
    published: published,
    summary: summary,
    body: body,
    newsMainImg: newsMainImg,
    user_id: user_id,
    subcat_id: subcat_id,
  };
  let newTags = [];
  try {
    // let currentTags = await newsDb.fetchAllTags();

    let addedNews = await newsDb.insert(newNews);

    if (addedNews) {
      if (newTags.length > 0) {
        // console.log(newTags);
        let finnishedTags = [];
        // new
        for (let i = 0; i < newTags.length; i++) {
          let finnishedTag = {};
          finnishedTag.subcat_name = newTag.subcat_name;
          finnishedTag.subcat_slug = newTag.subcat_slug;
          finnishedTag.tag_id = newTag.tag_id;
          console.log(finnishedTag);
          finnishedTags.push(finnishedTag);
        }

        // console.log("finnishedTags:");
        // console.log(finnishedTags);

        let tagsAdded = await newsDb.insertNewsTags(finnishedTags);
        // console.log("tagsAdded:");
        console.log(tagsAdded);
        // console.log(tags);
        // if (tagsAdded) {
        // }
        // console.log("addedNews after mapping:");
      }
      addedNews.tags = [];
      addedNews.tags = req.body.tags;
      res
        .status(201)
        .json({ addedNews, message: "News was successfully added." });
      // }
    } else {
      console.log(addedNews);
      res.status(404).json({ message: "Theere was an error adding it." });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }

  // const imageUri = req =>
  //   newUri.format(
  //     path.extname(req.file.originalname).toString(),
  //     req.file.buffer
  //   );

  // const file = imageUri(req).content;

  // cloudinary.uploader.upload(file, result => {
  //   if (result) {
  //     newNews.newsMainImg = result.secure_url;
  //   } else {
  //     newNews.newsMainImg = "";
  //   }
  // newsDb
  //   .insert(newNews)
  //   .then(addedNews => {

  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });
  // });
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

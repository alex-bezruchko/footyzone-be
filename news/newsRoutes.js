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

router.get("/latest/old-school", async (req, res) => {
  const news = await newsDb.latestOldSchool();

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

router.get("/:id/tags", async (req, res) => {
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

router.get("/tags", async (req, res) => {
  try {
    const allTags = await newsDb.fetchAllTags();

    if (allTags) {
      res.status(200).json(allTags);
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
      console.log(newsTags);
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

router.post("/tags", async (req, res) => {
  let tags = req.body;
  console.log(req.body);
  try {
    let newTags = [];
    if (tags.length > 0) {
      for (let t = 0; t < tags.length; t++) {
        // let tag = tags[i]
        let insertedTag = await newsDb.insertNewsTags(tags[t]);
        // if (insertedTag)
        newTags.push(insertedTag);
      }
      if (newTags) {
        res
          .status(201)
          .json({
            newTags,
            message: "Tags added successfully"
          });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      e,
      message: "Server error"
    });
  }
});
router.post("/", restricted, async (req, res) => {
  const { title, user_id, published, body, summary, newsMainImg } = req.body;
  let newNews = {
    title: title,
    user_id: user_id,
    published: published,
    body: body,
    summary: summary,
    subcat_id: 2,
    newsMainImg: newsMainImg
  }
  const { tags } = req.body

  // let newTags = [];
  try {
    // let currentTags = await newsDb.fetchAllTags();
    // console.log('req.body:');
    // console.log(newNews);
    let addedNews = await newsDb.insert(newNews);
    // console.log('let addedNews:');
    // console.log(addedNews);

    if (addedNews) {
      console.log('if addedNews')
      console.log(addedNews)
      if (tags.length > 0) {
        // console.log(newTags);
        let finnishedTags = [];
        console.log('tags')
        console.log(tags)
        for (let i = 0; i < tags.length; i++) {
          let finnishedTag = {};
          finnishedTag.news_id = addedNews.id;
          finnishedTag.tag_id = tags[i].id;
          console.log('tags[i]')
          console.log(tags[i])
          console.log('finnishedTag');
          console.log(finnishedTag);
          finnishedTags.push(finnishedTag);
        }
        console.log('finnishedTags')
        console.log(finnishedTags)

        // console.log("finnishedTags:");
        // console.log(finnishedTags);
        let addedTagNews = [];
        for (let t = 0; t < finnishedTags.length; t++) {
          console.log(finnishedTags)
          let tagsAdded = await newsDb.insertNewsTags(finnishedTags[t]);
          console.log('tagsAdded')
          console.log(tagsAdded);
          addedTagNews.push(finnishedTags[t])
        }
        console.log("addedTagNews:");
        console.log(addedTags);
        // console.log(tags);
        if (addedTags) {
          addedNews.tags = addedTags;
        } else {
          addedNews.tags = [];
        }
        // console.log("addedNews after mapping:");
      }
      res
        .status(201)
        .json({
          addedNews,
          message: "News was successfully added."
        });
      // }
    } else {
      res.status(404).json({
        message: "Theere was an error adding it."
      });
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
          res.status(201).json({
            news,
            message: "News was updated."
          });
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
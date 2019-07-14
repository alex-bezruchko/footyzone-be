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

module.exports = router;

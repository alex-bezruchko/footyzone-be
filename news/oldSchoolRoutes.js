const express = require("express");
const newsDb = require("./../data/helpers/newsDb.js");
const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
    try {
        const news = await newsDb.fetchAllOldSchool();
        if (news) {
            res.status(200).json(news);
        } else {
            res.status(404).json("There are no available old school articles.");
        }
    } catch (e) {
        console.log(e)
        res.status(500).json(e);
    }

});

router.get("/latest/old-school", async (req, res) => {

    try {
        const news = await newsDb.latestOldSchool();
        if (news) {
            res.status(200).json(news);
        } else {
            res.status(404).json("There are no available news.");
        }
    } catch (e) {
        console.log(e)
        res.status(500).json(e);
    }

});
module.exports = router;

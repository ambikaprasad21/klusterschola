const express = require("express");
const chapterController = require("./../controller/chapterController");

const router = express.Router();

router.get("/book/:bookId/chapters", chapterController.getChapters);

module.exports = router;

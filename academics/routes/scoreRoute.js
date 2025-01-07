const express = require("express");
const scoreController = require("./../controller/scoreController");
const router = express.Router();

router.get("/score/:acadYear/:rollno/:class", scoreController.getScore);
router.get(
  "/subject-performance/:acadYear/:rollno/:class",
  scoreController.getsubwiseperformance
);

router.get(
  "/performance-analysis/:acadYear/:rollno/:class",
  scoreController.performanceAnalysis
);

module.exports = router;

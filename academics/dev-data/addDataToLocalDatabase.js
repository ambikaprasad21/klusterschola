const fs = require("fs");
const Score = require("./../models/scoreModel");
const connectDB = require("./../../utils/connectDB");

connectDB("ACADEMICS_DATABASE");

const scores = JSON.parse(
  fs.readFileSync(`${__dirname}/studScore.json`, "utf-8")
);
const importData = async () => {
  try {
    await Score.create(scores);
    console.log("Data successfullly loaded");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--addData") {
  importData();
}

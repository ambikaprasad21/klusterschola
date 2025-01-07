const fs = require("fs");
const Book = require("../models/bookModel");
const BookCover = require("../models/bookCoverModel");
const Chapter = require("../models/chapterModel");
const connectDB = require("./../../utils/connectDB");

connectDB("LIBRARY_DATABASE");

const books = JSON.parse(fs.readFileSync(`${__dirname}/books.json`, "utf-8"));
const bookCovers = JSON.parse(
  fs.readFileSync(`${__dirname}/booksCover.json`, "utf-8")
);
const chapters = JSON.parse(
  fs.readFileSync(`${__dirname}/chapters.json`, "utf-8")
);

const importData = async () => {
  try {
    await Book.create(books);
    await BookCover.create(bookCovers);
    await Chapter.create(chapters);
    console.log("Data successfullly loaded");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--addData") {
  importData();
}

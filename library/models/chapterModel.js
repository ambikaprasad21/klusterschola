const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  bookId: {
    type: Number,
    required: [true, "chapter must have a bookId."],
  },
  chapterNum: {
    type: Number,
    required: [true, "A chapter must have chapter number."],
  },
  title: {
    type: String,
    required: [true, "A chapter must have a title."],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "A chapter must have a description."],
    trim: true,
  },
  pdflink: {
    type: String,
    required: [true, "A chapter must have pdflink."],
  },
});

const Chapter = mongoose.model("Chapter", chapterSchema);
module.exports = Chapter;

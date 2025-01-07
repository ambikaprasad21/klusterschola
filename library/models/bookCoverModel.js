const mongoose = require("mongoose");

const bookCoverSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: [true, "Book cover must have a name"],
    trim: true,
  },
  base64: {
    type: String,
  },
});

const BookCover = mongoose.model("BookCover", bookCoverSchema);
module.exports = BookCover;

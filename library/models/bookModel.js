const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookId: {
    type: Number,
    required: [true, "A book must have bookId"],
    unique: true,
  },
  title: {
    type: String,
    required: [true, "A book must have a title"],
    trim: true,
  },
  subject: {
    type: String,
    required: [true, "A book must have a subject name"],
    trim: true,
  },
  grade: {
    type: Number,
    required: [true, "A book must belong to a grade"],
  },
});

bookSchema.index({ title: "text", subject: "text" });

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;

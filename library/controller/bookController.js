const appError = require("./../../utils/appError");
const catchAsync = require("./../../utils/catchAsync");
const Book = require("./../models/bookModel");
const BookCover = require("./../models/bookCoverModel");
const Chapter = require("./../models/chapterModel");

exports.getBooks = catchAsync(async (req, res, next) => {
  try {
    const { query } = req.query;
    const keywords = query.toLowerCase().split(" ");
    const potentialGrade = keywords.find((word) => !isNaN(word));
    const searchQuery = {
      $text: {
        $search: keywords.join(" "),
      },
    };
    if (potentialGrade) {
      searchQuery.grade = parseInt(potentialGrade);
    }
    const books = await Book.find(searchQuery);

    if (books.length === 0) {
      return res.json([]);
    }

    const results = await Promise.all(
      books.map(async (book) => {
        const bookCover = await BookCover.findOne({ subject: book.subject });

        const chapterCount = await Chapter.countDocuments({
          bookId: book.bookId,
        });

        return {
          title: book.title,
          subject: book.subject,
          grade: book.grade,
          chapterCount: chapterCount,
          image: `data:image/jpeg;base64,${bookCover.base64}`,
        };
      })
    );

    res.status(200).json({
      status: "success",
      count: results.length,
      data: results,
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

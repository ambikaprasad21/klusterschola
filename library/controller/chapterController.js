const appError = require("./../../utils/appError");
const catchAsync = require("./../../utils/catchAsync");
const Chapter = require("./../models/chapterModel");

exports.getChapters = catchAsync(async (req, res, next) => {
  const { bookId } = req.params;
  if (!bookId) {
    return next(new appError("Book ID is required to fetch chapters.", 400));
  }
  const chapters = await Chapter.find({ bookId }).sort({ chapterNum: 1 });

  if (!chapters || chapters.length === 0) {
    return next(new appError(`No chapters found for book ID: ${bookId}`, 404));
  }
  res.status(200).json({
    status: "success",
    results: chapters.length,
    data: {
      chapters,
    },
  });
});

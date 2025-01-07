const express = require("express");
const globalErrorHandler = require("./../utils/errorController");
const bookRouter = require("./routes/bookRoute");
const chapterRouter = require("./routes/chapterRoute");

const app = express();
app.use(express.json());

app.use("/api/v1/library", bookRouter);
app.use("/api/v1/library", chapterRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

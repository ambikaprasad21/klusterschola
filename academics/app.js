const express = require("express");
const globalErrorHandler = require("./../utils/errorController");
const scoreRoute = require("./routes/scoreRoute");

const app = express();
app.use(express.json());

app.use("/api/v1/academics", scoreRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

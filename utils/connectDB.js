const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const connectDB = function (database) {
  let db = process.env[database];

  mongoose
    .connect(db)
    .then(() => console.log(`${database} connected successfully 🛜`));
};
module.exports = connectDB;

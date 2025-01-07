const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const connectDB = require("./../utils/connectDB");
const app = require("./app");

connectDB("LIBRARY_DATABASE");

const port = 5000;
app.listen(port, () => {
  console.log(`Library Server 🌐 running on port ${port}`);
});

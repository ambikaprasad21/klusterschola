const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const connectDB = require("./../utils/connectDB");
const app = require("./app");

connectDB("ACADEMICS_DATABASE");

const port = 5500;
app.listen(port, () => {
  console.log(`Academic Server 🌐 running on port ${port}`);
});

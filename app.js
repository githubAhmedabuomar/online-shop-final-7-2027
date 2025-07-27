const express = require("express");
const ejs = require("ejs");
const app = express();
const path = require("path");

// const dotenv = require("dotenv");
const authroutes = require("./routes/authroutes");
const adminroutes = require("./routes/adminroutes");
// const mongoose = require("mongoose");
// const db_url = "mongodb://localhost:27017/online-shop";
// const db_connection = () => {
//   return mongoose.connect(db_url);
// };
// db_connection();

// dotenv.config();

const port = process.env.port;

app.set("view engine", ejs);
app.set("views");
app.use(express.static(path.join(__dirname, "assets")));
// app.use((req, res, next) => {
//   mongoose.connect("mongodb://localhost:27017/online-shop");
// });

app.get("/", (req, res, next) => {
  res.render("home.ejs");
});
app.use("/auth", authroutes);
app.use("/admin", adminroutes);
app.listen(3000, () => {
  console.log(`connected to server on port 3000`);
});

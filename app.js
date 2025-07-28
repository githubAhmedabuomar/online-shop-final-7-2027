const express = require("express");
const ejs = require("ejs");
const app = express();
const path = require("path");
const flash = require("connect-flash");
var session = require("express-session");
const adminmodule = require("./modules/admin-modules");

const authroutes = require("./routes/authroutes");
const adminroutes = require("./routes/adminroutes");

const sessionStore = require("connect-mongodb-session")(session);

const port = process.env.port;

const store = new sessionStore({
  uri: "mongodb://localhost:27017/online-shop",
  collection: "session",
});
app.use(
  session({
    secret: "hjhfjd dkfdkfjdkjf ",
    saveUninitialized: false,
    // cookie: { maxAge: "2*50*500" },
    store: store,
  })
);
app.use(flash());

app.set("view engine", ejs);
app.set("views");
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "images")));

// app.use(
//   session({
//     cookie: { maxAge: 60000 },
//     secret: "woot",
//     // resave: false,
//     store: store,
//     saveUninitialized: false,
//   })
// );
app.get("/", (req, res, next) => {
  adminmodule
    .getallproducts()
    .then((items) => {
      res.render("home.ejs", { products: items });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.use("/auth", authroutes);
app.use("/admin", adminroutes);
app.listen(3000, () => {
  console.log(`connected to server on port 3000`);
});

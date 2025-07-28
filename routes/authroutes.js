const router = require("express").Router();
const bp = require("body-parser");
const user_model = require("../modules/authmodels");
const bodyParser = require("body-parser");
router.get("/sign-up", (req, res, next) => {
  res.render("sign-up.ejs");
});
router.post("/sign-up", bp.urlencoded({ extended: true }), (req, res, next) => {
  user_model
    .createNewuser(req.body.name, req.body.email, req.body.password)
    .then((nu) => {
      res.redirect("/auth/login");
      console.log(nu);
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/auth/sign-up");
    });
});
router.get("/login", (req, res, next) => {
  res.render("login.ejs");
});
router.post(
  "/login",
  bodyParser.urlencoded({ extended: true }),
  (req, res, next) => {
    user_model
      .login(req.body.email, req.body.password)
      .then((user) => {
        console.log(user, "useerjjj");
        req.session.userid = user._id;
        res.redirect("/");
      })
      .catch((err) => console.log(err));
  }
);
router.all("/logout", (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
  res.clearCookie("connect.sid");
});
module.exports = router;

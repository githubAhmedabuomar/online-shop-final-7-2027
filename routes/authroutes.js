const router = require("express").Router();
const bp = require("body-parser");
router.get("/sign-up", (req, res, next) => {
  res.render("sign-up.ejs");
});
router.post("/sign-up", bp.urlencoded({ extended: true }), (req, res, next) => {
  res.render("sign-up.ejs");
});
router.get("/login", (req, res, next) => {
  res.render("login.ejs");
});
// router.get("/sign-up", (req, res, next) => {
//   res.render("sign-up.ejs");
// });
// router.get("/sign-up", (req, res, next) => {
//   res.render("sign-up.ejs");
// });
module.exports = router;

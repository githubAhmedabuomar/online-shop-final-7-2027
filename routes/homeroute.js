const router = require("express").Router();
const bodyParser = require("body-parser");
const adminmodule = require("../modules/admin-modules");
router.get("/", bodyParser.urlencoded({ extended: true }), (req, res, next) => {
  const category = req.query.category;
  const categories = ["cars", "clothes", "mobiles"];
  const keyword = req.query.keyword;
  if (category && categories.indexOf(category) != -1) {
    adminmodule
      .getfilteredproducts(category)
      .then((products) => {
        res.render("home.ejs", { products: products });
      })
      .catch((err) => console.log(err));
  } else if (keyword) {
    adminmodule.getbekeyword(keyword).then((products) => {
      res.render("home.ejs", { products: products });
    });
  } else {
    adminmodule
      .getallproducts()
      .then((products) => {
        res.render("home.ejs", {
          products: products,
        });
      })
      .catch((err) => console.log(err));
  }
});
// router.get("/", (req, res, next) => {
//   adminmodule
//     .getallproducts()
//     .then((products) => {
//       res.render("home.ejs", { products: products });
//     })
//     .catch((err) => console.log(err));
// });
module.exports = router;

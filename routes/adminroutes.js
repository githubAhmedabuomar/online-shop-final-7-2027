const router = require("express").Router();
const multer = require("multer");
const admin_module = require("../modules/admin-modules");
router.get("/add-item", (req, res, next) => {
  res.render("add-item.ejs");
});
router.post(
  "/add-item",
  multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "images");
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
      },
    }),
  }).single("image"),

  (req, res, next) => {
    admin_module
      .add_item_module({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        image: req.file.filename,
      })
      .then((product) => {
        // console.log(req.file);
        req.flash("product", product);
        console.log(product);
        res.redirect("/home");
      })
      .catch((err) => console.log(err));
  }
);

module.exports = router;

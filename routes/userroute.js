const bodyParser = require("body-parser");
const usermodel = require("../modules/usermodel");

const router = require("express").Router();
router.get("/cart", (req, res, next) => {
  usermodel
    .getcartitems(req.session.userid)
    .then((items) => {
      res.render("cart.ejs", { products: items });
    })
    .catch((err) => console.log(err));
});
router.post(
  "/addtocart",
  bodyParser.urlencoded({ extended: true }),
  (req, res, next) => {
    console.log(
      req.body.id,
      req.body.name,
      req.body.price,
      req.body.number,
      req.session.userid
    );

    usermodel
      .addtocart(
        req.body.id,
        req.body.name,
        req.body.price,
        +req.body.number,
        req.session.userid
      )
      .then(() => {
        res.redirect("/user/cart");
      })
      .catch((err) => console.log(err));
  }
);
router.post(
  "/deletecartitem",
  bodyParser.urlencoded({ extended: true }),
  (req, res, next) => {
    usermodel
      .deletecartitem(req.body.id)
      .then(() => {
        res.redirect("/user/cart");
      })
      .catch((err) => console.log(err));
  }
);
router.post(
  "/updatecarteitem",
  bodyParser.urlencoded({ extended: true }),
  (req, res, next) => {
    console.log(req.body.id, req.body.number);
    usermodel
      .updatecarteitem(req.body.id, {
        number: +req.body.number,
        date: Date.now(),
      })

      .then(() => res.redirect("/user/cart"))
      .catch((err) => console.log(err));
  }
);
router.post(
  "/deletecart",
  bodyParser.urlencoded({ extended: true }),
  (req, res, next) => {
    usermodel
      .deletecart(req.session.userid)
      .then(() => {
        res.redirect("/user/cart");
      })
      .catch((err) => console.log(err));
  }
);
router.get("/orders", (req, res, next) => {
  res.render("orders.ejs", { orders: req.flash("orders") });
});
router.post(
  "/ordercart",
  bodyParser.urlencoded({ extended: true }),
  (req, res, next) => {
    usermodel
      .order(req.body.id)
      .then((orders) => {
        req.flash("orders", orders);
        res.render("orders.ejs", { orders: orders });
      })
      .catch((err) => console.log(err));
  }
);
router.post(
  "/orderallcarts",
  bodyParser.urlencoded({ extended: true }),
  (req, res, next) => {
    usermodel
      .orderallcarts(req.session.userid)
      .then((orders) => {
        res.render("orders.ejs", { orders: orders });
      })
      .catch((err) => console.log(err));
  }
);

module.exports = router;

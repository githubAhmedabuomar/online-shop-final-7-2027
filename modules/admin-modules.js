const mongoose = require("mongoose");
const db_url = "mongodb://localhost:27017/online-shop";
const item_schema = mongoose.Schema({
  name: String,
  description: String,
  category: String,
  price: Number,
  image: String,
});
const item_model = mongoose.model("product", item_schema);
exports.add_item_module = (data) => {
  return new Promise((res, rej) => {
    mongoose
      .connect(db_url)
      .then(() => {
        console.log("connected to database");
        let product = new item_model(data);
        product.save().then((product) => {
          res(product);
          console.log(product);
        });
      })

      .catch((err) => {
        rej(err);
      });
  });
};

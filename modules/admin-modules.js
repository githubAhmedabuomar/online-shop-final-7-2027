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
    mongoose.connect(db_url).then(() => {
      console.log("connected to db");
      item_model
        .insertOne(data)

        .then((item) => {
          item.save();
          res(item);
        })
        .catch((err) => {
          rej(err);
        });
    });
  });
};
exports.getallproducts = () => {
  return new Promise((res, rej) => {
    mongoose
      .connect(db_url)
      .then(() => {
        return item_model.find();
      })
      .then((products) => {
        res(products);
      })
      .catch((err) => {
        rej(err);
      });
  });
};
exports.getfilteredproducts = (category) => {
  return new Promise((res, rej) => {
    mongoose
      .connect(db_url)
      .then(() => {
        return item_model.find({ category: category });
      })
      .then((products) => {
        res(products);
      })
      .catch((err) => {
        rej(err);
      });
  });
};
exports.getbekeyword = (keyword) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(db_url).then(() => {
      item_model
        .find()
        .then((products) => {
          return products.filter(
            (p) => p.name.includes(keyword) || p.description.includes(keyword)
          );
        })
        .then((p) => {
          resolve(p);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
};

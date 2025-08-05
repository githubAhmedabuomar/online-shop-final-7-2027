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
const adminorderschema = mongoose.Schema({
  username: String,
  useraddress: String,
  userorder: Array,
  userphone: String,
  status: String,
});
const adminmodel = mongoose.model("adminorder", adminorderschema);
const usermodel = require("./usermodel");
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
exports.confirmorder = async (id, name, address, phone, status) => {
  try {
    await mongoose.connect(db_url);
    let carts = await usermodel.cartmodel.find({ userid: id, ordered: true });
    let adminorder = await new adminmodel({
      username: name,
      useraddress: address,
      userorder: carts,
      userphone: phone,
      status: status,
    });
    await adminorder.save();

    return adminorder;
  } catch (error) {
    console.log(error);
  }
};
exports.getadminorders = async () => {
  try {
    await mongoose.connect(db_url);
    let orders = await adminmodel.find();
    return orders;
  } catch (error) {
    console.log(error);
  }
};

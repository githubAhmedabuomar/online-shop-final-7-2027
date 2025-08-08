const mongoose = require("mongoose");

const db_url = "mongodb://localhost:27017/online-shop";
const cartSchema = mongoose.Schema({
  name: String,
  price: Number,
  number: Number,
  userid: String,
  ordered: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: "processing",
  },
  date: {
    type: String,
    default: Date.now(),
  },
});
const cartmodel = mongoose.model("cart", cartSchema);
exports.cartmodel = cartmodel;
exports.addtocart = (id, uname, price, number, userid) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        return cartmodel.findOne({ name: uname });
      })
      .then((i) => {
        console.log(i, "excist");
        if (i) {
          i.number += number;
          return i.save();
        } else {
          console.log("ggg");
          let item = new cartmodel({
            name: uname,
            price: price,
            number: number,
            userid: userid,
          });
          return item.save();
        }
      })
      .then(() => {
        resolve("ok");
      })
      .catch((err) => reject(err));
  });
};
exports.getcartitems = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        return cartmodel.find({ userid: id }).sort({ date: 1 });
      })
      .then((items) => {
        resolve(items);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
exports.deletecartitem = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        return cartmodel.findByIdAndDelete(id);
      })
      .then(() => {
        resolve("deleted");
      })
      .catch((err) => reject("deleting error"));
  });
};
exports.updatecarteitem = (id, data) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        console.log(data);
        return cartmodel.findByIdAndUpdate(id, data);
      })
      .then((p) => {
        resolve(p.name + "updated");
        console.log(p.name, "kkk", p.number);
      })
      .catch((err) => reject(err));
  });
};
exports.deletecart = async (id) => {
  try {
    await mongoose.connect(db_url);
    await cartmodel.deleteMany({ userid: id });
    return "cart deleted";
  } catch (error) {
    console.log(error);
  }
};
exports.order = async (id) => {
  try {
    await mongoose.connect(db_url);
    await cartmodel.findByIdAndUpdate(id, { ordered: true });
    let orders = await cartmodel.find({ ordered: true });
    // await cartmodel.deleteMany({ ordered: true });
    return orders;
  } catch (error) {
    console.log(error);
  }
};
exports.orderallcarts = async (id) => {
  try {
    await mongoose.connect(db_url);
    const carts = await cartmodel.find({ userid: id });

    const updating = await cartmodel.updateMany(
      { userid: id },
      { ordered: true }
    );

    console.log(carts, "cartsss");
    return carts;
  } catch (error) {
    console.log(error);
  }
};

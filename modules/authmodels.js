const { name } = require("ejs");
const mongoose = require("mongoose");
const db_url = "mongodb://localhost:27017/online-shop";
const crypt = require("bcrypt");
const user_schema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  admin: {
    type: Boolean,
    default: false,
  },
});
const user_model = mongoose.model("user", user_schema);
// exports.createNewuser = (name, u_email, password) => {
//   return new Promise((resolve, reject) => {
//     mongoose
//       .connect(db_url)
//       .then(() => {
//         return user_model.findOne({ email: u_email }).then((user) => {
//           if (user) {
//             reject("this email used before");
//           } else {
//              crypt.hash(password, 10);
//             console.log(hashed, "hhhh");
//             let nu = new user_model({
//               name: name,
//               email: u_email,
//               password: password,
//             });
//             return nu.save();
//           }
//         });
//       })
//       .then((nu) => {
//         resolve(nu);
//       })
//       .catch((err) => reject(err));
//   });
// };
exports.createNewuser = (name, u_email, password) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_url)
      .then(() => {
        return user_model.findOne({ email: u_email });
      })
      .then((user) => {
        if (user) reject("this user used before");
        else {
          return crypt.hash(password, 10);
        }
      })
      .then((hashed) => {
        let user = new user_model({
          name: name,
          email: u_email,
          password: hashed,
        });
        return user.save();
      })
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
exports.login = (email, password) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(db_url).then(() => {
      user_model
        .findOne({ email: email })
        .then((user) => {
          if (!user) reject("this email matches no user");
          else {
            return crypt.compare(password, user.password).then((same) => {
              if (!same) reject("incorrect password");
              else {
                resolve(user);
              }
            });
          }
        })
        .then(() => console.log("ok"))
        .catch((err) => console.log(err));
    });
  });
};

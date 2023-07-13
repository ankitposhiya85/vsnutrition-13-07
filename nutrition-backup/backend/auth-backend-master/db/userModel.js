const mongoose = require("mongoose");

// user schema
const UserSchema = new mongoose.Schema({
  // email field
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Exist"],
  },

  //   password field
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
  },

  // name field
  name: {
    type: String,
    required: [true, "Please Enter your name"],
    unique: false,
  },

  // mobile number field
  mobile: {
    type: Number,
    required: [true, "Plese provide your mobile number"],
    unique: [true, "Mobile number is allready there"],

  },

  // address field
  address: {
    type: String,
    required: [true, "Plese provide your Address"],
    unique: [false],
  },

 
});

// const CartSchema = new mongoose.Schema(
//   {
//     productid: {
//       type: Number,
//       required: [true, "Please provide an Email!"],
//       unique: [true, "Email Exist"],
//     },

//     //   password field
//     name: {
//       type: String,
//       required: [true, "Please provide a password!"],
//       unique: true,
//     },

//     // name field
//     price: {
//       type: Number,
//       required: [true, "Please Enter your name"],
//       unique: false,
//     },

//     // mobile number field
//     quntity: {
//       type: Number,
//       required: [true, "Plese provide your mobile number"],
//       unique: [false, "Mobile number is allready there"],

//     },
//   }
// );

// export UserSchema
module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);
// module.exports = mongoose.model.Items || mongoose.model("Items", ItemSchema);
// module.exports = mongoose.model.Cart || mongoose.model("Cart", CartSchema);

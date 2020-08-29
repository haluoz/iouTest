const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  username: {type:String, required: true},
  password: {type:String, required: true},
  avatar: {type:String, default: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2033928735,1645255386&fm=26&gp=0.jpg"},
  age: Number,
  gender: Number,
  email: {type:String, required: true},
  create_time: { type: Date, default: Date.now },
});

let userModel = mongoose.model("user",userSchema);

module.exports = userModel;

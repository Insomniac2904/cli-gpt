const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
    max: 1024,
  },
  name: {
    type: String,
    min: 6,
    max: 255,
  },
  apiKey: {
    type: String,
    max: 1024,
    default: process.env.DEFAULT_API,
  },
  paraphrase: {
    type: String,
    max: 1024,
  },
});

module.exports = mongoose.model("user", UserSchema);

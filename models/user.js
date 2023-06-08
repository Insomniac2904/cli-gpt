const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
  },
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  apiKey: {
    type: String,
    required: true,
    max: 1024,
    default: process.env.DEFAULT_API,
  },
});

module.exports = mongoose.model("user", UserSchema);

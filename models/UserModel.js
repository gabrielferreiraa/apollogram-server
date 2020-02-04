const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchemaMongo = new Schema({
  _id: String,
  name: String,
  email: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("user", UserSchemaMongo);

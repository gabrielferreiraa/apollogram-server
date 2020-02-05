const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const PostSchema = new Schema({
  user: {
    type: ObjectId,
    ref: "User"
  },
  title: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Post", PostSchema);

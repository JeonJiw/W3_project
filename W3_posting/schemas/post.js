const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  
  user: {
    type: String,
    unique: true
  },
  title: {
    type: String
  },
  content: {
    type: String
  },
  password: {
    type: String
  }
});

module.exports = mongoose.model("Posts", postsSchema);
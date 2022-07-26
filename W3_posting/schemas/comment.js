const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({

  user: {
    type: String,
    unique: true
  },
  content: {
    type: String
  },
  password: {
    type: String
  }
});

module.exports = mongoose.model("Comments", commentsSchema);
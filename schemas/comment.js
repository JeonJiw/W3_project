const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema({
  commentId: {
    type: String,
    unique: true,
  },

});

module.exports = mongoose.model("Comments", commentsSchema);

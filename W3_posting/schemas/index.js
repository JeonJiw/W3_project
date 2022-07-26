const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect("mongodb://localhost:27017/spa_posts")
    .catch(err => console.log(err));
};


module.exports = connect;
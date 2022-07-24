const { MongoCursorExhaustedError } = require("mongodb");
const mongoose = require("mongoose");

const connect = () => {
  mongoose.connect("mongodb://localhost:27017/nodejs_W3").catch((err) => {
    console.error(err);
  });
};

module.exports = connect;

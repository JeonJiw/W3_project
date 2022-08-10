const express = require("express");
const Comments = require("./comments");
const Posts = require("./posts");

const router = express.Router();

router.use("/posts/", Posts);
router.use("/comments/", Comments);


module.exports = router;
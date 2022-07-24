const express = require("express");
const Posts = require("../schemas/post");
const router = express.Router();

router.get("/", (req, res) => {
  // /api
  res.send("THIS IS HOME PAGE");
});

/* 게시글 조회 (아마도 전체글 조회) */
router.get("/posts", async (req, res) => {
  const posts = await Posts.find();
  // /api/posts
  res.json({
    data: posts, //key:배열값
  });
});

/* 게시글 상세조회 (아마도 게시글 조회)*/
router.get("/posts/:postId", async (req, res) => {
  const postId = req.params.postId;

  const [detail] = await Posts.find({ postId: postId });

  res.json({
    detail,
  });
});

/* 게시물 작성 (상품 생성) */
router.post("/posts", async (req, res) => {
  const { postId, user, title, content, password } = req.body;

  const posts = await Posts.find({ postId });
  if (posts.length) {
    return res
      .status(400)
      .json({ success: false, errorMessage: "이미 있는 데이터 입니다" });
  }

  const createdPosts = await Posts.create({
    postId,
    user,
    title,
    content,
    password,
  });

  res.json({ posts: createdPosts });
});

module.exports = router;
/* app.js에서 posts.js를 받아오기 위해서는 app.js에 불러오는 함수와 posts.js에서 내보내는 함수를 써줘야 한다. */

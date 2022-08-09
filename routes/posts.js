const express = require("express");
const Posts = require("../schemas/post");
const router = express.Router();

router.get("/", (req, res) => {
  // /api
  res.send("THIS IS POST HOME PAGE");
});

/* 게시글 조회 (아마도 전체글 조회) */
router.get("/posts", async (req, res) => {
  const posts = await Posts.find();

  res.json({
    data: posts, //key:배열값
  });
});

/* 게시글 상세조회 (아마도 게시글 조회)*/
router.get("/posts/:postId", async (req, res) => {
  const postId = req.params.postId;

  const post = await Posts.find({ postId });

  res.json({
    post,
  });
});

/* 게시물 작성 (상품 생성) */
router.post("/posts", async (req, res) => {
  const { user, title, content, password } = req.body;

  const createdPosts = await Posts.create({
    user,
    title,
    content,
    password,
  });

  res.json({ posts: createdPosts });
});

/* 게시글 삭제 */
router.delete("/posts/postId", async (req, res) => {
  const { postId } = req.params;
  const { password } = req.body;

  const post = await Posts.find({postId});

  if(post.password !== password){
    return res.status(404).json({
      errorMessage: '비밀번호가 틀립니다.',
    })
  };

  const deletePost = await Posts.delete(post);

  res.json({deletePost, "message" : "게시물이 삭제되었습니다."});

});

module.exports = router;
/* app.js에서 posts.js를 받아오기 위해서는 app.js에 불러오는 함수와 posts.js에서 내보내는 함수를 써줘야 한다. */

const express = require("express");
const Post = require("../schemas/post");
const router = express.Router();


/* 게시글 조회 : 완료 */
router.get("/", async (req, res) => {
  const posts = await Post.find();
  
  if(posts.length === 0){
    return res.json({message: "게시글이 존재하지 않습니다."})
  }

  res.json({
    data: posts, 
  });
});

/* 게시글 상세조회 : 완료  */
router.get("/:postId", async (req, res) => {
  const _id = req.params.postId;
  try {
    const post = await Post.findOne({ _id });
    const result = {
      postId: post._id,
      user: post.user,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt, 
    }
    res.json({ result });
    } catch (e) {
    res.send("게시글을 찾을 수 없습니다.")
}});

/* 게시물 작성 : 완료 */ 
router.post("/", async (req, res) => {
  const { user, title, content, password } = req.body;

  const createdPosts = await Post.create({
    user,
    title,
    content,
    password,
  });

  res.json({ posts: createdPosts });
});

/* 게시글 수정 : 완료 */
router.put("/:postId", async (req, res) => {
  const _id = req.params.postId;
  const {password, user, title, content} = req.body; 
  
  const post = await Post.find({_id})
  console.log(post,"------", post[0].password)
  
  if(password !== post[0].password){
    return res.status(404).json({
      errorMessage: '비밀번호가 틀립니다.',
    })
  }; 

  await Post.updateOne({ _id }, { $set: { user, title, content } });
  
  res.status(201).json({ message: "게시글을 수정하였습니다." });
})

/* 게시글 삭제 : 완료 */
router.delete("/:postId", async (req, res) => {
  const _id = req.params.postId;
  const password = req.body["password"]; 

  const post = await Post.find({_id});

  if(!password){
    return res.status(404).json({
      errorMessage: '비밀번호를 입력해주세요',
    })
  }; 
  
  if(password !== post[0].password){
    return res.status(404).json({
      errorMessage: '비밀번호가 틀립니다.',
    })
  }; 

  const deletePost = await Post.deleteOne({_id});

  res.json({deletePost, "message" : "게시물이 삭제되었습니다."});

});

module.exports = router;


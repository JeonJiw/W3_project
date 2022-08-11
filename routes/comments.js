const express = require("express");
const comment = require('../schemas/comment');
const Comment = require("../schemas/comment");
const router = express.Router();
//댓글 조회
router.get("/:postId", async (req, res) => {

        const _id = req.params.postId;
        const comments = await Comment.find({postId: _id});

        if (comments.length === 0) {
            return res.json({message : "댓글이 존재하지 않습니다."})
        }

        const resultList = [];
        for (const comment of comments) {
            resultList.push(
                {commentId: comment._id, user: comment.user, content: comment.content, createdAt: comment.createdAt}
            );
        }res.json(resultList)

    })


/* 댓글 작성 */
router.post("/:postId", async (req, res) => {
    const _id = req.params.postId;
    const {user, password, content} = req.body;
 
    const createdcomment = await Comment.create({postId : _id, user, password, content })

    res.json({ data: createdcomment, message: "댓글이 작성되었습니다." })
});

//댓글 수정
router.put("/:commentId", async (req, res) => {
    const _id = req.params.commentId;
    const {user, password, content} = req.body;
    const comment = await Comment.findOne({_id})
    if(!password) {
        return res.json({message:"비밀번호를 입력해주세요"})
    }
    if(password !== comment.password){
        return res.json({message: "비밀번호가 틀립니다."})
    }

    await Comment.updateOne({_id}, {$set: {user,password,content}})

    res.json({message: "댓글이 수정되었습니다." })
    });


 //댓글 삭제
router.delete("/:commentId", async (req, res) => {
    const _id = req.params.commentId;
    const {password} = req.body;
    const comment = await Comment.findOne({_id})
    if(!password) {
        return res.json({message:"비밀번호를 입력해주세요"})
    }
    if(password !== comment.password){
        return res.json({message: "비밀번호가 틀립니다."})
    }
    await Comment.deleteOne({_id});

    res.json({message: "댓글이 삭제되었습니다." })
});
  


module.exports = router;

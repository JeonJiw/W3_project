const express = require('express');
const Comments = require('../schemas/comment');
const router = express.Router();


const comments = [    
    {      
    "commentId": "62d6d3fd30b5ca5442641b94",      
    "user": "Developer",      
    "content": "수정된 댓글입니다.",     
     "createdAt": "2022-07-19T15:55:41.490Z"    
    },   
    {      
    "commentId": "62d6d34b256e908fc79feaf8",      
    "user": "Developer",     
     "content": "안녕하세요 댓글입니다.",      
    "createdAt": "2022-07-19T15:52:43.212Z"    
    }  
    ];


//댓글 목록 조회
router.get('/comments', (req, res) => {
    res.json({ data : comments});
});

//댓글 작성
router.post('/comments', async (req, res) => {
    const { user, content, password } = req.body; 

    const comments = await Comments.find({user});
    if (comments.length) {
        return res.status(400).json({ success : false, errorMessage: '이미 있는 데이터입니다.' });
    }

   const createdComments = await Comments.create({ user, content, password });

    res.json({comments,"message": "댓글을 생성하였습니다."});
});



//댓글 삭제
router.delete('/comments', async (req, res) => {
    const { password } = req.params;
    const existsComments = await Comments.find({ password });

    if (existsComments.length) {
        await Comments.deleteOne({ password });
    }

    res.json({Comments,"message": "댓글을 삭제하였습니다."});
})


module.exports = router;
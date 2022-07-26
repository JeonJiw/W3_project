const express = require('express');
const Posts = require('../schemas/post');
const router = express.Router();



const posts = [    
    {      
    "postId": "62d6d12cd88cadd496a9e54e",      
    "user": "Developer",      
    "title": "안녕하세요",      
    "createdAt": "2022-07-19T15:43:40.266Z"    
    },  
     {      
    "postId": "62d6cc66e28b7aff02e82954",      
    "user": "Developer",      
    "title": "안녕하세요",      
    "createdAt": "2022-07-19T15:23:18.433Z"   
     },  
    ];
    



/* const comments = [    {      
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
]; */

//전체 게시글 조회 API
router.get('/posts', (req, res) => {
    res.json({ data : posts}); //data는 위에서 정의한 posts 변수의 내용물
}); 


//게시글 조회(상세조회)
router.get('/posts/:postId', (req, res) => {
    const { postId } = req.params;
    const [ detail ] = posts.filter((posts) => posts.postId === postId);
    res.json({ detail });
});

/* //댓글 목록 조회
router.get('/comments', (req, res) => {
    res.json({ data : comments});
}); */

// /comments/:_postId이라고 써있는데....흠.....나중에 수정이 필요하면 하자...

//게시글 작성
router.post('/posts', async (req, res) => {
    const { user, title, content, password } = req.body; 

    const posts = await Posts.find({user});
    if (posts.length) {
        return res.json({ success : false, errorMessage: '이미 있는 데이터입니다.' });
    }

   const createdPosts = await Posts.create({ user, title, content, password });

    res.json({posts});
});



router.get('/', (req, res) => {
	res.send('this is home page');
});

router.get('/about', (req, res) => {
	res.send('this is about page');
});


module.exports = router;
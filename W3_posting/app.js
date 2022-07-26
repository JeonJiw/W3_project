const express = require('express');
const connect = require("./schemas");
const app = express();
const port = 5500;

connect();

const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");


const requestMiddleware = (req, res, next) => {
  console.log("Request URL:", req.originalUrl, " - ", new Date());
  next();
};


app.use(express.json());//body로 들어오는 json 형태의 무엇..
app.use(requestMiddleware);


app.use("/api", [postsRouter]);
app.use("/api", [commentsRouter]);;

app.get('/', (req, res) => {
  res.send('Hello World!@@@');
});

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});
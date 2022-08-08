const express = require("express");
const connect = require("./schemas"); //mongoose/schemas/index(index생략가능)
const app = express();
const port = 5000;

connect(); //app.js 실행 ->schemas/index.js의 connect 함수 실행.

const postsRouter = require("./routes/posts");

const requestMiddleware = (req, res, next) => {
  console.log("Request URL:", req.originalUrl, " - ", new Date());
  next();
};
app.use(express.json());
app.use(requestMiddleware);

app.use("/api", [postsRouter]);
/* app.js에서 .post.js를 불러오면서 만든 변수/동작을 미들웨어로 실행해줘야 한다.
/api 일때만 postRouter 미들웨어로 넘어가라 */

app.get("/", (req, res) => {
  res.send("Hello World!!!!!");
});

app.listen(port, () => {
  console.log(`${port} 포트로 서버 실행`);
});

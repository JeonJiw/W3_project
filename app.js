const express = require("express");
const routes = require("./routes");
 
const app = express();
const port = 5000;


const requestMiddleware = (req, res, next) => {
  console.log("Request URL:", req.originalUrl, " - ", new Date());
  next();
}; //로그볼수있음

app.use(express.json());
app.use(requestMiddleware);

const connect = require("./schemas"); //몽고디비연결
connect(); 

app.use("/", routes)


app.listen(port, () => {
  console.log(`${port} 포트로 서버 실행`);
});
/* 
npm init : npm 패키지 다운로드 프로그램/ init 프로그램 시작 => package.json 생김 어떤 패키지 어떤 버전 다운받았는지 알 수 있음
app.js : 
express, app
port, listen


*/
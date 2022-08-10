const express = require("express");
const routes = require("./routes");
 
const app = express();
const port = 5000;


const requestMiddleware = (req, res, next) => {
  console.log("Request URL:", req.originalUrl, " - ", new Date());
  next();
};

app.use(express.json());
app.use(requestMiddleware);

const connect = require("./schemas");
connect(); 

app.use("/", routes)


app.listen(port, () => {
  console.log(`${port} 포트로 서버 실행`);
});

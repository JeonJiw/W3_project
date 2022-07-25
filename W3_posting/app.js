const express = require('express');
const app = express();
const port = 5500;


// app.js
const postsRouter = require("./routes/posts");
app.use("/api", [postsRouter]);




app.get('/', (req, res) => {
  res.send('Hello World!@@@');
});

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});
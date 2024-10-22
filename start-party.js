const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const op = {
  root: path.join(__dirname),
};

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/enter", (req, res) => {
  res.sendFile("/public/pages/enter.html", op);
});

app.get("/campfire", (req, res) => {
  res.sendFile("/public/pages/campfire.html", op);
  console.log("-------------------");
  console.log("entered new guest:");
  console.log("nickname:", req.query.nickname);
  console.log("avatar:", req.query.avatar);
  console.log("-------------------");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

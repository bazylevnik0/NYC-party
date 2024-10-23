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
  res.sendFile("/public/pages/join.html", op);
});

app.get("/exit", (req, res) => {
  let guest = new Guest(req.query.nickname, req.query.avatar);
  let check = false;
  for (let i = 0; i < guests.length; i++) {
    if (guest.nickname === guests[i].nickname) {
      guests.splice(i, 1);
    }
  }
  res.sendFile("/public/pages/join.html", op);
  console.log(guests);
});

app.get("/campfire", (req, res) => {
  let guest = new Guest(req.query.nickname, req.query.avatar);
  let check = false;
  for (let i = 0; i < guests.length; i++) {
    if (guest.nickname === guests[i].nickname) {
      check = true;
    }
  }
  if (!check) guests.push(guest);
  res.sendFile("/public/pages/campfire.html", op);
  console.log(guests);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

var guests = [];
class Guest {
  constructor(nickname, avatar) {
    this.nickname = nickname;
    this.avatar = avatar;
  }
}
var phrases = [];
/*
var phrases_interval = setInterval(() => {
  if (phrases[0] && !phrases[0].activated) {
    setTimeout(() => {
      phrases.shift();
    }, phrases[0].time);
  }
}, 1000);
*/

app.get("/data", (req, res) => {
  res.json(guests);
});

app.get("/say", (req, res) => {
  console.log("test");
  phrases.push({
    chunks: JSON.parse(req.query.chunks),
    time: JSON.parse(req.query.time),
    activated: false,
  });
  console.log(phrases);
});

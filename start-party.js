const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
const path = require("path");
const root = {
  root: path.join(__dirname),
};

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Party started on port: ${port}`);
});

var guests  = [];
var phrases = [];
class Guest {
  constructor(nickname, avatar, id, public_key) {
    this.nickname = nickname;
    this.avatar = avatar;
    this.id = id;
    this.public_key = public_key;
  }
}

app.get("/", (req, res) => {
  console.log( "GET: /");
  res.sendFile("/public/enter.html", root);
});

app.post("/join", (req, res) => {
  console.log("POST: /join, nickname: ", req.body.nickname);
  console.log("POST: /join, avatar: "  , req.body.avatar);
  res.redirect('/campfire?nickname='+req.body.nickname+'&avatar='+req.body.avatar+'&id='+Math.random());
});

app.get("/campfire", (req, res) => {
  res.sendFile("/public/campfire.html", root);
});

app.post("/register", (req, res) => {
  console.log("POST: /register, nickname: "   , req.body.nickname);
  console.log("POST: /register, avatar: "     , req.body.avatar);
  console.log("POST: /register, id: "         , req.body.id);
  console.log("POST: /register, public_key: " , req.body.public_key);
  let guest = new Guest(req.body.nickname, req.body.avatar, req.body.id, req.body.public_key);
  guests.push(guest);
  console.log("/POST /register, guests: ", guests);
});

/*
app.get("/exit", (req, res) => {
  let guest = new Guest(req.query.nickname, req.query.avatar);
  let check = false;
  for (let i = 0; i < guests.length; i++) {
    if (guest.nickname === guests[i].nickname) {
      guests.splice(i, 1);
    }
  }
  res.sendFile("/public/pages/join.html", root);
  console.log(guests);
});


var phrases = [];
var phrases_interval = setInterval(() => {
  if (phrases[0] && !phrases[0].activated) {
    setTimeout(() => {
      phrases.shift();
    }, phrases[0].time);
  }
}, 1000);

var guests = [];
class Guest {
  constructor(nickname, avatar) {
    this.nickname = nickname;
    this.avatar = avatar;
  }
}
app.get("/data_get", (req, res) => {
  switch (req.query.get) {
    case "guests"  :
      res.json(guests);
      break;
    case "phrases" :
      res.json(phrases);
      break;
  }
});

app.post("/say", (req, res) => {
  console.log("test");
  phrases.push({
    data: req.body.data,
    time: req.body.time,
    activated: false,
  });
  console.log(phrases);
});
*/

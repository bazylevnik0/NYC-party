const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
const path = require("path");
const root = {
  root: path.join(__dirname),
};

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const openpgp = require('openpgp');

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

server.listen(3000, () => {
  console.log('party started on port: ' + port);
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
  res.sendFile("/public/enter.html", root);
});

app.post("/join", (req, res) => {
  res.redirect('/campfire?nickname='+req.body.nickname+'&avatar='+req.body.avatar+'&id='+Math.random());
  // creates random id when joining
});

app.get("/campfire", (req, res) => {
  res.sendFile("/public/campfire.html", root);
});

app.post("/register", (req, res) => {
  let guest = new Guest(req.body.nickname, req.body.avatar, req.body.id, req.body.public_key);
  guests.push(guest);
  // after registration guest has not only id but public key
  // generating of guest keys on the client side
  console.log(guests)
});

app.post("/exit", (req, res) => {
  // Parse request and the sign of request
  let id = req.body.id;
  let detachedSignature = JSON.parse(req.body.message);
  (async () => {
  // Find public key of the guest who requested
  let guestId = id;
  let guestPublicKey;
  let guest_number = 0;
  for (let i = 0; i < guests.length; i++) { // in guests
    if (guestId == guests[i].id) {
      guestPublicKey = guests[i].public_key;
      guest_number = i;
    }
  }
  // Verify request by signature
  if (guestPublicKey) {
    const message = await openpgp.createMessage({ text: 'exit' });
    const signature = await openpgp.readSignature({
        armoredSignature: detachedSignature
    });
    const publicKey = await openpgp.readKey({ armoredKey: guestPublicKey });
    const verificationResult = await openpgp.verify({
        message,
        signature,
        verificationKeys: publicKey
    })
    const { verified, keyID } = verificationResult.signatures[0];
    try {
        await verified;
        // If verified delete the guest from guests
        if (verified) {
          guests.splice(guest_number,1);
          console.log(guests)
        }
    } catch (e) {
        throw new Error('Signature could not be verified: ' + e.message);
    }
  }
  })();
});

app.get("/guests_get", (req, res) => {
    res.json(guests);
});

io.on('connection', (socket) => {
  console.log('a guest connected to socket');
  socket.on('stream_audio', (data) => {
    io.emit('broadcast_audio', data);
  });
});


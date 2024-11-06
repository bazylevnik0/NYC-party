import express from "express";
import ViteExpress from "vite-express";

const app = express();

const server = app.listen(3000, "0.0.0.0", () =>
  console.log("party started on port 3000...")
);

ViteExpress.bind(app, server);

import http from 'http';
import {Server }from "socket.io";

const io = new Server(server);

var messages = [];

io.on('connection', (socket) => {
  console.log('a guest connected to socket');
  socket.on('socket_chat', (data) => {
    messages.push( JSON.parse(data))
    console.log(messages);
    io.emit('broadcast_chat', JSON.stringify(messages));
  });
});

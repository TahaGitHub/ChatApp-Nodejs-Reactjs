import * as express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import * as dotenv from 'dotenv';
import { Message, MessageContent } from "./models/oop";
dotenv.config();

const PORT = process.env.PORT || 30100;

const app = express();
app.set("port", PORT);

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

let auto_message = [
  "Hi, Welcome to our company, we are here to assist you. Please contact us on: test@test.com",
  "Hi, we are here to assist you Please contact us on: test@test.com"
];

io.on("connection", (socket) => {
  console.log('New user connected');
  
  // Receive Message From User
  socket.on('message', (message: Message) => {
    console.log(`Chat's id: ${message.chatId} & User's Message: ${message.message.messageText}`);
    
    let random = Math.floor(Math.random()*(1 - 0 + 1) + 0);

    // Wait a Second and Send Welcome Message To User
    setTimeout(() => {
      socket.emit("message", { chatId: message.chatId, message: new MessageContent(auto_message[random])});
    }, 1000);
  });

  // Generat ChatId and send to user
  socket.on('request-id', () => {
    const chatId: Number = Math.floor(Math.random()*(1000 - 1 + 1) + 1);
    console.log(`Created chat id ${chatId}`);
    socket.emit('res-request-id', chatId);
  });

  // Disconnection status
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
  // Send Confirm Connection
  socket.emit('connection', null);
});

httpServer.listen(PORT, function() {
  console.log(`Listening to ${PORT}`)
});
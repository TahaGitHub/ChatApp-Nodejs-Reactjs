import * as express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 30100;

const app = express();
app.set("port", PORT);

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  console.log('New user connected');
  
  // Receive Message From User
  socket.on('message', ({ id, msg }) => {
    console.log(`Chat's id: ${id} & User's Message: ${msg}`);
    
    if (!id) {
      id = 12;
      console.log(`Created chat id ${id}`);
    }

    // Send Message To User
    socket.emit("message", { id, msg: 'messagessssssss' });
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
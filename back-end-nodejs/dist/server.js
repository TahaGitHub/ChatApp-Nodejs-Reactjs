"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const dotenv = require("dotenv");
const oop_1 = require("./models/oop");
dotenv.config();
const PORT = process.env.PORT || 30100;
const app = express();
app.set("port", PORT);
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, { /* options */});
let auto_message = [
    "Hi, Welcome to our company, we are here to assist you. Please contact us on: test@test.com",
    "Hi, we are here to assist you Please contact us on: test@test.com"
];
io.on("connection", (socket) => {
    console.log('New user connected');
    // Receive Message From User
    socket.on('message', (message) => {
        console.log(`Chat's id: ${message.chatId} & User's Message: ${message.message.messageText}`);
        let random = Math.floor(Math.random() * (1 - 0 + 1) + 0);
        // Wait a Second and Send Welcome Message To User
        setTimeout(() => {
            socket.emit("message", { chatId: message.chatId, message: new oop_1.MessageContent(auto_message[random]) });
        }, 1000);
    });
    // Generat ChatId and send to user
    socket.on('request-id', () => {
        const chatId = Math.floor(Math.random() * (1000 - 1 + 1) + 1);
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
httpServer.listen(PORT, function () {
    console.log(`Listening to ${PORT}`);
});
//# sourceMappingURL=server.js.map
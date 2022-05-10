"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 30100;
const app = express();
app.set("port", PORT);
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, { /* options */});
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
httpServer.listen(PORT, function () {
    console.log(`Listening to ${PORT}`);
});
//# sourceMappingURL=server.js.map
const { Message, MessageContent } = require("../models/oop");
const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");
describe("virtual server and client test", () => {
    let io, serverSocket, clientSocket;
    beforeAll((done) => {
        const httpServer = createServer();
        io = new Server(httpServer);
        httpServer.listen(() => {
            const port = httpServer.address().port;
            clientSocket = new Client(`http://localhost:${port}`);
            io.on("connection", (socket) => {
                serverSocket = socket;
            });
            clientSocket.on("connect", done);
        });
    });
    afterAll(() => {
        io.close();
        clientSocket.close();
    });
    it("check socket and client connection", (done) => {
        clientSocket.on("hello", (arg) => {
            expect(arg).toBe("world");
            done();
        });
        serverSocket.emit("hello", "world");
    });
    it("should work (with ack)", (done) => {
        serverSocket.on("hi", (cb) => {
            cb("hola");
        });
        clientSocket.emit("hi", (arg) => {
            expect(arg).toBe("hola");
            done();
        });
    });
});
describe("real socket test must run the server", () => {
    let io, serverSocket, clientSocket;
    beforeAll((done) => {
        const httpServer = createServer();
        io = new Server(httpServer);
        httpServer.listen(() => {
            const port = 30003; // httpServer.address().port;
            clientSocket = new Client(`http://localhost:${port}`);
            io.on("connection", (socket) => {
                serverSocket = socket;
            });
            clientSocket.on("connect", done);
        });
    });
    afterAll(() => {
        io.close();
        clientSocket.close();
    });
    it("Check response message must containt in auto_message", (done) => {
        let auto_message = [
            "Hi, Welcome to our company, we are here to assist you. Please contact us on: test@test.com",
            "Hi, we are here to assist you Please contact us on: test@test.com"
        ];
        let chatId = 1;
        let ms = 'Hi my unit test';
        let msgContent = new MessageContent(ms);
        let testMessage = new Message(1, msgContent);
        clientSocket.on("message", (arg) => {
            expect(arg.chatId).toBe(chatId);
            expect(arg.message.date).not.toBeUndefined();
            expect(arg.message.from).toBe('server');
            expect(auto_message).toContain(arg.message.messageText);
            done();
        });
        clientSocket.emit("message", testMessage);
    });
    it("check response of request chat id", (done) => {
        clientSocket.on("res-request-id", (res) => {
            expect(res).toBeLessThanOrEqual(1000);
            expect(res).toBeGreaterThanOrEqual(1);
            expect(typeof (res)).toBe('number');
            done();
        });
        clientSocket.emit("request-id");
    });
});
//# sourceMappingURL=server.test.js.map
// import { createServer } from "http";
// import { Server } from "socket.io";
// import { io as Socket } from "socket.io-client";
describe("project", () => {
    test('first test', () => {
        expect(true).toBe(true);
    });
    // let io: any, serverSocket, clientSocket;
    // beforeAll((done) => {
    //   const httpServer = createServer();
    //   io = new Server(httpServer);
    //   httpServer.listen(() => {
    //     const port = process.env.PORT; // httpServer.address().port;
    //     clientSocket = Socket(`http://localhost:${port}`);
    //     io.on("connection", (socket:any) => {
    //       serverSocket = socket;
    //     });
    //     clientSocket.on("connect", done);
    //   });
    // });
    // afterAll(() => {
    //   io.close();
    //   clientSocket.close();
    // });
});
//# sourceMappingURL=server.test.js.map
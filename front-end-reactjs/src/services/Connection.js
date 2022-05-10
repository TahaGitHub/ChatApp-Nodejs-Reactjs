import socketClient from 'socket.io-client';

/*
 ** Connection to socket server.io
 ** Can find Url and Port in .env file
*/
export const Connection = () => {
  return socketClient(
    `http://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}`,
    { transports : ['websocket']
  });
}

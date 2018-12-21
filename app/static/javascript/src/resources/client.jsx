import {baseUrl} from "./constants";

let socket = require('socket.io-client')(baseUrl);

// socket.on('connect', () => {
  // socket.emit('connected');
// });

export {
  socket,
};
import {baseUrl} from "./constants";

let io = require('socket.io-client')(baseUrl);

io.on('connect', function () {
  io.emit('connected');
});


// const getFiles = (ctx, mimeType, page) => {
//
//   const data = {
//     mimeType: mimeType,
//     page: page
//   }
//
//   io.emit('getFiles', data);
//
//   // ctx.setState({photos: })
// }

export {
  io,
};
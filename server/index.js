const WebSocket = require('ws');
const express = require('express');

const app = express();

const server = new WebSocket.Server({ server:app.listen(8080) });

server.on('connection', socket => {
  socket.on('message', data => {
    console.log(`client says: ${data}`);
    const parsedData = JSON.parse(data);
    server.clients.forEach(client => {
      client.send(JSON.stringify({username:parsedData.username, msg:parsedData.msg}));
    });
  });
  socket.send('Hello from server via Socket');
});



// const WebSocket = require('ws');
// const express  = require('express');
// const app = express();
// const path = require('path');
//
// app.use('/', express.static(path.resolve(__dirname, '../client')));
//
// const myServer = app.listen(6942);
//
// const wsServer = new WebSocket.Server({ noServer: true });
//
// wsServer.on('connection', function(socket){
//   socket.on('message', function(msg){console.log(`recieved from client ${msg}`);
//     wsServer.clients.forEach(function each(client){
//       if(client.readyState === WebSocket.OPEN){
//         client.send(msg.toString());
//       }
//     })
//   })
// });
//
// myServer.on('upgrade', async function upgrade(request, socket, head){
//   if(Math.random()>0.5){
//     return socket.end('HTTP/1.1 401 Unauthorized \r\n', 'ascii');
//   }
//   wsServer.handleUpgrade(request, socket, head, function done(ws){
//     wsServer.emit('connection', ws, request);
//   });
// });

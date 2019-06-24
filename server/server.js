const http = require('http');
const express = require('express');
const io = require('socket.io');
const rxjs = require('rxjs');
// const state = require('../shared/state');

const app = express();

app.use(express.static('client'));
app.use(express.static('shared'));

const httpServer = http.createServer(app, 3000);
const ioServer = io(httpServer, {
  pingTimeout: 30000
});

rxjs.fromEvent(ioServer, 'connection').subscribe(handleConn);

/**
 * @param {SocketIO.Socket} socket 
 */
function handleConn(socket) {
  console.log(`${socket.id} connected`);

  let msg$ = rxjs.fromEvent(socket, 'msg');
  let disconnect$ = rxjs.fromEvent(socket, 'disconnect');

  msg$.subscribe(msg => {
    console.log('client said', msg);
    socket.emit('msg', { reply: true, ...msg });
  });
  disconnect$.subscribe(() => {
    console.log(`${socket.id} disconnected`);
  });
}

httpServer.listen(3000);

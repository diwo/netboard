define(
  ['rxjs'],
  /**
   * @param { import('rxjs') } rxjs
   */
  function(rxjs) {
    let socket = io();

    rxjs.fromEvent(socket, 'connect').subscribe(() => {
      console.log('connected', socket);
      socket.emit('msg', {x: 1, y: 2});
    });

    rxjs.fromEvent(socket, 'msg').subscribe((msg) => {
      console.log('server said', msg);
    });
  }
);

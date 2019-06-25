define(
  ['rxjs'],
  /**
   * @param { import('../types/rxjs') } rxjs
   */
  function(rxjs) {
    const { fromEvent } = rxjs;

    let socket = io();

    fromEvent(socket, 'connect').subscribe(() => {
      console.log('connected', socket);
      socket.emit('msg', {x: 1, y: 2});
    });

    fromEvent(socket, 'msg').subscribe((msg) => {
      console.log('server said', msg);
    });
  }
);

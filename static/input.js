define(['screen'], function(screen) {
  var state = null;
  var lastpos = null;

  _resetState();

  screen.canvas.addEventListener('mousedown', (ev) => {
    _resetState();
    _updatePos(ev);
    state.down = lastpos;
  });
  screen.canvas.addEventListener('mousemove', (ev) => {
    _updatePos(ev);
  });
  screen.canvas.addEventListener('mouseup', (ev) => {
    _updatePos(ev);
    state.up = lastpos;
  });

  function _resetState() {
    state = {
      down: null,
      up: null,
      dx: 0,
      dy: 0
    };
  }

  function _updatePos(event) {
    let newpos = {
      x: event.clientX,
      y: event.clientY
    };
    if (lastpos) {
      state.dx += newpos.x - lastpos.x;
      state.dy += newpos.y - lastpos.y;
    }
    lastpos = newpos;
  }

  function poll() {
    let st = state;
    _resetState();
    return st;
  }

  return { poll };
});

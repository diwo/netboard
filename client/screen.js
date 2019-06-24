define(['settings'], function(settings) {
  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  window.addEventListener('resize', _resize);
  _resize();

  function _resize() {
    canvas.margin = 0;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    settings.board.x = (window.innerWidth-settings.board.w)/2;
    settings.board.y = (window.innerHeight-settings.board.h)/2;
  }

  return { canvas, ctx };
});

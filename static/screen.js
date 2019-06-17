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
    settings.canvas.x = (window.innerWidth-settings.canvas.w)/2;
    settings.canvas.y = (window.innerHeight-settings.canvas.h)/2;
  }

  return { canvas, ctx };
});

define(['screen'], function(screen) {
  function bg({x, y, w, h, borderWidth}) {
    screen.ctx.save();
    screen.ctx.fillStyle = 'white'
    _fillRectWithBorder(x, y, w, h, borderWidth);
    screen.ctx.restore();
  }

  function square({x, y, w, h, style, borderWidth, borderStyle='black'}) {
    screen.ctx.save();
    screen.ctx.fillStyle = style;
    _fillRectWithBorder(x, y, w, h, borderWidth, borderStyle);
    screen.ctx.restore();
  }

  function _fillRectWithBorder(x, y, w, h, borderWidth, borderStyle='black') {
    screen.ctx.save();
    screen.ctx.fillStyle = borderStyle;
    screen.ctx.fillRect(x-borderWidth, y-borderWidth, w+(borderWidth*2), h+(borderWidth*2));
    screen.ctx.restore();
    screen.ctx.fillRect(x, y, w, h);
  }

  return { bg, square };
});

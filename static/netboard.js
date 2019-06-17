define(['settings', 'input', 'draw'], function(settings, input, draw) {
  var holding = null;
  var boxes = [];
  boxes.push({x: 200, y: 100, style: 'rgb(40, 120, 255)'});
  boxes.push({x: 300, y: 120, style: 'rgb(0, 180, 0)'});
  boxes.push({x: 400, y: 140, style: 'rgb(180, 0, 0)'});

  function start() {
    nextFrame();
  }

  function nextFrame() {
    window.requestAnimationFrame(nextFrame);
    handleInput();
    handleDraw();
  }

  function handleInput() {
    let inputData = input.poll();

    if (holding && (inputData.down || inputData.up)) {
      // release old box
      releaseBox();
    }
    if (inputData.down) {
      let box = getBox(inputData.down);
      if (box) {
        acquireBox(box);
      }
    }
    if (holding && (inputData.dx || inputData.dy)) {
      moveBox(inputData);
    }
    if (holding && inputData.up) {
      // release box acquired during this frame
      releaseBox();
    }
  }

  function releaseBox() {
    boxes = [holding, ...boxes];
    holding = null;
  }

  function acquireBox(box) {
    holding = box;
    boxes = boxes.filter(box => box !== holding);
  }

  function moveBox({dx, dy}) {
    holding.x += dx;
    holding.y += dy;
  }

  function getBox({x, y}) {
    for (let box of boxes) {
      if (inRange(x, settings.canvas.x + box.x, settings.box.w) &&
          inRange(y, settings.canvas.y + box.y, settings.box.h)) {
        return box;
      }
    }
    return null;
  }

  function inRange(v, lower, length) {
    return v >= lower && v <= lower+length;
  }

  function handleDraw() {
    draw.bg(settings.canvas);
    // Draw foreground last
    for (let i=0; i<boxes.length; i++) {
      drawBox(boxes[boxes.length - i - 1]);
    }
    if (holding) {
      drawBox(holding, settings.holding.borderStyle);
    }
  }

  function drawBox(box, borderStyle) {
    draw.square({
      ...settings.box,
      x: settings.canvas.x + box.x,
      y: settings.canvas.y + box.y,
      style: box.style,
      borderStyle
    });
  }

  return { start };
});

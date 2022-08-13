class Grid {
  constructor(canvasWidth, canvasHeight, cellSize = 20) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.cellSize = cellSize;
  }

  draw(ctx) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#111155';

    ctx.beginPath();
    ctx.moveTo(100, 0);
    ctx.lineTo(100, this.canvasHeight);
    ctx.stroke();
  }
}

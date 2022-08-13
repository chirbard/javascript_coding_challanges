class Grid {
  constructor(canvasWidth, canvasHeight, cellSize) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.cellSize = cellSize;
  }

  draw(ctx) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#b7e9ff';

    for (var i = this.cellSize; i < this.canvasWidth; i += this.cellSize) {
      ctx.beginPath();
      ctx.moveTo(i + 0.5, 0);
      ctx.lineTo(i + 0.5, this.canvasHeight);
      ctx.stroke();
    }
    for (var i = this.cellSize; i < this.canvasHeight; i += this.cellSize) {
      ctx.beginPath();
      ctx.moveTo(0, i + 0.5);
      ctx.lineTo(this.canvasWidth, i + 0.5);
      ctx.stroke();
    }
  }
}

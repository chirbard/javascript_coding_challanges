class Snake {
  constructor(cellSize) {
    this.cellSize = cellSize;
    this.body = [
      { x: 4, y: 0 },
      { x: 3, y: 0 },
      { x: 2, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 0 },
    ];

    this.controls = new Controls();
  }

  draw(ctx) {
    // pane iga järgnev jupp muutma hue'd
    ctx.fillStyle = '#00dd99';
    this.body.forEach((cell) => {
      ctx.fillRect(
        cell.x * this.cellSize,
        cell.y * this.cellSize,
        this.cellSize,
        this.cellSize
      );
    });
  }

  update() {
    console.log(this.body);
    const head = this.body[0];
    var newHead = { x: head.x, y: head.y };
    switch (this.controls.direction) {
      case 'up':
        newHead = {
          x: head.x,
          y: head.y - 1,
        };
        break;
      case 'down':
        newHead = {
          x: head.x,
          y: head.y + 1,
        };
        break;
      case 'left':
        newHead = {
          x: head.x - 1,
          y: head.y,
        };
        break;
      case 'right':
        newHead = {
          x: head.x + 1,
          y: head.y,
        };
        break;
    }
    this.body.unshift(newHead);
    this.body.pop();
  }
}

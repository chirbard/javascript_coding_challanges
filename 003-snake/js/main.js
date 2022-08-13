const canvas = document.getElementById('canvas');
canvas.width = 400;
canvas.height = 400;
const cellSize = 25;

const ctx = canvas.getContext('2d');
const grid = new Grid(canvas.width, canvas.height, cellSize);
const snake = new Snake(cellSize);

animate();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.update();
  grid.draw(ctx);
  snake.draw(ctx);
  requestAnimationFrame(animate);
}

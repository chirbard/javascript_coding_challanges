const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');
const grid = new Grid(canvas.width, canvas.height, 20);

grid.draw(ctx);

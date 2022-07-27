const canvas = document.querySelector('canvas');
const width = canvas.width;
const height = canvas.height;
let ctx = canvas.getContext('2d');

let i = 0;

intervalID = setInterval(function draw() {
  // ctx.save();
  // ctx.translate(50, 50);
  // ctx.rotate(30);

  // ctx.beginPath();
  // ctx.rect(40, 40, 40, 40);
  // ctx.fill();

  // ctx.restore();

  ctx.lineWidth = 1;
  ctx.strokeStyle = 'white';

  ctx.beginPath();
  ctx.moveTo(10, 10);
  ctx.lineTo(i, 100);
  ctx.stroke();
  i++;
  console.log(i);
}, 40);

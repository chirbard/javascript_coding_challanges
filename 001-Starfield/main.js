const canvas = document.querySelector('canvas');
const width = canvas.width;
const height = canvas.height;
let ctx = canvas.getContext('2d');

// let i = 0;
let koordinaadid = [];

intervalID = setInterval(function () {
  ctx.clearRect(0, 0, width, height);
  // generate a random number between 0 and width for x and y
  let x = Math.floor(Math.random() * width);
  let y = Math.floor(Math.random() * height);

  // add the coordinates to the array
  koordinaadid.push([x, y]);

  for (let i = 0; i < koordinaadid.length; i++) {
    ctx.save();
    ctx.translate(koordinaadid[i][0], koordinaadid[i][1]);
    ctx.rotate(Math.PI / 4);

    ctx.beginPath();
    ctx.rect(0, -25, i, 50);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    ctx.restore();
  }

  // ctx.clearRect(0, 0, width, height);
  // ctx.save();
  // ctx.translate(50, 50);
  // ctx.rotate(Math.PI / 4);

  // ctx.beginPath();
  // ctx.rect(0, -25, i, 50);
  // ctx.fillStyle = '#FFFFFF';
  // ctx.fill();

  // ctx.restore();

  // ctx.lineWidth = 1;
  // ctx.strokeStyle = 'white';

  // ctx.beginPath();
  // ctx.moveTo(10, 10);
  // ctx.lineTo(i, 100);
  // ctx.stroke();
  // i++;
  // console.log(i);
}, 40);

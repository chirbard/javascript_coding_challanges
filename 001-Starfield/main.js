const canvas = document.querySelector('canvas');
const width = canvas.width;
const height = canvas.height;
let ctx = canvas.getContext('2d');

// let i = 0;
let koordinaadid = [];

for (let i = 0; i < 150; i++) {
  const x = Math.floor(Math.random() * width);
  const y = Math.floor(Math.random() * height);

  const xPikkus = Math.abs(width / 2 - x);
  const yPikkus = Math.abs(height / 2 - y);
  // console.log(xPikkus, yPikkus);

  const nurk = Math.atan(yPikkus / xPikkus);

  // leia mis pidi peab igas veerandis liikuma ja pane õige nurk arraysse

  if (y >= width / 2) {
    if (x > height / 2) {
      koordinaadid.push([x, y, nurk, 0]);
    } else {
      koordinaadid.push([x, y, Math.PI - nurk, 0]);
    }
  } else {
    if (x > height / 2) {
      koordinaadid.push([x, y, -nurk, 0]);
    } else {
      koordinaadid.push([x, y, Math.PI + nurk, 0]);
    }
  }
}

// console.log(koordinaadid);

// for (let i = 0; i < koordinaadid.length; i++) {
//   const x = koordinaadid[i][0];
//   const y = koordinaadid[i][1];
//   const nurk = koordinaadid[i][2];
//   const kaugus = koordinaadid[i][3];

//   ctx.save();
//   ctx.translate(koordinaadid[i][0], koordinaadid[i][1]);
//   ctx.rotate(nurk);

//   ctx.beginPath();
//   ctx.rect(0, -2, 40, 4);
//   ctx.fillStyle = '#FFFFFF';
//   ctx.fill();

//   ctx.restore();
// }

let pikkus = 100;
let interval = 0;
const kiirus = 20;

intervalID = setInterval(() => {
  ctx.clearRect(0, 0, width, height);
  const neljandik = Math.floor(koordinaadid.length / 4);
  // console.log(neljandik);

  for (let i = 0; i < neljandik; i++) {
    koordinaadid[i][3] += kiirus;
    if (koordinaadid[i][3] > pikkus * 2) {
      for (let j = 0; j < neljandik; j++) {
        koordinaadid[j][3] = 0;
      }
    }
    if (koordinaadid[i][3] > pikkus) {
      break;
    }

    const x = koordinaadid[i][0];
    const y = koordinaadid[i][1];
    const nurk = koordinaadid[i][2];
    const kaugus = koordinaadid[i][3];

    ctx.save();
    ctx.translate(koordinaadid[i][0], koordinaadid[i][1]);
    ctx.rotate(nurk);

    ctx.beginPath();
    ctx.rect(0, -0.5, kaugus, 1);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    ctx.restore();
  }
  if (interval > 5) {
    for (let i = neljandik; i < neljandik * 2; i++) {
      koordinaadid[i][3] += kiirus;
      if (koordinaadid[i][3] > pikkus * 2) {
        for (let j = neljandik; j < neljandik * 2; j++) {
          koordinaadid[j][3] = 0;
        }
      }
      if (koordinaadid[i][3] > pikkus) {
        break;
      }

      const x = koordinaadid[i][0];
      const y = koordinaadid[i][1];
      const nurk = koordinaadid[i][2];
      const kaugus = koordinaadid[i][3];

      ctx.save();
      ctx.translate(koordinaadid[i][0], koordinaadid[i][1]);
      ctx.rotate(nurk);

      ctx.beginPath();
      ctx.rect(0, -0.5, kaugus, 1);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      ctx.restore();
    }
  }
  if (interval > 12) {
    for (let i = neljandik * 2; i < neljandik * 3; i++) {
      koordinaadid[i][3] += kiirus;
      if (koordinaadid[i][3] > pikkus * 2) {
        for (let j = neljandik * 2; j < neljandik * 3; j++) {
          koordinaadid[j][3] = 0;
        }
      }
      if (koordinaadid[i][3] > pikkus) {
        break;
      }

      const x = koordinaadid[i][0];
      const y = koordinaadid[i][1];
      const nurk = koordinaadid[i][2];
      const kaugus = koordinaadid[i][3];

      ctx.save();
      ctx.translate(koordinaadid[i][0], koordinaadid[i][1]);
      ctx.rotate(nurk);

      ctx.beginPath();
      ctx.rect(0, -0.5, kaugus, 1);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      ctx.restore();
    }
  }

  interval++;
}, 40);

// intervalID = setInterval(function () {
//   ctx.clearRect(0, 0, width, height);

//   for (let i = 0; i < koordinaadid.length; i++) {
//     ctx.save();
//     ctx.translate(koordinaadid[i][0], koordinaadid[i][1]);
//     ctx.rotate(Math.PI / 4);

//     ctx.beginPath();
//     ctx.rect(0, -25, i, 50);
//     ctx.fillStyle = '#FFFFFF';
//     ctx.fill();

//     ctx.restore();
//   }

//   // ctx.clearRect(0, 0, width, height);
//   // ctx.save();
//   // ctx.translate(50, 50);
//   // ctx.rotate(Math.PI / 4);

//   // ctx.beginPath();
//   // ctx.rect(0, -25, i, 50);
//   // ctx.fillStyle = '#FFFFFF';
//   // ctx.fill();

//   // ctx.restore();

//   // ctx.lineWidth = 1;
//   // ctx.strokeStyle = 'white';

//   // ctx.beginPath();
//   // ctx.moveTo(10, 10);
//   // ctx.lineTo(i, 100);
//   // ctx.stroke();
// i++;
// console.log(i);
// }, 40);

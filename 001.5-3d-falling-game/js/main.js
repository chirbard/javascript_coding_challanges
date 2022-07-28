let camera, scene, renderer; // Three.js golbals
const originalBoxSize = 3; // original size of the box
const boxHeight = 1;
let stack = [];
let gameStarted = false;

init();

function init() {
  scene = new THREE.Scene();

  //foundation
  addLayer(0, 0, originalBoxSize, originalBoxSize);

  //first layer
  addLayer(-10, 0, originalBoxSize, originalBoxSize, 'x');

  // Set up lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight.position.set(10, 20, 0); // x, y, z
  scene.add(directionalLight);

  // Camera
  const width = 10;
  const height = width * (window.innerHeight / window.innerWidth);
  const camera = new THREE.OrthographicCamera(
    width / -2, // left
    width / 2, // right
    height / 2, // top
    height / -2, // bottom
    1, // near
    100 // far
  );

  camera.position.set(4, 4, 4);
  camera.lookAt(0, 0, 0);

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);

  // Add it to HTML
  document.body.appendChild(renderer.domElement);

  window.addEventListener('click', () => {
    if (!gameStarted) {
      renderer.setAnimationLoop(animation);
      gameStarted = true;
    } else {
      const topLayer = stack[stack.length - 1];
      const previousLayer = stack[stack.length - 2];

      const direction = topLayer.direction;

      const delta =
        topLayer.threejs.position[direction] -
        previousLayer.threejs.position[direction];

      const overhangSize = Math.abs(delta);

      const size = direction == 'x' ? topLayer.width : topLayer.depth;

      const overlap = size - overhangSize;

      if (overlap > 0) {
        // Cut layer
        const newWidth = direction == 'x' ? overlap : topLayer.width;
        const newDepth = direction == 'z' ? overlap : topLayer.depth;

        // update metadata
        topLayer.width = newWidth;
        topLayer.depth = newDepth;

        // update Threejs model
        topLayer.threejs.scale[direction] = overlap / size;
        topLayer.threejs.position[direction] -= delta / 2;

        // next layer
        const nectX = direction == 'x' ? topLayer.threejs.position.x : -10;
        const nectZ = direction == 'z' ? topLayer.threejs.position.z : -10;
        const nextDirection = direction == 'x' ? 'z' : 'x';

        addLayer(nextX, nextZ, newWidth, newDepth, nextDirection);
      }
    }
  });

  function animation() {
    const speed = 0.15;

    const topLayer = stack[stack.length - 1];
    topLayer.threejs.position[topLayer.direction] += speed;

    if (camera.position.y < boxHeight * (stack.length - 2) + 4) {
      camera.position.y += speed;
    }

    renderer.render(scene, camera);
  }
}

function addLayer(x, z, width, depth, direction) {
  const y = boxHeight * stack.length;

  const layer = generateBox(x, y, z, width, depth);
  layer.direction = direction;

  stack.push(layer);
}

function generateBox(x, y, z, width, depth) {
  const geometry = new THREE.BoxGeometry(width, boxHeight, depth);

  const color = new THREE.Color(`hsl(${30 + stack.length * 4}, 100%, 50%)`);
  const material = new THREE.MeshLambertMaterial({ color });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);

  scene.add(mesh);

  return {
    threejs: mesh,
    width,
    depth,
  };
}

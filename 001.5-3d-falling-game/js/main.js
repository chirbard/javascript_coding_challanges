let camera, scene, renderer; // Three.js golbals
const originalBoxSize = 3; // original size of the box
const boxHeight = 1;
let stack = [];
let overhangs = [];
let gameStarted = false;
let world;
let lastTime;

init();

function init() {
  // initialize cannonjs
  world = new CANNON.World();
  world.gravity.set(0, -10, 0);
  world.broadphase = new CANNON.NaiveBroadphase();
  world.solver.iterations = 40;

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

        // overhang
        const overhangShift =
          (overlap / 2 + overhangSize / 2) * Math.sign(delta);
        const overhangX =
          direction == 'x'
            ? topLayer.threejs.position.x + overhangShift
            : topLayer.threejs.position.x;
        const overhangZ =
          direction == 'z'
            ? topLayer.threejs.position.z + overhangShift
            : topLayer.threejs.position.z;
        const overhangWidth = direction == 'x' ? overhangSize : newWidth;
        const overhangDepth = direction == 'z' ? overhangSize : newDepth;

        addOverhang(overhangX, overhangZ, overhangWidth, overhangDepth);

        // next layer
        const nextX = direction == 'x' ? topLayer.threejs.position.x : -10;
        const nextZ = direction == 'z' ? topLayer.threejs.position.z : -10;
        const nextDirection = direction == 'x' ? 'z' : 'x';

        addLayer(nextX, nextZ, newWidth, newDepth, nextDirection);
      }
    }
  });

  function animation() {
    const speed = 0.15;

    const topLayer = stack[stack.length - 1];
    topLayer.threejs.position[topLayer.direction] += speed;
    topLayer.cannonjs.position[topLayer.direction] += speed;

    // 4 is the initial camera height
    if (camera.position.y < boxHeight * (stack.length - 2) + 4) {
      camera.position.y += speed;
    }

    updatePhysics();
    renderer.render(scene, camera);
  }
  lastTime = time;
}

function updatePhysics() {
  world.stop(1 / 60); // stop the physics world

  // copy coordinates from cannonjs to threejs
  overhangs.forEach((element) => {
    element.threejs.position.copy(element.cannonjs.position);
    element.threejs.quaternion.copy(element.cannonjs.quaternion);
  });
}

function cutBox(topLayer, overlap, size, delta) {
  const direction = topLayer.direction;
  const newWidth = direction == 'x' ? overlap : topLayer.width;
  const newDepth = direction == 'z' ? overlap : topLayer.depth;

  // update metadata
  topLayer.width = newWidth;
  topLayer.depth = newDepth;

  // update Threejs model
  topLayer.threejs.scale[direction] = overlap / size;
  topLayer.threejs.position[direction] -= delta / 2;

  // update Cannonjs model
  topLayer.cannonjs.position[direction] -= delta / 2;

  // Replace shape to a smaller one
  const shape = new CANNON.Box(
    new CANNON.Vec3(newWidth / 2, boxHeight / 2, newDepth / 2)
  );
  topLayer.cannonjs.shape = [];
  topLayer.cannonjs.addShape(shape);
}

function addLayer(x, z, width, depth, direction) {
  const y = boxHeight * stack.length;

  const layer = generateBox(x, y, z, width, depth, false);
  layer.direction = direction;

  stack.push(layer);
}

function addOverhang(x, z, width, depth) {
  const y = boxHeight * (stack.length - 1); // add the box on the same layer
  const overhang = generateBox(x, y, z, width, depth, true);
  overhangs.push(overhang);
}

function generateBox(x, y, z, width, depth, falls) {
  //threejs
  const geometry = new THREE.BoxGeometry(width, boxHeight, depth);
  const color = new THREE.Color(`hsl(${30 + stack.length * 4}, 100%, 50%)`);
  const material = new THREE.MeshLambertMaterial({ color });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  scene.add(mesh);

  //cannonjs
  const shape = new CANNON.Box(
    new CANNON.Vec3(width / 2, boxHeight / 2, depth / 2)
  );
  let mass = falls ? 5 : 0;
  const body = new CANNON.Body({ mass, shape });
  body.position.set(x, y, z);
  world.add(body);

  return {
    threejs: mesh,
    cannonjs: body,
    width,
    depth,
  };
}

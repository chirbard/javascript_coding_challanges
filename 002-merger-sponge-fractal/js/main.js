// tseeni üles seadmine
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

// teeb kasti, lisab selle arraysse ja lisab selle tseeni
var sponge = [];
var b = new Box(0, 0, 0, 1);
sponge.push(b);
sponge[0].show();

// Tulede üles seadmine
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
dirLight.position.set(10, 20, 0); // x, y, z
scene.add(dirLight);

// Perspective camera
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(
  45, // field of view in degrees
  aspect, // aspect ratio
  1, // near plane
  100 // far plane
);

// kaamera algpositsioon
camera.position.set(0, 1, 0);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

// Add it to HTML
document.body.appendChild(renderer.domElement);

// kaamera keerleb ümber keha
fraction = 0;
function animate() {
  requestAnimationFrame(animate);
  camera.position.x = Math.sin((Math.PI / 500) * fraction) * 3;
  camera.position.z = Math.cos((Math.PI / 500) * fraction) * 3;
  fraction++;
  camera.lookAt(0, 0, 0);
  renderer.render(scene, camera);
}
animate();

// hiire vajutus
document.body.addEventListener('click', function () {
  // puhastab tseeni
  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }

  //lisab tuled uuesti
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
  dirLight.position.set(10, 20, 0); // x, y, z
  scene.add(dirLight);

  // teeb uued väiksemad kastid
  var next = [];
  for (var i = 0; i < sponge.length; i++) {
    next = next.concat(sponge[i].generate());
  }
  sponge = next;
  for (var i = 0; i < sponge.length; i++) {
    sponge[i].show();
  }
});

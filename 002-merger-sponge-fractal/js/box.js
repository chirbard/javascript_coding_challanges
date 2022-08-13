class Box {
  constructor(x, y, z, r_) {
    this.pos = { x: x, y: y, z: z };
    this.r_ = r_;
  }

  generate() {
    var boxes = [];
    for (var x = -1; x < 2; x++) {
      for (var y = -1; y < 2; y++) {
        for (var z = -1; z < 2; z++) {
          var sum = Math.abs(x) + Math.abs(y) + Math.abs(z);
          var newR = this.r_ / 3;
          if (sum > 1) {
            var b = new Box(
              this.pos.x + x * newR,
              this.pos.y + y * newR,
              this.pos.z + z * newR,
              newR
            );
            boxes.push(b);
          }
        }
      }
    }
    return boxes;
  }

  show() {
    // Add a cube to the scene
    const geometry = new THREE.BoxGeometry(this.r_, this.r_, this.r_); // width, height, depth
    const material = new THREE.MeshLambertMaterial({ color: 0xfb8e00 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(this.pos.x, this.pos.y, this.pos.z); // Optional, 0,0,0 is the default
    scene.add(mesh);
  }
}

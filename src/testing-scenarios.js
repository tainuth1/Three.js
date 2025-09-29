import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 15;

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
});
new OrbitControls(camera, renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.BoxGeometry(2, 2, 2, 10, 10, 10);
const meterial = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  wireframe: true,
});
const cube = new THREE.Mesh(geometry, meterial);
cube.rotation.set(2, 4, 0);
scene.add(cube);

const ambienLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambienLight);

function animate() {
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

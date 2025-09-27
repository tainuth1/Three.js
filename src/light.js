import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
});
camera.position.set(0, 5, 10);
renderer.render(scene, camera);
renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// const gridHelper = new THREE.GridHelper();
// scene.add(gridHelper);

new OrbitControls(camera, renderer.domElement);

const groundTexture = new THREE.TextureLoader().load("grasslight-big.jpg");
const normalMap = new THREE.TextureLoader().load("grasslight-big-nm.jpg");

const groundGeometry = new THREE.PlaneGeometry(100, 100); // width, height
const groundMaterial = new THREE.MeshStandardMaterial({
  map: groundTexture,
  normalMap: normalMap,
  roughness: 1,
  metalness: 0.2,
});

const ground = new THREE.Mesh(groundGeometry, groundMaterial);

ground.rotation.x = -Math.PI / 2; // Rotate to be horizontal (facing up)
ground.position.y = 0; // Position at ground level
ground.receiveShadow = true;
scene.add(ground);

// const geometry = new THREE.SphereGeometry(2, 200, 100, 100);
const geometry = new THREE.BoxGeometry(3, 3, 3, 20, 20, 20);
const material = new THREE.MeshPhongMaterial({
  color: 0x049ef4,
  specular: 0xffffff,
  reflectivity: 1,
  shininess: 100,
  //   wireframe: true,
});
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 2, 0);
scene.add(cube);

const pointLight = new THREE.PointLight(0xffffff, 1000);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(pointLight);
scene.add(ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

const metalTexture = new THREE.TextureLoader().load("iron/metal.jpg");
const mentalNormalMap = new THREE.TextureLoader().load("iron/metal-normal.jpg");
const metalBumpMap = new THREE.TextureLoader().load("iron/metal-bump.jpg");
const metaldiffuse = new THREE.TextureLoader().load("iron/metal-diffuse.jpg");

const sphereGeometry = new THREE.SphereGeometry(2, 30, 30);
const sphereMaterial = new THREE.MeshPhongMaterial({
  color: 0x049ef4,
  specular: 0xffffff,
  reflectivity: 1,
  shininess: 100,
  map: metaldiffuse,
  normalMap: mentalNormalMap,
  bumpMap: metalBumpMap,
  //   wireframe: true,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(-5, 2, 0);
scene.add(sphere);

function animate() {
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

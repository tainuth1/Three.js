import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const sceneTexture = new THREE.TextureLoader().load("city-night.jpg");

const scene = new THREE.Scene();
scene.background = sceneTexture;
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.lookAt(0, 0, 0);
camera.position.set(0, 10, 20);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
});
renderer.render(scene, camera);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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
const geometry = new THREE.BoxGeometry(3, 3, 3, 5, 5, 5);
const material = new THREE.MeshPhongMaterial({
  color: 0x049ef4,
  specular: 0xffffff,
  reflectivity: 1,
  shininess: 100,
  wireframe: true,
});
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 2, 0);
cube.castShadow = true;
scene.add(cube);

// Point Light
// const pointLight = new THREE.PointLight(0xffffff, 2);
// pointLight.position.set(10, 10, 10);
// scene.add(pointLight);

// const ambientLight = new THREE.AmbientLight(pointLight);
// scene.add(ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(lightHelper);

// Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(10, 10, 10);
directionalLight.castShadow = true;

scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(directionalLight);
scene.add(ambientLight);

const lightHelper = new THREE.DirectionalLightHelper(directionalLight);
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
sphere.castShadow = true;
scene.add(sphere);

const torusKnotGeometry = new THREE.TorusKnotGeometry(3, 1, 500, 100, 2, 5);
const torusKnotMeterial = new THREE.MeshPhongMaterial({
  color: 0x00ff00,
  specular: 0xffffff,
  shininess: 100,
  reflectivity: 1,
});
const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMeterial);
torusKnot.position.set(0, 3, -7);
torusKnot.scale.set(0.5, 0.5, 0.5);
torusKnot.castShadow = true;
scene.add(torusKnot);

// Testing new thing in the documents:
console.log(scene.children);
// scene.background

let isAnimating = false;
const button = document.querySelector(".btn");
button.addEventListener("click", () => {
  isAnimating = !isAnimating;
});

function animate() {
  if (!isAnimating) {
    // requestAnimationFrame(animate);
    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;
    torusKnot.rotation.z += 0.01;
  }
  renderer.render(scene, camera);

  const time = Date.now() * 0.001;
  const scale = 1 + Math.sin(time * 2) * 0.2; // Pulse between 0.8 and 1.2

  cube.scale.set(scale, scale, scale);
}
renderer.setAnimationLoop(animate);
// animate();

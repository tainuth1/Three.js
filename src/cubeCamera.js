import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";
document.querySelector(".btn").style.display = "none";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 10);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
});
renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const urls = [
  "cube/posx.jpg",
  "cube/negx.jpg",
  "cube/posy.jpg",
  "cube/negy.jpg",
  "cube/posz.jpg",
  "cube/negz.jpg",
];

const loader = new THREE.CubeTextureLoader();
scene.background = loader.load(urls);

new OrbitControls(camera, renderer.domElement);

const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(1024, {
  format: THREE.RGBAFormat,
  generateMipmaps: true,
  minFilter: THREE.LinearMipMapLinearFilter,
});

const cubeCamera = new THREE.CubeCamera(0.1, 1000, cubeRenderTarget);
scene.add(cubeCamera);

const sphereGeometry = new THREE.SphereGeometry(2, 100, 100);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0,
  metalness: 1,
  envMap: cubeRenderTarget.texture,
  envMapIntensity: 1.0,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, 0, 0);
scene.add(sphere);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 500);
pointLight.position.set(0, 10, 0);
// scene.add(pointLight);

const pointLightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(pointLightHelper);

function animate() {
  cubeCamera.position.copy(sphere.position);
  cubeCamera.update(renderer, scene);
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 5, 20);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
// PBR-friendly defaults
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.6;
renderer.physicallyCorrectLights = true;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.enableDamping = true;
controls.enablePan = false;
controls.maxDistance = 10;
controls.minDistance = 5;
controls.minPolarAngle = Math.PI / 3;
controls.maxPolarAngle = Math.PI / 2;

const textureLoader = new THREE.TextureLoader();
textureLoader.load("/env.png", (tex) => {
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  scene.environment = tex;
  scene.background = tex;
});

const loader = new GLTFLoader();
loader.load("/models/city_scene.glb", (gltf) => {
  const model = gltf.scene;
  model.name = "CITY";

  model.traverse((obj) => {
    if (obj.isMesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });

  scene.add(model);
});

// Subtle skylight to lift shadowed areas (kept low to preserve shadow contrast)
const hemiLight = new THREE.HemisphereLight(0xb1e1ff, 0x1b1b1b, 0.4);
scene.add(hemiLight);

// Key light (sun)
const directionalLight = new THREE.DirectionalLight(0xfff0df, 3.6);
directionalLight.position.set(60, 120, -80);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(4096, 4096);
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 400;
directionalLight.shadow.camera.left = -120;
directionalLight.shadow.camera.right = 120;
directionalLight.shadow.camera.top = 120;
directionalLight.shadow.camera.bottom = -120;
// Tweak shadow biasing for clearer, artifact-free shadows
directionalLight.shadow.bias = -0.0008;
directionalLight.shadow.normalBias = 0.02;
scene.add(directionalLight);

// Fill light (cooler, softer)
const fillLight = new THREE.DirectionalLight(0xd0e6ff, 0.45);
fillLight.position.set(-80, 50, 100);
scene.add(fillLight);

// Rim/back light to accent silhouettes
const rimLight = new THREE.DirectionalLight(0xffffff, 0.9);
rimLight.position.set(0, 100, 120);
scene.add(rimLight);

// Helpers disabled for final look. Uncomment for debugging.
// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
// scene.add(directionalLightHelper);
// const gridHelper = new THREE.GridHelper(100, 20, 0xffffff);
// scene.add(gridHelper);

function animate() {
  controls.update();
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

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

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
  antialias: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.z = 30;

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const meterial = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  // wireframe: true,
});
const torus = new THREE.Mesh(geometry, meterial);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff, 900);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

// const cameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
// scene.add(cameraHelper);

const gridHelper = new THREE.GridHelper(200, 200, 0xffffff);
scene.add(gridHelper);

new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.enableZoom = true;
// controls.enablePan = true;
// controls.enableRotate = true;
// controls.enableZoom = true;
// controls.enablePan = true;

function addStars() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(150));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(300).fill().forEach(addStars);

const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;

const catTexture = new THREE.TextureLoader().load("cat.jpg");
const cat = new THREE.Mesh(
  new THREE.BoxGeometry(4, 4, 4),
  new THREE.MeshBasicMaterial({ map: catTexture })
);
scene.add(cat);

const moonTexture = new THREE.TextureLoader().load("moon.jpg");
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: moonTexture })
);
moon.position.x = 20;
scene.add(moon);

const moon2 = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: moonTexture })
);
moon2.position.x = -20;
scene.add(moon2);

function scrollMoveCamera() {
  const t = document.body.getBoundingClientRect().top;
  // moon.position.x = -t * 0.01;
}
document.body.onscroll = scrollMoveCamera;

const testBoxGeo = new THREE.BoxGeometry(2, 2, 2);
const testBoxMat = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const testBox = new THREE.Mesh(testBoxGeo, testBoxMat);
testBox.scale.set(1, 1, 1);
testBox.position.z = -20;
scene.add(testBox);

// ====> Testing Box
// Hover to scale: use raycaster and pointer events
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hovered = null;
let testBoxTargetScale = 1;

function updateRaycasterFromEvent(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
}

function onPointerMove(event) {
  updateRaycasterFromEvent(event);
  const intersects = raycaster.intersectObjects([testBox], true);
  const hit = intersects.length > 0 ? intersects[0].object : null;
  if (hit && hovered !== testBox) {
    hovered = testBox;
    testBoxTargetScale = 2;
    renderer.domElement.style.cursor = "pointer";
  } else if (!hit && hovered) {
    hovered = null;
    testBoxTargetScale = 1;
    renderer.domElement.style.cursor = "default";
  }
}

function onPointerLeave() {
  hovered = null;
  testBoxTargetScale = 1;
  renderer.domElement.style.cursor = "default";
}

renderer.domElement.addEventListener("pointermove", onPointerMove);
renderer.domElement.addEventListener("pointerleave", onPointerLeave);
// ====> Testing Box

function animate() {
  // Testing Box
  // Smoothly interpolate testBox scale toward target
  const s = THREE.MathUtils.lerp(testBox.scale.x, testBoxTargetScale, 0.15);
  testBox.scale.set(s, s, s);

  renderer.render(scene, camera);
  // torus.rotation.x += 0.009;
  torus.rotation.y += 0.009;
  moon.rotation.y += 0.005;
  moon2.rotation.y += 0.01;
}
renderer.setAnimationLoop(animate);

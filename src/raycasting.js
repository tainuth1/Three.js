import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";

document.querySelector(".btn").style.display = "none";
const spaceTexture = new THREE.TextureLoader().load("space.jpg");
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0x87CEEB);
scene.background = spaceTexture;
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(-17, 10, 17);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
new OrbitControls(camera, renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const gridHelper = new THREE.GridHelper(50, 2, 0xffffff);
// scene.add(gridHelper);

const groundGeometry = new THREE.PlaneGeometry(50, 50);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x8a9396,
  roughness: 1,
  metalness: 0.2,
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.receiveShadow = true;
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

const box1 = new THREE.Mesh(
  new THREE.BoxGeometry(4, 4, 4),
  new THREE.MeshStandardMaterial({ color: 0x0000ff })
);
box1.castShadow = true;
box1.position.set(3, 2, 0);
scene.add(box1);

const box2 = new THREE.Mesh(
  new THREE.BoxGeometry(4, 4, 4),
  new THREE.MeshStandardMaterial({ color: 0x0000ff })
);
box2.castShadow = true;
box2.position.set(-3, 2, 0);
scene.add(box2);

const box3 = new THREE.Mesh(
  new THREE.BoxGeometry(4, 4, 4),
  new THREE.MeshStandardMaterial({ color: 0x0000ff })
);
box3.castShadow = true;
box3.position.set(0, 6, 0);
scene.add(box3);

const torusGeometry = new THREE.TorusGeometry(3, 1, 100, 100);
const torusMaterial = new THREE.MeshPhongMaterial({
  color: 0x00ff00,
  specular: 0xffffff,
  shininess: 100,
  reflectivity: 1,
});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.set(-8, 0, -5);
torus.rotation.x = -Math.PI / 2;
torus.position.y = 1;
torus.receiveShadow = true;
scene.add(torus);

const directionalLight = new THREE.DirectionalLight(0xfffff, 2);
directionalLight.position.set(10, 8, 25);
directionalLight.castShadow = true;
scene.add(directionalLight);
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight
);
scene.add(directionalLightHelper);

function animate() {
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

// Raycasting

// const raycaster = new THREE.Raycaster();
// document.addEventListener("mousedown", (e) => {
//   const coords = new THREE.Vector2(
//     (e.clientX / renderer.domElement.clientWidth) * 2 - 1,
//     -((e.clientY / renderer.domElement.clientHeight) * 2 - 1)
//   );
//   raycaster.setFromCamera(coords, camera);

//   const intersection = raycaster.intersectObjects(scene.children, true);
//   if (intersection.length > 0) {
//     const selectedObject = intersection[0].object;
//     if (ground.uuid != selectedObject.uuid) {
//       selectedObject.material.color = new THREE.Color(
//         Math.random(),
//         Math.random(),
//         Math.random()
//       );
//       selectedObject.rotation.y += 0.5;
//     }
//   } else {
//     alert("You aren't click on anything, maybe you just click on the space.");
//   }

//   // const intersection = raycaster.intersectObjects([box1, box2, box3], true);
//   // if (intersection.length > 0) {
//   //   const selectedObject = intersection[0].object;
//   //   selectedObject.material.color = new THREE.Color(
//   //     Math.random(),
//   //     Math.random(),
//   //     Math.random()
//   //   );
//   //   selectedObject.rotation.y += 0.5;
//   // } else {
//   //   alert("You aren't click on anything, maybe you just click on the space.");
//   // }
// });

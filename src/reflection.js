import * as THREE from "three";
import { WebGLRenderer } from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/Addons.js";
document.querySelector(".btn").style.display = "none";

const scene = new THREE.Scene();
scene.name = "ReflectionScene";

// Load background texture with proper error handling
const textureLoader = new THREE.TextureLoader();
textureLoader.load(
  "/env.png",
  function (texture) {
    // Success callback
    texture.colorSpace = THREE.SRGBColorSpace;
    scene.background = texture;
    console.log("Background texture loaded successfully");
  },
  undefined,
  function (error) {
    // Error callback
    console.error("Error loading background texture:", error);
    // Set a fallback color instead of white
    scene.background = new THREE.Color(0x87ceeb); // Sky blue
  }
);

const groundGeometry = new THREE.BoxGeometry(70, 70, 1);
groundGeometry.name = "GroundGeometry";
const groundTexture = new THREE.TextureLoader().load("/grasslight-big.jpg");
groundTexture.colorSpace = THREE.SRGBColorSpace;
const groundNormalTexture = new THREE.TextureLoader().load(
  "/grasslight-big-nm.jpg"
);
groundNormalTexture.colorSpace = THREE.SRGBColorSpace;

const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x8a9396,
  roughness: 0,
  metalness: 0.3,
  //   map: groundTexture,
  //   normalMap: groundNormalTexture,
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.name = "Ground";
ground.receiveShadow = true;
ground.rotation.x = -Math.PI / 2;
ground.position.set(0, -0.5, 0);
// scene.add(ground);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 5, 25);
camera.name = "MainCamera";
const renderer = new WebGLRenderer({ canvas: document.getElementById("bg") });
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = false;
controls.autoRotateSpeed = 4;
controls.enablePan = false;
controls.maxDistance = 35;
controls.minDistance = 10;
controls.enableDamping = true;
// controls.dampingFactor = 1
controls.target = new THREE.Vector3(0, 0, 0); // change the center of the rotation target
controls.keys = {
  LEFT: "ArrowLeft", //left arrow
  UP: "ArrowUp", // up arrow
  RIGHT: "ArrowRight", // right arrow
  BOTTOM: "ArrowDown", // down arrow
  // to use other key use: e.g 'KeyD'
};
controls.listenToKeyEvents(window);
// controls.maxAzimuthAngle = Math.PI / 4;
// controls.minAzimuthAngle = Math.PI / 10;

controls.minPolarAngle = Math.PI / 3;
controls.maxPolarAngle = Math.PI / 2.2;

renderer.outputColorSpace = THREE.SRGBColorSpace;

const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(1024, {
  format: THREE.RGBAFormat,
  generateMipmaps: true,
  minFilter: THREE.LinearMipmapLinearFilter,
});
cubeRenderTarget.texture.colorSpace = THREE.SRGBColorSpace;
cubeRenderTarget.texture.mapping = THREE.CubeReflectionMapping;

const cubeCamera = new THREE.CubeCamera(0.1, 1000, cubeRenderTarget);
cubeCamera.name = "ReflectionCubeCamera";
scene.add(cubeCamera);

// const boxGeometry = new THREE.BoxGeometry(4, 4, 4);
const boxGeometry = new THREE.SphereGeometry(4, 50, 50);
const boxMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 1,
  roughness: 0,
  envMap: cubeRenderTarget.texture,
  envMapIntensity: 1.0,
});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.name = "ReflectiveSphere";
box.castShadow = true;
box.position.set(0, 5, 0);
scene.add(box);

const torusKnotGeometry = new THREE.TorusKnotGeometry(3, 1, 100, 100, 2, 5);
const torusKnot1 = new THREE.Mesh(torusKnotGeometry, boxMaterial);
torusKnot1.name = "TorusKnotLeft";
torusKnot1.scale.set(0.8, 0.8, 0.8);
torusKnot1.position.set(-10, 5, 0);
scene.add(torusKnot1);

const torusKnot2 = new THREE.Mesh(torusKnotGeometry, boxMaterial);
torusKnot2.name = "TorusKnotRight";
torusKnot2.scale.set(0.8, 0.8, 0.8);
torusKnot2.position.set(10, 5, 0);
scene.add(torusKnot2);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
ambientLight.name = "AmbientLight";
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.name = "KeyDirectionalLight";
directionalLight.position.set(10, 8, 25);
directionalLight.castShadow = true;
scene.add(directionalLight);
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight
);
// scene.add(directionalLightHelper);

const pointLight = new THREE.PointLight(0xffffff, 500);
pointLight.name = "FillPointLight";
const pointLightHelper = new THREE.PointLightHelper(pointLight);
pointLight.position.set(0, 10, 0);
scene.add(pointLight);
// scene.add(pointLightHelper);

const gridHelper = new THREE.GridHelper(70, 70, 70, 70);
// scene.add(gridHelper);

function animate() {
  box.visible = false;
  cubeCamera.position.copy(box.position);
  cubeCamera.update(renderer, scene);
  box.visible = true;
  torusKnot1.rotation.z += 0.03;
  torusKnot2.rotation.z -= 0.03;
  controls.update();

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

// ======================================

const raycaster = new THREE.Raycaster();

document.addEventListener("mouseover", (e) => {
  const coords = new THREE.Vector2(
    (e.clientX / renderer.domElement.clientWidth) * 2 - 1,
    -((e.clientY / renderer.domElement.clientHeight) * 2 - 1)
  );
  raycaster.setFromCamera(coords, camera);

  const intersection = raycaster.intersectObjects([
    box,
    torusKnot1,
    torusKnot2,
  ]);

  if (intersection.length > 0) {
    const selectedObject = intersection[0].object;
    if (selectedObject) {
      console.log(selectedObject);
    }
  }
});
//https://github.com/tamani-coding/threejs-raycasting

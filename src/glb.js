import * as THREE from "three";
import { WebGLRenderer } from "three";
import "./style.css";
import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";
document.querySelector(".btn").style.display = "none";

const scene = new THREE.Scene();
scene.name = "ReflectionScene";

const loader = new GLTFLoader();
loader.load("/models/nissan_gtr_r35.glb", (gltf) => {
  const model = gltf.scene;

  model.scale.set(6, 6, 6);
  model.rotation.set(0, -16.2, 0);
  model.position.set(-12, -0.7, 0);
  // Apply environment mapping and shadow casting to all materials in the model
  model.traverse((child) => {
    if (child.isMesh && child.material) {
      // Enable shadow casting for each mesh
      child.castShadow = true;
      child.receiveShadow = true;

      if (Array.isArray(child.material)) {
        child.material.forEach((material) => {
          if (material.isMeshStandardMaterial || material.isMeshPhongMaterial) {
            material.envMap = cubeRenderTarget.texture;
            material.envMapIntensity = 1.0;
            material.envMap.mapping = THREE.CubeReflectionMapping;
            material.envMap.generateMipmaps = true;
            material.envMap.minFilter = THREE.LinearMipmapLinearFilter;
            material.envMap.magFilter = THREE.LinearFilter;
            material.needsUpdate = true;
          }
        });
      } else {
        if (
          child.material.isMeshStandardMaterial ||
          child.material.isMeshPhongMaterial
        ) {
          child.material.envMap = cubeRenderTarget.texture;
          child.material.envMapIntensity = 1.0;
          child.material.envMap.mapping = THREE.CubeReflectionMapping;
          child.material.envMap.generateMipmaps = true;
          child.material.envMap.minFilter = THREE.LinearMipmapLinearFilter;
          child.material.envMap.magFilter = THREE.LinearFilter;
          child.material.needsUpdate = true;
        }
      }
    }
  });

  scene.add(model);
  //   console.log(`GTR : `, model);
});

let mixer = null;
let clock;
loader.load("/models/bmw_m4.glb", (gltf) => {
  const model = gltf.scene;
  const animations = gltf.animations;

  mixer = new THREE.AnimationMixer(model);
  clock = new THREE.Clock();

  if (animations.length > 0) {
    const action = mixer.clipAction(animations[0]);
    action.play();
    // console.log(action);
  }

  model.scale.set(4.5, 4.5, 4.5);
  model.rotation.set(0, -0.5, 0);
  model.position.set(10, -0.02, 0);

  model.traverse((child) => {
    if (child.isMesh && child.material) {
      child.castShadow = true;
      child.receiveShadow = true;

      // If it's an array of materials
      if (Array.isArray(child.material)) {
        child.material.forEach((material) => {
          if (material.isMeshStandardMaterial || material.isMeshPhongMaterial) {
            material.envMap = cubeRenderTarget.texture;
            material.envMapIntensity = 1.0;
            material.envMap.mapping = THREE.CubeReflectionMapping;
            material.envMap.generateMipmaps = true;
            material.envMap.minFilter = THREE.LinearMipmapLinearFilter;
            material.envMap.magFilter = THREE.LinearFilter;
            material.needsUpdate = true;
          }
        });
      } else {
        // Single material
        if (
          child.material.isMeshStandardMaterial ||
          child.material.isMeshPhongMaterial
        ) {
          child.material.envMap = cubeRenderTarget.texture;
          child.material.envMapIntensity = 1.0;
          child.material.envMap.mapping = THREE.CubeReflectionMapping;
          child.material.envMap.generateMipmaps = true;
          child.material.envMap.minFilter = THREE.LinearMipmapLinearFilter;
          child.material.envMap.magFilter = THREE.LinearFilter;
          child.material.needsUpdate = true;
        }
      }
    }
  });

  scene.add(model);
  //   console.log(`BMW : `, model);
});

let connorMixer = null;
let connorClock = null;
loader.load("models/connor.glb", (gltf) => {
  const model = gltf.scene;
  const animations = gltf.animations;
  console.log(gltf);

  connorMixer = new THREE.AnimationMixer(model);
  connorClock = new THREE.Clock();

  if (animations.length > 0) {
    const action = connorMixer.clipAction(animations[0]);
    action.play();
  }

  model.position.set(-5, 0, 11);
  model.scale.set(6, 6, 6);
  model.rotation.set(0, -0.3, 0);

  model.traverse((child) => {
    if (child.isMesh && child.material) {
      child.castShadow = true;
      child.receiveShadow = true;

      if (Array.isArray(child.material)) {
        child.material.forEach((material) => {
          if (material.isMeshStandardMaterial || material.isMeshPhongMaterial) {
            material.envMap = cubeRenderTarget.texture;
            material.envMapIntensity = 1.0;
            material.envMap.mapping = THREE.CubeReflectionMapping;
            material.envMap.generateMipmaps = true;
            material.envMap.minFilter = THREE.LinearMipmapLinearFilter;
            material.envMap.magFilter = THREE.LinearFilter;
            material.needsUpdate = true;
          }
        });
      } else {
        if (
          child.material.isMeshStandardMaterial ||
          child.material.isMeshPhongMaterial
        ) {
          child.material.envMap = cubeRenderTarget.texture;
          child.material.envMapIntensity = 1.0;
          child.material.envMap.mapping = THREE.CubeReflectionMapping;
          child.material.envMap.generateMipmaps = true;
          child.material.envMap.minFilter = THREE.LinearMipmapLinearFilter;
          child.material.envMap.magFilter = THREE.LinearFilter;
          child.material.needsUpdate = true;
        }
      }
    }
  });

  scene.add(model);
});

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
const groundTexture = new THREE.TextureLoader().load("/road.jpg");
groundTexture.colorSpace = THREE.SRGBColorSpace;
const groundNormalTexture = new THREE.TextureLoader().load("/road-nm.jpg");
groundNormalTexture.colorSpace = THREE.SRGBColorSpace;
const groundBumpTexture = new THREE.TextureLoader().load("/road-bump.jpg");
groundBumpTexture.colorSpace = THREE.SRGBColorSpace;

const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x8a9396,
  roughness: 0,
  metalness: 0,
  //   map: groundTexture,
  //   normalMap: groundNormalTexture,
  //   bumpMap: groundBumpTexture,
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.name = "Ground";
ground.receiveShadow = true;
ground.rotation.x = -Math.PI / 2;
ground.position.set(0, -0.5, 0);
scene.add(ground);

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(-7, 8, 28);
camera.name = "MainCamera";

const renderer = new WebGLRenderer({
  canvas: document.getElementById("bg"),
  antialias: true,
  powerPreference: "high-performance",
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = false;
controls.autoRotateSpeed = -4;
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

const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(1080, {
  format: THREE.RGBAFormat,
  generateMipmaps: true,
  minFilter: THREE.LinearMipmapLinearFilter,
});
cubeRenderTarget.texture.colorSpace = THREE.SRGBColorSpace;
cubeRenderTarget.texture.mapping = THREE.CubeReflectionMapping;

const cubeCamera = new THREE.CubeCamera(0.1, 1000, cubeRenderTarget);
cubeCamera.name = "ReflectionCubeCamera";
scene.add(cubeCamera);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
ambientLight.name = "AmbientLight";
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.name = "KeyDirectionalLight";
directionalLight.position.set(10, 12, 28);
directionalLight.castShadow = true;

// Configure shadow camera for better shadow quality
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 100;

// Adjust shadow camera bounds to match the scaled car (6x scale)
// The car is positioned at (0, -0.7, 0) and scaled 6x
directionalLight.shadow.camera.left = -35; // Left bound
directionalLight.shadow.camera.right = 35; // Right bound
directionalLight.shadow.camera.top = 35; // Top bound
directionalLight.shadow.camera.bottom = -35; // Bottom bound

// Set the shadow camera to look at the car's position
directionalLight.target.position.set(0, -0.7, 0);
directionalLight.target.updateMatrixWorld();
scene.add(directionalLight);

const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight
);
// scene.add(directionalLightHelper);

// Add shadow camera helper to visualize shadow bounds (optional - remove in production)
const shadowCameraHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
// scene.add(shadowCameraHelper);

const pointLight = new THREE.PointLight(0xffffff, 400);
pointLight.name = "FillPointLight";
const pointLightHelper = new THREE.PointLightHelper(pointLight);
pointLight.position.set(0, 25, 10);
scene.add(pointLight);
scene.add(pointLightHelper);

const gridHelper = new THREE.GridHelper(70, 70, 70, 70);
// scene.add(gridHelper);

function animate() {
  cubeCamera.update(renderer, scene);
  controls.update();

  if (mixer) {
    const delta = clock.getDelta();
    mixer.update(delta);
  }

  if (connorMixer) {
    const delta = connorClock.getDelta();
    connorMixer.update(delta);
  }

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

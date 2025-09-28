# Background & Environment

## Overview
Backgrounds and environment maps provide context and atmosphere to 3D scenes. They can be simple colors, textures, or complex environment maps for reflections.

## Scene Background

### Color Background
```javascript
// Set solid color background
scene.background = new THREE.Color(0x87CEEB);  // Sky blue
scene.background = new THREE.Color(0x000000);  // Black
scene.background = new THREE.Color(0xffffff);  // White
```

### Texture Background
```javascript
// Load texture for background
const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;
```

### Gradient Background
```javascript
// Create gradient background
const canvas = document.createElement('canvas');
canvas.width = 256;
canvas.height = 256;
const context = canvas.getContext('2d');

// Create gradient
const gradient = context.createLinearGradient(0, 0, 0, 256);
gradient.addColorStop(0, '#87CEEB');
gradient.addColorStop(1, '#E0F6FF');

context.fillStyle = gradient;
context.fillRect(0, 0, 256, 256);

const texture = new THREE.CanvasTexture(canvas);
scene.background = texture;
```

## Environment Maps

### Cube Texture Environment
```javascript
// Load cube texture for environment
const loader = new THREE.CubeTextureLoader();
const environmentMap = loader.load([
  'px.jpg', 'nx.jpg',  // Right, Left
  'py.jpg', 'ny.jpg',  // Top, Bottom
  'pz.jpg', 'nz.jpg'   // Front, Back
]);

scene.environment = environmentMap;
```

### HDR Environment Map
```javascript
// Load HDR environment map
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

const loader = new RGBELoader();
loader.load('environment.hdr', function(texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
});
```

## Skybox Implementation

### Cube Skybox
```javascript
// Create cube skybox
const skyboxGeometry = new THREE.BoxGeometry(1000, 1000, 1000);
const skyboxMaterial = new THREE.MeshBasicMaterial({
  map: spaceTexture,
  side: THREE.BackSide  // Render inside of cube
});

const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
scene.add(skybox);
```

### Sphere Skybox
```javascript
// Create sphere skybox
const skyboxGeometry = new THREE.SphereGeometry(500, 32, 32);
const skyboxMaterial = new THREE.MeshBasicMaterial({
  map: spaceTexture,
  side: THREE.BackSide
});

const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
scene.add(skybox);
```

## Fog Effects

### Linear Fog
```javascript
// Add linear fog
scene.fog = new THREE.Fog(0x87CEEB, 10, 100);
```

**Parameters:**
- `color` - Fog color
- `near` - Near fog distance
- `far` - Far fog distance

### Exponential Fog
```javascript
// Add exponential fog
scene.fog = new THREE.FogExp2(0x87CEEB, 0.01);
```

**Parameters:**
- `color` - Fog color
- `density` - Fog density

### Fog with Background
```javascript
// Match fog color to background
const fogColor = 0x87CEEB;
scene.fog = new THREE.Fog(fogColor, 10, 100);
scene.background = new THREE.Color(fogColor);
```

## Environment Lighting

### Environment Map for Lighting
```javascript
// Use environment map for lighting
const environmentMap = new THREE.CubeTextureLoader().load([
  'px.jpg', 'nx.jpg',
  'py.jpg', 'ny.jpg',
  'pz.jpg', 'nz.jpg'
]);

scene.environment = environmentMap;

// Use environment for reflections
const material = new THREE.MeshStandardMaterial({
  metalness: 0.8,
  roughness: 0.2,
  envMap: environmentMap
});
```

### HDR Environment for PBR
```javascript
// Load HDR environment for PBR materials
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

const loader = new RGBELoader();
loader.load('environment.hdr', function(texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
  
  // Use for PBR materials
  const material = new THREE.MeshStandardMaterial({
    metalness: 0.8,
    roughness: 0.2
  });
});
```

## Dynamic Backgrounds

### Animated Background
```javascript
// Animate background color
function animate() {
  const time = Date.now() * 0.001;
  const hue = (time * 0.1) % 1;
  const color = new THREE.Color().setHSL(hue, 0.5, 0.5);
  scene.background = color;
  
  renderer.render(scene, camera);
}
```

### Rotating Skybox
```javascript
// Rotate skybox
function animate() {
  skybox.rotation.y += 0.001;
  renderer.render(scene, camera);
}
```

### Day/Night Cycle
```javascript
// Day/night cycle
function animate() {
  const time = Date.now() * 0.001;
  const dayProgress = (Math.sin(time * 0.1) + 1) / 2; // 0 to 1
  
  // Interpolate between day and night colors
  const dayColor = new THREE.Color(0x87CEEB);
  const nightColor = new THREE.Color(0x000011);
  const currentColor = dayColor.clone().lerp(nightColor, 1 - dayProgress);
  
  scene.background = currentColor;
  scene.fog = new THREE.Fog(currentColor, 10, 100);
  
  renderer.render(scene, camera);
}
```

## Background Optimization

### Texture Optimization
```javascript
// Optimize background texture
const spaceTexture = new THREE.TextureLoader().load("space.jpg");
spaceTexture.wrapS = THREE.RepeatWrapping;
spaceTexture.wrapT = THREE.RepeatWrapping;
spaceTexture.repeat.set(1, 1);
spaceTexture.generateMipmaps = false;
spaceTexture.minFilter = THREE.LinearFilter;
spaceTexture.magFilter = THREE.LinearFilter;
```

### Environment Map Optimization
```javascript
// Optimize environment map
const environmentMap = new THREE.CubeTextureLoader().load([
  'px.jpg', 'nx.jpg',
  'py.jpg', 'ny.jpg',
  'pz.jpg', 'nz.jpg'
]);

environmentMap.generateMipmaps = false;
environmentMap.minFilter = THREE.LinearFilter;
environmentMap.magFilter = THREE.LinearFilter;
```

## Common Background Types

### Space Background
```javascript
const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;
```

### Sky Background
```javascript
const skyTexture = new THREE.TextureLoader().load("sky.jpg");
scene.background = skyTexture;
```

### Studio Background
```javascript
// Neutral studio background
scene.background = new THREE.Color(0x808080);
```

### Gradient Background
```javascript
// Create gradient background
const canvas = document.createElement('canvas');
canvas.width = 512;
canvas.height = 512;
const context = canvas.getContext('2d');

const gradient = context.createRadialGradient(256, 256, 0, 256, 256, 256);
gradient.addColorStop(0, '#ffffff');
gradient.addColorStop(1, '#000000');

context.fillStyle = gradient;
context.fillRect(0, 0, 512, 512);

const texture = new THREE.CanvasTexture(canvas);
scene.background = texture;
```

## Environment Map Sources

### Free HDR Environments
- Poly Haven (polyhaven.com)
- HDR Labs (hdrlabs.com)
- OpenGameArt (opengameart.org)

### Creating Environment Maps
- Use 360° cameras
- Convert equirectangular to cube maps
- Use HDR capture techniques

## Best Practices

### 1. Background Selection
- Choose backgrounds that complement your scene
- Consider performance impact
- Use appropriate resolution

### 2. Environment Maps
- Use HDR for realistic reflections
- Match environment to scene mood
- Consider lighting impact

### 3. Performance
- Optimize texture sizes
- Use appropriate formats
- Consider memory usage

### 4. Consistency
- Match fog color to background
- Use consistent lighting
- Consider overall atmosphere

## Common Pitfalls
- Using too high resolution backgrounds
- Not optimizing environment maps
- Mismatched fog and background colors
- Not considering performance impact
- Using inappropriate background types
- Not handling texture loading errors
- Forgetting to dispose of textures

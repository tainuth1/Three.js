# Scene, Camera & Renderer Setup

## Overview
The foundation of any Three.js application consists of three core components: Scene, Camera, and Renderer. These work together to create the 3D environment and display it on screen.

## Scene
The scene is the container that holds all 3D objects, lights, and cameras.

### Basic Setup
```javascript
const scene = new THREE.Scene();
```

### Key Properties
- `children` - Array of all objects in the scene
- `background` - Scene background (color, texture, or cube texture)
- `fog` - Fog effect for the scene
- `environment` - Environment map for reflections

### Methods
- `add(object)` - Add object to scene
- `remove(object)` - Remove object from scene
- `getObjectByName(name)` - Find object by name
- `traverse(callback)` - Execute callback for all objects

## Camera
Cameras define the viewpoint from which the scene is rendered.

### PerspectiveCamera
Most commonly used camera type that mimics human vision.

```javascript
const camera = new THREE.PerspectiveCamera(
  75,                                    // Field of view (FOV) in degrees
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1,                                   // Near clipping plane
  1000                                   // Far clipping plane
);
```

### Key Properties
- `fov` - Field of view in degrees (default: 50)
- `aspect` - Aspect ratio (width/height)
- `near` - Near clipping plane (default: 0.1)
- `far` - Far clipping plane (default: 2000)
- `position` - Camera position (Vector3)
- `rotation` - Camera rotation (Euler)
- `up` - Up direction vector (default: 0,1,0)

### Methods
- `lookAt(x, y, z)` - Point camera at specific coordinates
- `updateProjectionMatrix()` - Recalculate projection matrix
- `setViewOffset()` - Set view offset for multi-view rendering

### Camera Positioning
```javascript
// Set camera position
camera.position.set(0, 10, 20);
camera.position.z = 50;

// Point camera at origin
camera.lookAt(0, 0, 0);
```

## Renderer
The renderer draws the scene from the camera's perspective onto a canvas.

### WebGLRenderer Setup
```javascript
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),  // Canvas element
  antialias: true,                      // Enable antialiasing
});
```

### Key Properties
- `domElement` - The canvas element
- `shadowMap` - Shadow mapping configuration
- `pixelRatio` - Device pixel ratio
- `size` - Renderer size (width, height)

### Configuration
```javascript
// Enable shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Set pixel ratio and size
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
```

### Methods
- `render(scene, camera)` - Render the scene
- `setSize(width, height)` - Set renderer size
- `setPixelRatio(ratio)` - Set pixel ratio
- `setClearColor(color, alpha)` - Set clear color
- `setAnimationLoop(callback)` - Set animation loop

## Complete Setup Example
```javascript
// 1. Create scene
const scene = new THREE.Scene();

// 2. Create camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// 3. Create renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
  antialias: true,
});

// 4. Configure renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// 5. Position camera
camera.position.set(0, 10, 20);
camera.lookAt(0, 0, 0);

// 6. Initial render
renderer.render(scene, camera);
```

## Best Practices
1. **Aspect Ratio**: Always match camera aspect ratio to renderer size
2. **Clipping Planes**: Set near/far planes appropriately for your scene
3. **Pixel Ratio**: Use `window.devicePixelRatio` for crisp rendering on high-DPI displays
4. **Canvas Size**: Update renderer size when window resizes
5. **Performance**: Use appropriate FOV (60-75 degrees is common)

## Common Pitfalls
- Forgetting to call `renderer.render()` after setup
- Not updating camera aspect ratio on window resize
- Setting near plane too far or far plane too close
- Not enabling shadows if you plan to use them

# Three.js Reflection System Documentation

## Overview

This document explains how the reflection system works in the `reflection.js` file. The code creates a scene with reflective objects that capture and display their surrounding environment in real-time.

## Core Concepts

### 1. Environment Mapping

Environment mapping is a technique that simulates reflections by using a texture that represents the surrounding environment. Instead of calculating complex ray-tracing reflections, we use a pre-captured "environment map" that shows what the environment looks like from a specific point.

### 2. Cube Mapping

Cube mapping uses 6 faces of a cube to capture the environment in all directions (up, down, left, right, front, back). This creates a 360-degree representation of the surroundings.

## Code Breakdown

### Scene Setup

```javascript
const scene = new THREE.Scene();
```

- Creates the main 3D scene container
- All objects, lights, and cameras are added to this scene

### Background Environment

```javascript
textureLoader.load("/env.png", function (texture) {
  texture.colorSpace = THREE.SRGBColorSpace;
  scene.background = texture;
});
```

- Loads a high-quality environment image as the scene background
- Sets the color space to sRGB for proper color rendering
- This background serves as what gets reflected in the objects

### Camera Setup

```javascript
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 25);
```

- Creates a perspective camera (like human vision)
- Positioned at (0, 0, 25) to view the scene from a distance
- Field of view: 75 degrees
- Near plane: 0.1, Far plane: 1000

### Renderer Configuration

```javascript
const renderer = new WebGLRenderer({ canvas: document.getElementById("bg") });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
```

- Creates a WebGL renderer for hardware-accelerated graphics
- Attaches to the HTML canvas element with id "bg"
- Sets color space to sRGB for accurate color reproduction

## The Reflection System

### 1. Cube Render Target

```javascript
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(512, {
  format: THREE.RGBAFormat,
  generateMipmaps: true,
  minFilter: THREE.LinearMipmapLinearFilter,
});
cubeRenderTarget.texture.colorSpace = THREE.SRGBColorSpace;
cubeRenderTarget.texture.mapping = THREE.CubeReflectionMapping;
```

**What this does:**

- Creates a 512x512 cube texture (6 faces of 512x512 each)
- `RGBAFormat`: Each pixel has Red, Green, Blue, and Alpha channels
- `generateMipmaps: true`: Creates smaller versions of the texture for better performance at different distances
- `LinearMipmapLinearFilter`: Smooths the texture when viewed from different distances
- `CubeReflectionMapping`: Tells Three.js this texture should be used for reflections

### 2. Cube Camera

```javascript
const cubeCamera = new THREE.CubeCamera(0.1, 1000, cubeRenderTarget);
scene.add(cubeCamera);
```

**What this does:**

- Creates a special camera that captures the scene in 6 directions (like a cube)
- `0.1`: Near plane distance
- `1000`: Far plane distance
- `cubeRenderTarget`: Where the captured images are stored
- This camera is invisible but captures what the reflective object "sees"

### 3. Reflective Material

```javascript
const boxMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 1,
  roughness: 0,
  envMap: cubeRenderTarget.texture,
  envMapIntensity: 1.0,
});
```

**Material Properties:**

- `color: 0xffffff`: Base color (white)
- `metalness: 1`: Fully metallic (100% reflective)
- `roughness: 0`: Perfectly smooth surface (mirror-like)
- `envMap: cubeRenderTarget.texture`: Uses the cube texture for reflections
- `envMapIntensity: 1.0`: Full reflection strength

### 4. Reflective Objects

```javascript
// Sphere
const boxGeometry = new THREE.SphereGeometry(4, 50, 50);
const box = new THREE.Mesh(boxGeometry, boxMaterial);

// Torus Knot
const torusKnotGeometry = new THREE.TorusKnotGeometry(3, 1, 500, 100, 2, 5);
const torusKnot = new THREE.Mesh(torusKnotGeometry, boxMaterial);
```

**Geometry Details:**

- **Sphere**: Radius 4, 50x50 segments for smooth surface
- **Torus Knot**: Complex twisted donut shape with high detail (500x100 segments)

## The Animation Loop - How Reflections Update

```javascript
function animate() {
  box.visible = false; // Hide the reflective object
  cubeCamera.position.copy(box.position); // Move cube camera to object's position
  cubeCamera.update(renderer, scene); // Capture environment from this position
  box.visible = true; // Show the object again

  torusKnot.rotation.z += 0.03; // Rotate the torus knot
  renderer.render(scene, camera); // Render the final scene
}
```

### Step-by-Step Process:

1. **Hide the Object**: `box.visible = false`

   - We hide the reflective object so it doesn't reflect itself
   - This prevents infinite reflection loops

2. **Position the Cube Camera**: `cubeCamera.position.copy(box.position)`

   - Move the cube camera to exactly where the reflective object is
   - This ensures the reflection is captured from the object's perspective

3. **Capture the Environment**: `cubeCamera.update(renderer, scene)`

   - The cube camera renders the scene 6 times (one for each face of the cube)
   - Each face captures what's visible in that direction
   - The results are stored in the cubeRenderTarget texture

4. **Show the Object**: `box.visible = true`

   - Make the reflective object visible again
   - Now it can use the freshly captured environment map

5. **Render the Scene**: `renderer.render(scene, camera)`
   - Render the final scene with the updated reflections

## Lighting System

### Ambient Light

```javascript
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
```

- Provides soft, even lighting from all directions
- Low intensity (0.2) to avoid washing out the reflections

### Directional Light

```javascript
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(10, 8, 25);
```

- Simulates sunlight - parallel rays from one direction
- High intensity (2) to create strong highlights
- Positioned to illuminate the objects

### Point Light

```javascript
const pointLight = new THREE.PointLight(0xffffff, 500);
pointLight.position.set(20, 7, 0);
```

- Light that radiates in all directions from a point
- Very high intensity (500) for dramatic lighting effects

## Why This System Works

### Real-Time Reflection

- The cube camera captures the current state of the scene
- This includes the background, other objects, and lighting
- The reflection updates every frame, creating dynamic reflections

### Performance Optimization

- Cube mapping is much faster than ray-tracing
- The cube camera only renders when needed
- Mipmaps ensure good performance at different viewing distances

### Visual Quality

- High-resolution cube texture (512x512 per face)
- Smooth filtering prevents pixelation
- Proper color space handling ensures accurate colors

## Key Technical Points

### Color Space Management

```javascript
texture.colorSpace = THREE.SRGBColorSpace;
renderer.outputColorSpace = THREE.SRGBColorSpace;
```

- Ensures colors are displayed correctly
- sRGB is the standard color space for most images
- Prevents washed-out or oversaturated colors

### Material Properties

- **Metalness**: Controls how metallic the surface is (0-1)
- **Roughness**: Controls surface smoothness (0-1)
- **envMapIntensity**: Controls reflection strength (0-1)

### Geometry Considerations

- Higher segment counts create smoother surfaces
- Smoother surfaces show clearer reflections
- Complex geometries create interesting reflection patterns

## Common Issues and Solutions

### White/Washed Out Reflections

- **Cause**: Incorrect color space settings
- **Solution**: Set `colorSpace = THREE.SRGBColorSpace` on textures and renderer

### Poor Reflection Quality

- **Cause**: Low resolution cube texture
- **Solution**: Increase cube render target size (e.g., 1024 instead of 512)

### Performance Issues

- **Cause**: Too many reflective objects or high resolution
- **Solution**: Reduce cube texture resolution or limit number of reflective objects

### Missing Reflections

- **Cause**: No environment to reflect or incorrect material setup
- **Solution**: Ensure scene has background/objects and material has `envMap` property

## Advanced Techniques

### Multiple Reflective Objects

- Each object can have its own cube camera
- Position cube cameras at each object's location
- Update each cube camera separately

### Dynamic Environment

- Moving objects in the scene will be reflected
- Animated backgrounds create dynamic reflections
- Real-time lighting changes affect reflections

### Performance Optimization

- Use lower resolution cube textures for distant objects
- Update reflections less frequently for better performance
- Use LOD (Level of Detail) systems for complex scenes

This reflection system creates realistic, dynamic reflections that respond to the environment in real-time, providing an immersive 3D experience.

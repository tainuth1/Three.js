# Cube Camera Documentation

## Overview

The Cube Camera is a powerful Three.js feature that creates real-time reflections by capturing the environment from six different angles (like a cube) and using that as an environment map for materials. This creates realistic mirror-like surfaces that reflect the surrounding environment.

## What is a Cube Camera?

A Cube Camera is essentially 6 cameras positioned to capture the scene from all directions:

- **+X (Right)**: Captures the right side of the environment
- **-X (Left)**: Captures the left side of the environment
- **+Y (Up)**: Captures the top of the environment
- **-Y (Down)**: Captures the bottom of the environment
- **+Z (Forward)**: Captures the front of the environment
- **-Z (Back)**: Captures the back of the environment

These 6 views are combined into a single cube texture that can be used as an environment map for reflective materials.

## Code Breakdown

### 1. Basic Scene Setup

```javascript
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
```

**Explanation**: Standard Three.js scene setup with a perspective camera and WebGL renderer.

### 2. Environment Background (Cube Map)

```javascript
const urls = [
  "cube/posx.jpg", // Right side
  "cube/negx.jpg", // Left side
  "cube/posy.jpg", // Top
  "cube/negy.jpg", // Bottom
  "cube/posz.jpg", // Front
  "cube/negz.jpg", // Back
];

const loader = new THREE.CubeTextureLoader();
scene.background = loader.load(urls);
```

**Explanation**:

- Loads 6 images that form a complete 360° environment
- Each image represents one face of a cube
- The order is crucial: +X, -X, +Y, -Y, +Z, -Z
- This becomes the background and what gets reflected

### 3. Cube Render Target

```javascript
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(1024, {
  format: THREE.RGBAFormat,
  generateMipmaps: true,
  minFilter: THREE.LinearMipMapLinearFilter,
});
```

**Explanation**:

- **1024**: Resolution of each cube face (1024x1024 pixels)
- **RGBAFormat**: Color format with alpha channel
- **generateMipmaps**: Creates smaller versions for better performance
- **minFilter**: How to blend pixels when scaling down

### 4. Cube Camera Creation

```javascript
const cubeCamera = new THREE.CubeCamera(0.1, 1000, cubeRenderTarget);
scene.add(cubeCamera);
```

**Explanation**:

- **0.1**: Near clipping plane (objects closer than 0.1 units won't be rendered)
- **1000**: Far clipping plane (objects farther than 1000 units won't be rendered)
- **cubeRenderTarget**: Where the cube camera will render its 6 views
- Added to scene so it can capture the environment

### 5. Reflective Material

```javascript
const sphereGeometry = new THREE.SphereGeometry(2, 100, 100);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0, // 0 = perfectly smooth (mirror-like)
  metalness: 1, // 1 = fully metallic
  envMap: cubeRenderTarget.texture, // The cube camera's output
  envMapIntensity: 1.0, // How strong the reflection is
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
```

**Explanation**:

- **roughness: 0**: Makes the surface perfectly smooth for clear reflections
- **metalness: 1**: Makes it fully metallic for realistic reflections
- **envMap**: Uses the cube camera's output as the environment map
- **envMapIntensity**: Controls reflection strength (0 = no reflection, 1 = full reflection)

### 6. Animation Loop

```javascript
function animate() {
  cubeCamera.position.copy(sphere.position); // Move cube camera to sphere
  cubeCamera.update(renderer, scene); // Capture 6 views
  renderer.render(scene, camera); // Render the scene
}
```

**Explanation**:

- **cubeCamera.position.copy(sphere.position)**: Moves the cube camera to the sphere's position
- **cubeCamera.update()**: Renders the scene from 6 angles and updates the cube texture
- **renderer.render()**: Renders the final scene with reflections

## Key Concepts

### Why Move the Cube Camera?

The cube camera must be positioned exactly where the reflective object is because:

- It needs to capture the environment from the object's perspective
- If it's too far away, reflections will be incorrect
- The cube camera acts as if it's "inside" the reflective surface

### Performance Considerations

- **Resolution**: Higher resolution = better quality but slower performance
- **Update Frequency**: Only update when the environment changes
- **Multiple Objects**: Each reflective object needs its own cube camera

### Material Properties

- **Roughness**: 0 = mirror, 1 = completely diffuse
- **Metalness**: 0 = dielectric (glass), 1 = metallic
- **envMapIntensity**: Controls reflection strength

## Testing Scenarios

### Basic Testing

1. **Environment Reflection Test**

   - Verify the sphere reflects the cube map background
   - Check that reflections are clear and accurate

2. **Position Test**

   - Move the sphere around and verify cube camera follows
   - Reflections should update as the sphere moves

3. **Material Property Test**
   - Change roughness from 0 to 1 and observe reflection blur
   - Change metalness from 0 to 1 and observe reflection intensity

### Advanced Testing

4. **Resolution Test**

   - Change cube render target resolution (512, 1024, 2048)
   - Observe quality vs performance trade-off

5. **Multiple Reflective Objects Test**

   - Add more spheres with different materials
   - Each should have its own cube camera

6. **Dynamic Environment Test**

   - Add moving objects to the scene
   - Verify reflections update in real-time

7. **Performance Test**
   - Monitor frame rate with different cube camera settings
   - Test with multiple cube cameras

## Common Issues and Solutions

### Issue: Reflections Not Appearing

**Solution**: Check that:

- Cube camera is added to the scene
- Material has envMap property set
- Cube camera position matches object position
- Material has low roughness and high metalness

### Issue: Poor Reflection Quality

**Solution**:

- Increase cube render target resolution
- Use LinearMipMapLinearFilter for better filtering
- Ensure environment has good contrast

### Issue: Performance Problems

**Solution**:

- Reduce cube render target resolution
- Update cube camera less frequently
- Use fewer reflective objects

## Additional Features to Test

### 1. Different Geometries

Test cube camera with different shapes:

- BoxGeometry
- TorusGeometry
- PlaneGeometry

### 2. Multiple Materials

Test different material combinations:

- Different roughness values
- Different metalness values
- Different envMapIntensity values

### 3. Animated Environment

Add animated objects to test dynamic reflections:

- Rotating cubes
- Moving lights
- Particle systems

### 4. Multiple Cube Cameras

Test multiple reflective objects:

- Each with its own cube camera
- Different update frequencies
- Performance impact

## Best Practices

1. **Positioning**: Always position cube camera at the reflective object's center
2. **Resolution**: Use appropriate resolution for your needs (512 for mobile, 1024+ for desktop)
3. **Updates**: Only update when necessary to maintain performance
4. **Materials**: Use appropriate roughness and metalness values for realistic results
5. **Environment**: Ensure your environment has good contrast and detail for interesting reflections

## Conclusion

The Cube Camera is a powerful tool for creating realistic reflections in Three.js. It works by capturing the environment from six angles and using that as an environment map for materials. The key is positioning the cube camera correctly and using appropriate material properties for the desired effect.

Remember: The cube camera must be positioned exactly where your reflective object is, and you need to update it every frame for dynamic reflections!

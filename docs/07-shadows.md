# Shadows

## Overview
Shadows add realism and depth to 3D scenes by showing how objects block light. Three.js provides shadow mapping for real-time shadows.

## Shadow Setup

### Enable Shadows on Renderer
```javascript
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
```

**Shadow Map Types:**
- `THREE.BasicShadowMap` - Basic shadow mapping (fastest, lowest quality)
- `THREE.PCFShadowMap` - Percentage Closer Filtering (good quality)
- `THREE.PCFSoftShadowMap` - Soft shadows (best quality, slower)

### Enable Shadow Casting on Light
```javascript
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.castShadow = true;
scene.add(directionalLight);
```

### Enable Shadow Casting on Objects
```javascript
const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;  // Object casts shadows
scene.add(cube);
```

### Enable Shadow Receiving on Objects
```javascript
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.receiveShadow = true;  // Object receives shadows
scene.add(ground);
```

## Directional Light Shadows

### Basic Setup
```javascript
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(10, 10, 10);
directionalLight.castShadow = true;

// Configure shadow camera
directionalLight.shadow.camera.left = -50;
directionalLight.shadow.camera.right = 50;
directionalLight.shadow.camera.top = 50;
directionalLight.shadow.camera.bottom = -50;
directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 200;

// Set shadow map resolution
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;

scene.add(directionalLight);
```

### Shadow Camera Properties
```javascript
// Shadow camera bounds
directionalLight.shadow.camera.left = -50;    // Left boundary
directionalLight.shadow.camera.right = 50;    // Right boundary
directionalLight.shadow.camera.top = 50;      // Top boundary
directionalLight.shadow.camera.bottom = -50;  // Bottom boundary
directionalLight.shadow.camera.near = 0.1;    // Near plane
directionalLight.shadow.camera.far = 200;     // Far plane

// Shadow map resolution
directionalLight.shadow.mapSize.width = 2048;   // Width resolution
directionalLight.shadow.mapSize.height = 2048;  // Height resolution

// Shadow bias (prevents shadow acne)
directionalLight.shadow.bias = -0.0001;

// Shadow radius (for soft shadows)
directionalLight.shadow.radius = 4;
```

## Point Light Shadows

### Basic Setup
```javascript
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
pointLight.castShadow = true;

// Configure shadow camera
pointLight.shadow.camera.near = 0.1;
pointLight.shadow.camera.far = 100;

// Set shadow map resolution
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;

scene.add(pointLight);
```

### Point Light Shadow Properties
```javascript
// Shadow camera properties
pointLight.shadow.camera.near = 0.1;    // Near plane
pointLight.shadow.camera.far = 100;     // Far plane

// Shadow map resolution
pointLight.shadow.mapSize.width = 1024;   // Width resolution
pointLight.shadow.mapSize.height = 1024;  // Height resolution

// Shadow bias
pointLight.shadow.bias = -0.0001;

// Shadow radius
pointLight.shadow.radius = 4;
```

## Spot Light Shadows

### Basic Setup
```javascript
const spotLight = new THREE.SpotLight(0xffffff, 1, 100, Math.PI / 4, 0.25);
spotLight.position.set(10, 10, 10);
spotLight.target.position.set(0, 0, 0);
spotLight.castShadow = true;

// Configure shadow camera
spotLight.shadow.camera.near = 0.1;
spotLight.shadow.camera.far = 100;

// Set shadow map resolution
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

scene.add(spotLight);
scene.add(spotLight.target);
```

## Shadow Optimization

### Shadow Map Resolution
```javascript
// High quality (slower)
directionalLight.shadow.mapSize.width = 4096;
directionalLight.shadow.mapSize.height = 4096;

// Medium quality (balanced)
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;

// Low quality (faster)
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
```

### Shadow Camera Optimization
```javascript
// Tight shadow camera bounds for better quality
directionalLight.shadow.camera.left = -20;
directionalLight.shadow.camera.right = 20;
directionalLight.shadow.camera.top = 20;
directionalLight.shadow.camera.bottom = -20;

// Update shadow camera when light moves
directionalLight.target.position.set(0, 0, 0);
directionalLight.shadow.camera.updateProjectionMatrix();
```

### Shadow Bias
```javascript
// Adjust shadow bias to prevent shadow acne
directionalLight.shadow.bias = -0.0001;  // Negative value
pointLight.shadow.bias = -0.0001;
spotLight.shadow.bias = -0.0001;
```

## Shadow Quality Settings

### Basic Shadows (Fast)
```javascript
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;

directionalLight.shadow.mapSize.width = 512;
directionalLight.shadow.mapSize.height = 512;
```

### High Quality Shadows (Slow)
```javascript
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

directionalLight.shadow.mapSize.width = 4096;
directionalLight.shadow.mapSize.height = 4096;
directionalLight.shadow.radius = 4;
```

### Balanced Shadows (Recommended)
```javascript
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.bias = -0.0001;
```

## Shadow Debugging

### Shadow Camera Helper
```javascript
const lightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(lightHelper);

// Show shadow camera frustum
const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(cameraHelper);
```

### Shadow Map Visualization
```javascript
// Create a plane to show shadow map
const shadowMapTexture = directionalLight.shadow.map;
const shadowMapMaterial = new THREE.MeshBasicMaterial({ map: shadowMapTexture });
const shadowMapPlane = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  shadowMapMaterial
);
shadowMapPlane.position.set(0, 5, 0);
scene.add(shadowMapPlane);
```

## Common Shadow Issues

### Shadow Acne
```javascript
// Fix shadow acne with bias
directionalLight.shadow.bias = -0.0001;
pointLight.shadow.bias = -0.0001;
spotLight.shadow.bias = -0.0001;
```

### Peter Panning
```javascript
// Fix Peter panning with positive bias
directionalLight.shadow.bias = 0.0001;
pointLight.shadow.bias = 0.0001;
spotLight.shadow.bias = 0.0001;
```

### Shadow Flickering
```javascript
// Fix flickering with stable shadow camera
directionalLight.target.position.set(0, 0, 0);
directionalLight.shadow.camera.updateProjectionMatrix();
```

## Performance Considerations

### Shadow Map Size
- Larger shadow maps = better quality, slower performance
- 512x512: Fast, low quality
- 1024x1024: Balanced
- 2048x2048: Good quality
- 4096x4096: High quality, slow

### Number of Shadow-Casting Lights
- Limit to 1-2 shadow-casting lights
- Use non-shadow-casting lights for fill lighting
- Consider baked shadows for static scenes

### Shadow Camera Bounds
- Tight bounds improve quality
- Loose bounds reduce quality
- Update bounds when light moves

## Best Practices

### 1. Shadow Setup
```javascript
// Enable shadows on renderer
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Enable shadow casting on light
directionalLight.castShadow = true;

// Enable shadow casting on objects
cube.castShadow = true;

// Enable shadow receiving on ground
ground.receiveShadow = true;
```

### 2. Shadow Quality
- Use appropriate shadow map resolution
- Set tight shadow camera bounds
- Use appropriate shadow bias
- Consider shadow type for your needs

### 3. Performance
- Limit shadow-casting lights
- Use appropriate shadow map size
- Consider shadow distance culling
- Use baked shadows for static scenes

### 4. Debugging
- Use shadow camera helpers
- Visualize shadow maps
- Check shadow bias settings
- Monitor performance impact

## Common Pitfalls
- Forgetting to enable shadows on renderer
- Not setting castShadow on lights
- Not setting castShadow on objects
- Not setting receiveShadow on ground
- Using too high shadow map resolution
- Not setting appropriate shadow bias
- Not updating shadow camera when light moves
- Using too many shadow-casting lights

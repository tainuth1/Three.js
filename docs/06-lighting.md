# Lighting System

## Overview
Lighting is crucial for creating realistic 3D scenes. Three.js provides several light types that simulate different real-world lighting conditions.

## Light Types

### AmbientLight
Provides uniform lighting from all directions. Simulates global illumination and prevents completely dark areas.

```javascript
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
```

**Properties:**
- `color` - Light color (default: 0xffffff)
- `intensity` - Light intensity (default: 1)
- `visible` - Light visibility (default: true)

**Usage:**
- Always use ambient light to prevent completely dark areas
- Low intensity (0.1-0.5) is usually sufficient
- Can be combined with other lights

### PointLight
Emits light in all directions from a single point, like a light bulb.

```javascript
const pointLight = new THREE.PointLight(0xffffff, 900);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);
```

**Properties:**
- `color` - Light color (default: 0xffffff)
- `intensity` - Light intensity (default: 1)
- `position` - Light position (Vector3)
- `distance` - Maximum range of light (default: 0 = infinite)
- `decay` - Light decay rate (default: 2)
- `castShadow` - Whether light casts shadows (default: false)

**Shadow Properties:**
- `shadow.camera.near` - Near shadow camera plane
- `shadow.camera.far` - Far shadow camera plane
- `shadow.mapSize` - Shadow map resolution
- `shadow.bias` - Shadow bias to prevent shadow acne

### DirectionalLight
Emits parallel light rays, like sunlight.

```javascript
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(10, 10, 10);
directionalLight.castShadow = true;
scene.add(directionalLight);
```

**Properties:**
- `color` - Light color (default: 0xffffff)
- `intensity` - Light intensity (default: 1)
- `position` - Light position (Vector3)
- `target` - Light target (Object3D)
- `castShadow` - Whether light casts shadows (default: false)

**Shadow Properties:**
- `shadow.camera.left` - Left shadow camera plane
- `shadow.camera.right` - Right shadow camera plane
- `shadow.camera.top` - Top shadow camera plane
- `shadow.camera.bottom` - Bottom shadow camera plane
- `shadow.camera.near` - Near shadow camera plane
- `shadow.camera.far` - Far shadow camera plane
- `shadow.mapSize` - Shadow map resolution
- `shadow.bias` - Shadow bias

## Lighting Setup Examples

### Basic Scene Lighting
```javascript
// Ambient light for overall illumination
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Point light for main illumination
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);
```

### Multiple Point Lights
```javascript
const pointLight1 = new THREE.PointLight(0xffffff, 900);
pointLight1.position.set(0, 0, 0);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xffffff, 900);
pointLight2.position.set(0, 20, 20);
scene.add(pointLight2);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
```

### Directional Light with Shadows
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
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;

scene.add(directionalLight);
```

## Light Helpers

### PointLightHelper
Visualizes point light position and range.

```javascript
const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);
```

### DirectionalLightHelper
Visualizes directional light direction and target.

```javascript
const lightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(lightHelper);
```

### HemisphereLightHelper
Visualizes hemisphere light.

```javascript
const lightHelper = new THREE.HemisphereLightHelper(hemisphereLight);
scene.add(lightHelper);
```

## Advanced Lighting

### HemisphereLight
Provides gradient lighting from sky to ground, simulating sky illumination.

```javascript
const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(hemisphereLight);
```

**Properties:**
- `skyColor` - Color from sky direction
- `groundColor` - Color from ground direction
- `intensity` - Light intensity

### SpotLight
Emits light in a cone shape, like a flashlight.

```javascript
const spotLight = new THREE.SpotLight(0xffffff, 1, 100, Math.PI / 4, 0.25);
spotLight.position.set(10, 10, 10);
spotLight.target.position.set(0, 0, 0);
scene.add(spotLight);
scene.add(spotLight.target);
```

**Properties:**
- `color` - Light color
- `intensity` - Light intensity
- `distance` - Maximum range
- `angle` - Cone angle
- `penumbra` - Penumbra factor (0-1)
- `decay` - Light decay rate

## Lighting Best Practices

### 1. Use Multiple Light Types
```javascript
// Ambient for base illumination
const ambientLight = new THREE.AmbientLight(0x404040, 0.3);

// Directional for main lighting
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 1, 1);

// Point light for accent lighting
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(-10, 10, -10);
```

### 2. Appropriate Light Intensity
- Ambient: 0.1-0.5
- Directional: 0.5-2.0
- Point: 0.5-2.0
- Spot: 0.5-2.0

### 3. Color Temperature
```javascript
// Warm light (incandescent)
const warmLight = new THREE.PointLight(0xffaa44, 1);

// Cool light (fluorescent)
const coolLight = new THREE.PointLight(0x4488ff, 1);

// Neutral light (daylight)
const neutralLight = new THREE.PointLight(0xffffff, 1);
```

### 4. Light Positioning
- Position lights to create interesting shadows
- Use multiple lights to avoid harsh shadows
- Consider the mood you want to create

## Performance Considerations

### Light Limits
- Too many lights can impact performance
- Use light culling for distant lights
- Consider using baked lighting for static scenes

### Shadow Optimization
- Use appropriate shadow map sizes
- Limit shadow-casting lights
- Use shadow bias to prevent artifacts

## Common Pitfalls
- Using only ambient light (flat appearance)
- Too high light intensity (washed out)
- Not enabling shadows when needed
- Forgetting to add lights to the scene
- Using too many lights (performance issues)
- Not positioning lights effectively
- Incorrect shadow camera setup

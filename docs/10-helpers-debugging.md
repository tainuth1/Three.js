# Helpers & Debugging

## Overview
Three.js provides various helper objects to visualize and debug your 3D scenes. These helpers make it easier to understand object positions, orientations, and relationships.

## Light Helpers

### PointLightHelper
Visualizes point light position and range.

```javascript
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);
```

**Properties:**
- `light` - The point light being visualized
- `color` - Helper color (optional)
- `sphereSize` - Size of the helper sphere (default: 1)

### DirectionalLightHelper
Visualizes directional light direction and target.

```javascript
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
directionalLight.target.position.set(0, 0, 0);
scene.add(directionalLight);
scene.add(directionalLight.target);

const lightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(lightHelper);
```

**Properties:**
- `light` - The directional light being visualized
- `color` - Helper color (optional)
- `size` - Size of the helper (default: 1)

### HemisphereLightHelper
Visualizes hemisphere light.

```javascript
const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(hemisphereLight);

const lightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 10);
scene.add(lightHelper);
```

**Properties:**
- `light` - The hemisphere light being visualized
- `size` - Size of the helper
- `color` - Helper color (optional)

## Grid Helpers

### GridHelper
Creates a grid on the XZ plane.

```javascript
const gridHelper = new THREE.GridHelper(200, 200, 0xffffff);
scene.add(gridHelper);
```

**Parameters:**
- `size` - Size of the grid (default: 10)
- `divisions` - Number of divisions (default: 10)
- `colorCenterLine` - Color of center lines (default: 0x444444)
- `colorGrid` - Color of grid lines (default: 0x888888)

### PolarGridHelper
Creates a polar grid.

```javascript
const polarGridHelper = new THREE.PolarGridHelper(10, 16, 8, 64, 0x444444);
scene.add(polarGridHelper);
```

**Parameters:**
- `radius` - Radius of the grid
- `radials` - Number of radial lines
- `circles` - Number of circles
- `divisions` - Number of divisions per circle
- `color1` - Color of radial lines
- `color2` - Color of circles

## Camera Helpers

### CameraHelper
Visualizes camera frustum and position.

```javascript
const cameraHelper = new THREE.CameraHelper(camera);
scene.add(cameraHelper);
```

**Properties:**
- `camera` - The camera being visualized
- `matrix` - Camera's world matrix
- `matrixAutoUpdate` - Auto-update matrix (default: true)

### OrthographicCameraHelper
Visualizes orthographic camera frustum.

```javascript
const orthoCamera = new THREE.OrthographicCamera(-10, 10, 10, -10, 1, 1000);
const cameraHelper = new THREE.OrthographicCameraHelper(orthoCamera);
scene.add(cameraHelper);
```

## Object Helpers

### BoxHelper
Creates a wireframe box around an object.

```javascript
const boxHelper = new THREE.BoxHelper(object);
scene.add(boxHelper);
```

**Properties:**
- `object` - The object to create box around
- `color` - Color of the box (optional)

### Box3Helper
Visualizes a Box3 bounding box.

```javascript
const box3 = new THREE.Box3();
box3.setFromObject(object);
const box3Helper = new THREE.Box3Helper(box3, 0xffff00);
scene.add(box3Helper);
```

### SphereHelper
Visualizes a sphere.

```javascript
const sphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 5);
const sphereHelper = new THREE.SphereHelper(sphere, 0xffff00);
scene.add(sphereHelper);
```

## Arrow Helper
Creates an arrow to show direction.

```javascript
const direction = new THREE.Vector3(1, 0, 0);
const origin = new THREE.Vector3(0, 0, 0);
const arrowHelper = new THREE.ArrowHelper(direction, origin, 5, 0xffff00);
scene.add(arrowHelper);
```

**Parameters:**
- `dir` - Direction vector
- `origin` - Origin point
- `length` - Arrow length
- `color` - Arrow color
- `headLength` - Head length (default: 0.2 * length)
- `headWidth` - Head width (default: 0.2 * headLength)

## Axes Helper
Shows X, Y, Z axes.

```javascript
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
```

**Parameters:**
- `size` - Size of the axes (default: 1)

## Plane Helper
Visualizes a plane.

```javascript
const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const planeHelper = new THREE.PlaneHelper(plane, 10, 0xffff00);
scene.add(planeHelper);
```

## Debugging Tools

### Renderer Info
```javascript
// Get renderer information
console.log(renderer.info);

// Memory usage
console.log(renderer.info.memory);

// Render statistics
console.log(renderer.info.render);
```

### Object Traversal
```javascript
// Traverse all objects in scene
scene.traverse(function(object) {
  console.log(object.name, object.type);
});

// Find objects by name
const foundObject = scene.getObjectByName("myObject");

// Find objects by type
scene.traverse(function(object) {
  if (object instanceof THREE.Mesh) {
    console.log("Found mesh:", object);
  }
});
```

### Bounding Boxes
```javascript
// Calculate bounding box
const box = new THREE.Box3();
box.setFromObject(object);
console.log("Bounding box:", box.min, box.max);

// Calculate bounding sphere
const sphere = new THREE.Sphere();
object.geometry.computeBoundingSphere();
console.log("Bounding sphere:", object.geometry.boundingSphere);
```

## Performance Monitoring

### Frame Rate Monitoring
```javascript
let frameCount = 0;
let lastTime = performance.now();

function animate() {
  frameCount++;
  const currentTime = performance.now();
  
  if (currentTime - lastTime >= 1000) {
    console.log("FPS:", frameCount);
    frameCount = 0;
    lastTime = currentTime;
  }
  
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
```

### Memory Monitoring
```javascript
function checkMemory() {
  console.log("Memory usage:", renderer.info.memory);
  console.log("Geometries:", renderer.info.memory.geometries);
  console.log("Textures:", renderer.info.memory.textures);
}

// Check memory every 5 seconds
setInterval(checkMemory, 5000);
```

## Helper Management

### Adding Helpers
```javascript
const helpers = [];

function addHelper(helper) {
  scene.add(helper);
  helpers.push(helper);
}

// Add multiple helpers
addHelper(new THREE.AxesHelper(5));
addHelper(new THREE.GridHelper(10, 10));
addHelper(new THREE.PointLightHelper(pointLight));
```

### Removing Helpers
```javascript
function removeAllHelpers() {
  helpers.forEach(helper => {
    scene.remove(helper);
    helper.dispose();
  });
  helpers.length = 0;
}

function removeHelper(helper) {
  scene.remove(helper);
  helper.dispose();
  const index = helpers.indexOf(helper);
  if (index > -1) {
    helpers.splice(index, 1);
  }
}
```

### Toggle Helpers
```javascript
let showHelpers = true;

function toggleHelpers() {
  showHelpers = !showHelpers;
  helpers.forEach(helper => {
    helper.visible = showHelpers;
  });
}

// Toggle with key press
document.addEventListener('keydown', function(event) {
  if (event.key === 'h') {
    toggleHelpers();
  }
});
```

## Common Debugging Scenarios

### Object Not Visible
```javascript
// Check if object is in camera frustum
const frustum = new THREE.Frustum();
const matrix = new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
frustum.setFromProjectionMatrix(matrix);

if (frustum.intersectsObject(object)) {
  console.log("Object is in camera frustum");
} else {
  console.log("Object is outside camera frustum");
}
```

### Lighting Issues
```javascript
// Check light intensity
console.log("Point light intensity:", pointLight.intensity);
console.log("Ambient light intensity:", ambientLight.intensity);

// Check light position
console.log("Light position:", pointLight.position);
console.log("Light target:", directionalLight.target.position);
```

### Performance Issues
```javascript
// Check render statistics
console.log("Draw calls:", renderer.info.render.calls);
console.log("Triangles:", renderer.info.render.triangles);
console.log("Points:", renderer.info.render.points);
console.log("Lines:", renderer.info.render.lines);
```

## Best Practices

### 1. Use Helpers During Development
- Add helpers to visualize complex setups
- Remove helpers in production builds
- Use conditional helper display

### 2. Performance Monitoring
- Monitor frame rate during development
- Check memory usage regularly
- Profile performance bottlenecks

### 3. Debugging Workflow
- Start with basic helpers (axes, grid)
- Add specific helpers for your use case
- Use console logging for complex debugging

### 4. Helper Management
- Keep track of added helpers
- Clean up helpers when not needed
- Use consistent naming conventions

## Common Pitfalls
- Forgetting to remove helpers in production
- Not disposing of helper objects
- Adding too many helpers (performance impact)
- Not updating helpers when objects change
- Using helpers in wrong coordinate systems
- Not cleaning up helper references
- Forgetting to update helper visibility

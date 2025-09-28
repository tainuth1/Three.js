# Controls

## Overview
Controls provide user interaction with the camera, allowing users to navigate and explore 3D scenes. Three.js includes several control types, with OrbitControls being the most commonly used.

## OrbitControls

### Basic Setup
```javascript
import { OrbitControls } from "three/examples/jsm/Addons.js";

const controls = new OrbitControls(camera, renderer.domElement);
```

**Parameters:**
- `camera` - The camera to control
- `domElement` - The DOM element to listen for events

### Basic Configuration
```javascript
const controls = new OrbitControls(camera, renderer.domElement);

// Enable damping for smooth movement
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Enable zoom
controls.enableZoom = true;
controls.zoomSpeed = 1.0;

// Enable pan
controls.enablePan = true;
controls.panSpeed = 1.0;

// Enable rotation
controls.enableRotate = true;
controls.rotateSpeed = 1.0;
```

### Target and Distance
```javascript
// Set target point (what the camera looks at)
controls.target.set(0, 0, 0);

// Set initial distance
controls.object.position.set(0, 10, 20);

// Update controls
controls.update();
```

## Control Properties

### Movement Properties
```javascript
// Enable/disable specific movements
controls.enableDamping = true;      // Smooth movement
controls.enableZoom = true;         // Mouse wheel zoom
controls.enablePan = true;          // Right-click drag to pan
controls.enableRotate = true;       // Left-click drag to rotate

// Speed settings
controls.rotateSpeed = 1.0;         // Rotation speed
controls.zoomSpeed = 1.0;           // Zoom speed
controls.panSpeed = 1.0;            // Pan speed
controls.dampingFactor = 0.05;      // Damping factor
```

### Limits and Constraints
```javascript
// Zoom limits
controls.minDistance = 5;           // Minimum zoom distance
controls.maxDistance = 100;         // Maximum zoom distance

// Polar angle limits (vertical rotation)
controls.minPolarAngle = 0;         // Minimum polar angle
controls.maxPolarAngle = Math.PI;   // Maximum polar angle

// Azimuth angle limits (horizontal rotation)
controls.minAzimuthAngle = -Infinity; // Minimum azimuth angle
controls.maxAzimuthAngle = Infinity;  // Maximum azimuth angle

// Pan limits
controls.minPan = new THREE.Vector3(-10, -10, -10);
controls.maxPan = new THREE.Vector3(10, 10, 10);
```

### Target and Position
```javascript
// Set target point
controls.target.set(0, 0, 0);

// Get current target
const target = controls.target;

// Set camera position
controls.object.position.set(0, 10, 20);

// Get current position
const position = controls.object.position;
```

## Control Events

### Event Listeners
```javascript
// Listen for control changes
controls.addEventListener('change', function() {
  console.log('Camera position:', controls.object.position);
  console.log('Camera target:', controls.target);
});

// Listen for specific events
controls.addEventListener('start', function() {
  console.log('Control started');
});

controls.addEventListener('end', function() {
  console.log('Control ended');
});
```

### Custom Event Handling
```javascript
// Override control behavior
controls.addEventListener('change', function() {
  // Custom logic when controls change
  updateUI();
  renderer.render(scene, camera);
});

// Prevent default behavior
controls.addEventListener('start', function(event) {
  if (someCondition) {
    event.preventDefault();
  }
});
```

## Animation Loop Integration

### Basic Integration
```javascript
function animate() {
  // Update controls
  controls.update();
  
  // Render scene
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
```

### With Damping
```javascript
function animate() {
  // Update controls (required for damping)
  controls.update();
  
  // Render scene
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
```

## Advanced Configuration

### Custom Key Bindings
```javascript
// Custom key bindings
controls.keys = {
  LEFT: 'ArrowLeft',    // Left arrow key
  UP: 'ArrowUp',        // Up arrow key
  RIGHT: 'ArrowRight',  // Right arrow key
  BOTTOM: 'ArrowDown'   // Down arrow key
};

// Key pan speed
controls.keyPanSpeed = 7.0;
```

### Mouse Buttons
```javascript
// Custom mouse button assignments
controls.mouseButtons = {
  LEFT: THREE.MOUSE.ROTATE,    // Left button for rotation
  MIDDLE: THREE.MOUSE.DOLLY,   // Middle button for zoom
  RIGHT: THREE.MOUSE.PAN       // Right button for pan
};
```

### Touch Controls
```javascript
// Touch control settings
controls.touches = {
  ONE: THREE.TOUCH.ROTATE,     // One finger for rotation
  TWO: THREE.TOUCH.DOLLY_PAN   // Two fingers for zoom/pan
};
```

## Control Methods

### Programmatic Control
```javascript
// Set camera position
controls.object.position.set(0, 10, 20);
controls.target.set(0, 0, 0);
controls.update();

// Animate to position
controls.object.position.lerp(new THREE.Vector3(0, 10, 20), 0.1);
controls.update();

// Reset to initial position
controls.reset();
```

### Smooth Transitions
```javascript
// Smoothly move to target
function moveToPosition(x, y, z) {
  const targetPosition = new THREE.Vector3(x, y, z);
  const targetLookAt = new THREE.Vector3(0, 0, 0);
  
  // Animate position
  controls.object.position.lerp(targetPosition, 0.1);
  controls.target.lerp(targetLookAt, 0.1);
  controls.update();
}
```

## Performance Optimization

### Efficient Updates
```javascript
let needsUpdate = false;

controls.addEventListener('change', function() {
  needsUpdate = true;
});

function animate() {
  if (needsUpdate) {
    renderer.render(scene, camera);
    needsUpdate = false;
  }
}
```

### Conditional Rendering
```javascript
let isMoving = false;

controls.addEventListener('start', function() {
  isMoving = true;
});

controls.addEventListener('end', function() {
  isMoving = false;
});

function animate() {
  if (isMoving) {
    renderer.render(scene, camera);
  }
}
```

## Common Use Cases

### 3D Model Viewer
```javascript
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;
controls.enableRotate = true;

// Set initial position
controls.object.position.set(0, 0, 5);
controls.target.set(0, 0, 0);
controls.update();
```

### Architectural Visualization
```javascript
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;
controls.enableRotate = true;

// Limit vertical rotation
controls.minPolarAngle = 0;
controls.maxPolarAngle = Math.PI / 2;

// Set ground level
controls.target.set(0, 0, 0);
controls.object.position.set(0, 10, 10);
controls.update();
```

### Product Showcase
```javascript
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = false;  // Disable pan for product view
controls.enableRotate = true;

// Center on product
controls.target.set(0, 0, 0);
controls.object.position.set(0, 0, 5);
controls.update();
```

## Troubleshooting

### Common Issues
```javascript
// Controls not working
// 1. Check if controls are enabled
controls.enableRotate = true;
controls.enableZoom = true;
controls.enablePan = true;

// 2. Check if controls are updated
controls.update();

// 3. Check if camera is properly set
controls.object = camera;
```

### Performance Issues
```javascript
// Reduce update frequency
let lastUpdate = 0;
const updateInterval = 16; // ~60fps

function animate() {
  const now = performance.now();
  if (now - lastUpdate >= updateInterval) {
    controls.update();
    renderer.render(scene, camera);
    lastUpdate = now;
  }
}
```

## Best Practices

### 1. Always Update Controls
- Call `controls.update()` in animation loop
- Required for damping to work properly
- Ensures smooth movement

### 2. Appropriate Limits
- Set reasonable zoom limits
- Limit rotation angles when appropriate
- Use pan limits for constrained scenes

### 3. Performance
- Use damping for smooth movement
- Update controls efficiently
- Consider update frequency

### 4. User Experience
- Provide appropriate control options
- Use consistent control schemes
- Handle edge cases gracefully

## Common Pitfalls
- Forgetting to call `controls.update()`
- Not enabling required control types
- Setting inappropriate limits
- Not handling control events
- Performance issues with frequent updates
- Inconsistent control behavior
- Not cleaning up control references

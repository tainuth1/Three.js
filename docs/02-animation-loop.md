# Animation Loop

## Overview
The animation loop is the heart of any interactive 3D application. It continuously updates and renders the scene, creating the illusion of motion and interactivity.

## Basic Animation Loop

### Using setAnimationLoop
```javascript
function animate() {
  // Update objects
  torus.rotation.x += 0.009;
  torus.rotation.y += 0.009;
  
  // Render the scene
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
```

### Using requestAnimationFrame
```javascript
function animate() {
  requestAnimationFrame(animate);
  
  // Update objects
  torus.rotation.x += 0.009;
  torus.rotation.y += 0.009;
  
  // Render the scene
  renderer.render(scene, camera);
}

animate();
```

## Object Transformations

### Rotation
```javascript
// Continuous rotation
torus.rotation.x += 0.009;
torus.rotation.y += 0.009;
torus.rotation.z += 0.01;

// Different rotation speeds for different objects
moon.rotation.y += 0.005;
moon2.rotation.y += 0.01;
torusKnot.rotation.x += 0.009;
torusKnot.rotation.y += 0.009;
```

### Position
```javascript
// Move object
cube.position.x += 0.01;
cube.position.y += 0.01;

// Oscillate position
cube.position.y = Math.sin(Date.now() * 0.001) * 2;
```

### Scale
```javascript
// Smooth scaling interpolation
const s = THREE.MathUtils.lerp(testBox.scale.x, testBoxTargetScale, 0.15);
testBox.scale.set(s, s, s);
```

## Math Utilities

### Lerp (Linear Interpolation)
Smoothly interpolates between two values.

```javascript
// Lerp between current scale and target scale
const s = THREE.MathUtils.lerp(testBox.scale.x, testBoxTargetScale, 0.15);
testBox.scale.set(s, s, s);
```

### Random Values
```javascript
// Generate random float between -spread and +spread
const randomValue = THREE.MathUtils.randFloatSpread(150);

// Generate random float between min and max
const randomValue = THREE.MathUtils.randFloat(0, 100);
```

### Clamp
```javascript
// Clamp value between min and max
const clampedValue = THREE.MathUtils.clamp(value, 0, 1);
```

## Time-Based Animation

### Using Date.now()
```javascript
function animate() {
  const time = Date.now() * 0.001; // Convert to seconds
  
  // Oscillate position
  cube.position.y = Math.sin(time) * 2;
  
  // Rotate based on time
  torus.rotation.y = time * 0.5;
  
  renderer.render(scene, camera);
}
```

### Using Performance.now()
```javascript
let startTime = performance.now();

function animate() {
  const elapsedTime = (performance.now() - startTime) * 0.001;
  
  // Animate based on elapsed time
  cube.position.y = Math.sin(elapsedTime) * 2;
  
  renderer.render(scene, camera);
}
```

## Smooth Interpolation

### Scale Interpolation
```javascript
let targetScale = 1;
let currentScale = 1;

function animate() {
  // Smoothly interpolate scale
  currentScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.15);
  cube.scale.set(currentScale, currentScale, currentScale);
  
  renderer.render(scene, camera);
}

// Change target scale
targetScale = 2; // Will smoothly scale up
```

### Position Interpolation
```javascript
let targetPosition = new THREE.Vector3(0, 0, 0);
let currentPosition = new THREE.Vector3(0, 0, 0);

function animate() {
  // Smoothly interpolate position
  currentPosition.lerp(targetPosition, 0.1);
  cube.position.copy(currentPosition);
  
  renderer.render(scene, camera);
}
```

## Animation Patterns

### Oscillation
```javascript
function animate() {
  const time = Date.now() * 0.001;
  
  // Oscillate up and down
  cube.position.y = Math.sin(time) * 2;
  
  // Oscillate side to side
  cube.position.x = Math.cos(time) * 3;
  
  renderer.render(scene, camera);
}
```

### Rotation Around Point
```javascript
function animate() {
  const time = Date.now() * 0.001;
  const radius = 5;
  
  // Rotate around origin
  cube.position.x = Math.cos(time) * radius;
  cube.position.z = Math.sin(time) * radius;
  
  renderer.render(scene, camera);
}
```

### Pulsing Scale
```javascript
function animate() {
  const time = Date.now() * 0.001;
  const scale = 1 + Math.sin(time * 2) * 0.2; // Pulse between 0.8 and 1.2
  
  cube.scale.set(scale, scale, scale);
  
  renderer.render(scene, camera);
}
```

## Performance Considerations

### Efficient Updates
```javascript
function animate() {
  // Only update what changes
  if (needsUpdate) {
    updateObjects();
    needsUpdate = false;
  }
  
  renderer.render(scene, camera);
}
```

### Conditional Rendering
```javascript
function animate() {
  // Only render if scene has changed
  if (sceneChanged) {
    renderer.render(scene, camera);
    sceneChanged = false;
  }
}
```

### Frame Rate Control
```javascript
let lastTime = 0;
const targetFPS = 60;
const frameInterval = 1000 / targetFPS;

function animate(currentTime) {
  if (currentTime - lastTime >= frameInterval) {
    // Update and render
    updateObjects();
    renderer.render(scene, camera);
    lastTime = currentTime;
  }
  
  requestAnimationFrame(animate);
}
```

## Animation Controls

### Start/Stop Animation
```javascript
let isAnimating = false;

function startAnimation() {
  isAnimating = true;
  animate();
}

function stopAnimation() {
  isAnimating = false;
}

function animate() {
  if (!isAnimating) return;
  
  // Update objects
  updateObjects();
  
  // Render scene
  renderer.render(scene, camera);
  
  requestAnimationFrame(animate);
}
```

### Pause/Resume
```javascript
let isPaused = false;

function animate() {
  if (!isPaused) {
    // Update objects
    updateObjects();
  }
  
  // Always render
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function togglePause() {
  isPaused = !isPaused;
}
```

## Best Practices

### 1. Use setAnimationLoop
- Preferred over requestAnimationFrame
- Automatically handles frame timing
- Better integration with Three.js

### 2. Consistent Frame Rate
- Use time-based animations
- Avoid frame-rate dependent code
- Use delta time for smooth motion

### 3. Efficient Updates
- Only update what changes
- Use dirty flags for optimization
- Avoid unnecessary calculations

### 4. Memory Management
- Dispose of unused objects
- Clean up event listeners
- Monitor memory usage

## Common Pitfalls
- Using frame-rate dependent animations
- Not disposing of animation loops
- Updating objects unnecessarily
- Forgetting to call render()
- Not handling window resize
- Memory leaks from closures
- Inconsistent animation timing

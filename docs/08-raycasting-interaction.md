# Raycasting & Interaction

## Overview
Raycasting enables mouse and touch interaction with 3D objects. It projects a ray from the camera through the mouse position and detects intersections with objects in the scene.

## Basic Raycasting Setup

### Raycaster and Mouse Vector
```javascript
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hovered = null;
```

### Mouse Position Calculation
```javascript
function updateRaycasterFromEvent(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
}
```

**Explanation:**
- `clientX/clientY`: Mouse position relative to viewport
- `rect.left/rect.top`: Canvas position relative to viewport
- `rect.width/rect.height`: Canvas dimensions
- Multiply by 2 and subtract 1: Convert to normalized device coordinates (-1 to 1)
- Negate Y: Invert Y axis (screen Y is top-down, 3D Y is bottom-up)

## Object Intersection

### Basic Intersection Detection
```javascript
function onPointerMove(event) {
  updateRaycasterFromEvent(event);
  const intersects = raycaster.intersectObjects([testBox], true);
  const hit = intersects.length > 0 ? intersects[0].object : null;
  
  if (hit && hovered !== testBox) {
    hovered = testBox;
    // Object hovered
  } else if (!hit && hovered) {
    hovered = null;
    // Object unhovered
  }
}
```

### Multiple Object Intersection
```javascript
function onPointerMove(event) {
  updateRaycasterFromEvent(event);
  const intersects = raycaster.intersectObjects([object1, object2, object3], true);
  
  if (intersects.length > 0) {
    const hitObject = intersects[0].object;
    // Handle hit object
  }
}
```

### Intersection with All Objects
```javascript
function onPointerMove(event) {
  updateRaycasterFromEvent(event);
  const intersects = raycaster.intersectObjects(scene.children, true);
  
  if (intersects.length > 0) {
    const hitObject = intersects[0].object;
    // Handle hit object
  }
}
```

## Interactive Object Scaling

### Smooth Scale Interpolation
```javascript
let testBoxTargetScale = 1;

function onPointerMove(event) {
  updateRaycasterFromEvent(event);
  const intersects = raycaster.intersectObjects([testBox], true);
  const hit = intersects.length > 0 ? intersects[0].object : null;
  
  if (hit && hovered !== testBox) {
    hovered = testBox;
    testBoxTargetScale = 2;  // Scale up on hover
    renderer.domElement.style.cursor = "pointer";
  } else if (!hit && hovered) {
    hovered = null;
    testBoxTargetScale = 1;  // Scale back to normal
    renderer.domElement.style.cursor = "default";
  }
}

// In animation loop
function animate() {
  const s = THREE.MathUtils.lerp(testBox.scale.x, testBoxTargetScale, 0.15);
  testBox.scale.set(s, s, s);
  renderer.render(scene, camera);
}
```

## Event Handling

### Mouse Events
```javascript
// Mouse move for hover effects
renderer.domElement.addEventListener("pointermove", onPointerMove);

// Mouse leave to reset state
renderer.domElement.addEventListener("pointerleave", onPointerLeave);

// Click events
renderer.domElement.addEventListener("click", onClick);
```

### Touch Events
```javascript
// Touch events for mobile
renderer.domElement.addEventListener("touchstart", onTouchStart);
renderer.domElement.addEventListener("touchmove", onTouchMove);
renderer.domElement.addEventListener("touchend", onTouchEnd);
```

### Event Handler Examples
```javascript
function onPointerLeave() {
  hovered = null;
  testBoxTargetScale = 1;
  renderer.domElement.style.cursor = "default";
}

function onClick(event) {
  updateRaycasterFromEvent(event);
  const intersects = raycaster.intersectObjects([testBox], true);
  
  if (intersects.length > 0) {
    console.log("Object clicked!");
    // Handle click
  }
}
```

## Advanced Raycasting

### Intersection Information
```javascript
function onPointerMove(event) {
  updateRaycasterFromEvent(event);
  const intersects = raycaster.intersectObjects([testBox], true);
  
  if (intersects.length > 0) {
    const intersection = intersects[0];
    
    console.log("Distance:", intersection.distance);
    console.log("Point:", intersection.point);
    console.log("Face:", intersection.face);
    console.log("UV:", intersection.uv);
    console.log("Object:", intersection.object);
  }
}
```

### Intersection Properties
- `distance`: Distance from camera to intersection point
- `point`: 3D coordinates of intersection
- `face`: Face that was intersected
- `uv`: UV coordinates of intersection
- `object`: The intersected object

### Multiple Intersections
```javascript
function onPointerMove(event) {
  updateRaycasterFromEvent(event);
  const intersects = raycaster.intersectObjects([object1, object2, object3], true);
  
  // Process all intersections
  intersects.forEach((intersection, index) => {
    console.log(`Intersection ${index}:`, intersection.object.name);
  });
  
  // Get closest intersection
  if (intersects.length > 0) {
    const closest = intersects[0];
    // Handle closest intersection
  }
}
```

## Object Selection

### Selection State Management
```javascript
let selectedObject = null;
let hoveredObject = null;

function onPointerMove(event) {
  updateRaycasterFromEvent(event);
  const intersects = raycaster.intersectObjects([object1, object2, object3], true);
  
  if (intersects.length > 0) {
    const hitObject = intersects[0].object;
    
    if (hoveredObject !== hitObject) {
      // Unhover previous object
      if (hoveredObject) {
        hoveredObject.material.emissive.setHex(0x000000);
      }
      
      // Hover new object
      hoveredObject = hitObject;
      hoveredObject.material.emissive.setHex(0x444444);
    }
  } else {
    // Unhover all objects
    if (hoveredObject) {
      hoveredObject.material.emissive.setHex(0x000000);
      hoveredObject = null;
    }
  }
}

function onClick(event) {
  updateRaycasterFromEvent(event);
  const intersects = raycaster.intersectObjects([object1, object2, object3], true);
  
  if (intersects.length > 0) {
    selectedObject = intersects[0].object;
    console.log("Selected:", selectedObject.name);
  }
}
```

## Performance Optimization

### Efficient Raycasting
```javascript
// Only raycast when mouse moves
let needsRaycast = false;

function onPointerMove(event) {
  needsRaycast = true;
  // Store mouse position
  updateRaycasterFromEvent(event);
}

function animate() {
  if (needsRaycast) {
    const intersects = raycaster.intersectObjects(scene.children, true);
    // Process intersections
    needsRaycast = false;
  }
  
  renderer.render(scene, camera);
}
```

### Object Culling
```javascript
// Only raycast visible objects
const visibleObjects = scene.children.filter(obj => obj.visible);
const intersects = raycaster.intersectObjects(visibleObjects, true);
```

### Distance Culling
```javascript
function onPointerMove(event) {
  updateRaycasterFromEvent(event);
  const intersects = raycaster.intersectObjects(scene.children, true);
  
  // Filter by distance
  const nearbyIntersects = intersects.filter(intersection => 
    intersection.distance < 100
  );
  
  if (nearbyIntersects.length > 0) {
    // Handle nearby intersections
  }
}
```

## Common Use Cases

### Hover Effects
```javascript
function onPointerMove(event) {
  updateRaycasterFromEvent(event);
  const intersects = raycaster.intersectObjects([object1, object2, object3], true);
  
  if (intersects.length > 0) {
    const hitObject = intersects[0].object;
    hitObject.material.emissive.setHex(0x444444);
    renderer.domElement.style.cursor = "pointer";
  } else {
    // Reset all objects
    scene.children.forEach(obj => {
      if (obj.material) {
        obj.material.emissive.setHex(0x000000);
      }
    });
    renderer.domElement.style.cursor = "default";
  }
}
```

### Object Highlighting
```javascript
function highlightObject(object) {
  object.material.emissive.setHex(0x444444);
  object.material.needsUpdate = true;
}

function unhighlightObject(object) {
  object.material.emissive.setHex(0x000000);
  object.material.needsUpdate = true;
}
```

### Click to Select
```javascript
function onClick(event) {
  updateRaycasterFromEvent(event);
  const intersects = raycaster.intersectObjects(scene.children, true);
  
  if (intersects.length > 0) {
    const selectedObject = intersects[0].object;
    
    // Clear previous selection
    clearSelection();
    
    // Highlight selected object
    selectedObject.material.emissive.setHex(0x888888);
    selectedObject.material.needsUpdate = true;
  }
}
```

## Best Practices

### 1. Efficient Event Handling
- Use pointer events instead of mouse events
- Debounce frequent events
- Only raycast when necessary

### 2. Performance
- Limit raycast to visible objects
- Use distance culling
- Cache raycast results when possible

### 3. User Experience
- Provide visual feedback
- Use appropriate cursors
- Handle edge cases gracefully

### 4. Code Organization
- Separate raycast logic from rendering
- Use consistent naming conventions
- Handle multiple object types

## Common Pitfalls
- Not normalizing mouse coordinates correctly
- Forgetting to update raycaster with new camera position
- Not handling multiple intersections properly
- Performance issues with too many objects
- Not cleaning up event listeners
- Incorrect coordinate system conversion
- Not handling edge cases (no intersections)

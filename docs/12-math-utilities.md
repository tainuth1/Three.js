# Math Utilities

## Overview
Three.js provides a comprehensive set of math utilities for 3D calculations, transformations, and animations. These utilities make complex 3D math operations simple and efficient.

## MathUtils

### Linear Interpolation (Lerp)
Smoothly interpolates between two values.

```javascript
// Lerp between two numbers
const start = 0;
const end = 10;
const t = 0.5; // Interpolation factor (0-1)
const result = THREE.MathUtils.lerp(start, end, t); // 5

// Lerp between two vectors
const startVector = new THREE.Vector3(0, 0, 0);
const endVector = new THREE.Vector3(10, 10, 10);
const t = 0.5;
const resultVector = startVector.clone().lerp(endVector, t);
```

### Clamp
Clamps a value between min and max.

```javascript
// Clamp value between 0 and 1
const value = 1.5;
const clamped = THREE.MathUtils.clamp(value, 0, 1); // 1

// Clamp value between -10 and 10
const value = -15;
const clamped = THREE.MathUtils.clamp(value, -10, 10); // -10
```

### Random Values
Generate random values for various purposes.

```javascript
// Random float between 0 and 1
const random = THREE.MathUtils.randFloat(0, 1);

// Random float between -spread and +spread
const random = THREE.MathUtils.randFloatSpread(100); // -100 to 100

// Random integer between min and max
const random = THREE.MathUtils.randInt(0, 10);

// Random boolean
const random = THREE.MathUtils.randBoolean();
```

### Angle Conversions
Convert between degrees and radians.

```javascript
// Degrees to radians
const radians = THREE.MathUtils.degToRad(90); // π/2

// Radians to degrees
const degrees = THREE.MathUtils.radToDeg(Math.PI); // 180

// Normalize angle to 0-2π range
const normalized = THREE.MathUtils.normalizeAngle(Math.PI * 3); // π
```

### Smooth Step
Creates smooth transitions between values.

```javascript
// Smooth step between 0 and 1
const smooth = THREE.MathUtils.smoothstep(0.5, 0, 1); // 0.5

// Smooth step with custom range
const smooth = THREE.MathUtils.smoothstep(0.3, 0, 1); // 0.216
```

## Vector3

### Basic Operations
```javascript
const vector = new THREE.Vector3(1, 2, 3);

// Get components
console.log(vector.x, vector.y, vector.z);

// Set components
vector.set(4, 5, 6);

// Copy from another vector
vector.copy(otherVector);

// Clone vector
const cloned = vector.clone();
```

### Vector Math
```javascript
const a = new THREE.Vector3(1, 2, 3);
const b = new THREE.Vector3(4, 5, 6);

// Addition
const sum = a.clone().add(b);

// Subtraction
const diff = a.clone().sub(b);

// Multiplication
const product = a.clone().multiply(b);

// Scalar multiplication
const scaled = a.clone().multiplyScalar(2);

// Division
const quotient = a.clone().divide(b);

// Scalar division
const divided = a.clone().divideScalar(2);
```

### Vector Properties
```javascript
const vector = new THREE.Vector3(3, 4, 0);

// Length (magnitude)
const length = vector.length(); // 5

// Length squared (faster than length)
const lengthSquared = vector.lengthSq(); // 25

// Normalize vector
vector.normalize();

// Distance between vectors
const distance = vector.distanceTo(otherVector);

// Distance squared
const distanceSquared = vector.distanceToSquared(otherVector);
```

### Vector Transformations
```javascript
const vector = new THREE.Vector3(1, 0, 0);

// Rotate around Y axis
vector.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);

// Apply matrix transformation
vector.applyMatrix4(matrix);

// Apply quaternion rotation
vector.applyQuaternion(quaternion);
```

## Euler

### Euler Angles
```javascript
const euler = new THREE.Euler(0, Math.PI / 2, 0);

// Set angles
euler.set(0, Math.PI / 2, 0);

// Set from quaternion
euler.setFromQuaternion(quaternion);

// Set from rotation matrix
euler.setFromRotationMatrix(matrix);
```

### Euler Order
```javascript
// Different rotation orders
euler.order = 'XYZ'; // Default
euler.order = 'YXZ';
euler.order = 'ZXY';
euler.order = 'ZYX';
euler.order = 'YZX';
euler.order = 'XZY';
```

## Quaternion

### Quaternion Operations
```javascript
const quaternion = new THREE.Quaternion();

// Set from Euler angles
quaternion.setFromEuler(euler);

// Set from axis-angle
quaternion.setFromAxisAngle(axis, angle);

// Set from rotation matrix
quaternion.setFromRotationMatrix(matrix);

// Multiply quaternions
quaternion.multiply(otherQuaternion);

// Slerp (spherical linear interpolation)
quaternion.slerp(targetQuaternion, t);
```

### Quaternion Properties
```javascript
const quaternion = new THREE.Quaternion(0, 0, 0, 1);

// Length
const length = quaternion.length();

// Normalize
quaternion.normalize();

// Invert
quaternion.invert();

// Conjugate
quaternion.conjugate();
```

## Matrix4

### Matrix Operations
```javascript
const matrix = new THREE.Matrix4();

// Identity matrix
matrix.identity();

// Set from array
matrix.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);

// Multiply matrices
matrix.multiply(otherMatrix);

// Premultiply
matrix.premultiply(otherMatrix);
```

### Transformation Matrices
```javascript
const matrix = new THREE.Matrix4();

// Translation matrix
matrix.makeTranslation(x, y, z);

// Rotation matrix
matrix.makeRotationX(angle);
matrix.makeRotationY(angle);
matrix.makeRotationZ(angle);

// Scale matrix
matrix.makeScale(x, y, z);

// Look at matrix
matrix.lookAt(eye, target, up);
```

### Matrix Properties
```javascript
const matrix = new THREE.Matrix4();

// Get position
const position = new THREE.Vector3();
matrix.getPosition(position);

// Get scale
const scale = new THREE.Vector3();
matrix.getScale(scale);

// Get rotation
const rotation = new THREE.Euler();
matrix.getRotation(rotation);

// Decompose matrix
const position = new THREE.Vector3();
const quaternion = new THREE.Quaternion();
const scale = new THREE.Vector3();
matrix.decompose(position, quaternion, scale);
```

## Spherical Coordinates

### Spherical Math
```javascript
const spherical = new THREE.Spherical();

// Set from cartesian coordinates
spherical.setFromCartesianCoords(x, y, z);

// Set from vector
spherical.setFromVector3(vector);

// Get cartesian coordinates
const cartesian = new THREE.Vector3();
spherical.getCartesianCoords(cartesian);
```

### Spherical Properties
```javascript
const spherical = new THREE.Spherical(5, Math.PI / 4, Math.PI / 2);

// Radius
spherical.radius = 5;

// Phi (polar angle)
spherical.phi = Math.PI / 4;

// Theta (azimuthal angle)
spherical.theta = Math.PI / 2;
```

## Box3

### Bounding Box Operations
```javascript
const box = new THREE.Box3();

// Set from object
box.setFromObject(object);

// Set from points
box.setFromPoints(points);

// Set from center and size
box.setFromCenterAndSize(center, size);

// Expand box
box.expandByPoint(point);
box.expandByScalar(scalar);
```

### Box3 Properties
```javascript
const box = new THREE.Box3();

// Get center
const center = new THREE.Vector3();
box.getCenter(center);

// Get size
const size = new THREE.Vector3();
box.getSize(size);

// Check if point is inside
const isInside = box.containsPoint(point);

// Check if box intersects another box
const intersects = box.intersectsBox(otherBox);
```

## Sphere

### Sphere Operations
```javascript
const sphere = new THREE.Sphere();

// Set from points
sphere.setFromPoints(points);

// Set from object
sphere.setFromObject(object);

// Expand sphere
sphere.expandByPoint(point);
```

### Sphere Properties
```javascript
const sphere = new THREE.Sphere(center, radius);

// Center
sphere.center = new THREE.Vector3(0, 0, 0);

// Radius
sphere.radius = 5;

// Check if point is inside
const isInside = sphere.containsPoint(point);

// Check if sphere intersects another sphere
const intersects = sphere.intersectsSphere(otherSphere);
```

## Common Math Patterns

### Smooth Movement
```javascript
// Smooth movement towards target
const current = new THREE.Vector3(0, 0, 0);
const target = new THREE.Vector3(10, 10, 10);
const speed = 0.1;

current.lerp(target, speed);
```

### Oscillation
```javascript
// Oscillate position
const time = Date.now() * 0.001;
const amplitude = 5;
const frequency = 1;

const x = Math.sin(time * frequency) * amplitude;
const y = Math.cos(time * frequency) * amplitude;
object.position.set(x, y, 0);
```

### Rotation Around Point
```javascript
// Rotate around a point
const center = new THREE.Vector3(0, 0, 0);
const radius = 5;
const angle = Date.now() * 0.001;

const x = Math.cos(angle) * radius;
const z = Math.sin(angle) * radius;
object.position.set(x, 0, z);
```

### Look At Target
```javascript
// Make object look at target
const target = new THREE.Vector3(10, 0, 0);
object.lookAt(target);

// Or using quaternion
const direction = target.clone().sub(object.position).normalize();
const quaternion = new THREE.Quaternion().setFromUnitVectors(
  new THREE.Vector3(0, 0, 1),
  direction
);
object.quaternion.copy(quaternion);
```

## Performance Tips

### Use Length Squared
```javascript
// Instead of distance
const distance = vector.distanceTo(otherVector);

// Use distance squared for comparisons
const distanceSquared = vector.distanceToSquared(otherVector);
if (distanceSquared < threshold * threshold) {
  // Close enough
}
```

### Cache Calculations
```javascript
// Cache expensive calculations
let cachedMatrix = new THREE.Matrix4();
let needsUpdate = true;

function updateMatrix() {
  if (needsUpdate) {
    cachedMatrix.compose(position, quaternion, scale);
    needsUpdate = false;
  }
  return cachedMatrix;
}
```

### Use Appropriate Precision
```javascript
// Use appropriate precision for your needs
const highPrecision = Math.PI;
const lowPrecision = Math.PI.toFixed(2);
```

## Best Practices

### 1. Vector Operations
- Use clone() when you need to preserve original
- Use normalize() for direction vectors
- Use lengthSquared() for distance comparisons

### 2. Matrix Operations
- Use compose() and decompose() for transformations
- Use lookAt() for camera positioning
- Use makeRotationX/Y/Z() for simple rotations

### 3. Quaternion Operations
- Use slerp() for smooth rotations
- Use setFromEuler() for Euler angle conversion
- Use setFromAxisAngle() for axis-angle rotations

### 4. Performance
- Cache expensive calculations
- Use appropriate precision
- Avoid unnecessary operations

## Common Pitfalls
- Not cloning vectors when needed
- Using length() instead of lengthSquared() for comparisons
- Not normalizing direction vectors
- Forgetting to update matrices
- Using wrong coordinate systems
- Not handling edge cases in math operations
- Using incorrect angle units (degrees vs radians)

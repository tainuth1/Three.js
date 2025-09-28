# Geometries

## Overview
Geometries define the shape and structure of 3D objects. They contain vertices, faces, and other geometric data that determine how an object looks.

## Basic Geometries

### BoxGeometry
Creates a rectangular box with configurable dimensions and segments.

```javascript
const geometry = new THREE.BoxGeometry(3, 3, 3, 20, 20, 20);
// Parameters: width, height, depth, widthSegments, heightSegments, depthSegments
```

**Properties:**
- `width` - Width of the box (default: 1)
- `height` - Height of the box (default: 1) 
- `depth` - Depth of the box (default: 1)
- `widthSegments` - Number of segments along width (default: 1)
- `heightSegments` - Number of segments along height (default: 1)
- `depthSegments` - Number of segments along depth (default: 1)

### SphereGeometry
Creates a sphere with configurable radius and segments.

```javascript
const geometry = new THREE.SphereGeometry(2, 30, 30);
// Parameters: radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength
```

**Properties:**
- `radius` - Sphere radius (default: 1)
- `widthSegments` - Number of horizontal segments (default: 8)
- `heightSegments` - Number of vertical segments (default: 6)
- `phiStart` - Start angle for phi (default: 0)
- `phiLength` - Length of phi sweep (default: Math.PI * 2)
- `thetaStart` - Start angle for theta (default: 0)
- `thetaLength` - Length of theta sweep (default: Math.PI)

### PlaneGeometry
Creates a flat plane, useful for ground, walls, or UI elements.

```javascript
const groundGeometry = new THREE.PlaneGeometry(100, 100);
// Parameters: width, height, widthSegments, heightSegments
```

**Properties:**
- `width` - Width of the plane (default: 1)
- `height` - Height of the plane (default: 1)
- `widthSegments` - Number of segments along width (default: 1)
- `heightSegments` - Number of segments along height (default: 1)

## Complex Geometries

### TorusGeometry
Creates a donut-shaped geometry.

```javascript
const geometry = new THREE.TorusGeometry(8, 3, 160, 100);
// Parameters: radius, tube, radialSegments, tubularSegments, arc
```

**Properties:**
- `radius` - Radius from center to center of tube (default: 1)
- `tube` - Radius of the tube (default: 0.4)
- `radialSegments` - Number of segments around circumference (default: 8)
- `tubularSegments` - Number of segments around tube (default: 6)
- `arc` - Central angle (default: Math.PI * 2)

### TorusKnotGeometry
Creates a complex knot-shaped geometry.

```javascript
const torusKnotGeometry = new THREE.TorusKnotGeometry(3, 1, 500, 100);
// Parameters: radius, tube, tubularSegments, radialSegments, p, q
```

**Properties:**
- `radius` - Radius of the knot (default: 1)
- `tube` - Radius of the tube (default: 0.4)
- `tubularSegments` - Number of segments around tube (default: 64)
- `radialSegments` - Number of segments around radius (default: 8)
- `p` - How many times the geometry winds around its axis (default: 2)
- `q` - How many times the geometry winds around a circle (default: 3)

## Geometry Properties

### Common Properties
- `vertices` - Array of vertices
- `faces` - Array of faces
- `normals` - Array of vertex normals
- `uvs` - Array of UV coordinates
- `boundingBox` - Bounding box of the geometry
- `boundingSphere` - Bounding sphere of the geometry

### Methods
- `computeBoundingBox()` - Calculate bounding box
- `computeBoundingSphere()` - Calculate bounding sphere
- `computeFaceNormals()` - Calculate face normals
- `computeVertexNormals()` - Calculate vertex normals
- `normalize()` - Normalize geometry to unit cube
- `center()` - Center geometry around origin
- `rotateX(angle)` - Rotate around X axis
- `rotateY(angle)` - Rotate around Y axis
- `rotateZ(angle)` - Rotate around Z axis
- `translate(x, y, z)` - Translate geometry
- `scale(x, y, z)` - Scale geometry

## Usage Examples

### Basic Box
```javascript
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
```

### High-Detail Sphere
```javascript
const sphereGeometry = new THREE.SphereGeometry(2, 30, 30);
const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0x049ef4 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
```

### Ground Plane
```javascript
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; // Rotate to be horizontal
scene.add(ground);
```

## Best Practices
1. **Segments**: Use appropriate segment counts - more segments = smoother but slower
2. **Reuse**: Create geometry once and reuse for multiple meshes
3. **Dispose**: Call `geometry.dispose()` when no longer needed
4. **Normals**: Ensure normals are computed for proper lighting
5. **UVs**: Check UV coordinates for texture mapping

## Common Pitfalls
- Using too many segments for simple objects
- Not disposing of unused geometries
- Forgetting to compute normals for custom geometries
- Not considering performance impact of complex geometries
- Incorrect plane orientation (remember to rotate for horizontal planes)

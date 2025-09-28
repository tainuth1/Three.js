# Materials

## Overview
Materials define how surfaces look and react to light. They determine color, transparency, shininess, and other visual properties of 3D objects.

## Material Types

### MeshBasicMaterial
Basic material that doesn't respond to lighting. Always appears the same regardless of light conditions.

```javascript
const material = new THREE.MeshBasicMaterial({ 
  color: 0xffffff,
  wireframe: true 
});
```

**Key Properties:**
- `color` - Material color (default: 0xffffff)
- `wireframe` - Render as wireframe (default: false)
- `transparent` - Enable transparency (default: false)
- `opacity` - Opacity value 0-1 (default: 1)
- `map` - Texture map
- `side` - Which side to render (THREE.FrontSide, THREE.BackSide, THREE.DoubleSide)

### MeshPhongMaterial
Material that responds to lighting with specular highlights.

```javascript
const material = new THREE.MeshPhongMaterial({
  color: 0x049ef4,
  specular: 0xffffff,
  reflectivity: 1,
  shininess: 100,
  map: texture,
  normalMap: normalTexture,
  bumpMap: bumpTexture
});
```

**Key Properties:**
- `color` - Base color (default: 0xffffff)
- `specular` - Specular color (default: 0x111111)
- `shininess` - Shininess factor (default: 30)
- `reflectivity` - Reflectivity factor (default: 1)
- `map` - Diffuse texture map
- `normalMap` - Normal map for surface details
- `bumpMap` - Bump map for surface height
- `specularMap` - Specular map
- `emissive` - Emissive color
- `emissiveMap` - Emissive texture map

### MeshStandardMaterial
Physically-based material that provides realistic lighting response.

```javascript
const material = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  roughness: 0,
  metalness: 0.5,
  map: diffuseTexture,
  normalMap: normalTexture,
  metalnessMap: metalnessTexture,
  roughnessMap: roughnessTexture
});
```

**Key Properties:**
- `color` - Base color (default: 0xffffff)
- `roughness` - Surface roughness 0-1 (default: 1)
- `metalness` - Metalness factor 0-1 (default: 0)
- `map` - Diffuse/albedo texture
- `normalMap` - Normal map
- `metalnessMap` - Metalness texture
- `roughnessMap` - Roughness texture
- `aoMap` - Ambient occlusion map
- `emissive` - Emissive color
- `emissiveMap` - Emissive texture

## Material Properties Deep Dive

### Color
```javascript
// Using hex colors
color: 0x00ff00  // Green
color: 0xff0000  // Red
color: 0x0000ff  // Blue

// Using Color constructor
color: new THREE.Color(0x00ff00)
color: new THREE.Color('green')
color: new THREE.Color(0, 1, 0)  // RGB values
```

### Transparency
```javascript
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  transparent: true,
  opacity: 0.5
});
```

### Wireframe
```javascript
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true
});
```

### Side Rendering
```javascript
const material = new THREE.MeshBasicMaterial({
  side: THREE.FrontSide,    // Render only front faces
  side: THREE.BackSide,     // Render only back faces  
  side: THREE.DoubleSide    // Render both sides
});
```

## Texture Mapping

### Basic Texture
```javascript
const texture = new THREE.TextureLoader().load('texture.jpg');
const material = new THREE.MeshBasicMaterial({ map: texture });
```

### Multiple Texture Maps
```javascript
const diffuseTexture = new THREE.TextureLoader().load('diffuse.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');
const bumpTexture = new THREE.TextureLoader().load('bump.jpg');

const material = new THREE.MeshPhongMaterial({
  map: diffuseTexture,      // Base color texture
  normalMap: normalTexture, // Surface detail texture
  bumpMap: bumpTexture      // Height displacement texture
});
```

## Usage Examples

### Basic Colored Material
```javascript
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
```

### Textured Material
```javascript
const catTexture = new THREE.TextureLoader().load("cat.jpg");
const cat = new THREE.Mesh(
  new THREE.BoxGeometry(4, 4, 4),
  new THREE.MeshBasicMaterial({ map: catTexture })
);
scene.add(cat);
```

### PBR Material with Multiple Maps
```javascript
const metalTexture = new THREE.TextureLoader().load("iron/metal.jpg");
const normalMap = new THREE.TextureLoader().load("iron/metal-normal.jpg");
const bumpMap = new THREE.TextureLoader().load("iron/metal-bump.jpg");
const diffuseMap = new THREE.TextureLoader().load("iron/metal-diffuse.jpg");

const sphereMaterial = new THREE.MeshPhongMaterial({
  color: 0x049ef4,
  map: diffuseMap,
  normalMap: normalMap,
  bumpMap: bumpMap
});
```

## Material Performance

### When to Use Each Material Type
- **MeshBasicMaterial**: UI elements, simple objects, always-visible items
- **MeshPhongMaterial**: Objects that need specular highlights, good performance
- **MeshStandardMaterial**: Realistic materials, PBR workflow, higher performance cost

### Performance Tips
1. Reuse materials across multiple objects
2. Use appropriate material complexity for your needs
3. Dispose of unused materials with `material.dispose()`
4. Consider using `MeshPhongMaterial` for better performance than `MeshStandardMaterial`

## Common Properties

### All Materials
- `color` - Base color
- `transparent` - Enable transparency
- `opacity` - Opacity value
- `side` - Which side to render
- `visible` - Material visibility
- `name` - Material name for debugging

### Lighting-Responsive Materials
- `emissive` - Self-illumination color
- `emissiveIntensity` - Emissive intensity
- `map` - Diffuse texture
- `normalMap` - Normal map
- `bumpMap` - Bump map
- `displacementMap` - Displacement map

## Best Practices
1. **Reuse Materials**: Create once, use many times
2. **Appropriate Complexity**: Use simpler materials when possible
3. **Texture Optimization**: Use appropriate texture sizes
4. **Dispose Properly**: Clean up unused materials
5. **PBR Workflow**: Use `MeshStandardMaterial` for realistic materials

## Common Pitfalls
- Not disposing of unused materials (memory leak)
- Using too complex materials for simple objects
- Forgetting to set `transparent: true` for transparent materials
- Not considering performance impact of complex materials
- Incorrect texture mapping coordinates

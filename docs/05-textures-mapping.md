# Textures & Mapping

## Overview
Textures add detail and realism to 3D objects. They can be used for colors, surface details, lighting information, and more.

## Texture Loading

### Basic Texture Loading
```javascript
const texture = new THREE.TextureLoader().load('texture.jpg');
```

### TextureLoader Properties
- `crossOrigin` - CORS setting for cross-origin images
- `withCredentials` - Include credentials in requests

### Loading with Callbacks
```javascript
const texture = new THREE.TextureLoader().load(
  'texture.jpg',
  function(texture) {
    console.log('Texture loaded');
  },
  function(progress) {
    console.log('Loading progress:', progress);
  },
  function(error) {
    console.error('Error loading texture:', error);
  }
);
```

## Texture Types

### Diffuse/Albedo Map
Base color texture that defines the object's appearance.

```javascript
const catTexture = new THREE.TextureLoader().load("cat.jpg");
const material = new THREE.MeshBasicMaterial({ map: catTexture });
```

### Normal Map
Adds surface detail without adding geometry. Creates the illusion of bumps and indentations.

```javascript
const normalMap = new THREE.TextureLoader().load("grasslight-big-nm.jpg");
const material = new THREE.MeshStandardMaterial({
  map: diffuseTexture,
  normalMap: normalMap
});
```

### Bump Map
Similar to normal maps but uses grayscale values to create height information.

```javascript
const bumpMap = new THREE.TextureLoader().load("iron/metal-bump.jpg");
const material = new THREE.MeshPhongMaterial({
  map: diffuseTexture,
  bumpMap: bumpMap
});
```

### Specular Map
Controls where specular highlights appear on the surface.

```javascript
const specularMap = new THREE.TextureLoader().load("specular.jpg");
const material = new THREE.MeshPhongMaterial({
  map: diffuseTexture,
  specularMap: specularMap
});
```

### Metalness Map
Controls which parts of the surface are metallic (for PBR materials).

```javascript
const metalnessMap = new THREE.TextureLoader().load("metalness.jpg");
const material = new THREE.MeshStandardMaterial({
  map: diffuseTexture,
  metalnessMap: metalnessMap
});
```

### Roughness Map
Controls surface roughness for PBR materials.

```javascript
const roughnessMap = new THREE.TextureLoader().load("roughness.jpg");
const material = new THREE.MeshStandardMaterial({
  map: diffuseTexture,
  roughnessMap: roughnessMap
});
```

## Complete Material Example

### PBR Material with Multiple Maps
```javascript
// Load all texture maps
const metalTexture = new THREE.TextureLoader().load("iron/metal.jpg");
const normalMap = new THREE.TextureLoader().load("iron/metal-normal.jpg");
const bumpMap = new THREE.TextureLoader().load("iron/metal-bump.jpg");
const diffuseMap = new THREE.TextureLoader().load("iron/metal-diffuse.jpg");

// Create material with all maps
const sphereMaterial = new THREE.MeshPhongMaterial({
  color: 0x049ef4,
  map: diffuseMap,        // Base color
  normalMap: normalMap,   // Surface details
  bumpMap: bumpMap,       // Height displacement
  specular: 0xffffff,
  shininess: 100
});
```

## Background Textures

### Scene Background
```javascript
const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;
```

### Environment Maps
```javascript
const loader = new THREE.CubeTextureLoader();
const environmentMap = loader.load([
  'px.jpg', 'nx.jpg',  // Right, Left
  'py.jpg', 'ny.jpg',  // Top, Bottom  
  'pz.jpg', 'nz.jpg'   // Front, Back
]);
scene.environment = environmentMap;
```

## Texture Properties

### Wrapping
Controls how textures repeat beyond their original size.

```javascript
texture.wrapS = THREE.RepeatWrapping;  // Horizontal wrapping
texture.wrapT = THREE.RepeatWrapping;  // Vertical wrapping
texture.repeat.set(2, 2);             // Repeat 2x2 times
```

**Wrapping Options:**
- `THREE.RepeatWrapping` - Repeat texture
- `THREE.ClampToEdgeWrapping` - Clamp to edge
- `THREE.MirroredRepeatWrapping` - Mirror and repeat

### Filtering
Controls how textures are sampled when scaled.

```javascript
texture.magFilter = THREE.LinearFilter;  // Magnification filter
texture.minFilter = THREE.LinearMipmapLinearFilter;  // Minification filter
```

**Filter Options:**
- `THREE.NearestFilter` - Nearest neighbor (pixelated)
- `THREE.LinearFilter` - Linear interpolation (smooth)

### Mipmapping
```javascript
texture.generateMipmaps = true;  // Enable mipmaps (default: true)
texture.minFilter = THREE.LinearMipmapLinearFilter;
```

## UV Mapping

### Understanding UV Coordinates
- U coordinate: 0-1 from left to right
- V coordinate: 0-1 from bottom to top
- (0,0) = bottom-left corner
- (1,1) = top-right corner

### Custom UV Mapping
```javascript
const geometry = new THREE.PlaneGeometry(1, 1);
const uvAttribute = geometry.attributes.uv;

// Modify UV coordinates
for (let i = 0; i < uvAttribute.count; i++) {
  const u = uvAttribute.getX(i);
  const v = uvAttribute.getY(i);
  
  // Custom UV transformation
  uvAttribute.setXY(i, u * 2, v * 2);
}
```

## Texture Optimization

### Image Formats
- **JPEG**: Good for photos, smaller file size
- **PNG**: Good for textures with transparency
- **WebP**: Modern format, good compression
- **DDS**: Compressed format for better performance

### Texture Sizes
- Use power-of-2 dimensions (256, 512, 1024, 2048)
- Match texture size to object size
- Consider mipmap generation

### Loading Optimization
```javascript
// Use texture atlas for multiple small textures
const atlasTexture = new THREE.TextureLoader().load('atlas.jpg');

// Reuse textures across materials
const sharedTexture = new THREE.TextureLoader().load('shared.jpg');
const material1 = new THREE.MeshBasicMaterial({ map: sharedTexture });
const material2 = new THREE.MeshBasicMaterial({ map: sharedTexture });
```

## Common Texture Maps

### Diffuse Maps
- Base color information
- Should be sRGB color space
- No lighting information

### Normal Maps
- Surface detail information
- Blue channel points "up"
- Should be linear color space

### Roughness Maps
- White = rough, Black = smooth
- Controls light scattering
- Used with PBR materials

### Metalness Maps
- White = metallic, Black = non-metallic
- Controls reflectivity
- Used with PBR materials

## Best Practices

### 1. Texture Organization
```
textures/
  ├── diffuse/
  ├── normal/
  ├── roughness/
  └── metalness/
```

### 2. Consistent Naming
```
material_diffuse.jpg
material_normal.jpg
material_roughness.jpg
material_metalness.jpg
```

### 3. Appropriate Resolution
- Small objects: 256x256 or 512x512
- Medium objects: 512x512 or 1024x1024
- Large objects: 1024x1024 or 2048x2048

### 4. Memory Management
```javascript
// Dispose of unused textures
texture.dispose();

// Check texture memory usage
console.log(renderer.info.memory);
```

## Common Pitfalls
- Using non-power-of-2 texture sizes
- Not disposing of unused textures
- Incorrect color space for texture types
- Using too high resolution textures
- Not considering texture memory usage
- Incorrect UV mapping
- Not using appropriate texture formats

# Three.js Journey (Vanilla + Vite)

A minimal Three.js starter using Vanilla JavaScript and Vite. It renders a rotating cube and is set up for quick experimentation.

## Run locally

```bash
npm run dev
```

Then open the shown URL (default `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

- `index.html`: App entry
- `src/main.js`: Three.js scene setup
- `src/style.css`: Global styles (optional)
- `public/`: Static assets

## Next steps

- Try changing the cube color in `src/main.js`
- Add `OrbitControls`:
  ```js
  import { OrbitControls } from "three/addons/controls/OrbitControls.js";
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  ```
- Add more objects, lights, and materials

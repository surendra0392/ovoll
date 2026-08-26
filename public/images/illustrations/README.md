# 3D Illustrations Asset Guide

This directory contains 3D illustration assets used by the site's visual components. Currently, the components use CSS/SVG fallbacks. To upgrade to professional 3D illustrations, download the assets below.

## Required Assets

### Crystal Illustrations (for GlassCrystalScene)
- `crystal.png` — 3D glass crystal, transparent background
- `crystal-knot.png` — 3D glass torus knot, transparent background

**Recommended sources:**
- [Icons8 3D Glassy](https://icons8.com/illustrations/styles/3d-glassy) (subscription, 813 illustrations)
- [Vecteezy Crystal PNG](https://www.vecteezy.com/free-png/crystal) (free with attribution)
- [CleanPNG Crystal](https://www.cleanpng.com/free/crystal.html) (free)
- [PNGTree Crystal](https://pngtree.com/so/crystal-3d) (free with attribution)

**Recommended size:** 512×512px, transparent background

### Orbital Rings (for OrbitalRingsScene)
- `orbital-rings.png` — 3D orbital rings illustration, transparent background

**Recommended sources:**
- [IconScout Orbital Rings](https://iconscout.com/3d-icons/orbital-rings) (free with attribution)
- [Vecteezy Orbit Ring](https://www.vecteezy.com/free-vector/orbit-ring) (free with attribution)
- [PNGTree Orbital Rings](https://pngtree.com/so/orbital-rings) (free with attribution)

**Recommended size:** 512×512px, transparent background

### Product Variants (for ProductCanvas)
- `product-enterprise.png` — cubes, grid, structured systems
- `product-commerce.png` — shopping, marketplace, boxes
- `product-ondemand.png` — nodes, network, dispatch
- `product-care.png` — medical, cross, healthcare
- `product-community.png` — constellation, connected points
- `product-design.png` — layers, sheets, screens

**Recommended sources:**
- [Icons8 3D Business](https://icons8.com/illustrations/styles/3d-business) (subscription, 1468 illustrations)
- [Icons8 3D Enterprise](https://icons8.com/illustrations/styles/3d-enterprise) (subscription, 439 illustrations)
- [Vecteezy 3D Business](https://www.vecteezy.com/free-png/3d-business) (free with attribution)
- [IconScout 3D Illustrations](https://iconscout.com/3d-illustrations) (free with attribution)

**Recommended size:** 512×512px, transparent background

## How It Works

Each component (GlassCrystalScene, OrbitalRingsScene, ProductCanvas) tries to load the PNG image first. If the image is not found (404), it automatically falls back to a CSS/SVG approximation.

This means:
1. The site works immediately with no assets (CSS fallbacks)
2. Drop in the PNG files to upgrade to professional 3D illustrations
3. No code changes needed — just add the images

## File Naming

Use the exact filenames listed above. The components look for these specific paths:
- `/images/illustrations/crystal.png`
- `/images/illustrations/crystal-knot.png`
- `/images/illustrations/orbital-rings.png`
- `/images/illustrations/product-enterprise.png`
- `/images/illustrations/product-commerce.png`
- `/images/illustrations/product-ondemand.png`
- `/images/illustrations/product-care.png`
- `/images/illustrations/product-community.png`
- `/images/illustrations/product-design.png`

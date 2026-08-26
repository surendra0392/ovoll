# OVOLL SEO & Performance Architecture

This document outlines the technical implementations ensuring OVOLL achieves 100/100/100/100 Lighthouse scores while maintaining premium GSAP & WebGL animations.

## Technical SEO
- **Dynamic Meta Engine**: Powered by `Spatie\SchemaOrg` and injected into the `<SeoHead />` React component via Inertia `usePage().props.seo`.
- **Automated Sitemap**: `spatie/laravel-sitemap` crawls all dynamic routes daily. Run manually via `php artisan sitemap:generate`.
- **Live Filament SEO Preview**: Editors can visualize exactly how their meta titles and descriptions will appear in Google Search directly inside the Filament CMS.

## Performance Optimization
1. **Asset Splitting**: Heavy dependencies like GSAP, Three.js, and Framer Motion are automatically isolated into `manualChunks` in `vite.config.ts`.
2. **Media Engine**: Spatie Media Library automatically creates `.webp` and `.avif` conversions on upload.
3. **React Image Lazy Loading**: The global `<Image />` component leverages native lazy loading (`loading="lazy" decoding="async"`) and implements smooth CSS blur transitions using base64 BlurHash data.
4. **Typography**: Fonts (`@fontsource/geist-sans`) are injected directly via `app.css` to enable aggressive Vite CSS extraction and enforce `font-display: swap`.

## Accessibility (WCAG AA+)
- **Reduced Motion**: The `useReducedMotion` hook automatically disables intensive WebGL environments and GSAP timelines if the user prefers reduced motion in their OS.
- **Skip Links**: The structural `SkipLink` component enables keyboard navigation directly to the `#main` content block, bypassing heavy navigation shells.
- **Form Controls**: All custom UI inputs include strict ARIA roles, valid labels, and high-contrast focus rings.

## Database Protection
- **N+1 Prevention**: Laravel's `Model::preventLazyLoading(!app()->isProduction())` is strictly enforced in `AppServiceProvider`, ensuring all database queries are perfectly eager-loaded.

# OVOLL Frontend Architecture

## Overview

OVOLL's frontend is built on React 19 + TypeScript, served via Inertia.js from a Laravel 13 backend. Every page is server-routed but fully client-rendered.

## Directory Structure

```
resources/js/
├── animations/          # Reusable animation wrappers (Fade, Reveal, Scale, Parallax, Magnetic)
├── assets/              # Static assets (images, fonts, SVGs)
├── components/
│   ├── a11y/            # Accessibility primitives (SkipLink)
│   ├── error/           # Error states (ErrorBoundary, NotFound, NetworkError)
│   ├── loading/         # Loading states (Spinner, Skeleton, PageLoader)
│   ├── media/           # Media components (Image, Video)
│   ├── navigation/      # Navigation shell (Header, Footer, MobileMenu, MegaMenu)
│   ├── seo/             # SEO head management (SEO)
│   └── ui/              # Design system primitives (Button, Card, Input, Glass, Glow, etc.)
├── config/              # Central configuration (site.ts, routes.ts, theme.ts, motion.ts)
├── constants/           # Application constants
├── contexts/            # React contexts (reserved for future use)
├── hooks/               # Custom hooks (useIntersectionObserver, useReducedMotion, useFocusTrap)
├── icons/               # Custom icon components
├── layouts/             # Page layouts (Default, Landing, Dashboard, Minimal, Auth, Error)
├── lib/                 # Third-party library wrappers
├── pages/               # Inertia.js page components
├── providers/           # React providers (App, Theme, Animation, Toast, A11y, SEO)
├── sections/            # Reusable page sections
├── services/            # API service layer
├── store/               # Zustand global state (useThemeStore, useNavStore, useCursorStore)
├── styles/              # Global CSS & Tailwind utilities
├── three/               # Three.js / R3F infrastructure (Canvas, Scene, Lighting, Environment)
├── types/               # TypeScript type definitions
├── utils/               # Utility functions (cn, etc.)
└── app.tsx              # Application entry point
```

## Provider Architecture

The `AppProvider` wraps the entire Inertia app. Nesting order:

```
ErrorBoundary
  └─ SEOProvider (react-helmet-async)
       └─ ThemeProvider (Zustand-driven dark/light/system toggle)
            └─ AccessibilityProvider (reduced-motion detection, skip links)
                 └─ AnimationProvider (GSAP + Lenis smooth scroll)
                      └─ ToastProvider (Sonner notifications)
                           └─ {children}
```

## Layout System

Every page picks a layout. Layouts handle shell chrome (header, footer, sidebar).

| Layout            | Header | Footer | Sidebar | Use Case                |
| ----------------- | ------ | ------ | ------- | ----------------------- |
| `DefaultLayout`   | ✓      | ✓      |         | Standard content pages  |
| `LandingLayout`   | ✓      | ✓      |         | Hero pages (no top pad) |
| `DashboardLayout` |        |        | ✓       | Authenticated app views |
| `MinimalLayout`   |        |        |         | Centered minimal views  |
| `AuthLayout`      |        |        |         | Login, Register, Reset  |
| `ErrorLayout`     | ✓      | ✓      |         | 404, 500, maintenance   |

## State Management

Zustand stores are lightweight and purpose-scoped:

- `useThemeStore` — Persisted dark/light/system preference
- `useNavStore` — Mobile menu, mega menu, scroll state
- `useCursorStore` — Custom cursor variant and text

## Animation System

Animation wrappers respect `prefers-reduced-motion` and degrade gracefully:

- `<Fade>` — Directional opacity + translate
- `<Reveal>` — Clip-mask reveal with accent color slide
- `<Scale>` — Scale-up entrance
- `<Parallax>` — Scroll-linked vertical offset
- `<Magnetic>` — Mouse-following spring displacement

## Three.js Pipeline

R3F infrastructure for premium 3D elements:

- `<CanvasProvider>` — Configures canvas DPR, camera, and renderer
- `<SceneManager>` — Groups scene children, manages background
- `<LightingManager>` — Soft ambient + directional, shadow mapping
- `<EnvironmentManager>` — HDR environment presets via Drei

## SEO Pipeline

Every page uses the `<SEO>` component to inject:

- Title, meta description
- OpenGraph tags
- Twitter card tags
- Canonical URL

## Conventions

1. **Barrel exports** — Every directory has an `index.ts`. Import from the directory, never from the file.
2. **Design tokens only** — Never create inline colors, spacing, or shadows. Use the design system.
3. **Accessibility first** — All animation wrappers respect `prefers-reduced-motion`. All interactive elements are keyboard navigable.

# OVOLL Architecture

## Philosophy
The OVOLL architecture is designed for enterprise-grade scalability, performance, and maintainability. It follows a strict separation of concerns, heavily typing everything, avoiding magic strings/numbers, and ensuring high reusability of components and utilities.

## Frontend Directory Structure (`resources/js`)

- `/animations` - GSAP and Framer Motion wrappers, easing curves, and global transition definitions.
- `/assets` - Static images, videos, and fonts.
- `/components` - 
  - `/ui` - Primitive components (buttons, layout abstractions, inputs) decoupled from domain logic.
  - `/seo` - SEO management components.
- `/config` - Global configuration files (site, theme, navigation).
- `/constants` - Strongly typed enums/constants for routes, colors, breakpoints, etc.
- `/contexts` - React contexts (e.g., ThemeContext).
- `/hooks` - Custom React hooks.
- `/icons` - Reusable SVG icons as React components.
- `/layouts` - Page wrappers and application shells.
- `/lib` - Third-party service initializations and wrappers.
- `/pages` - Inertia.js route endpoints.
- `/providers` - Context providers (Theme, Animation) wrapping the application.
- `/sections` - Complex page sections composed of multiple UI components.
- `/services` - API interaction and business logic layers.
- `/store` - Global state management (Zustand/Redux).
- `/styles` - Global CSS files not handled by Tailwind `@theme`.
- `/three` - WebGL, React Three Fiber scenes, and 3D models.
- `/types` - Global TypeScript interfaces and types.
- `/utils` - Pure functions, data transformations, and helpers.

## Backend Directory Structure (`app/`)
- Following standard Laravel MVC + Filament structure.
- Navigation groups for the Admin Panel are pre-configured to support future SaaS modules (Dashboard, Website, Content, Portfolio, Marketing, Media, SEO, Forms, Analytics, Settings).

## Scalability
This architecture prepares OVOLL for multi-faceted scaling:
- **Multiple Languages**: Ready for `i18n` integration via global configs.
- **SaaS Modules**: The separation of `sections`, `services`, and `layouts` allows easy introduction of CRM, CMS, and AI tools without polluting the core codebase.

## Coding Standards
1. **No Placeholder Code**: Build for production.
2. **No Duplicated Logic**: Use `/utils` and `/hooks`.
3. **No Inline Magic Values**: Use `/constants` and `/config`.
4. **Strict Typing**: TypeScript `strict` mode is enabled and must be followed. 
5. **Formatting**: Enforced via ESLint and Prettier.

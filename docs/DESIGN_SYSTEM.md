# OVOLL Design System & Language

## Section 1: Design Philosophy

**Brand Personality**
OVOLL is premium, authoritative, precise, and visionary. It communicates trust through restraint.

**Visual Principles**
- **Clarity over Decoration**: Every element must serve a purpose.
- **Mathematical Precision**: Spacing, sizing, and typography follow strict scales. Nothing is arbitrary.
- **Restrained Elegance**: Use negative space as an active design element.

**Emotion & Experience**
Users should feel calm, focused, and empowered. The interface should feel frictionless and almost invisible, letting the content and functionality shine.

**Interaction Philosophy**
Interactions are instant or smoothly choreographed. There is no waiting without visual feedback. State changes are clear and deliberate.

**Motion Philosophy**
Motion must be meaningful. It guides the eye, establishes hierarchy, and provides spatial context. Never use motion purely for decoration. Use spring physics for natural, physical feeling.

**Glass Morphism Philosophy**
Glass is a premium material used sparingly to establish depth and hierarchy (e.g., sticky headers, context menus, elevated cards). It must have strict blur, opacity, and subtle noise. It is never used for primary content backgrounds.

**Minimalism & Whitespace Rules**
Whitespace is the primary tool for grouping and separating content. We do not use borders or background colors to separate content unless absolutely necessary. "Let it breathe."

**Typography Philosophy**
Typography is the voice of OVOLL. We use **Geist** for its absolute clarity and digital optimization. Hierarchy is established through size, weight, and color contrast—rarely through different typefaces.

**Color Philosophy**
Color is used purposefully. The palette is dominated by deep navies, absolute blacks, and clean whites, punctuated by high-contrast accents (Teal, Electric Cyan) to draw attention or indicate state.

---

## Section 2: Design Tokens

- **Spacing Scale (px)**: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120
- **Border Radius (px)**: 2, 4, 8, 12, 16, 24, 32, 999 (full)
- **Stroke Width**: Default 1px for borders, 1.5px or 2px for icons.
- **Shadow Levels**: sm, md, lg, xl, 2xl, inner, none.
- **Blur Levels**: sm, md, lg, xl, 2xl, 3xl.
- **Container Sizes**: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px).
- **Opacity Scale**: 0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100.
- **Elevation Scale (Z-index)**: Base (0), Nav (50), Dropdown (100), Modal (200), Toast (300).
- **Transition Timing**: Fast (150ms), Base (300ms), Slow (500ms).
- **Animation Curves**: Linear, Ease, Ease-in, Ease-out, Ease-in-out, Spring.

---

## Section 3: Color System

**Primary**: Deep Navy (`#0A1128` or similar)
**Secondary**: White (`#FFFFFF`)
**Accent 1**: Teal (`#008080`)
**Accent 2**: Electric Cyan (`#00FFFF`)

**Neutral Scale (50-950)**: Slate/Zinc based scale for UI elements.
**Semantics**: Success (Green), Warning (Amber), Danger (Red), Info (Blue).

**Theme specific tokens**:
Implemented via CSS Variables (`--bg-primary`, `--text-primary`, `--border-color`, etc.) to support seamless Light/Dark mode transitions.

---

## Section 4: Typography

**Typeface**: Geist Sans & Geist Mono.
**Hierarchy**:
- Display: Hero sections, massive impact.
- Heading (h1-h6): Section titles.
- Title: Card headers, important groupings.
- Body: Standard readable text.
- Caption: Small helper text.
- Label: Form labels, metadata.
- Button: Action text.
- Code: Monospaced technical data.

---

## Section 5: Grid System

Responsive 12-column grid.
- **Mobile**: 4 columns, 16px margins, 16px gutters.
- **Tablet**: 8 columns, 32px margins, 24px gutters.
- **Desktop**: 12 columns, max-width containers, 32px gutters.

---

## Section 6: Iconography

Using `lucide-react`.
- **Stroke**: Consistent 1.5px to 2px based on size.
- **Corners**: Rounded endpoints and joins.
- **Sizes**: 16px (inline), 20px (standard), 24px (action), 32px (display).

---

## Section 7: Button System

- **Variants**: Primary, Secondary, Ghost, Outline, Glass, Gradient, Icon.
- **States**: Hover (brightness/transform change), Pressed (scale down 0.98), Loading (spinner + disabled), Disabled (opacity 0.5 + not-allowed).

---

## Section 8: Input System

Clean, unboxed inputs with distinct focus rings (e.g., `ring-2 ring-primary`). Strict validation states with clear red/green borders and helper text.

---

## Section 9: Card System

Cards rely on shadow, border, or subtle background fills to separate from the page.
- **Glass**: Used over imagery or complex gradients.
- **Hover**: Subtle Y-axis translation and shadow expansion.

---

## Section 10: Glass Morphism

Rules:
- Opacity: Background 10% - 30% depending on theme.
- Blur: High (`backdrop-blur-xl`).
- Border: `1px solid rgba(255,255,255,0.1)`.
- Noise: Subtle SVG noise overlay to prevent banding.

---

## Section 11: Motion System

- **Hover**: 150ms ease-out.
- **Page Transition**: 300ms–600ms cubic-bezier for smooth reveal.
- **Parallax**: Gentle, distinct from scroll speed.
- **Accessibility**: Respect `prefers-reduced-motion`.

---

## Section 12: 3D System (Three.js/R3F)

- **Lighting**: Soft ambient + directional, never harsh specular.
- **Materials**: Matte or physical (PBR) with high roughness unless glass.
- **Goal**: Add depth and premium feel, NOT to distract or slow down the page.

---

## Section 13: Spacing System (Vertical Rhythm)

- **Section Padding**: `py-16 md:py-24 lg:py-32`.
- **Element Gap**: Strict adherence to Tailwind spacing classes.

---

## Section 14: Image System

- **Radii**: Match the container (usually `rounded-2xl` or `rounded-3xl`).
- **Loading**: Blur-up or fade-in required for all imagery.

---

## Section 15: Illustration System

Abstract, orbital, gradient meshes, particles, wireframes. Absolutely no generic stock vector illustrations.

---

## Section 16: Brand Elements

Reusable components like `GridPattern`, `OrbitalRing`, `Glow`, and `NoiseTexture` are available in the UI library to instantly elevate empty states or hero backgrounds.

---

## Section 17 & 18: Components & Accessibility

- **Composition**: Small, composable primitives over massive monoliths.
- **A11y**: Minimum AA contrast ratio, full keyboard navigation, visible focus states, ARIA roles on interactive custom elements.

---

## Section 19: Developer Notes

This design system is strictly enforced via TypeScript, ESLint, and Tailwind Configuration. Do not invent new colors, spacing, or shadows inline. If it's not in the design system, do not use it without a design review.

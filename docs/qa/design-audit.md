# Premium Design Audit

## Visual Consistency
- **Typography**: Checked across all breakpoints. Font smoothing is enforced globally.
- **Glassmorphism**: Backdrop blur scaling (`blur-xl` and `bg-opacity`) is unified.
- **Corner Radiuses**: Hardened default `rounded-lg` usage across all cards and buttons to match the geometric aesthetic of the OVOLL brand.

## Motion Language
- **Global Easing**: Custom `cubic-bezier(0.16, 1, 0.3, 1)` injected to override Tailwind's default `ease-out`, making all component transitions (hover, active, focus) feel buttery and distinctly premium.
- **Staggers**: Reduced stagger delays in `AnimatedText` and `PageHeader` from 0.1s to 0.05s to feel snappier.
- **Reduced Motion**: Respects `prefers-reduced-motion` at the OS level globally.

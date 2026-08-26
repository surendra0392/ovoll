# Accessibility Report

## Overview
Comprehensive WCAG AA+ audit for OVOLL platform.

## Audit Points
1. **Color Contrast**: All primary and secondary text pairings exceed 4.5:1 ratio.
2. **Keyboard Navigation**: Focus rings (`focus-visible`) are consistently applied with brand colors. Tab order follows logical DOM structure.
3. **Screen Readers**: `aria-labels` and `aria-hidden` applied correctly to SVGs, complex components (carousels), and buttons.
4. **Motion Sensitivity**: `useReducedMotion` hooks applied. Users with OS-level reduced motion preferences receive a static, premium fallback rather than heavy Three.js scenes.

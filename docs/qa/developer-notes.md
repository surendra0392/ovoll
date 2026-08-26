# Developer Notes: Post-Polish Architecture

## Three.js & Framer Motion
- Framer Motion's `LayoutGroup` is used for list transitions (e.g. FAQs).
- We rely heavily on `@react-three/drei`'s `PerformanceMonitor` to automatically scale `dpr` (device pixel ratio) down when frame drops are detected on mobile devices.

## Filament & Backend
- Ensure that the `$table->reorderable('sort_order')` is tested when lots of records are present, as livewire can block the UI if the dataset exceeds 500 items. 
- Media is converted strictly to WebP natively via Spatie Media Library before ever reaching the client payload.

## State Management
- Local form autosaves (e.g., `SmartContactForm`) are serialized to `localStorage` and purged aggressively upon successful POST `route('contact.store')` to avoid leaking PII on shared devices.

import { createInertiaApp } from '@inertiajs/react';
import type { ResolvedComponent } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import React, { Suspense } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { PageLoader } from '@/components/motion/PageLoader';
import { LandingLayout } from '@/layouts';
import { AppProvider } from '@/providers/AppProvider';
import '../css/app.css';

const appName = import.meta.env.VITE_APP_NAME || 'OVOLL';

type PageModule = { default: ResolvedComponent };

// Minimal loading fallback shown during page chunk transitions
function PageFallback() {
    return (
        <div className="bg-surface-base fixed inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="h-6 w-6 animate-pulse rounded-full border border-[#2EC4A5]" />
                <span className="font-mono text-[10px] tracking-widest text-white/20 uppercase">
                    Loading
                </span>
            </div>
        </div>
    );
}

// Automatically recover when Vite chunks are rebuilt during active browsing
if (typeof window !== 'undefined') {
    window.addEventListener('vite:preloadError', () => {
        window.location.reload();
    });
}

createInertiaApp({
    title: (title) => {
        if (!title) return appName;
        return title.toLowerCase().includes(appName.toLowerCase()) ? title : `${title} — ${appName}`;
    },
    resolve: async (name) => {
        // Each page is resolved via import.meta.glob which produces
        // separate per-page chunks automatically. Heavy page-internal
        // sub-components (Three.js, etc.) are additionally lazy-loaded
        // via React.lazy at the page level for optimal code splitting.
        const page = await resolvePageComponent<PageModule>(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx') as Record<string, () => Promise<PageModule>>,
        );
        const pageLayout = page.default.layout;
        const UserLayout =
            typeof pageLayout === 'function'
                ? (pageLayout as (page: React.ReactNode) => React.ReactNode)
                : (page: React.ReactNode) => <LandingLayout>{page}</LandingLayout>;

        // The preloader is mounted once here, around whatever layout the page
        // uses, so every page — regardless of its layout — shows it. It stays
        // mounted across Inertia navigations (same tree position), and renders
        // into <body> via a portal, so it never affects page layout.
        page.default.layout = (page: React.ReactNode) => (
            <>
                <PageLoader />
                {UserLayout(page)}
            </>
        );

        // Inertia resolves `module.default || module`, so returning the wired
        // component directly matches the resolver's type exactly.
        return page.default;
    },
    setup({ el, App, props }) {
        const appElement = (
            <AppProvider>
                {/* Site-wide film grain — breaks up flat dark surfaces. Purely
                    decorative, pointer-events-none, aria-hidden. */}
                <div className="bg-grain" aria-hidden="true" />
                {/* Suspense boundary catches lazy-loaded page sub-components
                    (e.g. Three.js Canvas imports) and shows a minimal fallback
                    while large vendor chunks are fetched over the network */}
                <Suspense fallback={<PageFallback />}>
                    <App {...props} />
                </Suspense>
            </AppProvider>
        );

        if (import.meta.env.SSR) {
            return appElement;
        }

        // React 19's hydrateRoot throws #418 when the container is empty (no
        // server-rendered content), so only hydrate when the server actually
        // rendered into the root. Without SSR the #app div is empty — mount
        // instead. This also keeps the dev server's SSR path exercising real
        // hydration so future server/client mismatches surface in dev.
        const canHydrate = el.hasChildNodes();

        if (canHydrate) {
            hydrateRoot(el, appElement);
        } else {
            createRoot(el).render(appElement);
        }

        // Client path mounts in place — nothing to hand back to Inertia.
        return;
    },
    progress: {
        // Inertia's built-in NProgress-like indicator for Instant Visits
        color: '#008080',
    },
});

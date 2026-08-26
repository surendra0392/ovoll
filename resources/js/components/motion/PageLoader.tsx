import { router, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Logo } from '@/components/ui/Logo';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { MOTION_EASE } from '@/utils';

// Keep the loader visible long enough to be perceptible even on instant
// (cached) navigations, and never let it stay up forever.
const INITIAL_VISIBLE_MS = 900;
const MIN_NAV_VISIBLE_MS = 900;
const MIN_CANCEL_VISIBLE_MS = 350;
const MAX_VISIBLE_MS = 5000;
const EXIT_MS = 500;

function PreloaderGlow() {
    return (
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(46,196,165,0.08)_0%,_transparent_70%)]" />
    );
}

function PreloaderTrack({ children }: { children: ReactNode }) {
    return (
        <div className="absolute bottom-16 left-1/2 z-10 h-px w-40 -translate-x-1/2 overflow-hidden rounded-full bg-white/10">
            {children}
        </div>
    );
}

function BrandMark({
    logoUrl,
    siteName,
    animated = false,
}: {
    logoUrl?: string;
    siteName: string;
    animated?: boolean;
}) {
    if (logoUrl) {
        return (
            <img
                src={logoUrl}
                alt={siteName}
                className="max-h-16 w-auto max-w-[260px] object-contain"
            />
        );
    }

    if (animated) {
        return <Logo variant="wordmark" className="scale-110" />;
    }

    // Static lockup, mirrors <Logo variant="wordmark"> without its animations
    // (used when the user prefers reduced motion).
    return (
        <>
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-[#00D1FF]/30" />
                <div className="absolute h-6 w-6 rounded-full border border-dashed border-[#14B8A6]" />
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-[#14B8A6] to-[#00D1FF]" />
            </div>
            <span className="font-sans text-xl font-bold tracking-widest text-white md:text-2xl">
                {siteName}
            </span>
        </>
    );
}

/**
 * Site-wide preloader, mounted once at the app root (see app.tsx) so it renders
 * on every page regardless of layout. Shown on the first paint and on every
 * Inertia navigation, with a guaranteed minimum display time and a fail-safe
 * timeout so it can never get stuck covering the page.
 */
export function PageLoader() {
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    // Bumped on every show so re-keying the overlay restarts its exit
    // animation when a visit begins mid-exit.
    const [showId, setShowId] = useState(0);
    const { props } = usePage();
    const prefersReducedMotion = useReducedMotion();

    const settings = props.settings ?? {};
    const siteSettings = settings.site ?? {};
    const logoUrl = siteSettings.header_logo_url;
    const siteName = siteSettings.site_name || 'OVOLL';

    const visibleSinceRef = useRef<number>(0);
    const unmountTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const watchdogRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearTimer = useCallback((ref: { current: ReturnType<typeof setTimeout> | null }) => {
        if (ref.current !== null) {
            clearTimeout(ref.current);
            ref.current = null;
        }
    }, []);

    // The visual exit is a CSS animation (`.preloader-life`) that runs on the
    // compositor thread, so the overlay becomes invisible and non-interactive
    // on schedule even if the main thread is saturated (heavy WebGL init, slow
    // devices). The timers below only enforce the minimum display time and
    // remove the overlay from the DOM once the exit is done — if the thread is
    // busy they may run late, but the overlay is already gone by then.
    const hide = useCallback(
        (minVisibleMs: number) => {
            clearTimer(watchdogRef);
            const delay = Math.max(0, minVisibleMs - (Date.now() - visibleSinceRef.current));
            clearTimer(unmountTimerRef);
            unmountTimerRef.current = setTimeout(
                () => {
                    setIsVisible(false);
                    unmountTimerRef.current = null;
                },
                delay + EXIT_MS + 50,
            );
        },
        [clearTimer],
    );

    const show = useCallback(() => {
        visibleSinceRef.current = Date.now();
        clearTimer(unmountTimerRef);
        clearTimer(watchdogRef);
        setIsVisible(true);
        setShowId((n) => n + 1);
        // Fail-safe: if a visit fires `start` but never resolves with
        // `finish`/`cancel`, force the exit instead of staying up forever.
        watchdogRef.current = setTimeout(() => {
            hide(0);
            watchdogRef.current = null;
        }, MAX_VISIBLE_MS);
    }, [clearTimer, hide]);

    // Partial reloads (Load More buttons) have their own spinners.
    interface VisitEvent {
        detail?: { visit?: { only?: string[] } };
    }
    const isPartialReload = useCallback((event: VisitEvent): boolean => {
        const visit = event.detail?.visit;

        return Array.isArray(visit?.only) && visit.only.length > 0;
    }, []);

    useEffect(() => {
        // Render the portal only after hydration commits. Hydrating portal
        // content directly into <body> would mismatch against the server HTML.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
    }, []);

    useEffect(() => {
        // The static first-paint splash in the blade is replaced by this loader.
        document.getElementById('splash')?.remove();
    }, []);

    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isVisible]);

    useEffect(() => {
        visibleSinceRef.current = Date.now();
        hide(INITIAL_VISIBLE_MS);

        const unbindStart = router.on('start', (event) => {
            if (isPartialReload(event)) {
                return;
            }

            show();
        });
        const unbindFinish = router.on('finish', (event) => {
            if (isPartialReload(event)) {
                return;
            }

            hide(MIN_NAV_VISIBLE_MS);
        });
        const unbindCancel = router.on('cancel', (event) => {
            if (isPartialReload(event)) {
                return;
            }

            hide(MIN_CANCEL_VISIBLE_MS);
        });
        const unbindError = router.on('error', () => {
            hide(MIN_CANCEL_VISIBLE_MS);
        });

        return () => {
            clearTimer(unmountTimerRef);
            clearTimer(watchdogRef);
            unbindStart();
            unbindFinish();
            unbindCancel();
            unbindError();
        };
    }, [clearTimer, hide, isPartialReload, show]);

    if (!isMounted) {
        return null;
    }

    // The shell's `preloader-life` animation (see app.css) holds it visible for
    // ~900ms, slides it off-screen over the next ~500ms, and ends invisible +
    // non-interactive — on the compositor, so it can't get stuck.
    const shellClass =
        'fixed inset-0 z-[99999] flex select-none flex-col items-center justify-center bg-surface-base preloader-life';

    const loaderContent = (
        <div key={showId} role="status" aria-live="polite" className={shellClass}>
            <PreloaderGlow />
            {prefersReducedMotion ? (
                <div className="relative z-10 flex flex-col items-center gap-3">
                    <BrandMark logoUrl={logoUrl} siteName={siteName} />
                    <span className="sr-only">Loading</span>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.55, ease: MOTION_EASE.out }}
                    className="relative z-10 flex flex-col items-center gap-3"
                >
                    <BrandMark logoUrl={logoUrl} siteName={siteName} animated />
                    <span className="sr-only">Loading</span>
                </motion.div>
            )}
            <PreloaderTrack>
                {prefersReducedMotion ? (
                    <div className="h-full w-1/3 bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF]" />
                ) : (
                    <motion.div
                        className="h-full w-1/3 bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF]"
                        initial={{ x: '-120%' }}
                        animate={{ x: '320%' }}
                        transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity }}
                    />
                )}
            </PreloaderTrack>
        </div>
    );

    return isVisible ? createPortal(loaderContent, document.body) : null;
}

import { motion, AnimatePresence } from 'framer-motion';
import * as React from 'react';
import { useState, useEffect, lazy, Suspense } from 'react';
import { MOTION_EASE, MOTION_DURATION } from '@/utils';
import { Footer } from '../components/navigation/Footer';
import { Header } from '../components/navigation/Header';
import { MobileMenu } from '../components/navigation/MobileMenu';
import { SeoHead } from '../components/seo';

const BackgroundCanvas = lazy(() =>
    import('../components/three/BackgroundCanvas').then((m) => ({ default: m.BackgroundCanvas })),
);

export function LandingLayout({ children }: { children: React.ReactNode }) {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-surface-base relative flex min-h-screen flex-col overflow-x-hidden text-white selection:bg-[#00D1FF]/30 selection:text-white">
            {/* Site-wide SEO defaults (canonical, OG, Twitter, JSON-LD) from the
                shared `seo` prop. Rendered first so any page that sets its own
                <SeoHead title> later in the tree overrides the default title. */}
            <SeoHead />

            {/* Lazy-loaded Background Canvas */}
            <Suspense fallback={null}>
                <BackgroundCanvas />
            </Suspense>

            {/* Header animates in on mount. It sits at z-50, well below the
                site-wide preloader's opaque z-[99999] overlay (mounted globally
                in app.tsx), so it can mount immediately and is simply revealed
                as the preloader slides away. */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: MOTION_DURATION.normal, ease: MOTION_EASE.out, delay: 0.1 }}
                className="relative z-50 w-full"
            >
                <Header />
                <MobileMenu />
            </motion.div>
            <main id="main" className="relative z-10 w-full flex-1">
                {children}
            </main>
            <Footer />

            {/* Floating Back to Top Button */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="bg-surface-base/80 fixed right-8 bottom-8 z-[999] flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[#2EC4A5]/20 text-[#00D1FF] shadow-[0_0_20px_rgba(46,196,165,0.3)] backdrop-blur-md transition-all duration-300 will-change-transform hover:scale-110 hover:border-[#00D1FF]/50 hover:text-white hover:shadow-[0_0_30px_rgba(0,209,255,0.5)]"
                        aria-label="Back to top"
                    >
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 10l7-7m0 0l7 7m-7-7v18"
                            />
                        </svg>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}

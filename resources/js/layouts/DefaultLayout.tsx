import { motion } from 'framer-motion';
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { SkipLink } from '@/components/a11y/SkipLink';
import { SEO } from '@/components/seo';
import { MOTION_DURATION, MOTION_EASE } from '@/utils';
import { Footer } from '../components/navigation/Footer';
import { Header } from '../components/navigation/Header';
import { MobileMenu } from '../components/navigation/MobileMenu';

const BackgroundCanvas = lazy(() =>
    import('../components/three/BackgroundCanvas').then((m) => ({ default: m.BackgroundCanvas })),
);

export function DefaultLayout({ children }: { children: React.ReactNode }) {
    const [showHeader, setShowHeader] = useState(false);

    useEffect(() => {
        // Brief header entrance animation delay
        const timer = setTimeout(() => {
            setShowHeader(true);
        }, 400);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-surface-raised relative flex min-h-screen flex-col text-white selection:bg-[#00D1FF]/30 selection:text-white">
            <SkipLink />
            <SEO />
            {/* Lazy-loaded Background Canvas - only loaded when needed */}
            <Suspense fallback={null}>
                <BackgroundCanvas />
            </Suspense>

            {/* Navigation Header animated delayed entrance */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={showHeader ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: MOTION_DURATION.normal, ease: MOTION_EASE.out }}
                className="relative z-50 w-full"
            >
                <Header />
                <MobileMenu />
            </motion.div>

            <main id="main" className="relative z-10 flex-1 pt-24">
                {children}
            </main>
            <Footer />
        </div>
    );
}

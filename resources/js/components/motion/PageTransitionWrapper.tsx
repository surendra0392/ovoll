import { usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMotionStore } from '@/store/useMotionStore';
import { MOTION_EASE, MOTION_DURATION } from '@/utils';

interface PageTransitionWrapperProps {
    children: React.ReactNode;
}

export function PageTransitionWrapper({ children }: PageTransitionWrapperProps) {
    const { component, url } = usePage();
    const prefersReducedMotion = useReducedMotion();
    const { setIsNavigating } = useMotionStore();

    // Reset scroll on navigation
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [url]);

    if (prefersReducedMotion) {
        return <>{children}</>;
    }

    const variants = {
        initial: {
            opacity: 0,
            y: 15,
            scale: 0.99,
            filter: 'blur(4px)',
        },
        enter: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            transition: {
                duration: MOTION_DURATION.normal,
                ease: MOTION_EASE.out,
                when: 'beforeChildren',
            },
        },
        exit: {
            opacity: 0,
            y: -10,
            scale: 0.99,
            filter: 'blur(4px)',
            transition: {
                duration: MOTION_DURATION.fast,
                ease: MOTION_EASE.out,
            },
        },
    };

    return (
        <AnimatePresence mode="wait" onExitComplete={() => setIsNavigating(false)}>
            <motion.div
                key={component} // The component name triggers the transition
                initial="initial"
                animate="enter"
                exit="exit"
                variants={variants}
                onAnimationStart={() => setIsNavigating(true)}
                className="min-h-screen will-change-transform"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

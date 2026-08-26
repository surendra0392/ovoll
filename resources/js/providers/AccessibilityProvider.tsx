import { useEffect } from 'react';
import { Announcer } from '../components/a11y/Announcer';
import { SkipLink } from '../components/a11y/SkipLink';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        const root = document.documentElement;

        if (prefersReducedMotion) {
            root.classList.add('reduced-motion');
            root.style.setProperty('--animation-duration-multiplier', '0');
        } else {
            root.classList.remove('reduced-motion');
            root.style.setProperty('--animation-duration-multiplier', '1');
        }
    }, [prefersReducedMotion]);

    return (
        <>
            <SkipLink />
            {/* Screen-reader live regions for dynamic content announcements */}
            <Announcer />
            {children}
        </>
    );
}

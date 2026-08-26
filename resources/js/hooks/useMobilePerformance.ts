import { useState, useEffect } from 'react';

/**
 * Hook to detect whether heavy visual effects (VFX) should be disabled.
 * Returns true if screen is small (mobile/tablet), touch-primary, or low-spec.
 */
export function useMobilePerformance(): boolean {
    const [disableVfx, setDisableVfx] = useState(false);

    useEffect(() => {
        const checkPerformanceLimit = (): void => {
            // Check screen width (disable on mobile & tablet)
            const isSmallScreen = window.innerWidth < 1024;

            // Check primary input mechanism (touch vs pointer)
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

            // Check if device reports low hardware concurrency
            const isLowSpec =
                navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4;

            setDisableVfx(isSmallScreen || (isTouchDevice && isLowSpec));
        };

        checkPerformanceLimit();
        window.addEventListener('resize', checkPerformanceLimit);

        return () => window.removeEventListener('resize', checkPerformanceLimit);
    }, []);

    return disableVfx;
}

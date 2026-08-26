import { useRef, useState, useEffect, type ReactNode } from 'react';

interface DeferredMountProps {
    children: ReactNode;
    fallback?: ReactNode;
    rootMargin?: string;
}

/**
 * Defers mounting children until they are near the viewport.
 * Uses IntersectionObserver so off-screen 3D canvases don't mount or render.
 */
export function DeferredMount({
    children,
    fallback = null,
    rootMargin = '200px',
}: DeferredMountProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [shouldMount, setShouldMount] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el || shouldMount) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry?.isIntersecting) {
                    setShouldMount(true);
                    observer.disconnect();
                }
            },
            { rootMargin },
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, [shouldMount, rootMargin]);

    return <div ref={ref}>{shouldMount ? children : fallback}</div>;
}

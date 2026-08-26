import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface UseParallaxOptions {
    speed?: number; // 1 = normal scroll, < 1 = slower (background), > 1 = faster (foreground)
    direction?: 'y' | 'x';
}

export function useParallax(options: UseParallaxOptions = {}) {
    const ref = useRef<HTMLDivElement | null>(null);
    const prefersReducedMotion = useReducedMotion();

    const { speed = 0.5, direction = 'y' } = options;

    useEffect(() => {
        if (!ref.current || prefersReducedMotion) {
            return;
        }

        const element = ref.current;
        const movement = (1 - speed) * 100; // Calculate pixel/percentage movement based on speed difference

        const ctx = gsap.context(() => {
            gsap.to(element, {
                [direction]: `${movement}%`,
                ease: 'none',
                scrollTrigger: {
                    trigger: element,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }, element);

        return () => ctx.revert();
    }, [speed, direction, prefersReducedMotion]);

    return ref;
}

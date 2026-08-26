import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface UseMagneticOptions {
    pull?: number; // How far it pulls (pixels)
    triggerArea?: number; // Hit area multiplier
}

export function useMagnetic(options: UseMagneticOptions = {}) {
    const ref = useRef<HTMLDivElement | null>(null);
    const prefersReducedMotion = useReducedMotion();

    const { pull = 20, triggerArea = 2 } = options;

    useEffect(() => {
        if (!ref.current || prefersReducedMotion) {
            return;
        }

        const element = ref.current;
        const parent = element.parentElement;

        if (!parent) {
            return;
        }

        // Make parent relative if it isn't, and ensure it acts as the trigger area
        parent.style.position = 'relative';
        parent.style.display = 'inline-block';

        const ctx = gsap.context(() => {
            const handleMouseMove = (e: MouseEvent) => {
                const rect = parent.getBoundingClientRect();
                const h = rect.width;
                const w = rect.height;

                // Calculate center
                const cx = rect.left + w / 2;
                const cy = rect.top + h / 2;

                // Calculate distance from center
                const dx = e.clientX - cx;
                const dy = e.clientY - cy;

                gsap.to(element, {
                    x: dx * (pull / 100),
                    y: dy * (pull / 100),
                    duration: 0.4,
                    ease: 'power3.out',
                });
            };

            const handleMouseLeave = () => {
                gsap.to(element, {
                    x: 0,
                    y: 0,
                    duration: 0.7,
                    ease: 'elastic.out(1, 0.3)',
                });
            };

            parent.addEventListener('mousemove', handleMouseMove);
            parent.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                parent.removeEventListener('mousemove', handleMouseMove);
                parent.removeEventListener('mouseleave', handleMouseLeave);
            };
        }, element);

        return () => ctx.revert();
    }, [pull, triggerArea, prefersReducedMotion]);

    return ref;
}

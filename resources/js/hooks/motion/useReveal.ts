import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface UseRevealOptions {
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    distance?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
    ease?: string;
    threshold?: number;
    markers?: boolean;
}

export function useReveal(options: UseRevealOptions = {}) {
    const ref = useRef<HTMLDivElement | null>(null);
    const prefersReducedMotion = useReducedMotion();

    const {
        direction = 'up',
        distance = 50,
        duration = 0.8,
        delay = 0,
        stagger = 0,
        ease = 'power3.out',
        threshold = 0.2,
        markers = false,
    } = options;

    useEffect(() => {
        if (!ref.current) {
            return;
        }

        const element = ref.current;
        const children = element.children.length > 0 && stagger > 0 ? element.children : element;

        if (prefersReducedMotion) {
            gsap.set(children, { opacity: 1, x: 0, y: 0 });

            return;
        }

        let x = 0;
        let y = 0;

        switch (direction) {
            case 'up':
                y = distance;
                break;
            case 'down':
                y = -distance;
                break;
            case 'left':
                x = distance;
                break;
            case 'right':
                x = -distance;
                break;
            case 'none':
                break;
        }

        gsap.set(children, { opacity: 0, x, y });

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: element,
                start: `top ${100 - threshold * 100}%`,
                markers,
                onEnter: () => {
                    gsap.to(children, {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        duration,
                        delay,
                        stagger,
                        ease,
                        clearProps: 'all',
                    });
                },
                once: true,
            });
        }, element);

        return () => ctx.revert();
    }, [
        direction,
        distance,
        duration,
        delay,
        stagger,
        ease,
        threshold,
        markers,
        prefersReducedMotion,
    ]);

    return ref;
}

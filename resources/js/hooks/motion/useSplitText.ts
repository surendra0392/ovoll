import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface UseSplitTextOptions {
    type?: 'chars' | 'words' | 'lines';
    stagger?: number;
    delay?: number;
    duration?: number;
    ease?: string;
    yOffset?: number;
    scrollTrigger?: boolean;
}

export function useSplitText(options: UseSplitTextOptions = {}) {
    const ref = useRef<HTMLDivElement | null>(null);
    const prefersReducedMotion = useReducedMotion();

    const {
        type = 'words',
        stagger = 0.05,
        delay = 0,
        duration = 0.8,
        ease = 'power3.out',
        yOffset = 40,
        scrollTrigger = true,
    } = options;

    useEffect(() => {
        if (!ref.current || prefersReducedMotion) {
            return;
        }

        const element = ref.current;
        let textNodes: HTMLElement[] = [];

        // Very basic custom split text implementation to avoid GSAP club plugin requirements.
        // For production OVOLL, this splits by space for words.
        const originalText = element.innerText;
        element.innerHTML = '';

        if (type === 'words') {
            const words = originalText.split(' ');
            words.forEach((word: string, i: number) => {
                const span = document.createElement('span');
                span.style.display = 'inline-block';
                span.style.overflow = 'hidden';
                span.style.verticalAlign = 'bottom';

                const innerSpan = document.createElement('span');
                innerSpan.style.display = 'inline-block';
                innerSpan.style.willChange = 'transform';
                innerSpan.innerText = word + (i < words.length - 1 ? '\u00A0' : ''); // Add non-breaking space

                span.appendChild(innerSpan);
                element.appendChild(span);
                textNodes.push(innerSpan);
            });
        } else {
            // Fallback for lines/chars - just animate the whole thing for this MVP
            element.innerText = originalText;
            textNodes = [element];
        }

        gsap.set(textNodes, { y: yOffset, opacity: 0 });

        const ctx = gsap.context(() => {
            const animation = {
                y: 0,
                opacity: 1,
                duration,
                delay,
                stagger,
                ease,
            };

            if (scrollTrigger) {
                ScrollTrigger.create({
                    trigger: element,
                    start: 'top 85%',
                    onEnter: () => gsap.to(textNodes, animation),
                    once: true,
                });
            } else {
                gsap.to(textNodes, animation);
            }
        }, element);

        return () => {
            ctx.revert();
            // Restore original text
            element.innerHTML = originalText;
        };
    }, [type, stagger, delay, duration, ease, yOffset, scrollTrigger, prefersReducedMotion]);

    return ref;
}

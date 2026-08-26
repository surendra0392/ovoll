import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useEffect, useRef } from 'react';
import { CustomCursor } from '@/components/motion/CustomCursor';
import { useMotionStore } from '@/store/useMotionStore';

gsap.registerPlugin(ScrollTrigger);

export function AnimationProvider({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis>(null);

    useEffect(() => {
        // Initialize smooth scrolling
        lenisRef.current = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        function raf(time: number) {
            lenisRef.current?.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Sync GSAP with Lenis. The scroll callback receives the Lenis
        // instance; `animatedScroll` is the live eased value.
        lenisRef.current.on('scroll', (lenis) => {
            ScrollTrigger.update();
            const { setScrollY, setScrollVelocity, setIsScrolling } = useMotionStore.getState();
            setScrollY(lenis.animatedScroll);
            setScrollVelocity(lenis.velocity);
            setIsScrolling(!!lenis.isScrolling);
        });

        gsap.ticker.add((time) => {
            lenisRef.current?.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        return () => {
            lenisRef.current?.destroy();
            gsap.ticker.remove((time) => lenisRef.current?.raf(time * 1000));
        };
    }, []);

    return (
        <>
            {children}
            <CustomCursor />
        </>
    );
}

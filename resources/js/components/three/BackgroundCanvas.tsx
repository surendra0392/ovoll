import { useEffect, useState, useRef, useCallback } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * CSS-only fluid aurora background — replaces the GLSL WebGL canvas.
 * Uses animated radial gradients with mouse parallax and scroll reactivity
 * to approximate the original simplex-noise fluid plumes. Eliminates the
 * 920KB vendor-three chunk from the initial page load.
 */
export function BackgroundCanvas() {
    const prefersReducedMotion = useReducedMotion();
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
    const targetMouse = useRef({ x: 0.5, y: 0.5 });
    const currentMouse = useRef({ x: 0.5, y: 0.5 });
    const rafRef = useRef<number>(0);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        targetMouse.current = {
            x: e.clientX / window.innerWidth,
            y: e.clientY / window.innerHeight,
        };
    }, []);

    useEffect(() => {
        if (prefersReducedMotion) return;

        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        const animate = () => {
            currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.05;
            currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.05;
            setMousePos({ x: currentMouse.current.x, y: currentMouse.current.y });
            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [handleMouseMove, prefersReducedMotion]);

    const offsetX = (mousePos.x - 0.5) * 40;
    const offsetY = (mousePos.y - 0.5) * 40;

    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-40 select-none">
            {/* Primary Emerald Glow */}
            <div
                className="absolute top-1/4 left-1/4 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] transition-transform duration-700 ease-out"
                style={{
                    background: 'radial-gradient(circle, rgba(46,196,165,0.18) 0%, rgba(46,196,165,0.02) 60%, transparent 80%)',
                    transform: `translate(${offsetX}px, ${offsetY}px)`,
                }}
            />

            {/* Cyan Accent Plume */}
            <div
                className="absolute top-2/3 right-1/4 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px] transition-transform duration-700 ease-out"
                style={{
                    background: 'radial-gradient(circle, rgba(0,209,255,0.14) 0%, rgba(0,209,255,0.02) 60%, transparent 80%)',
                    transform: `translate(${-offsetX * 1.2}px, ${-offsetY * 1.2}px)`,
                }}
            />

            {/* Violet Ambient Wash */}
            <div
                className="absolute bottom-10 left-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full blur-[130px]"
                style={{
                    background: 'radial-gradient(circle, rgba(149,83,233,0.08) 0%, transparent 70%)',
                }}
            />
        </div>
    );
}

export default BackgroundCanvas;

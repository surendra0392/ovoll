import { useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface OrbitalRingsSceneProps {
    count?: number;
    color?: string;
    speed?: number;
    intensity?: number;
    className?: string;
    opacity?: number;
}

/**
 * Orbital rings scene — renders a 3D orbital ring illustration with CSS rotation.
 *
 * ASSET INSTRUCTIONS:
 * Download a 3D orbital rings PNG with transparent background from:
 * - IconScout: https://iconscout.com/3d-icons/orbital-rings (free with attribution)
 * - Vecteezy: https://www.vecteezy.com/free-vector/orbit-ring (free with attribution)
 * - PNGTree: https://pngtree.com/so/orbital-rings (free with attribution)
 * - CleanPNG: https://www.cleanpng.com/free/orbit-ring.html (free)
 *
 * Save as: public/images/illustrations/orbital-rings.png
 * Recommended size: 512×512px, transparent background
 */
export function OrbitalRingsScene({
    speed = 1,
    className = '',
    opacity = 1,
}: OrbitalRingsSceneProps) {
    const prefersReducedMotion = useReducedMotion();
    const [imgError, setImgError] = useState(false);

    const duration = `${20 / speed}s`;

    // Fallback SVG if image not found
    if (imgError) {
        return (
            <div className={`relative ${className}`} style={{ opacity }}>
                <FallbackRings speed={speed} />
            </div>
        );
    }

    return (
        <div className={`relative ${className}`} style={{ opacity }}>
            <div
                className="flex h-full w-full items-center justify-center"
                style={{
                    animation: prefersReducedMotion ? 'none' : `spin ${duration} linear infinite`,
                }}
            >
                <img
                    src="/images/illustrations/orbital-rings.png"
                    alt="Orbital rings"
                    className="max-h-[90%] max-w-[90%] object-contain"
                    style={{
                        filter: 'drop-shadow(0 0 20px rgba(46,196,165,0.3))',
                    }}
                    onError={() => setImgError(true)}
                    loading="lazy"
                />
            </div>
        </div>
    );
}

/**
 * Fallback SVG rings when PNG asset is not available
 */
function FallbackRings({ speed }: { speed: number }) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <svg viewBox="0 0 100 100" className="h-full w-full" style={{ overflow: 'visible' }}>
            <defs>
                <radialGradient id="ringCenterGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#2EC4A5" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#2EC4A5" stopOpacity="0" />
                </radialGradient>
                <filter id="ringGlowFilter">
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <circle cx="50" cy="50" r="18" fill="url(#ringCenterGlow)" />

            <g filter="url(#ringGlowFilter)">
                {[
                    { rx: 32, ry: 10, dur: 18, dir: 'normal', c: '#2EC4A5' },
                    { rx: 42, ry: 14, dur: 22, dir: 'reverse', c: '#00D1FF' },
                    { rx: 52, ry: 18, dur: 26, dir: 'normal', c: '#2EC4A5' },
                ].map((ring, i) => (
                    <ellipse
                        key={i}
                        cx="50"
                        cy="50"
                        rx={ring.rx}
                        ry={ring.ry}
                        fill="none"
                        stroke={ring.c}
                        strokeWidth={1 - i * 0.2}
                        strokeDasharray={`${4 + i * 2} ${8 + i * 3}`}
                        opacity={0.5 - i * 0.1}
                        style={{
                            transformOrigin: '50px 50px',
                            animation: prefersReducedMotion
                                ? 'none'
                                : `orbitalSpin ${ring.dur / speed}s linear infinite ${ring.dir}`,
                        }}
                    />
                ))}
            </g>
        </svg>
    );
}

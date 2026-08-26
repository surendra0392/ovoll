import { useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type GlassShape = 'crystal' | 'knot';

interface GlassCrystalSceneProps {
    shape?: GlassShape;
    speed?: number;
    className?: string;
    opacity?: number;
}

export function GlassCrystalScene({
    shape = 'crystal',
    speed = 1,
    className = '',
    opacity = 1,
}: GlassCrystalSceneProps) {
    const prefersReducedMotion = useReducedMotion();
    const [imgError, setImgError] = useState(false);
    const duration = `${6 / speed}s`;
    const imgSrc =
        shape === 'knot'
            ? '/images/illustrations/crystal-knot.png'
            : '/images/illustrations/crystal.png';

    if (!imgError) {
        return (
            <div className={className} style={{ opacity }}>
                <div
                    className="relative flex h-full w-full items-center justify-center"
                    style={{
                        animation: prefersReducedMotion
                            ? 'none'
                            : `float ${duration} ease-in-out infinite`,
                    }}
                >
                    <img
                        src={imgSrc}
                        alt={shape === 'knot' ? 'Glass torus knot' : 'Glass crystal'}
                        className="max-h-[90%] max-w-[90%] object-contain"
                        style={{
                            filter: `drop-shadow(0 0 30px ${shape === 'knot' ? '#2EC4A5' : '#00D1FF'}50)`,
                        }}
                        onError={() => setImgError(true)}
                        loading="lazy"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className={className} style={{ opacity }}>
            {shape === 'knot' ? (
                <PremiumKnot speed={speed} reduced={prefersReducedMotion} />
            ) : (
                <PremiumCrystal speed={speed} reduced={prefersReducedMotion} />
            )}
        </div>
    );
}

function PremiumCrystal({ speed, reduced }: { speed: number; reduced: boolean }) {
    const dur = `${6 / speed}s`;
    return (
        <div
            className="relative flex h-full w-full items-center justify-center"
            style={{ animation: reduced ? 'none' : `float ${dur} ease-in-out infinite` }}
        >
            {/* Background glow */}
            <div className="absolute h-[70%] w-[70%] rounded-full bg-[radial-gradient(circle,rgba(0,209,255,0.12),transparent_70%)] blur-xl" />

            <svg viewBox="0 0 200 220" className="relative h-[85%] w-[85%]">
                <defs>
                    <linearGradient id="cBody" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00D1FF" stopOpacity="0.08" />
                        <stop offset="20%" stopColor="#00D1FF" stopOpacity="0.25" />
                        <stop offset="45%" stopColor="#2EC4A5" stopOpacity="0.45" />
                        <stop offset="55%" stopColor="#00D1FF" stopOpacity="0.55" />
                        <stop offset="80%" stopColor="#2EC4A5" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#00D1FF" stopOpacity="0.08" />
                    </linearGradient>
                    <linearGradient id="cTopFace" x1="30%" y1="0%" x2="70%" y2="100%">
                        <stop offset="0%" stopColor="white" stopOpacity="0.5" />
                        <stop offset="40%" stopColor="#00D1FF" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#2EC4A5" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="cLeftFace" x1="0%" y1="20%" x2="100%" y2="80%">
                        <stop offset="0%" stopColor="white" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#2EC4A5" stopOpacity="0.05" />
                    </linearGradient>
                    <linearGradient id="cRightFace" x1="100%" y1="20%" x2="0%" y2="80%">
                        <stop offset="0%" stopColor="#00D1FF" stopOpacity="0.35" />
                        <stop offset="60%" stopColor="#2EC4A5" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#00D1FF" stopOpacity="0.08" />
                    </linearGradient>
                    <linearGradient id="cBottomFace" x1="50%" y1="0%" x2="50%" y2="100%">
                        <stop offset="0%" stopColor="#2EC4A5" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#00D1FF" stopOpacity="0.05" />
                    </linearGradient>
                    <radialGradient id="cHighlight" cx="35%" cy="30%" r="35%">
                        <stop offset="0%" stopColor="white" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </radialGradient>
                    <filter id="cShadow">
                        <feDropShadow
                            dx="0"
                            dy="8"
                            stdDeviation="12"
                            floodColor="#00D1FF"
                            floodOpacity="0.25"
                        />
                    </filter>
                    <filter id="cGlow">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Ground shadow */}
                <ellipse cx="100" cy="200" rx="50" ry="8" fill="#00D1FF" opacity="0.1" />

                {/* Main crystal body */}
                <g filter="url(#cShadow)">
                    {/* Back face (visible through transparency) */}
                    <polygon points="100,25 65,80 50,170" fill="#2EC4A5" fillOpacity="0.08" />

                    {/* Left face */}
                    <polygon
                        points="35,80 100,25 55,175"
                        fill="url(#cLeftFace)"
                        stroke="#2EC4A5"
                        strokeWidth="0.4"
                        strokeOpacity="0.3"
                    />

                    {/* Right face */}
                    <polygon
                        points="165,80 100,25 145,175"
                        fill="url(#cRightFace)"
                        stroke="#00D1FF"
                        strokeWidth="0.4"
                        strokeOpacity="0.3"
                    />

                    {/* Front face — main diamond */}
                    <polygon
                        points="100,25 165,80 145,175 55,175 35,80"
                        fill="url(#cBody)"
                        stroke="#00D1FF"
                        strokeWidth="0.6"
                        strokeOpacity="0.35"
                    />

                    {/* Top facet */}
                    <polygon
                        points="100,25 130,60 100,75 70,60"
                        fill="url(#cTopFace)"
                        stroke="white"
                        strokeWidth="0.3"
                        strokeOpacity="0.4"
                    />

                    {/* Left mid facet */}
                    <polygon
                        points="35,80 70,60 55,175"
                        fill="url(#cLeftFace)"
                        stroke="#2EC4A5"
                        strokeWidth="0.3"
                        strokeOpacity="0.15"
                    />

                    {/* Right mid facet */}
                    <polygon
                        points="165,80 130,60 145,175"
                        fill="url(#cRightFace)"
                        stroke="#00D1FF"
                        strokeWidth="0.3"
                        strokeOpacity="0.15"
                    />

                    {/* Bottom V facet */}
                    <polygon
                        points="55,175 100,120 145,175"
                        fill="url(#cBottomFace)"
                        stroke="#2EC4A5"
                        strokeWidth="0.3"
                        strokeOpacity="0.1"
                    />

                    {/* Edge highlights */}
                    <line
                        x1="100"
                        y1="25"
                        x2="100"
                        y2="75"
                        stroke="white"
                        strokeWidth="0.8"
                        strokeOpacity="0.5"
                    />
                    <line
                        x1="100"
                        y1="25"
                        x2="35"
                        y2="80"
                        stroke="white"
                        strokeWidth="0.4"
                        strokeOpacity="0.25"
                    />
                    <line
                        x1="100"
                        y1="25"
                        x2="165"
                        y2="80"
                        stroke="white"
                        strokeWidth="0.4"
                        strokeOpacity="0.2"
                    />
                    <line
                        x1="35"
                        y1="80"
                        x2="55"
                        y2="175"
                        stroke="#2EC4A5"
                        strokeWidth="0.3"
                        strokeOpacity="0.2"
                    />
                    <line
                        x1="165"
                        y1="80"
                        x2="145"
                        y2="175"
                        stroke="#00D1FF"
                        strokeWidth="0.3"
                        strokeOpacity="0.2"
                    />
                </g>

                {/* Highlight overlay */}
                <ellipse
                    cx="80"
                    cy="55"
                    rx="22"
                    ry="14"
                    fill="url(#cHighlight)"
                    transform="rotate(-15 80 55)"
                />

                {/* Specular dot */}
                <circle cx="72" cy="48" r="4" fill="white" opacity="0.5" filter="url(#cGlow)" />
                <circle cx="72" cy="48" r="1.5" fill="white" opacity="0.9" />

                {/* Secondary specular */}
                <ellipse
                    cx="140"
                    cy="90"
                    rx="5"
                    ry="10"
                    fill="white"
                    opacity="0.12"
                    transform="rotate(12 140 90)"
                />

                {/* Internal refraction lines */}
                <line
                    x1="85"
                    y1="65"
                    x2="65"
                    y2="140"
                    stroke="#00D1FF"
                    strokeWidth="0.4"
                    strokeOpacity="0.15"
                />
                <line
                    x1="115"
                    y1="65"
                    x2="135"
                    y2="140"
                    stroke="#2EC4A5"
                    strokeWidth="0.4"
                    strokeOpacity="0.12"
                />
            </svg>
        </div>
    );
}

function PremiumKnot({ speed, reduced }: { speed: number; reduced: boolean }) {
    const dur = `${8 / speed}s`;
    return (
        <div
            className="relative flex h-full w-full items-center justify-center"
            style={{ animation: reduced ? 'none' : `float ${dur} ease-in-out infinite` }}
        >
            <div className="absolute h-[70%] w-[70%] rounded-full bg-[radial-gradient(circle,rgba(46,196,165,0.12),transparent_70%)] blur-xl" />

            <svg viewBox="0 0 200 200" className="relative h-[85%] w-[85%]">
                <defs>
                    <linearGradient id="kGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2EC4A5" stopOpacity="0.7" />
                        <stop offset="50%" stopColor="#00D1FF" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#2EC4A5" stopOpacity="0.5" />
                    </linearGradient>
                    <linearGradient id="kGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#00D1FF" stopOpacity="0.6" />
                        <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#2EC4A5" stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id="kGrad3" x1="50%" y1="0%" x2="50%" y2="100%">
                        <stop offset="0%" stopColor="white" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="#2EC4A5" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#00D1FF" stopOpacity="0.4" />
                    </linearGradient>
                    <filter id="kGlow">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="kShadow">
                        <feDropShadow
                            dx="0"
                            dy="6"
                            stdDeviation="10"
                            floodColor="#2EC4A5"
                            floodOpacity="0.2"
                        />
                    </filter>
                </defs>

                {/* Ground shadow */}
                <ellipse cx="100" cy="185" rx="45" ry="6" fill="#2EC4A5" opacity="0.08" />

                <g filter="url(#kShadow)">
                    {/* Back ring */}
                    <ellipse
                        cx="100"
                        cy="100"
                        rx="72"
                        ry="22"
                        fill="none"
                        stroke="url(#kGrad1)"
                        strokeWidth="10"
                        strokeLinecap="round"
                        opacity="0.25"
                        strokeDasharray="25 20"
                        style={{
                            transformOrigin: '100px 100px',
                            animation: reduced ? 'none' : `spin ${18 / speed}s linear infinite`,
                        }}
                    />

                    {/* Middle ring */}
                    <ellipse
                        cx="100"
                        cy="100"
                        rx="56"
                        ry="32"
                        fill="none"
                        stroke="url(#kGrad2)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        opacity="0.45"
                        strokeDasharray="18 14"
                        style={{
                            transformOrigin: '100px 100px',
                            animation: reduced
                                ? 'none'
                                : `spin ${14 / speed}s linear infinite reverse`,
                        }}
                    />

                    {/* Front ring — main visible ring */}
                    <ellipse
                        cx="100"
                        cy="100"
                        rx="42"
                        ry="18"
                        fill="none"
                        stroke="url(#kGrad3)"
                        strokeWidth="7"
                        strokeLinecap="round"
                        opacity="0.7"
                        filter="url(#kGlow)"
                        style={{
                            transformOrigin: '100px 100px',
                            animation: reduced ? 'none' : `spin ${10 / speed}s linear infinite`,
                        }}
                    />
                </g>

                {/* Core sphere */}
                <circle cx="100" cy="100" r="14" fill="#2EC4A5" opacity="0.4" />
                <circle cx="100" cy="100" r="8" fill="white" opacity="0.25" />
                <circle cx="96" cy="96" r="3" fill="white" opacity="0.6" />

                {/* Ring highlight streaks */}
                <ellipse
                    cx="75"
                    cy="85"
                    rx="12"
                    ry="2"
                    fill="white"
                    opacity="0.15"
                    transform="rotate(-25 75 85)"
                />
                <ellipse
                    cx="125"
                    cy="115"
                    rx="10"
                    ry="1.5"
                    fill="white"
                    opacity="0.1"
                    transform="rotate(30 125 115)"
                />
            </svg>
        </div>
    );
}

import { usePage } from '@inertiajs/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * CSS-only logo orb — replaces the WebGL LogoParticleScene.
 * Displays the circular favicon mark in the center with animated
 * concentric gradient rings and a subtle float animation.
 */
export function CssLogoOrb({ className = '' }: { className?: string }) {
    const prefersReducedMotion = useReducedMotion();
    const { props } = usePage<{ settings?: { site?: { favicon_url?: string } } }>();
    const faviconSrc = props?.settings?.site?.favicon_url || '/favicon.png';

    return (
        <div className={`relative flex h-full w-full items-center justify-center ${className}`}>
            {/* Outer glow ring — 85% of container */}
            <div
                className="absolute top-1/2 left-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
                style={{
                    background: 'conic-gradient(from 0deg, #2EC4A5, #00D1FF, #8B5CF6, #2EC4A5)',
                    filter: 'blur(40px)',
                    animation: prefersReducedMotion ? 'none' : 'spin 20s linear infinite',
                }}
            />

            {/* Middle ring — 70% of container */}
            <div
                className="absolute top-1/2 left-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2EC4A5]/20"
                style={{
                    animation: prefersReducedMotion ? 'none' : 'spin 30s linear infinite reverse',
                }}
            >
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(0,209,255,0.08),transparent_70%)]" />
            </div>

            {/* Inner ring — 50% of container */}
            <div
                className="absolute top-1/2 left-1/2 h-[50%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#00D1FF]/15"
                style={{
                    animation: prefersReducedMotion ? 'none' : 'spin 25s linear infinite',
                }}
            />

            {/* Central favicon mark with float — 42% of container */}
            <div
                className="relative z-10 flex h-[42%] w-[42%] items-center justify-center rounded-full border border-[#2EC4A5]/30 bg-[#0A1420]/80 shadow-[0_0_60px_rgba(0,209,255,0.3)] backdrop-blur-xl"
                style={{
                    animation: prefersReducedMotion ? 'none' : 'float 6s ease-in-out infinite',
                }}
            >
                <img
                    src={faviconSrc}
                    alt="OVOLL"
                    className="h-[60%] w-[60%] object-contain drop-shadow-[0_0_20px_rgba(46,196,165,0.5)]"
                    loading="eager"
                    onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/favicon.png';
                    }}
                />
            </div>

            {/* Floating particle dots */}
            {!prefersReducedMotion && (
                <>
                    <div
                        className="absolute h-1.5 w-1.5 rounded-full bg-[#2EC4A5]"
                        style={{
                            top: '15%',
                            left: '20%',
                            animation: 'particleFloat 8s ease-in-out infinite',
                            animationDelay: '0s',
                        }}
                    />
                    <div
                        className="absolute h-1 w-1 rounded-full bg-[#00D1FF]"
                        style={{
                            top: '25%',
                            right: '15%',
                            animation: 'particleFloat 7s ease-in-out infinite',
                            animationDelay: '1s',
                        }}
                    />
                    <div
                        className="absolute h-1.5 w-1.5 rounded-full bg-[#8B5CF6]"
                        style={{
                            bottom: '20%',
                            left: '25%',
                            animation: 'particleFloat 9s ease-in-out infinite',
                            animationDelay: '2s',
                        }}
                    />
                    <div
                        className="absolute h-1 w-1 rounded-full bg-[#2EC4A5]"
                        style={{
                            bottom: '30%',
                            right: '20%',
                            animation: 'particleFloat 6s ease-in-out infinite',
                            animationDelay: '0.5s',
                        }}
                    />
                    <div
                        className="absolute h-0.5 w-0.5 rounded-full bg-[#00D1FF]"
                        style={{
                            top: '40%',
                            left: '10%',
                            animation: 'particleFloat 10s ease-in-out infinite',
                            animationDelay: '3s',
                        }}
                    />
                    <div
                        className="absolute h-0.5 w-0.5 rounded-full bg-[#2EC4A5]"
                        style={{
                            top: '60%',
                            right: '10%',
                            animation: 'particleFloat 8s ease-in-out infinite',
                            animationDelay: '1.5s',
                        }}
                    />
                </>
            )}
        </div>
    );
}

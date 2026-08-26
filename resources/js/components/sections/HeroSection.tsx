import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui';
import { GlassCrystalScene } from '@/components/vfx/GlassCrystal';
import { useReducedMotion, useMobilePerformance } from '@/hooks';
import { cn } from '@/utils';
import type { SectionData } from './types';

interface HeroSectionProps {
    section: SectionData;
}

export function HeroSection({ section }: HeroSectionProps) {
    const { variant, title, subtitle, badge, ctas = [], media = [] } = section;
    const firstMedia = media[0];

    const isCentered = variant === 'centered' || variant === 'minimal';
    const isSplit = variant === 'split' || variant === 'editorial';
    const isGlass = variant === 'glass';
    const is3D = variant === '3d' || variant === 'orbital';

    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();
    const disableVfx = useMobilePerformance();

    const words = title.split(' ');
    const lastWordCount = words.length > 3 ? 2 : 1;
    const firstPart = words.slice(0, -lastWordCount).join(' ');
    const lastPart = words.slice(-lastWordCount).join(' ');

    useEffect(() => {
        if (!containerRef.current || prefersReducedMotion) {
            return;
        }

        const ctx = gsap.context(() => {
            if (badge) {
                gsap.from('.hero-badge', { opacity: 0, y: 10, duration: 0.8, ease: 'power3.out' });
            }

            gsap.from('.hero-title', {
                opacity: 0,
                y: 15,
                duration: 0.8,
                delay: 0.05,
                ease: 'power3.out',
            });

            if (subtitle) {
                gsap.from('.hero-subtitle', {
                    opacity: 0,
                    y: 15,
                    duration: 0.8,
                    delay: 0.2,
                    ease: 'power3.out',
                });
            }

            if (ctas.length > 0) {
                gsap.from('.hero-ctas', {
                    opacity: 0,
                    y: 15,
                    duration: 0.8,
                    delay: 0.35,
                    ease: 'power3.out',
                });
            }

            if (isSplit || is3D) {
                gsap.from('.hero-media', {
                    opacity: 0,
                    scale: 0.95,
                    duration: 0.8,
                    delay: 0.2,
                    ease: 'power3.out',
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, [prefersReducedMotion, badge, subtitle, ctas.length, isSplit, is3D]);

    return (
        <div
            ref={containerRef}
            className="relative z-10 mx-auto flex min-h-[500px] w-full max-w-6xl flex-col justify-center px-6"
        >
            {isGlass && (
                <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl border border-white/10 bg-white/[0.01] backdrop-blur-xl" />
            )}

            <div
                className={cn(
                    'grid w-full grid-cols-1 items-center gap-12',
                    isSplit || is3D ? 'md:grid-cols-2' : 'grid-cols-1',
                )}
            >
                {/* Text Column */}
                <div
                    className={cn(
                        'flex flex-col space-y-6',
                        isCentered
                            ? 'mx-auto max-w-3xl items-center text-center'
                            : 'items-start text-left',
                    )}
                >
                    {badge && (
                        <div className="hero-badge rounded bg-white/10 px-3 py-1 font-mono text-xs tracking-widest text-white/70 uppercase">
                            {badge}
                        </div>
                    )}

                    <div className="space-y-4">
                        <h1 className="hero-title text-5xl leading-[1.1] font-bold tracking-tighter text-white md:text-7xl">
                            {firstPart}{' '}
                            <span className="text-gradient bg-gradient-to-r from-[#14B8A6] to-[#00D1FF]">
                                {lastPart}
                            </span>
                        </h1>
                        {subtitle && (
                            <p className="hero-subtitle text-lg leading-relaxed font-medium text-white/70 opacity-70 md:text-xl">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {/* CTAs */}
                    {ctas.length > 0 && (
                        <div className="hero-ctas flex flex-col items-center gap-4 pt-4 sm:flex-row">
                            {ctas.map((cta, idx) => (
                                <Button
                                    key={idx}
                                    href={cta.url}
                                    variant={cta.variant ?? (idx === 0 ? 'primary' : 'outline')}
                                    className="rounded-full px-8 py-3 font-semibold"
                                >
                                    {cta.label}
                                </Button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Media Column (Split, 3D, Editorial, Orbital) */}
                {(isSplit || is3D) && (
                    <div className="hero-media relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] md:aspect-square">
                        {is3D ? (
                            <div className="absolute inset-0">
                                {!prefersReducedMotion && !disableVfx ? (
                                    <GlassCrystalScene speed={0.3} className="h-full w-full" />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_center,_rgba(0,209,255,0.15)_0%,_transparent_65%)]">
                                        <div className="bg-surface-raised h-40 w-40 rounded-full border border-[#14B8A6]/20 shadow-[0_0_50px_rgba(20,184,166,0.2)]" />
                                    </div>
                                )}
                            </div>
                        ) : firstMedia?.type === 'image' ? (
                            <img
                                src={firstMedia.url}
                                alt={firstMedia.alt ?? title}
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover"
                            />
                        ) : firstMedia?.type === 'video' ? (
                            <video
                                src={firstMedia.url}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="font-mono text-sm text-white/20">Media Placeholder</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CssLogoOrb } from '@/components/homepage/CssLogoOrb';

interface HeroSectionProps {
    content?: {
        headline?: string;
        subtitle?: string;
        primary_cta?: string;
        primary_url?: string;
        secondary_cta?: string;
        secondary_url?: string;
        badge?: string;
        trust_text?: string;
    };
    settings?: {
        particle_count?: number;
    };
}

export function HeroSection({ content }: HeroSectionProps) {
    const [mousePos, setMousePos] = useState({ x: 700, y: 350 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const subtitle =
        content?.subtitle ||
        'A vanguard branding and platform engineering studio building scalable visual identities, sub-30ms web architectures, and predictable compounding growth engines.';
    const primaryCta = content?.primary_cta || 'Initiate Project Scoping';
    const primaryUrl = content?.primary_url || '/contact';
    const secondaryCta = content?.secondary_cta || 'Explore Our Work';
    const secondaryUrl = content?.secondary_url || '/services';

    return (
        <section
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="relative flex min-h-[92vh] w-full items-center justify-center overflow-hidden bg-[#050A12] px-6 py-24 text-white select-none md:px-12"
        >
            {/* Glowing Top & Bottom Dividers */}
            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#2EC4A5]/30 to-transparent" />

            {/* 1. INTERACTIVE CURSOR SPOTLIGHT (Illuminates hero viewport) */}
            <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-700 ease-out select-none"
                style={{
                    opacity: isHovering ? 1 : 0.65,
                    background: `radial-gradient(900px circle at ${mousePos.x}px ${mousePos.y}px, rgba(46, 196, 165, 0.16), rgba(0, 209, 255, 0.07) 40%, transparent 80%)`,
                }}
            />

            {/* 2. HIGH-DEFINITION ARCHITECTURAL PERSPECTIVE GRID */}
            <div
                className="pointer-events-none absolute inset-0 opacity-35 select-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(46, 196, 165, 0.12) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(46, 196, 165, 0.12) 1px, transparent 1px)
                    `,
                    backgroundSize: '54px 54px',
                    maskImage: 'radial-gradient(ellipse 90% 75% at 50% 45%, #000 35%, transparent 90%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 90% 75% at 50% 45%, #000 35%, transparent 90%)',
                }}
            />

            {/* 3. CELESTIAL ASTROLABE & ORBITAL BLUEPRINT SVG */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-30 select-none">
                <svg
                    viewBox="0 0 1200 1200"
                    className="h-[1400px] w-[1400px] max-w-none text-[#2EC4A5]"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Concentric Astrolabe Coordinate Circles */}
                    <circle cx="600" cy="600" r="540" stroke="currentColor" strokeWidth="1" strokeDasharray="6 12" opacity="0.2" />
                    <circle cx="600" cy="600" r="420" stroke="#00D1FF" strokeWidth="1" strokeDasharray="3 6" opacity="0.3" />
                    <circle cx="600" cy="600" r="280" stroke="currentColor" strokeWidth="1" opacity="0.25" />
                    <circle cx="600" cy="600" r="140" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />

                    {/* Cardinal Coordinate Crosshairs */}
                    <line x1="600" y1="20" x2="600" y2="1180" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" opacity="0.2" />
                    <line x1="20" y1="600" x2="1180" y2="600" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" opacity="0.2" />

                    {/* Angled Astrolabe Scanner Vectors */}
                    <line x1="180" y1="180" x2="1020" y2="1020" stroke="#00D1FF" strokeWidth="0.8" strokeDasharray="8 8" opacity="0.2" />
                    <line x1="1020" y1="180" x2="180" y2="1020" stroke="#00D1FF" strokeWidth="0.8" strokeDasharray="8 8" opacity="0.2" />

                    {/* Orbiting Satellite Nodes */}
                    <circle cx="600" cy="180" r="5" fill="#2EC4A5" />
                    <circle cx="1020" cy="600" r="6" fill="#00D1FF" />
                    <circle cx="600" cy="1020" r="5" fill="#8B5CF6" />
                    <circle cx="180" cy="600" r="6" fill="#2EC4A5" />
                </svg>
            </div>

            {/* 4. MASSIVE STENCIL WATERMARK TYPOGRAPHY */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap opacity-[0.025] select-none">
                <span className="font-sans text-[200px] font-black tracking-widest text-white uppercase sm:text-[260px] lg:text-[340px]">
                    OVOLL STUDIO
                </span>
            </div>

            {/* 5. ATMOSPHERIC MULTI-LAYER NEBULA GLOWS */}
            <div className="pointer-events-none absolute inset-0 select-none">
                {/* Top-Left Vibrant Emerald Core */}
                <div className="absolute -top-28 left-[15%] h-[850px] w-[850px] rounded-full bg-[radial-gradient(circle,rgba(46,196,165,0.18)_0%,rgba(46,196,165,0.03)_50%,transparent_70%)] blur-[140px]" />
                
                {/* Right-Side Cyan Supernova */}
                <div className="absolute top-[20%] -right-28 h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(0,209,255,0.15)_0%,rgba(0,209,255,0.02)_50%,transparent_70%)] blur-[140px]" />
                
                {/* Bottom-Center Deep Violet Foundation */}
                <div className="absolute -bottom-28 left-[30%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.08)_0%,transparent_70%)] blur-[150px]" />
            </div>


            <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 pt-12 lg:grid-cols-12 lg:gap-8">
                {/* Left Column: Headlines & CTAs */}
                <div className="flex flex-col justify-center space-y-8 lg:col-span-7">
                    {/* Live Status Badge Ticker */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex w-fit items-center gap-3 rounded-full border border-[#2EC4A5]/30 bg-[#0B1522]/90 px-4 py-2 font-mono text-xs tracking-widest text-[#2EC4A5] shadow-[0_0_20px_rgba(46,196,165,0.15)] backdrop-blur-xl"
                    >
                        <span className="h-2 w-2 animate-ping rounded-full bg-[#2EC4A5]" />
                        <span className="font-bold tracking-wider text-white uppercase">
                            {content?.badge || 'STRATEGIC BRANDING & PLATFORM ENGINEERING'}
                        </span>
                        <span className="text-white/40">|</span>
                        <span className="text-[#00D1FF]">ENGINEERED FOR COMPOUNDING SCALE</span>
                    </motion.div>

                    {/* Massive Typography */}
                    <div className="space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="font-sans text-4xl leading-[1.05] font-black tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
                        >
                            WE CRAFT{' '}
                            <span className="bg-gradient-to-r from-white via-[#00D1FF] to-[#2EC4A5] bg-clip-text text-transparent drop-shadow-[0_10px_30px_rgba(0,209,255,0.3)]">
                                DIGITAL STANDARDS
                            </span>{' '}
                            THAT DOMINATE MARKETS.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="max-w-2xl font-sans text-base leading-relaxed font-normal text-slate-300 md:text-lg"
                        >
                            {subtitle}
                        </motion.p>
                    </div>

                    {/* Action Buttons & Magnetic Scoping */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col items-stretch gap-4 pt-2 sm:flex-row sm:items-center"
                    >
                        <a
                            href={primaryUrl}
                            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF] px-9 py-4 text-sm font-bold tracking-wide text-[#060B14] shadow-[0_0_35px_rgba(46,196,165,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(0,209,255,0.55)]"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {primaryCta}
                                <span className="transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>
                            </span>
                        </a>

                        <a
                            href={secondaryUrl}
                            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-[#2EC4A5]/60 hover:bg-[#2EC4A5]/10 hover:text-white"
                        >
                            {secondaryCta}
                        </a>
                    </motion.div>

                    {/* Live Agency Performance Metrics Strip */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6"
                    >
                        <div className="flex flex-col">
                            <span className="font-mono text-2xl font-black text-[#2EC4A5]">
                                99.98%
                            </span>
                            <span className="font-sans text-xs font-medium text-slate-400">
                                Uptime Guarantee
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-mono text-2xl font-black text-[#00D1FF]">
                                Sub-30ms
                            </span>
                            <span className="font-sans text-xs font-medium text-slate-400">
                                Edge Latency
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-mono text-2xl font-black text-[#14B8A6]">
                                4.8×
                            </span>
                            <span className="font-sans text-xs font-medium text-slate-400">
                                Average ROI Lift
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: 3D GPU Particle Canvas & Floating Glass Cards */}
                <div className="relative flex min-h-[480px] items-center justify-center lg:col-span-5 lg:min-h-[580px]">
                    {/* Concentric Glass Halo Rings */}
                    <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
                        <div className="h-[360px] w-[360px] rounded-full border border-white/10 bg-[#0A121E]/40 shadow-[0_30px_70px_rgba(0,0,0,0.7)] backdrop-blur-md" />
                        <div className="absolute h-[440px] w-[440px] animate-[spin_45s_linear_infinite] rounded-full border border-dashed border-[#2EC4A5]/25" />
                        <div className="absolute h-[520px] w-[520px] animate-[spin_65s_linear_infinite_reverse] rounded-full border border-dashed border-[#00D1FF]/15" />
                    </div>

                    {/* Logo Orb (CSS-only, no Three.js) */}
                    <div className="relative z-10 h-[380px] w-[380px] sm:h-[480px] sm:w-[480px]">
                        <CssLogoOrb className="h-full w-full" />
                    </div>

                    {/* Floating Glassmorphic Badge Overlays */}
                    <div className="animate-bounce-slow absolute top-[10%] left-[0%] z-20 flex items-center gap-2.5 rounded-2xl border border-[#2EC4A5]/40 bg-[#0B1522]/95 p-3.5 shadow-2xl backdrop-blur-xl will-change-transform">
                        <span className="h-3 w-3 animate-pulse rounded-full bg-[#2EC4A5]" />
                        <div>
                            <div className="font-mono text-xs font-black text-white">
                                SUB-30MS ENGINE
                            </div>
                            <div className="font-mono text-[10px] text-[#2EC4A5]">
                                Laravel + React
                            </div>
                        </div>
                    </div>

                    <div className="absolute right-[0%] bottom-[12%] z-20 flex items-center gap-2.5 rounded-2xl border border-[#00D1FF]/40 bg-[#0B1522]/95 p-3.5 shadow-2xl backdrop-blur-xl">
                        <span className="h-3 w-3 animate-ping rounded-full bg-[#00D1FF]" />
                        <div>
                            <div className="font-mono text-xs font-black text-white">
                                GPU-ACCELERATED UI
                            </div>
                            <div className="font-mono text-[10px] text-[#00D1FF]">
                                60 FPS CSS & Canvas
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

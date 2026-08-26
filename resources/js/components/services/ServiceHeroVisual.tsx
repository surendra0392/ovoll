import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Technology {
    name: string;
    desc?: string;
}

interface ServiceHeroVisualProps {
    service: {
        id?: number;
        slug: string;
        name: string;
        description?: string;
        technologies?: Technology[];
        settings?: {
            timeline?: string;
            ideal_project?: string;
            outcome?: string;
        };
        category?: {
            slug?: string;
            name?: string;
        };
    };
    className?: string;
}

// Map tech names to local SVG icon filenames in /tech-icons/
const TECH_ICON_MAP: Record<string, string> = {
    'adobexd': 'adobexd',
    'adobe xd': 'adobexd',
    'xd': 'adobexd',
    'framer': 'framer',
    'framer & webflow': 'framer',
    'invision': 'invision',
    'invision & principle': 'invision',
    'sketch': 'sketch',
    'adobe photoshop': 'photoshop',
    'adobe illustrator': 'illustrator',
    'blender 3d': 'blender',
    'tailwind css & css grid': 'tailwindcss',
    figma: 'figma',
    illustrator: 'illustrator',
    photoshop: 'photoshop',
    indesign: 'figma',
    dimension: 'blender',
    blender: 'blender',
    'cinema 4d': 'blender',
    solidworks: 'blender',
    react: 'react',
    'react 19': 'react',
    'react native': 'react',
    'react native / expo': 'react',
    'react three fiber': 'threedotjs',
    laravel: 'laravel',
    'laravel 13': 'laravel',
    'laravel horizon': 'laravel',
    'laravel reverb': 'laravel',
    'laravel echo': 'laravel',
    'laravel queue systems': 'laravel',
    'filament v5': 'laravel',
    filament: 'laravel',
    php: 'php',
    'php 8.4': 'php',
    typescript: 'typescript',
    javascript: 'javascript',
    'tailwind css': 'tailwindcss',
    'tailwind css v4': 'tailwindcss',
    'three.js': 'threedotjs',
    'three.js / webgl': 'threedotjs',
    webgl: 'threedotjs',
    glsl: 'threedotjs',
    gsap: 'greensock',
    'gsap scrolltrigger': 'greensock',
    'framer motion': 'greensock',
    'after effects': 'illustrator',
    'after effects / lottie': 'illustrator',
    docker: 'docker',
    kubernetes: 'kubernetes',
    aws: 'aws',
    'aws textract': 'aws',
    cloudflare: 'cloudflare',
    'cloudflare edge': 'cloudflare',
    'vercel / cloudflare': 'cloudflare',
    anthropic: 'anthropic',
    'anthropic claude': 'anthropic',
    'claude / gpt-4o': 'anthropic',
    'openai / anthropic api': 'anthropic',
    openai: 'googlegemini',
    gemini: 'googlegemini',
    python: 'python',
    pytorch: 'python',
    'pytorch / opencv': 'python',
    tensorflow: 'tensorflow',
    lighthouse: 'lighthouse',
    'google tag manager': 'googleanalytics',
    'google analytics': 'googleanalytics',
    'screaming frog': 'googlesearchconsole',
    'google search console': 'googlesearchconsole',
    inertia: 'inertia',
    'inertia & react': 'inertia',
    android: 'android',
    'android sdk': 'android',
    apple: 'apple',
    ios: 'apple',
    pwa: 'pwa',
    workbox: 'pwa',
    supabase: 'supabase',
    postgresql: 'supabase',
    'redis & postgresql': 'supabase',
    redis: 'laravel',
    firebase: 'firebase',
    node: 'nodedotjs',
    'node.js': 'nodedotjs',
};

function getTechIconSlug(name: string): string {
    const clean = name.toLowerCase().trim();
    if (TECH_ICON_MAP[clean]) {
        return TECH_ICON_MAP[clean];
    }
    for (const [key, val] of Object.entries(TECH_ICON_MAP)) {
        if (clean.includes(key) || key.includes(clean)) {
            return val;
        }
    }
    return 'laravel';
}

function FloatingTechBadge({ 
    tech, 
    positionClass, 
    delay = 0 
}: { 
    tech: Technology; 
    positionClass: string; 
    delay?: number; 
}) {
    const [imgFailed, setImgFailed] = useState(false);
    const slug = getTechIconSlug(tech.name);
    const iconSrc = `/tech-icons/${slug}.svg`;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute z-20 pointer-events-auto ${positionClass}`}
        >
            <div className="group relative flex items-center gap-2 rounded-full border border-white/20 bg-[#071320]/95 px-3 py-1.5 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-2xl transition-all duration-300 hover:scale-105 hover:border-[#2EC4A5] hover:bg-[#0a1c2e] hover:shadow-[0_0_25px_rgba(46,196,165,0.4)]">
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(46,196,165,0.25),transparent_70%)] opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex h-4 w-4 shrink-0 items-center justify-center">
                    {!imgFailed ? (
                        <img 
                            src={iconSrc} 
                            alt={`${tech.name} icon`} 
                            className="h-3.5 w-3.5 object-contain transition-transform duration-300 group-hover:scale-110" 
                            onError={() => setImgFailed(true)}
                        />
                    ) : (
                        <span className="font-mono text-[9px] font-bold text-[#2EC4A5]">
                            {tech.name.slice(0, 2).toUpperCase()}
                        </span>
                    )}
                </div>
                <span className="font-mono text-[11px] font-bold tracking-wide text-white transition-colors group-hover:text-[#2EC4A5] whitespace-nowrap">
                    {tech.name}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#2EC4A5] shadow-[0_0_8px_#2EC4A5]" />
            </div>
        </motion.div>
    );
}

/* =========================================================================
   28 BESPOKE ANIMATED VECTOR SCENES FOR EVERY SERVICE (NO CLONES)
   ========================================================================= */

// 1. BRANDING: Luxury Brand Identity Studio, Sacred Monogram & Precision Pen Tool
function SceneBranding({ reduce }: { reduce: boolean }) {
    return (
        <svg viewBox="0 0 340 280" className="h-full w-full" fill="none">
            <defs>
                <linearGradient id="brandLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2EC4A5" />
                    <stop offset="50%" stopColor="#00D1FF" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
                <linearGradient id="spiralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2EC4A5" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="goldSheen" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2EC4A5" stopOpacity="0" />
                    <stop offset="50%" stopColor="#FFF" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#00D1FF" stopOpacity="0" />
                </linearGradient>
            </defs>

            {/* Background Precision Construction Grid */}
            <line x1="40" y1="140" x2="300" y2="140" stroke="#2EC4A5" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.25" />
            <line x1="170" y1="20" x2="170" y2="260" stroke="#2EC4A5" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.25" />
            <circle cx="170" cy="130" r="115" stroke="#00D1FF" strokeWidth="0.8" strokeDasharray="2 8" opacity="0.2" />
            <circle cx="170" cy="130" r="85" stroke="#2EC4A5" strokeWidth="1" strokeDasharray="4 6" opacity="0.3" />

            {/* Fibonacci Golden Spiral Blueprint Arc */}
            <path
                d="M 170 130 A 15 15 0 0 1 185 145 A 30 30 0 0 1 155 175 A 60 60 0 0 1 95 115 A 120 120 0 0 1 215 -5"
                stroke="url(#spiralGrad)"
                strokeWidth="1.8"
                strokeDasharray="4 4"
                fill="none"
                opacity="0.6"
            />

            {/* Central Multifaceted 3D Brand Monogram (Geometric Emblem) */}
            <motion.g
                animate={reduce ? {} : { y: [-5, 5, -5], rotate: [-1, 1, -1] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: '170px 125px' }}
            >
                {/* Outer Facet Layer */}
                <polygon points="170,55 225,90 225,160 170,195 115,160 115,90" stroke="url(#brandLogoGrad)" strokeWidth="2" fill="rgba(6,18,30,0.85)" />
                
                {/* Inner Dimensional Facet Shards */}
                <polygon points="170,55 225,90 170,125" fill="rgba(46,196,165,0.25)" stroke="#2EC4A5" strokeWidth="1" />
                <polygon points="225,90 225,160 170,125" fill="rgba(0,209,255,0.2)" stroke="#00D1FF" strokeWidth="1" />
                <polygon points="225,160 170,195 170,125" fill="rgba(139,92,246,0.3)" stroke="#8B5CF6" strokeWidth="1" />
                <polygon points="170,195 115,160 170,125" fill="rgba(46,196,165,0.35)" stroke="#2EC4A5" strokeWidth="1" />
                <polygon points="115,160 115,90 170,125" fill="rgba(0,209,255,0.15)" stroke="#00D1FF" strokeWidth="1" />
                <polygon points="115,90 170,55 170,125" fill="rgba(139,92,246,0.2)" stroke="#8B5CF6" strokeWidth="1" />

                {/* Central Brand Core Gem */}
                <circle cx="170" cy="125" r="12" fill="#0A1E32" stroke="#FFF" strokeWidth="1.5" />
                <circle cx="170" cy="125" r="5" fill="#2EC4A5" className={!reduce ? 'animate-ping' : ''} />
            </motion.g>

            {/* Dynamic Precision Vector Pen Tool with Tangent Curve */}
            <motion.path
                d="M 60 185 C 100 135, 130 95, 205 60"
                stroke="#00D1FF"
                strokeWidth="2.2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={reduce ? { pathLength: 1 } : { pathLength: [0.2, 1, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Animated Pen Tool Stylus */}
            <motion.g
                animate={reduce ? {} : { x: [0, 40, 0], y: [0, -25, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
                <polygon points="205,60 220,40 228,48 213,68" fill="#2EC4A5" stroke="#FFF" strokeWidth="1.2" />
                <polygon points="205,60 212,67 207,72 201,65" fill="#05121F" stroke="#00D1FF" strokeWidth="1" />
                <circle cx="205" cy="60" r="2.5" fill="#FFF" />
                {/* Tangent Handle Line */}
                <line x1="185" y1="75" x2="225" y2="45" stroke="#2EC4A5" strokeWidth="1.2" strokeDasharray="2 2" />
                <circle cx="185" cy="75" r="3.5" fill="#00D1FF" />
                <circle cx="225" cy="45" r="3.5" fill="#00D1FF" />
            </motion.g>

            {/* Floating Luxury Color Token Deck */}
            <g transform="translate(45, 180)">
                <rect x="0" y="0" width="95" height="52" rx="8" fill="#071524EE" stroke="#2EC4A5" strokeWidth="1.2" />
                <rect x="10" y="10" width="14" height="14" rx="3" fill="#2EC4A5" />
                <rect x="28" y="10" width="14" height="14" rx="3" fill="#00D1FF" />
                <rect x="46" y="10" width="14" height="14" rx="3" fill="#8B5CF6" />
                <rect x="64" y="10" width="14" height="14" rx="3" fill="#F59E0B" />
                <text x="10" y="38" fill="#FFF" fontSize="8" fontFamily="monospace" fontWeight="bold">#2EC4A5 EMERALD</text>
                <text x="10" y="47" fill="#2EC4A5" fontSize="7" fontFamily="monospace">PALETTE TOKENS</text>
            </g>

            {/* Golden Ratio Calibration Pill */}
            <g transform="translate(200, 205)">
                <rect x="0" y="0" width="95" height="26" rx="6" fill="#071524EE" stroke="#00D1FF" strokeWidth="1" />
                <circle cx="14" cy="13" r="4" fill="#00D1FF" />
                <text x="24" y="17" fill="#00D1FF" fontSize="9" fontFamily="monospace" fontWeight="bold">RATIO: 1.618 φ</text>
            </g>

            {/* Optical Kerning Ruler Header */}
            <g transform="translate(45, 30)">
                <rect x="0" y="0" width="115" height="22" rx="6" fill="#071524EE" stroke="#FFF" strokeWidth="0.7" opacity="0.7" />
                <text x="10" y="15" fill="#FFF" fontSize="8" fontFamily="monospace">KERNING: OPTICAL</text>
            </g>
        </svg>
    );
}

// 2. PACKAGING DESIGN: 3D Luxury Box & Cosmetic Bottle Wireframe
function ScenePackaging({ reduce }: { reduce: boolean }) {
    return (
        <svg viewBox="0 0 320 260" className="h-full w-full" fill="none">
            {/* 3D Folding Box */}
            <polygon points="110,40 170,65 170,165 110,140" stroke="#2EC4A5" strokeWidth="1.6" fill="rgba(46,196,165,0.08)" />
            <polygon points="50,65 110,40 110,140 50,165" stroke="#00D1FF" strokeWidth="1.6" fill="rgba(0,209,255,0.06)" />
            <polygon points="110,140 170,165 110,190 50,165" stroke="#2EC4A5" strokeWidth="1.4" fill="rgba(46,196,165,0.12)" />
            
            {/* Folding Flap Guidelines */}
            <line x1="50" y1="65" x2="30" y2="45" stroke="#00D1FF" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="170" y1="65" x2="190" y2="45" stroke="#2EC4A5" strokeWidth="1" strokeDasharray="3 3" />
            
            {/* Floating Luxury Glass Bottle */}
            <motion.g animate={reduce ? {} : { y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                <rect x="200" y="80" width="60" height="95" rx="12" stroke="#00D1FF" strokeWidth="1.8" fill="rgba(0,209,255,0.1)" />
                <rect x="215" y="60" width="30" height="20" rx="4" stroke="#2EC4A5" strokeWidth="1.5" fill="rgba(46,196,165,0.2)" />
                <rect x="222" y="48" width="16" height="12" rx="2" fill="#FFF" opacity="0.8" />
                <line x1="210" y1="120" x2="250" y2="120" stroke="#2EC4A5" strokeWidth="1" />
                <circle cx="230" cy="138" r="8" stroke="#00D1FF" strokeWidth="1" strokeDasharray="2 2" />
            </motion.g>

            {/* Laser Barcode Scanner Beam */}
            <rect x="90" y="210" width="80" height="22" rx="4" stroke="#FFF" strokeWidth="1" opacity="0.4" />
            <line x1="98" y1="215" x2="98" y2="227" stroke="#2EC4A5" strokeWidth="2" />
            <line x1="104" y1="215" x2="104" y2="227" stroke="#2EC4A5" strokeWidth="1" />
            <line x1="110" y1="215" x2="110" y2="227" stroke="#2EC4A5" strokeWidth="3" />
            <line x1="120" y1="215" x2="120" y2="227" stroke="#2EC4A5" strokeWidth="1.5" />
            <line x1="128" y1="215" x2="128" y2="227" stroke="#2EC4A5" strokeWidth="2.5" />
            <line x1="138" y1="215" x2="138" y2="227" stroke="#2EC4A5" strokeWidth="1" />
            <line x1="148" y1="215" x2="148" y2="227" stroke="#2EC4A5" strokeWidth="2" />
            <line x1="158" y1="215" x2="158" y2="227" stroke="#2EC4A5" strokeWidth="3" />
        </svg>
    );
}

// 3. STATIONERY KITS: Floating Business Cards & Letterhead Wax Seal
function SceneStationery({ reduce }: { reduce: boolean }) {
    return (
        <svg viewBox="0 0 320 260" className="h-full w-full" fill="none">
            {/* Letterhead Paper Sheet */}
            <rect x="70" y="30" width="130" height="175" rx="6" stroke="#2EC4A5" strokeWidth="1.4" fill="rgba(46,196,165,0.06)" />
            <line x1="90" y1="55" x2="130" y2="55" stroke="#2EC4A5" strokeWidth="2" />
            <line x1="90" y1="75" x2="180" y2="75" stroke="#FFF" strokeWidth="1" opacity="0.3" />
            <line x1="90" y1="90" x2="175" y2="90" stroke="#FFF" strokeWidth="1" opacity="0.3" />
            <line x1="90" y1="105" x2="165" y2="105" stroke="#FFF" strokeWidth="1" opacity="0.3" />
            <line x1="90" y1="120" x2="180" y2="120" stroke="#FFF" strokeWidth="1" opacity="0.3" />

            {/* Floating Luxury Business Card (Front) */}
            <motion.g animate={reduce ? {} : { y: [-6, 6, -6], rotate: [-2, 2, -2] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                <rect x="130" y="95" width="135" height="85" rx="8" stroke="#00D1FF" strokeWidth="1.8" fill="#0A1C2E" />
                <circle cx="160" cy="130" r="14" fill="#2EC4A5" opacity="0.8" />
                <text x="185" y="132" fill="#FFF" fontSize="11" fontFamily="monospace" fontWeight="bold">OVOLL</text>
                <text x="185" y="145" fill="#2EC4A5" fontSize="8" fontFamily="monospace">EXECUTIVE</text>
                <line x1="150" y1="162" x2="245" y2="162" stroke="#00D1FF" strokeWidth="0.8" opacity="0.4" />
            </motion.g>

            {/* Luxury Wax Seal Badge */}
            <circle cx="85" cy="180" r="18" fill="#091A2A" stroke="#2EC4A5" strokeWidth="2" />
            <circle cx="85" cy="180" r="12" fill="#2EC4A5" opacity="0.6" />
            <text x="81" y="184" fill="#FFF" fontSize="11" fontWeight="bold">O</text>
        </svg>
    );
}

// 4. DESIGN SYSTEMS: Living Token Hierarchy Matrix
function SceneDesignSystems({ reduce }: { reduce: boolean }) {
    return (
        <svg viewBox="0 0 320 260" className="h-full w-full" fill="none">
            {/* Token Shell */}
            <rect x="40" y="30" width="240" height="200" rx="14" stroke="#2EC4A5" strokeWidth="1.5" fill="rgba(46,196,165,0.04)" />
            
            {/* Color Swatch Tokens */}
            <text x="60" y="58" fill="#2EC4A5" fontSize="10" fontFamily="monospace" fontWeight="bold">COLOR TOKENS</text>
            <rect x="60" y="68" width="24" height="24" rx="6" fill="#2EC4A5" />
            <rect x="92" y="68" width="24" height="24" rx="6" fill="#00D1FF" />
            <rect x="124" y="68" width="24" height="24" rx="6" fill="#8B5CF6" />
            <rect x="156" y="68" width="24" height="24" rx="6" fill="#EC4899" />
            
            {/* Typography Token Ladder */}
            <text x="60" y="118" fill="#00D1FF" fontSize="10" fontFamily="monospace" fontWeight="bold">TYPOGRAPHY SCALE</text>
            <rect x="60" y="128" width="60" height="7" rx="2" fill="#FFF" opacity="0.9" />
            <rect x="60" y="142" width="45" height="5" rx="1.5" fill="#FFF" opacity="0.6" />
            <rect x="60" y="154" width="35" height="4" rx="1" fill="#FFF" opacity="0.4" />

            {/* Atomic UI Component (Interactive Button & Switch) */}
            <rect x="150" y="120" width="115" height="90" rx="8" stroke="#00D1FF" strokeWidth="1.2" fill="#081827" />
            <text x="165" y="142" fill="#FFF" fontSize="9" fontFamily="monospace">Button (Primary)</text>
            <rect x="165" y="150" width="85" height="24" rx="6" fill="#2EC4A5" />
            <text x="185" y="165" fill="#06121E" fontSize="9" fontWeight="bold">CONFIRM</text>
            
            {/* Toggle Switch */}
            <rect x="165" y="185" width="30" height="14" rx="7" fill="#00D1FF" />
            <motion.circle cx="188" cy="192" r="5" fill="#FFF" animate={reduce ? {} : { cx: [172, 188, 172] }} transition={{ duration: 3, repeat: Infinity }} />
        </svg>
    );
}

// 5. PRODUCT DESIGN: Industrial Exploded CAD Wireframe
function SceneProductDesign({ reduce }: { reduce: boolean }) {
    return (
        <svg viewBox="0 0 320 260" className="h-full w-full" fill="none">
            {/* Layer 1: Hardware Base Chassis */}
            <polygon points="160,180 250,210 160,240 70,210" stroke="#2EC4A5" strokeWidth="1.6" fill="rgba(46,196,165,0.12)" />
            
            {/* Layer 2: Motherboard PCB Circuit */}
            <polygon points="160,130 240,155 160,180 80,155" stroke="#00D1FF" strokeWidth="1.5" fill="rgba(0,209,255,0.08)" />
            <circle cx="160" cy="155" r="8" fill="#00D1FF" opacity="0.7" />
            
            {/* Layer 3: Industrial Top Cover & Tactile Rotary Dial */}
            <motion.g animate={reduce ? {} : { y: [-8, 8, -8] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                <polygon points="160,70 230,95 160,120 90,95" stroke="#2EC4A5" strokeWidth="1.8" fill="rgba(46,196,165,0.2)" />
                <ellipse cx="160" cy="85" rx="20" ry="10" stroke="#FFF" strokeWidth="1.5" fill="#0E2336" />
                <circle cx="160" cy="85" r="5" fill="#2EC4A5" />
            </motion.g>

            {/* Exploded Axis Vectors */}
            <line x1="160" y1="50" x2="160" y2="240" stroke="#2EC4A5" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
            <line x1="70" y1="210" x2="90" y2="95" stroke="#00D1FF" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
            <line x1="250" y1="210" x2="230" y2="95" stroke="#00D1FF" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
            
            {/* Caliper Measurement Marker */}
            <line x1="265" y1="90" x2="265" y2="220" stroke="#FFF" strokeWidth="1" opacity="0.5" />
            <line x1="260" y1="90" x2="270" y2="90" stroke="#FFF" strokeWidth="1" />
            <line x1="260" y1="220" x2="270" y2="220" stroke="#FFF" strokeWidth="1" />
            <text x="275" y="160" fill="#FFF" fontSize="9" fontFamily="monospace" opacity="0.7">142mm</text>
        </svg>
    );
}

// 6. PRINTING SERVICES: CMYK Rotating Offset Press Rollers
function ScenePrinting({ reduce }: { reduce: boolean }) {
    return (
        <svg viewBox="0 0 320 260" className="h-full w-full" fill="none">
            {/* CMYK Cylinders */}
            <circle cx="85" cy="75" r="28" stroke="#00D1FF" strokeWidth="2" fill="rgba(0,209,255,0.15)" />
            <text x="80" y="80" fill="#00D1FF" fontSize="12" fontWeight="bold">C</text>

            <circle cx="160" cy="60" r="28" stroke="#EC4899" strokeWidth="2" fill="rgba(236,72,153,0.15)" />
            <text x="154" y="65" fill="#EC4899" fontSize="12" fontWeight="bold">M</text>

            <circle cx="235" cy="75" r="28" stroke="#F59E0B" strokeWidth="2" fill="rgba(245,158,11,0.15)" />
            <text x="231" y="80" fill="#F59E0B" fontSize="12" fontWeight="bold">Y</text>

            {/* Continuous Calibrated Paper Web */}
            <path d="M 40 150 Q 160 135, 280 150 L 280 200 Q 160 185, 40 200 Z" stroke="#2EC4A5" strokeWidth="1.5" fill="rgba(255,255,255,0.06)" />
            
            {/* CMYK Density Color Bars on Paper */}
            <rect x="60" y="165" width="18" height="12" fill="#00D1FF" />
            <rect x="85" y="165" width="18" height="12" fill="#EC4899" />
            <rect x="110" y="165" width="18" height="12" fill="#F59E0B" />
            <rect x="135" y="165" width="18" height="12" fill="#071320" stroke="#FFF" strokeWidth="0.8" />
            
            {/* Optical Registration Target Marks */}
            <circle cx="210" cy="170" r="10" stroke="#2EC4A5" strokeWidth="1.2" />
            <line x1="210" y1="156" x2="210" y2="184" stroke="#2EC4A5" strokeWidth="1.2" />
            <line x1="196" y1="170" x2="224" y2="170" stroke="#2EC4A5" strokeWidth="1.2" />
        </svg>
    );
}

// 7. MOTION DESIGN: Kinetic Spring Physics Timeline & Keyframe Curve
function SceneMotionDesign({ reduce }: { reduce: boolean }) {
    return (
        <svg viewBox="0 0 320 260" className="h-full w-full" fill="none">
            {/* Keyframe Timeline Frame */}
            <rect x="40" y="35" width="240" height="190" rx="12" stroke="#2EC4A5" strokeWidth="1.5" fill="rgba(46,196,165,0.05)" />
            
            {/* Cubic Bezier Velocity Curve */}
            <path d="M 60 170 C 100 170, 120 70, 260 70" stroke="#00D1FF" strokeWidth="2.5" fill="none" />
            
            {/* Tangent Handles */}
            <line x1="60" y1="170" x2="100" y2="170" stroke="#2EC4A5" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="100" cy="170" r="4" fill="#2EC4A5" />
            <line x1="260" y1="70" x2="180" y2="70" stroke="#2EC4A5" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="180" cy="70" r="4" fill="#2EC4A5" />

            {/* Bouncing Kinetic 3D Sphere with Motion Blur Trails */}
            <motion.g
                animate={reduce ? {} : { x: [0, 180, 0], y: [0, -90, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
            >
                <circle cx="70" cy="160" r="14" fill="#8B5CF6" stroke="#FFF" strokeWidth="1.5" />
                <circle cx="70" cy="160" r="6" fill="#FFF" />
            </motion.g>

            {/* Timeline Scrubber Header */}
            <rect x="55" y="195" width="210" height="18" rx="4" fill="#0A1826" stroke="#FFF" strokeWidth="0.5" opacity="0.3" />
            <line x1="145" y1="35" x2="145" y2="225" stroke="#EC4899" strokeWidth="1.5" />
            <polygon points="140,35 150,35 145,45" fill="#EC4899" />
            <text x="215" y="208" fill="#2EC4A5" fontSize="9" fontFamily="monospace">60.0 FPS</text>
        </svg>
    );
}

// 8. UI/UX: Dual Device Responsive Canvas (Phone + Tablet)
function SceneUiUx({ reduce }: { reduce: boolean }) {
    return (
        <svg viewBox="0 0 320 260" className="h-full w-full" fill="none">
            {/* Tablet Frame */}
            <rect x="40" y="35" width="165" height="190" rx="14" stroke="#2EC4A5" strokeWidth="1.8" fill="#081422" />
            <rect x="52" y="55" width="140" height="35" rx="6" fill="rgba(0,209,255,0.15)" stroke="#00D1FF" strokeWidth="1" />
            <circle cx="70" cy="72" r="7" fill="#2EC4A5" />
            <rect x="85" y="68" width="55" height="5" rx="1.5" fill="#FFF" opacity="0.8" />
            <rect x="52" y="100" width="65" height="55" rx="6" fill="rgba(255,255,255,0.03)" stroke="#FFF" strokeWidth="0.8" opacity="0.3" />
            <rect x="127" y="100" width="65" height="55" rx="6" fill="rgba(255,255,255,0.03)" stroke="#FFF" strokeWidth="0.8" opacity="0.3" />
            
            {/* Floating Mobile Phone Frame */}
            <motion.g animate={reduce ? {} : { y: [-6, 6, -6] }} transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}>
                <rect x="175" y="65" width="105" height="165" rx="14" stroke="#00D1FF" strokeWidth="2" fill="#0A1B2E" />
                <rect x="210" y="73" width="35" height="6" rx="3" fill="#FFF" opacity="0.7" />
                <rect x="185" y="90" width="85" height="38" rx="6" fill="rgba(46,196,165,0.2)" stroke="#2EC4A5" strokeWidth="1" />
                <circle cx="200" cy="108" r="8" fill="#2EC4A5" />
                <rect x="215" y="104" width="45" height="5" rx="1.5" fill="#FFF" />
                
                {/* Floating Push Card */}
                <rect x="185" y="140" width="85" height="42" rx="6" fill="#081422" stroke="#FFF" strokeWidth="0.8" />
                <rect x="195" y="152" width="40" height="4" rx="1" fill="#00D1FF" />
                <rect x="195" y="162" width="60" height="4" rx="1" fill="#FFF" opacity="0.5" />
            </motion.g>
        </svg>
    );
}

// 9. WEB APP DEV: Full-Stack SaaS Management Hub
function SceneWebApp({ reduce }: { reduce: boolean }) {
    return (
        <svg viewBox="0 0 320 260" className="h-full w-full" fill="none">
            {/* Desktop Dashboard Shell */}
            <rect x="35" y="30" width="250" height="200" rx="12" stroke="#2EC4A5" strokeWidth="1.6" fill="#081320" />
            <line x1="35" y1="58" x2="285" y2="58" stroke="#FFF" strokeWidth="0.8" opacity="0.2" />
            <circle cx="52" cy="44" r="4" fill="#FF5F56" />
            <circle cx="64" cy="44" r="4" fill="#FFBD2E" />
            <circle cx="76" cy="44" r="4" fill="#27C93F" />
            
            {/* Live Chart Metric Panel */}
            <rect x="50" y="70" width="140" height="85" rx="8" fill="rgba(0,209,255,0.06)" stroke="#00D1FF" strokeWidth="1" />
            <path d="M 60 135 Q 90 95, 120 115 T 180 80" stroke="#2EC4A5" strokeWidth="2" fill="none" />
            <circle cx="180" cy="80" r="4" fill="#2EC4A5" />

            {/* Sidebar User Avatars */}
            <rect x="200" y="70" width="70" height="85" rx="8" fill="rgba(255,255,255,0.03)" stroke="#FFF" strokeWidth="0.8" opacity="0.3" />
            <circle cx="225" cy="95" r="8" fill="#2EC4A5" />
            <circle cx="245" cy="95" r="8" fill="#00D1FF" />
            <circle cx="235" cy="115" r="8" fill="#8B5CF6" />

            {/* Animated Database Stream Bus */}
            <rect x="50" y="168" width="220" height="45" rx="6" fill="#050C14" stroke="#2EC4A5" strokeWidth="1" />
            <text x="65" y="186" fill="#2EC4A5" fontSize="9" fontFamily="monospace">SQL CLUSTER: ACTIVE</text>
            <text x="65" y="200" fill="#FFF" fontSize="8" fontFamily="monospace" opacity="0.7">LATENCY: 12.4ms (p99)</text>
            <circle cx="250" cy="190" r="6" fill="#00D1FF" className={!reduce ? 'animate-ping' : ''} />
        </svg>
    );
}

// 10. APP DEVELOPMENT: Cross-Platform Native Mobile Device Runtime
function SceneMobileApp({ reduce }: { reduce: boolean }) {
    return (
        <svg viewBox="0 0 320 260" className="h-full w-full" fill="none">
            {/* Main Center Frameless Smartphone */}
            <rect x="100" y="20" width="120" height="220" rx="20" stroke="#2EC4A5" strokeWidth="2" fill="#07121E" />
            
            {/* Dynamic Island */}
            <rect x="135" y="32" width="50" height="10" rx="5" fill="#FFF" opacity="0.85" />
            
            {/* In-App Interactive Widgets */}
            <rect x="115" y="55" width="90" height="40" rx="8" fill="rgba(0,209,255,0.15)" stroke="#00D1FF" strokeWidth="1" />
            <circle cx="135" cy="75" r="8" fill="#2EC4A5" />
            <rect x="150" y="70" width="40" height="5" rx="1" fill="#FFF" />
            <rect x="150" y="78" width="25" height="4" rx="1" fill="#FFF" opacity="0.5" />

            {/* Floating 3D Push Notifications */}
            <motion.g animate={reduce ? {} : { y: [-5, 5, -5] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}>
                <rect x="70" y="110" width="180" height="45" rx="10" stroke="#00D1FF" strokeWidth="1.6" fill="#0A1F33" />
                <circle cx="95" cy="132" r="10" fill="#2EC4A5" />
                <rect x="115" y="125" width="80" height="5" rx="1.5" fill="#FFF" />
                <rect x="115" y="135" width="55" height="4" rx="1" fill="#00D1FF" />
            </motion.g>

            {/* Native Home Indicator */}
            <rect x="140" y="230" width="40" height="4" rx="2" fill="#FFF" opacity="0.6" />
        </svg>
    );
}

// 11. SAAS PLATFORMS: Multi-Tenant Cloud Architecture & Revenue Meter
function SceneSaasPlatforms({ reduce }: { reduce: boolean }) {
    return (
        <svg viewBox="0 0 320 260" className="h-full w-full" fill="none">
            {/* Cloud Core Hub */}
            <circle cx="160" cy="130" r="35" fill="rgba(46,196,165,0.15)" stroke="#2EC4A5" strokeWidth="2" />
            <circle cx="160" cy="130" r="18" fill="rgba(0,209,255,0.3)" stroke="#00D1FF" strokeWidth="1.2" />
            <circle cx="160" cy="130" r="6" fill="#FFF" />

            {/* Tenant Nodes & Routes */}
            {[
                { x: 60, y: 60, label: 'TENANT A', col: '#2EC4A5' },
                { x: 260, y: 60, label: 'TENANT B', col: '#00D1FF' },
                { x: 60, y: 200, label: 'TENANT C', col: '#8B5CF6' },
                { x: 260, y: 200, label: 'TENANT D', col: '#2EC4A5' },
            ].map((node, i) => (
                <g key={i}>
                    <line x1="160" y1="130" x2={node.x} y2={node.y} stroke={node.col} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7" />
                    <rect x={node.x - 30} y={node.y - 18} width="60" height="36" rx="6" stroke={node.col} strokeWidth="1.5" fill="#081422" />
                    <text x={node.x - 24} y={node.y + 4} fill="#FFF" fontSize="8" fontFamily="monospace" fontWeight="bold">{node.label}</text>
                </g>
            ))}

            {/* Stripe / MRR Ticker Badge */}
            <rect x="110" y="20" width="100" height="24" rx="12" fill="#081422" stroke="#2EC4A5" strokeWidth="1.2" />
            <text x="122" y="36" fill="#2EC4A5" fontSize="10" fontFamily="monospace" fontWeight="bold">MRR: $120,400</text>
        </svg>
    );
}

// 12. ECOMMERCE PLATFORMS: 3D Product Showcase & 1-Click Checkout
function SceneEcommerce({ reduce }: { reduce: boolean }) {
    return (
        <svg viewBox="0 0 320 260" className="h-full w-full" fill="none">
            {/* 3D Isometric Showcase Pedestal */}
            <polygon points="160,80 240,120 160,160 80,120" stroke="#2EC4A5" strokeWidth="1.6" fill="rgba(46,196,165,0.15)" />
            <polygon points="80,120 160,160 160,210 80,170" stroke="#00D1FF" strokeWidth="1.6" fill="rgba(0,209,255,0.12)" />
            <polygon points="240,120 160,160 160,210 240,170" stroke="#2EC4A5" strokeWidth="1.6" fill="rgba(46,196,165,0.25)" />

            {/* Floating Luxury Jewel */}
            <motion.g animate={reduce ? {} : { y: [-8, 8, -8] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}>
                <polygon points="160,50 180,80 160,110 140,80" stroke="#00D1FF" strokeWidth="1.8" fill="rgba(0,209,255,0.3)" />
                <circle cx="160" cy="80" r="5" fill="#FFF" />
            </motion.g>

            {/* Floating 1-Click Checkout Glass Card */}
            <rect x="180" y="35" width="95" height="60" rx="8" stroke="#2EC4A5" strokeWidth="1.5" fill="#091B2E" />
            <rect x="190" y="48" width="25" height="16" rx="3" fill="#2EC4A5" opacity="0.8" />
            <line x1="180" y1="72" x2="275" y2="72" stroke="#FFF" strokeWidth="0.8" opacity="0.3" />
            <text x="190" y="86" fill="#FFF" fontSize="8" fontFamily="monospace">1-CLICK CHECKOUT</text>
        </svg>
    );
}

// 13. INTERNAL PORTALS: High-Density Filament-Style Operations Matrix
function SceneInternalPortals({ reduce }: { reduce: boolean }) {
    return (
        <svg viewBox="0 0 320 260" className="h-full w-full" fill="none">
            {/* Admin Console Shell */}
            <rect x="40" y="30" width="240" height="200" rx="12" stroke="#2EC4A5" strokeWidth="1.5" fill="#081422" />
            <line x1="40" y1="65" x2="280" y2="65" stroke="#FFF" strokeWidth="0.8" opacity="0.2" />
            <rect x="55" y="44" width="70" height="12" rx="3" fill="#2EC4A5" opacity="0.8" />

            {/* Table Rows & Role Permission Matrix */}
            {[80, 115, 150, 185].map((y, i) => (
                <g key={i}>
                    <line x1="55" y1={y + 22} x2="265" y2={y + 22} stroke="#FFF" strokeWidth="0.5" opacity="0.1" />
                    <rect x="55" y={y} width="16" height="16" rx="4" fill="rgba(46,196,165,0.2)" stroke="#2EC4A5" strokeWidth="1" />
                    <rect x="80" y={y + 4} width="70" height="8" rx="2" fill="#FFF" opacity={0.8 - i * 0.15} />
                    <rect x="165" y={y + 2} width="45" height="12" rx="3" fill={i % 2 === 0 ? 'rgba(0,209,255,0.2)' : 'rgba(139,92,246,0.2)'} />
                    <rect x="225" y={y + 2} width="35" height="12" rx="3" fill="rgba(46,196,165,0.3)" />
                </g>
            ))}
        </svg>
    );
}

// 14. WEBSITE DESIGN & DEV: Creative 3D WebGL & Particle Vortex
function SceneWebsiteDev({ reduce }: { reduce: boolean }) {
    return (
        <svg viewBox="0 0 320 260" className="h-full w-full" fill="none">
            {/* Luminous Polyhedron Core */}
            <motion.polygon
                points="160,40 245,90 245,180 160,230 75,180 75,90"
                stroke="#00D1FF"
                strokeWidth="2"
                fill="rgba(0,209,255,0.06)"
                animate={reduce ? {} : { rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '160px 135px' }}
            />
            {/* Inner Triangulated Shaders */}
            <polygon points="160,75 220,110 220,170 160,205 100,170 100,110" stroke="#2EC4A5" strokeWidth="1.5" fill="rgba(46,196,165,0.12)" />
            <circle cx="160" cy="140" r="16" fill="#8B5CF6" opacity="0.8" />

            {/* Orbiting GPU Particle Vortex */}
            <circle cx="160" cy="140" r="95" stroke="#2EC4A5" strokeWidth="1" strokeDasharray="3 9" opacity="0.4" />
            <circle cx="160" cy="140" r="115" stroke="#00D1FF" strokeWidth="1" strokeDasharray="4 12" opacity="0.25" />
            
            <text x="120" y="248" fill="#2EC4A5" fontSize="10" fontFamily="monospace" fontWeight="bold">WEBGL 60.00 FPS</text>
        </svg>
    );
}

// 15. PRODUCT DEVELOPMENT: Agile Sprint Velocity & Git Release Roadmap
function SceneProductDev({ reduce }: { reduce: boolean }) {
    return (
        <svg viewBox="0 0 320 260" className="h-full w-full" fill="none">
            {/* Git Branch Lines */}
            <line x1="50" y1="80" x2="270" y2="80" stroke="#2EC4A5" strokeWidth="2.5" />
            <path d="M 90 80 Q 120 140, 160 140 L 230 140 Q 250 140, 260 80" stroke="#00D1FF" strokeWidth="2" fill="none" />
            
            {/* Commit Nodes */}
            <circle cx="90" cy="80" r="7" fill="#2EC4A5" stroke="#FFF" strokeWidth="1.5" />
            <circle cx="160" cy="80" r="7" fill="#2EC4A5" stroke="#FFF" strokeWidth="1.5" />
            <circle cx="140" cy="140" r="6" fill="#00D1FF" stroke="#FFF" strokeWidth="1.2" />
            <circle cx="190" cy="140" r="6" fill="#00D1FF" stroke="#FFF" strokeWidth="1.2" />
            <circle cx="260" cy="80" r="9" fill="#8B5CF6" stroke="#FFF" strokeWidth="2" />

            {/* Sprint Velocity Card */}
            <rect x="60" y="165" width="200" height="60" rx="8" stroke="#2EC4A5" strokeWidth="1.4" fill="#081422" />
            <text x="75" y="185" fill="#2EC4A5" fontSize="9" fontFamily="monospace" fontWeight="bold">SPRINT VELOCITY: 98.4%</text>
            <rect x="75" y="195" width="170" height="8" rx="4" fill="rgba(255,255,255,0.1)" />
            <rect x="75" y="195" width="140" height="8" rx="4" fill="#00D1FF" />
        </svg>
    );
}

// 16. API BACKENDS: High-Throughput Microservices Gateway & Sub-20ms Laser
function SceneApiBackends({ reduce }: { reduce: boolean }) {
    return (
        <svg viewBox="0 0 320 260" className="h-full w-full" fill="none">
            {/* Central API Gateway */}
            <rect x="120" y="90" width="80" height="60" rx="10" stroke="#2EC4A5" strokeWidth="2" fill="#07192C" />
            <text x="135" y="125" fill="#FFF" fontSize="10" fontFamily="monospace" fontWeight="bold">API GATEWAY</text>

            {/* Sub-20ms Telemetry Badge */}
            <rect x="110" y="25" width="100" height="26" rx="6" stroke="#00D1FF" strokeWidth="1.5" fill="#07192C" />
            <text x="120" y="42" fill="#00D1FF" fontSize="10" fontFamily="monospace" fontWeight="bold">SUB-20MS P99</text>

            {/* Connected Sharded Database Cylinders */}
            <g transform="translate(40, 160)">
                <ellipse cx="20" cy="10" rx="20" ry="8" stroke="#2EC4A5" strokeWidth="1.4" fill="rgba(46,196,165,0.2)" />
                <path d="M 0 10 L 0 35 C 0 40, 40 40, 40 35 L 40 10" stroke="#2EC4A5" strokeWidth="1.4" fill="rgba(46,196,165,0.1)" />
            </g>
            <g transform="translate(240, 160)">
                <ellipse cx="20" cy="10" rx="20" ry="8" stroke="#00D1FF" strokeWidth="1.4" fill="rgba(0,209,255,0.2)" />
                <path d="M 0 10 L 0 35 C 0 40, 40 40, 40 35 L 40 10" stroke="#00D1FF" strokeWidth="1.4" fill="rgba(0,209,255,0.1)" />
            </g>

            {/* Laser Data Routes */}
            <line x1="80" y1="180" x2="120" y2="135" stroke="#2EC4A5" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="240" y1="180" x2="200" y2="135" stroke="#00D1FF" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="160" y1="51" x2="160" y2="90" stroke="#2EC4A5" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
    );
}

// 17. CLOUD DEVOPS: Kubernetes Pod Orchestration & CI/CD Pipelines
function SceneDevOps({ reduce }: { reduce: boolean }) {
    return (
        <svg viewBox="0 0 320 260" className="h-full w-full" fill="none">
            {/* CI/CD Pipeline Track */}
            <line x1="40" y1="130" x2="280" y2="130" stroke="#2EC4A5" strokeWidth="3" />
            
            {/* Deployment Stations */}
            {[
                { x: 60, label: 'BUILD', pass: true },
                { x: 130, label: 'TEST', pass: true },
                { x: 200, label: 'SECURITY', pass: true },
                { x: 260, label: 'DEPLOY', pass: true },
            ].map((st, i) => (
                <g key={i}>
                    <circle cx={st.x} cy="130" r="14" fill="#081422" stroke="#2EC4A5" strokeWidth="2" />
                    <circle cx={st.x} cy="130" r="6" fill="#2EC4A5" />
                    <text x={st.x - 18} y="162" fill="#FFF" fontSize="8" fontFamily="monospace">{st.label}</text>
                </g>
            ))}

            {/* Floating Kubernetes Container Cubes */}
            <motion.g animate={reduce ? {} : { y: [-6, 6, -6] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}>
                <polygon points="160,35 195,55 160,75 125,55" stroke="#00D1FF" strokeWidth="1.5" fill="rgba(0,209,255,0.2)" />
                <polygon points="125,55 160,75 160,105 125,85" stroke="#00D1FF" strokeWidth="1.5" fill="rgba(0,209,255,0.3)" />
                <polygon points="195,55 160,75 160,105 195,85" stroke="#2EC4A5" strokeWidth="1.5" fill="rgba(46,196,165,0.2)" />
            </motion.g>
        </svg>
    );
}

// 18. REAL-TIME SYSTEMS: WebSockets Broadcasting & Live Multi-Cursor
function SceneRealtime({ reduce }: { reduce: boolean }) {
    return (
        <svg viewBox="0 0 320 260" className="h-full w-full" fill="none">
            {/* Central Broadcast Tower */}
            <circle cx="160" cy="130" r="40" stroke="#2EC4A5" strokeWidth="1.5" strokeDasharray="4 6" />
            <circle cx="160" cy="130" r="65" stroke="#00D1FF" strokeWidth="1" strokeDasharray="3 6" opacity="0.4" />
            <circle cx="160" cy="130" r="90" stroke="#8B5CF6" strokeWidth="0.8" strokeDasharray="2 8" opacity="0.3" />
            <circle cx="160" cy="130" r="12" fill="#2EC4A5" />

            {/* Multi-User Cursor Streams */}
            <motion.g animate={reduce ? {} : { x: [-20, 20, -20], y: [-15, 15, -15] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                <polygon points="70,65 70,85 76,80 82,90 86,88 80,78 88,78" fill="#00D1FF" />
                <rect x="85" y="80" width="55" height="16" rx="4" fill="#00D1FF" />
                <text x="90" y="92" fill="#04121F" fontSize="8" fontWeight="bold">Alex (Active)</text>
            </motion.g>

            <motion.g animate={reduce ? {} : { x: [20, -20, 20], y: [15, -15, 15] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}>
                <polygon points="240,165 240,185 246,180 252,190 256,188 250,178 258,178" fill="#EC4899" />
                <rect x="185" y="180" width="50" height="16" rx="4" fill="#EC4899" />
                <text x="190" y="192" fill="#FFF" fontSize="8" fontWeight="bold">Sarah (Sync)</text>
            </motion.g>
        </svg>
    );
}

// 19. AI WORKFLOWS: Autonomous AI Agents & Neural Cognitive Matrix
function SceneAiWorkflows({ reduce }: { reduce: boolean }) {
    return (
        <svg viewBox="0 0 320 260" className="h-full w-full" fill="none">
            {/* Glowing Neural Synaptic Brain */}
            <circle cx="160" cy="120" r="35" fill="rgba(139,92,246,0.2)" stroke="#8B5CF6" strokeWidth="2" />
            <circle cx="160" cy="120" r="16" fill="#2EC4A5" opacity="0.8" />

            {/* Autonomous Agent Nodes */}
            <rect x="40" y="50" width="80" height="35" rx="6" stroke="#2EC4A5" strokeWidth="1.4" fill="#081422" />
            <text x="48" y="72" fill="#2EC4A5" fontSize="8" fontFamily="monospace" fontWeight="bold">AGENT_ALPHA</text>

            <rect x="200" y="50" width="80" height="35" rx="6" stroke="#00D1FF" strokeWidth="1.4" fill="#081422" />
            <text x="208" y="72" fill="#00D1FF" fontSize="8" fontFamily="monospace" fontWeight="bold">AGENT_BETA</text>

            <line x1="120" y1="70" x2="140" y2="105" stroke="#2EC4A5" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="200" y1="70" x2="180" y2="105" stroke="#00D1FF" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Live JSON Decision Stream */}
            <rect x="50" y="175" width="220" height="50" rx="8" stroke="#8B5CF6" strokeWidth="1.2" fill="#050E18" />
            <text x="65" y="195" fill="#2EC4A5" fontSize="9" fontFamily="monospace">{'{"intent": "orchestrate", "confidence": 0.998}'}</text>
            <text x="65" y="210" fill="#FFF" fontSize="8" fontFamily="monospace" opacity="0.7">STATUS: EXECUTING MULTI-STEP PIPELINE</text>
        </svg>
    );
}

// 20. WORKFLOW AUTOMATION: Interconnected Event Triggers & Robotic Gears
function SceneAutomation({ reduce }: { reduce: boolean }) {
    return (
        <svg viewBox="0 0 320 260" className="h-full w-full" fill="none">
            {/* Rotating Mechanical Cogs */}
            <motion.g animate={reduce ? {} : { rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '110px 110px' }}>
                <circle cx="110" cy="110" r="35" stroke="#2EC4A5" strokeWidth="4" strokeDasharray="10 6" fill="rgba(46,196,165,0.1)" />
                <circle cx="110" cy="110" r="14" fill="#2EC4A5" />
            </motion.g>

            <motion.g animate={reduce ? {} : { rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '190px 150px' }}>
                <circle cx="190" cy="150" r="28" stroke="#00D1FF" strokeWidth="3.5" strokeDasharray="8 5" fill="rgba(0,209,255,0.1)" />
                <circle cx="190" cy="150" r="10" fill="#00D1FF" />
            </motion.g>

            {/* Webhook Pipes & Event Nodes */}
            <rect x="40" y="180" width="70" height="30" rx="6" stroke="#FFF" strokeWidth="1" fill="#081422" opacity="0.7" />
            <text x="48" y="200" fill="#FFF" fontSize="9" fontFamily="monospace">WEBHOOK</text>

            <path d="M 110 195 L 150 195 L 170 178" stroke="#2EC4A5" strokeWidth="2" strokeDasharray="3 3" />
        </svg>
    );
}

// 21. RAG ENTERPRISE SEARCH: 3D Vector Space & Document Embedding Galaxy
function SceneRagSearch({ reduce }: { reduce: boolean }) {
    return (
        <svg viewBox="0 0 320 260" className="h-full w-full" fill="none">
            {/* Clustered Vector Points */}
            {[
                { x: 80, y: 70, r: 6, col: '#2EC4A5' },
                { x: 100, y: 90, r: 8, col: '#2EC4A5' },
                { x: 120, y: 65, r: 5, col: '#2EC4A5' },
                { x: 200, y: 80, r: 7, col: '#00D1FF' },
                { x: 220, y: 110, r: 9, col: '#00D1FF' },
                { x: 240, y: 75, r: 5, col: '#00D1FF' },
                { x: 150, y: 150, r: 10, col: '#8B5CF6' },
            ].map((pt, i) => (
                <circle key={i} cx={pt.x} cy={pt.y} r={pt.r} fill={pt.col} opacity="0.85" />
            ))}

            {/* Laser Semantic Search Beam */}
            <line x1="60" y1="210" x2="150" y2="150" stroke="#00D1FF" strokeWidth="2.5" strokeDasharray="4 2" />
            <circle cx="150" cy="150" r="18" stroke="#00D1FF" strokeWidth="1.5" className={!reduce ? 'animate-ping' : ''} />

            {/* Cited Document Knowledge Card */}
            <rect x="180" y="160" width="105" height="65" rx="8" stroke="#2EC4A5" strokeWidth="1.4" fill="#081422" />
            <text x="190" y="180" fill="#2EC4A5" fontSize="8" fontFamily="monospace" fontWeight="bold">COSINE: 0.964</text>
            <rect x="190" y="190" width="80" height="4" rx="1" fill="#FFF" opacity="0.8" />
            <rect x="190" y="200" width="60" height="4" rx="1" fill="#FFF" opacity="0.5" />
        </svg>
    );
}

// 22. COMPUTER VISION: AI Optical Lens Viewfinder & Object Detection
function SceneComputerVision({ reduce }: { reduce: boolean }) {
    return (
        <svg viewBox="0 0 320 260" className="h-full w-full" fill="none">
            {/* Viewfinder Outer Frame */}
            <rect x="40" y="30" width="240" height="200" rx="12" stroke="#2EC4A5" strokeWidth="1.5" fill="rgba(46,196,165,0.03)" />
            
            {/* Optical Aperture Lens */}
            <circle cx="160" cy="130" r="60" stroke="#00D1FF" strokeWidth="1.5" strokeDasharray="6 4" />
            <circle cx="160" cy="130" r="30" stroke="#2EC4A5" strokeWidth="1.5" />
            <circle cx="160" cy="130" r="8" fill="#2EC4A5" />

            {/* AI Bounding Box Detection */}
            <motion.g animate={reduce ? {} : { scale: [1, 1.05, 1] }} transition={{ duration: 2.5, repeat: Infinity }}>
                <rect x="80" y="65" width="85" height="90" stroke="#2EC4A5" strokeWidth="1.8" strokeDasharray="4 2" fill="rgba(46,196,165,0.1)" />
                <rect x="80" y="52" width="70" height="14" fill="#2EC4A5" />
                <text x="85" y="62" fill="#04121F" fontSize="8" fontWeight="bold">TARGET: 99.4%</text>
            </motion.g>
        </svg>
    );
}

// 23. CONVERSATIONAL AI: Holographic Speech Waveform & Assistant Core
function SceneConversationalAi({ reduce }: { reduce: boolean }) {
    const bars = [25, 45, 70, 95, 60, 85, 40, 100, 75, 50, 80, 35];
    return (
        <svg viewBox="0 0 320 260" className="h-full w-full" fill="none">
            {/* Holographic Avatar Core */}
            <circle cx="160" cy="80" r="30" fill="rgba(0,209,255,0.15)" stroke="#00D1FF" strokeWidth="2" />
            <circle cx="160" cy="80" r="14" fill="#2EC4A5" />

            {/* Dynamic Speech Synthesis Waveform */}
            {bars.map((h, i) => (
                <motion.rect
                    key={i}
                    x={80 + i * 14}
                    y={180 - h / 2}
                    width="7"
                    height={h}
                    rx="3"
                    fill={i % 2 === 0 ? '#2EC4A5' : '#00D1FF'}
                    animate={reduce ? {} : { height: [h * 0.3, h, h * 0.4] }}
                    transition={{ duration: 1.2 + (i % 3) * 0.3, repeat: Infinity, repeatType: 'reverse' }}
                />
            ))}
        </svg>
    );
}

// 24. SEO & GEO: Google #1 Search Ranking Spotlight & Citation Tree
function SceneSeo({ reduce }: { reduce: boolean }) {
    return (
        <svg viewBox="0 0 320 260" className="h-full w-full" fill="none">
            {/* Google Search Card #1 */}
            <rect x="40" y="35" width="240" height="110" rx="12" stroke="#2EC4A5" strokeWidth="1.8" fill="#081422" />
            <rect x="60" y="55" width="55" height="18" rx="4" fill="#2EC4A5" />
            <text x="68" y="68" fill="#04121F" fontSize="9" fontWeight="bold">RANK #1</text>
            <rect x="125" y="58" width="135" height="10" rx="2" fill="#00D1FF" opacity="0.8" />
            <rect x="60" y="85" width="200" height="6" rx="1.5" fill="#FFF" opacity="0.5" />
            <rect x="60" y="98" width="160" height="6" rx="1.5" fill="#FFF" opacity="0.3" />

            {/* Compounding Exponential Curve */}
            <path d="M 40 230 Q 140 220, 200 180 T 280 145" stroke="#2EC4A5" strokeWidth="3" fill="none" />
            <circle cx="280" cy="145" r="5" fill="#2EC4A5" />
        </svg>
    );
}

// 25. DIGITAL MARKETING: Performance Multi-Channel Funnel & ROAS Counter
function SceneMarketing({ reduce }: { reduce: boolean }) {
    return (
        <svg viewBox="0 0 320 260" className="h-full w-full" fill="none">
            {/* Multi-Channel Funnel Stages */}
            <polygon points="60,40 260,40 220,85 100,85" stroke="#2EC4A5" strokeWidth="1.5" fill="rgba(46,196,165,0.15)" />
            <text x="135" y="65" fill="#FFF" fontSize="9" fontFamily="monospace">IMPRESSIONS</text>

            <polygon points="100,85 220,85 190,130 130,130" stroke="#00D1FF" strokeWidth="1.5" fill="rgba(0,209,255,0.18)" />
            <text x="145" y="110" fill="#FFF" fontSize="9" fontFamily="monospace">CLICKS</text>

            <polygon points="130,130 190,130 170,175 150,175" stroke="#8B5CF6" strokeWidth="1.5" fill="rgba(139,92,246,0.25)" />
            <text x="140" y="155" fill="#FFF" fontSize="9" fontFamily="monospace">CONVERT</text>

            {/* ROAS Badge */}
            <rect x="110" y="200" width="100" height="28" rx="6" stroke="#2EC4A5" strokeWidth="1.5" fill="#081422" />
            <text x="122" y="218" fill="#2EC4A5" fontSize="11" fontFamily="monospace" fontWeight="bold">ROAS: 4.8X</text>
        </svg>
    );
}

// 26. CRO OPTIMIZATION: A/B Split-Testing Balance Scale & Heatmap
function SceneCro({ reduce }: { reduce: boolean }) {
    return (
        <svg viewBox="0 0 320 260" className="h-full w-full" fill="none">
            {/* Balance Fulcrum */}
            <polygon points="160,150 175,200 145,200" stroke="#2EC4A5" strokeWidth="1.5" fill="rgba(46,196,165,0.2)" />
            <line x1="60" y1="130" x2="260" y2="110" stroke="#00D1FF" strokeWidth="3" />

            {/* Variant A (Standard) */}
            <rect x="40" y="130" width="60" height="40" rx="6" stroke="#FFF" strokeWidth="1" opacity="0.4" fill="#081422" />
            <text x="50" y="154" fill="#FFF" fontSize="9" fontFamily="monospace" opacity="0.6">VAR A</text>

            {/* Variant B (WINNER +42.8% LIFT) */}
            <motion.g animate={reduce ? {} : { scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <rect x="220" y="85" width="75" height="50" rx="8" stroke="#2EC4A5" strokeWidth="2" fill="#081E30" />
                <text x="230" y="105" fill="#2EC4A5" fontSize="10" fontWeight="bold">VAR B</text>
                <text x="230" y="122" fill="#00D1FF" fontSize="9" fontWeight="bold">+42.8%</text>
            </motion.g>
        </svg>
    );
}

// 27. SPEED OPTIMIZATION: 100/100 Lighthouse Speedometer Gauge & Turbo
function SceneSpeed({ reduce }: { reduce: boolean }) {
    return (
        <svg viewBox="0 0 320 260" className="h-full w-full" fill="none">
            {/* Circular Speed Gauge */}
            <circle cx="160" cy="130" r="85" stroke="rgba(255,255,255,0.1)" strokeWidth="12" fill="none" />
            <motion.circle
                cx="160"
                cy="130"
                r="85"
                stroke="#2EC4A5"
                strokeWidth="12"
                strokeDasharray="534"
                initial={{ strokeDashoffset: 534 }}
                animate={{ strokeDashoffset: 534 * 0.03 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                strokeLinecap="round"
                fill="none"
                style={{ transformOrigin: '160px 130px', transform: 'rotate(-90deg)' }}
            />
            <text x="135" y="140" fill="#FFF" fontSize="32" fontFamily="monospace" fontWeight="bold">100</text>
            <text x="125" y="160" fill="#2EC4A5" fontSize="10" fontFamily="monospace" fontWeight="bold">LIGHTHOUSE</text>
            
            <rect x="100" y="215" width="120" height="22" rx="4" fill="#081422" stroke="#00D1FF" strokeWidth="1" />
            <text x="110" y="230" fill="#00D1FF" fontSize="9" fontFamily="monospace">LCP: 0.38s (PASS)</text>
        </svg>
    );
}

// 28. GROWTH CONSULTING: Skyscraper Compounding Revenue Bar Chart
function SceneGrowth({ reduce }: { reduce: boolean }) {
    const bars = [30, 50, 75, 110, 155, 210];
    return (
        <svg viewBox="0 0 320 260" className="h-full w-full" fill="none">
            {/* Compounding Revenue Columns */}
            {bars.map((h, i) => (
                <rect
                    key={i}
                    x={55 + i * 38}
                    y={220 - h}
                    width="24"
                    height={h}
                    rx="4"
                    fill={i === bars.length - 1 ? '#2EC4A5' : 'rgba(0,209,255,0.3)'}
                    stroke={i === bars.length - 1 ? '#FFF' : '#00D1FF'}
                    strokeWidth="1.5"
                />
            ))}

            {/* Golden Exponential Trendline */}
            <path d="M 55 190 Q 150 170, 270 30" stroke="#F59E0B" strokeWidth="3" fill="none" strokeDasharray="4 2" />
            <circle cx="270" cy="30" r="6" fill="#F59E0B" />
            <text x="180" y="45" fill="#F59E0B" fontSize="11" fontFamily="monospace" fontWeight="bold">3.4x COMPOUNDING</text>
        </svg>
    );
}


// 29. WEB DESIGN: Art Direction & Responsive Viewport Canvas (Figma, Adobe XD, Photoshop, Illustrator)
function SceneWebDesign({ reduce }: { reduce: boolean }) {
    return (
        <svg viewBox="0 0 340 280" className="h-full w-full" fill="none">
            {/* Design Studio Frame */}
            <rect x="20" y="20" width="300" height="240" rx="14" fill="#030A12" stroke="#2EC4A5" strokeWidth="1.5" />
            
            {/* Top Toolbar with Design Tools */}
            <rect x="20" y="20" width="300" height="30" rx="14" fill="#071828" />
            <circle cx="38" cy="35" r="3.5" fill="#EF4444" />
            <circle cx="49" cy="35" r="3.5" fill="#F59E0B" />
            <circle cx="60" cy="35" r="3.5" fill="#10B981" />

            {/* Design Tool Chips in Toolbar */}
            <rect x="75" y="24" width="44" height="22" rx="4" fill="#0F2840" stroke="#2EC4A5" strokeWidth="0.8" />
            <text x="82" y="38" fill="#2EC4A5" fontSize="7" fontFamily="sans-serif" fontWeight="bold">Figma</text>

            <rect x="123" y="24" width="56" height="22" rx="4" fill="#470137" />
            <text x="130" y="38" fill="#FF61F6" fontSize="7" fontFamily="sans-serif" fontWeight="bold">Adobe XD</text>

            <rect x="183" y="24" width="56" height="22" rx="4" fill="#001E36" />
            <text x="189" y="38" fill="#31A8FF" fontSize="7" fontFamily="sans-serif" fontWeight="bold">Photoshop</text>

            <rect x="243" y="24" width="52" height="22" rx="4" fill="#330000" />
            <text x="248" y="38" fill="#FF9A00" fontSize="7" fontFamily="sans-serif" fontWeight="bold">Illustrator</text>

            {/* Art Direction Canvas */}
            <rect x="35" y="60" width="135" height="100" rx="6" fill="#071422" stroke="#00D1FF" strokeWidth="1" />
            <rect x="45" y="70" width="60" height="10" rx="3" fill="#2EC4A5" />
            <rect x="45" y="86" width="115" height="5" rx="2" fill="#FFF" opacity="0.4" />
            <rect x="45" y="96" width="95" height="5" rx="2" fill="#FFF" opacity="0.25" />
            <rect x="45" y="112" width="40" height="14" rx="4" fill="#00D1FF" />

            {/* Floating Hero Visual Artboard */}
            <motion.g
                animate={reduce ? {} : { y: [-4, 4, -4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
                <rect x="185" y="60" width="120" height="100" rx="8" fill="#0A2238" stroke="#2EC4A5" strokeWidth="1.2" />
                <polygon points="200,140 235,95 260,125 280,105 295,140" fill="rgba(46,196,165,0.25)" stroke="#2EC4A5" strokeWidth="1" />
                <circle cx="215" cy="85" r="10" fill="#F59E0B" />
                <rect x="195" y="148" width="50" height="5" rx="2" fill="#8B5CF6" />
            </motion.g>

            {/* Breakpoint Switcher Bar */}
            <g transform="translate(35, 170)">
                <rect x="0" y="0" width="270" height="36" rx="8" fill="#040C14" stroke="#FFF" strokeWidth="0.6" opacity="0.8" />
                <rect x="8" y="7" width="76" height="22" rx="5" fill="#2EC4A5" />
                <text x="18" y="21" fill="#000" fontSize="7.5" fontFamily="monospace" fontWeight="bold">DESK 1440</text>
                
                <rect x="94" y="7" width="76" height="22" rx="5" fill="#0A1C2E" stroke="#00D1FF" strokeWidth="0.8" />
                <text x="108" y="21" fill="#00D1FF" fontSize="7.5" fontFamily="monospace">TAB 768</text>

                <rect x="180" y="7" width="76" height="22" rx="5" fill="#0A1C2E" stroke="#8B5CF6" strokeWidth="0.8" />
                <text x="196" y="21" fill="#8B5CF6" fontSize="7.5" fontFamily="monospace">MOB 375</text>
            </g>

            {/* Live Design Inspection HUD */}
            <g transform="translate(35, 214)">
                <rect x="0" y="0" width="270" height="34" rx="6" fill="#020810" stroke="#00D1FF" strokeWidth="1" />
                <circle cx="15" cy="17" r="4" fill="#00D1FF" className={!reduce ? 'animate-ping' : ''} />
                <text x="26" y="16" fill="#00D1FF" fontSize="8" fontFamily="monospace" fontWeight="bold">FRAME: 1440x900 · AUTO-LAYOUT ACTIVE</text>
                <text x="26" y="27" fill="#FFF" fontSize="7" fontFamily="monospace" opacity="0.7">Tokens Synced: Figma · Adobe XD · Illustrator</text>
            </g>
        </svg>
    );
}

// 30. WEB DEVELOPMENT: Multi-Framework Ecosystem Hub (Laravel, PHP, Vue, React, Inertia, WordPress, Bootstrap)
function SceneWebDev({ reduce }: { reduce: boolean }) {
    return (
        <svg viewBox="0 0 340 280" className="h-full w-full" fill="none">
            {/* Multi-Tab IDE Frame */}
            <rect x="20" y="20" width="300" height="240" rx="14" fill="#040C14" stroke="#2EC4A5" strokeWidth="1.5" />
            
            {/* IDE Titlebar with Tabs */}
            <rect x="20" y="20" width="300" height="30" rx="14" fill="#071828" />
            <circle cx="38" cy="35" r="3.5" fill="#EF4444" />
            <circle cx="49" cy="35" r="3.5" fill="#F59E0B" />
            <circle cx="60" cy="35" r="3.5" fill="#10B981" />

            {/* Active Framework Tabs */}
            <rect x="75" y="24" width="56" height="22" rx="4" fill="#0A243D" stroke="#2EC4A5" strokeWidth="0.8" />
            <text x="82" y="38" fill="#2EC4A5" fontSize="7" fontFamily="monospace" fontWeight="bold">PHP/Laravel</text>

            <rect x="135" y="24" width="48" height="22" rx="4" fill="#06121E" />
            <text x="142" y="38" fill="#00D1FF" fontSize="7" fontFamily="monospace">React.tsx</text>

            <rect x="187" y="24" width="48" height="22" rx="4" fill="#06121E" />
            <text x="194" y="38" fill="#41B883" fontSize="7" fontFamily="monospace">Vue.vue</text>

            <rect x="239" y="24" width="46" height="22" rx="4" fill="#06121E" />
            <text x="245" y="38" fill="#8B5CF6" fontSize="7" fontFamily="monospace">Inertia.js</text>

            {/* Code Editor Body */}
            <g transform="translate(35, 62)">
                <text x="0" y="10" fill="#8B5CF6" fontSize="8.5" fontFamily="monospace">use</text>
                <text x="22" y="10" fill="#FFF" fontSize="8.5" fontFamily="monospace">App\Http\Controllers\CoreWeb;</text>

                <text x="0" y="26" fill="#00D1FF" fontSize="8.5" fontFamily="monospace">class</text>
                <text x="32" y="26" fill="#F59E0B" fontSize="8.5" fontFamily="monospace">WebEngine</text>
                <text x="85" y="26" fill="#00D1FF" fontSize="8.5" fontFamily="monospace">extends</text>
                <text x="125" y="26" fill="#2EC4A5" fontSize="8.5" fontFamily="monospace">UniversalStack</text>

                <text x="12" y="42" fill="#8B5CF6" fontSize="8.5" fontFamily="monospace">public function</text>
                <text x="85" y="42" fill="#F59E0B" fontSize="8.5" fontFamily="monospace">render(Request $req)</text>

                <text x="24" y="58" fill="#FFF" fontSize="8.5" fontFamily="monospace">return</text>
                <text x="60" y="58" fill="#2EC4A5" fontSize="8.5" fontFamily="monospace">Inertia::render('Web/App', [</text>

                <text x="36" y="74" fill="#00D1FF" fontSize="8" fontFamily="monospace">'frameworks' =&gt; ['Laravel', 'PHP', 'Vue', 'React', 'WordPress']</text>

                <text x="24" y="90" fill="#2EC4A5" fontSize="8.5" fontFamily="monospace">]);</text>
            </g>

            {/* Multi-Technology Stack Badges Grid */}
            <g transform="translate(32, 168)">
                <rect x="0" y="0" width="276" height="42" rx="8" fill="#020810" stroke="#00D1FF" strokeWidth="0.8" />
                
                {/* Tech Chips */}
                <rect x="8" y="8" width="58" height="12" rx="3" fill="#2EC4A5" opacity="0.2" />
                <text x="12" y="17" fill="#2EC4A5" fontSize="6.5" fontFamily="monospace" fontWeight="bold">PHP / CakePHP</text>

                <rect x="72" y="8" width="46" height="12" rx="3" fill="#EF4444" opacity="0.2" />
                <text x="76" y="17" fill="#EF4444" fontSize="6.5" fontFamily="monospace" fontWeight="bold">Laravel</text>

                <rect x="124" y="8" width="40" height="12" rx="3" fill="#41B883" opacity="0.2" />
                <text x="128" y="17" fill="#41B883" fontSize="6.5" fontFamily="monospace" fontWeight="bold">Vue.js</text>

                <rect x="170" y="8" width="44" height="12" rx="3" fill="#00D1FF" opacity="0.2" />
                <text x="174" y="17" fill="#00D1FF" fontSize="6.5" fontFamily="monospace" fontWeight="bold">React/Next</text>

                <rect x="220" y="8" width="48" height="12" rx="3" fill="#8B5CF6" opacity="0.2" />
                <text x="224" y="17" fill="#8B5CF6" fontSize="6.5" fontFamily="monospace" fontWeight="bold">Inertia.js</text>

                {/* Row 2 */}
                <rect x="8" y="24" width="58" height="12" rx="3" fill="#00749C" opacity="0.25" />
                <text x="12" y="33" fill="#38BDF8" fontSize="6.5" fontFamily="monospace" fontWeight="bold">WordPress CMS</text>

                <rect x="72" y="24" width="62" height="12" rx="3" fill="#7952B3" opacity="0.25" />
                <text x="76" y="33" fill="#C084FC" fontSize="6.5" fontFamily="monospace" fontWeight="bold">Bootstrap / CSS</text>

                <rect x="140" y="24" width="62" height="12" rx="3" fill="#38BDF8" opacity="0.25" />
                <text x="144" y="33" fill="#38BDF8" fontSize="6.5" fontFamily="monospace" fontWeight="bold">Tailwind CSS</text>

                <rect x="208" y="24" width="60" height="12" rx="3" fill="#F59E0B" opacity="0.25" />
                <text x="212" y="33" fill="#F59E0B" fontSize="6.5" fontFamily="monospace" fontWeight="bold">Node / TypeScript</text>
            </g>

            {/* Live Compiler & Execution Telemetry Bar */}
            <g transform="translate(32, 218)">
                <rect x="0" y="0" width="276" height="34" rx="6" fill="#030C16" stroke="#2EC4A5" strokeWidth="1" />
                <circle cx="15" cy="17" r="4" fill="#2EC4A5" className={!reduce ? 'animate-ping' : ''} />
                <text x="26" y="16" fill="#2EC4A5" fontSize="8" fontFamily="monospace" fontWeight="bold">FULL-STACK COMPILED &amp; READY</text>
                <text x="26" y="27" fill="#FFF" fontSize="7" fontFamily="monospace" opacity="0.7">API Latency: &lt;18ms · Multi-Runtime Engine Active</text>
            </g>
        </svg>
    );
}

// 31. WEBSITE REDESIGN: Before vs After Split Scanline & Conversion Lift
function SceneWebsiteRedesign({ reduce }: { reduce: boolean }) {
    return (
        <svg viewBox="0 0 340 280" className="h-full w-full" fill="none">
            {/* Split Screen Container */}
            <rect x="25" y="25" width="290" height="230" rx="14" fill="#06121E" stroke="#8B5CF6" strokeWidth="1.5" />
            
            {/* Left Side: Legacy Outdated Site */}
            <g opacity="0.45">
                <rect x="35" y="35" width="130" height="210" fill="#0F172A" />
                <rect x="45" y="48" width="70" height="12" fill="#64748B" />
                <rect x="45" y="70" width="110" height="6" fill="#475569" />
                <rect x="45" y="82" width="90" height="6" fill="#475569" />
                <rect x="45" y="100" width="40" height="14" rx="2" fill="#64748B" />
                <rect x="45" y="130" width="110" height="50" fill="#1E293B" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
                <text x="45" y="200" fill="#EF4444" fontSize="8" fontFamily="monospace" fontWeight="bold">SLOW LCP: 4.8s</text>
                <text x="45" y="215" fill="#EF4444" fontSize="8" fontFamily="monospace">BOUNCE: 72%</text>
            </g>

            {/* Right Side: Modernized High-Converting Flagship */}
            <g transform="translate(170, 0)">
                <rect x="0" y="35" width="135" height="210" fill="#061828" />
                <rect x="15" y="48" width="90" height="14" rx="4" fill="#2EC4A5" />
                <rect x="15" y="70" width="105" height="6" rx="2" fill="#FFF" opacity="0.7" />
                <rect x="15" y="82" width="80" height="6" rx="2" fill="#FFF" opacity="0.5" />
                <rect x="15" y="98" width="55" height="18" rx="9" fill="#2EC4A5" />
                <text x="25" y="110" fill="#000" fontSize="7" fontFamily="sans-serif" fontWeight="bold">CONVERT</text>
                <rect x="15" y="130" width="105" height="50" rx="8" fill="#0B263E" stroke="#2EC4A5" strokeWidth="1.2" />
                <circle cx="35" cy="155" r="12" fill="#00D1FF" opacity="0.4" />
                <text x="15" y="200" fill="#2EC4A5" fontSize="8" fontFamily="monospace" fontWeight="bold">FAST LCP: 0.4s</text>
                <text x="15" y="215" fill="#00D1FF" fontSize="8" fontFamily="monospace">UPLIFT: +224%</text>
            </g>

            {/* Dynamic Animated Central Laser Scanline */}
            <motion.line
                x1="170"
                y1="25"
                x2="170"
                y2="255"
                stroke="#00D1FF"
                strokeWidth="2"
                animate={reduce ? {} : { x1: [150, 190, 150], x2: [150, 190, 150] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Floating Badge */}
            <g transform="translate(110, 10)">
                <rect x="0" y="0" width="120" height="24" rx="12" fill="#040C16" stroke="#2EC4A5" strokeWidth="1" />
                <text x="14" y="16" fill="#2EC4A5" fontSize="8" fontFamily="monospace" fontWeight="bold">METAMORPHOSIS</text>
            </g>
        </svg>
    );
}

// 32. LANDING PAGE DESIGN: High-Conversion Lead Engine & A/B Pulse
function SceneLandingPage({ reduce }: { reduce: boolean }) {
    return (
        <svg viewBox="0 0 340 280" className="h-full w-full" fill="none">
            {/* Landing Page Viewport */}
            <rect x="30" y="25" width="280" height="230" rx="14" fill="#06121E" stroke="#2EC4A5" strokeWidth="1.5" />
            <rect x="30" y="25" width="280" height="26" rx="14" fill="#0A1E30" />
            <circle cx="48" cy="38" r="4" fill="#EF4444" />
            <circle cx="60" cy="38" r="4" fill="#F59E0B" />
            <circle cx="72" cy="38" r="4" fill="#10B981" />
            <text x="95" y="42" fill="#2EC4A5" fontSize="8" fontFamily="monospace">https://convert.ovoll.studio</text>

            {/* High-Impact Headline & Subhead */}
            <rect x="50" y="65" width="180" height="18" rx="4" fill="#2EC4A5" />
            <rect x="50" y="90" width="140" height="8" rx="2" fill="#FFF" opacity="0.6" />
            <rect x="50" y="103" width="110" height="8" rx="2" fill="#FFF" opacity="0.4" />

            {/* High-Converting Form Lead Input */}
            <g transform="translate(50, 125)">
                <rect x="0" y="0" width="150" height="26" rx="6" fill="#040C14" stroke="#00D1FF" strokeWidth="1" />
                <text x="10" y="16" fill="#FFF" fontSize="8" fontFamily="monospace" opacity="0.5">Enter your work email...</text>
                <motion.rect
                    x="155"
                    y="0"
                    width="75"
                    height="26"
                    rx="6"
                    fill="#2EC4A5"
                    animate={reduce ? {} : { scale: [1, 1.04, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <text x="168" y="16" fill="#000" fontSize="8" fontFamily="sans-serif" fontWeight="bold">GET ACCESS</text>
            </g>

            {/* Conversion Metrics Ticker Card */}
            <g transform="translate(50, 170)">
                <rect x="0" y="0" width="240" height="65" rx="10" fill="#051524" stroke="#2EC4A5" strokeWidth="1.2" />
                <text x="15" y="24" fill="#FFF" fontSize="9" fontFamily="sans-serif" fontWeight="bold">CAMPAIGN TELEMETRY</text>
                <text x="15" y="45" fill="#2EC4A5" fontSize="16" fontFamily="monospace" fontWeight="bold">+38.4%</text>
                <text x="100" y="45" fill="#00D1FF" fontSize="16" fontFamily="monospace" fontWeight="bold">8.4x</text>
                <text x="165" y="45" fill="#F59E0B" fontSize="16" fontFamily="monospace" fontWeight="bold">0.32s</text>
                <text x="15" y="56" fill="#FFF" fontSize="7" fontFamily="monospace" opacity="0.6">CONV RATE</text>
                <text x="100" y="56" fill="#FFF" fontSize="7" fontFamily="monospace" opacity="0.6">ROAS</text>
                <text x="165" y="56" fill="#FFF" fontSize="7" fontFamily="monospace" opacity="0.6">SPEED</text>
            </g>
        </svg>
    );
}

// 33. MVP DEVELOPMENT: 14-Day Sprint Launchpad, Auth, DB & Stripe Monitization
function SceneMvpDev({ reduce }: { reduce: boolean }) {
    return (
        <svg viewBox="0 0 340 280" className="h-full w-full" fill="none">
            {/* MVP Assembly Track */}
            <line x1="40" y1="130" x2="300" y2="130" stroke="#00D1FF" strokeWidth="2" strokeDasharray="4 4" />

            {/* Core MVP Feature Nodes */}
            <g transform="translate(45, 95)">
                <rect x="0" y="0" width="55" height="70" rx="8" fill="#0A1E32" stroke="#2EC4A5" strokeWidth="1.2" />
                <circle cx="27" cy="22" r="10" fill="#2EC4A5" opacity="0.2" />
                <text x="18" y="26" fill="#2EC4A5" fontSize="10" fontFamily="monospace" fontWeight="bold">AUTH</text>
                <text x="8" y="52" fill="#FFF" fontSize="7" fontFamily="monospace">Sanctum</text>
            </g>

            <g transform="translate(115, 95)">
                <rect x="0" y="0" width="55" height="70" rx="8" fill="#0A1E32" stroke="#00D1FF" strokeWidth="1.2" />
                <circle cx="27" cy="22" r="10" fill="#00D1FF" opacity="0.2" />
                <text x="15" y="26" fill="#00D1FF" fontSize="10" fontFamily="monospace" fontWeight="bold">DATA</text>
                <text x="6" y="52" fill="#FFF" fontSize="7" fontFamily="monospace">Postgres</text>
            </g>

            <g transform="translate(185, 95)">
                <rect x="0" y="0" width="55" height="70" rx="8" fill="#0A1E32" stroke="#8B5CF6" strokeWidth="1.2" />
                <circle cx="27" cy="22" r="10" fill="#8B5CF6" opacity="0.2" />
                <text x="12" y="26" fill="#8B5CF6" fontSize="10" fontFamily="monospace" fontWeight="bold">PAY</text>
                <text x="11" y="52" fill="#FFF" fontSize="7" fontFamily="monospace">Stripe</text>
            </g>

            <g transform="translate(255, 95)">
                <rect x="0" y="0" width="55" height="70" rx="8" fill="#0A1E32" stroke="#10B981" strokeWidth="1.2" />
                <circle cx="27" cy="22" r="10" fill="#10B981" opacity="0.2" />
                <text x="12" y="26" fill="#10B981" fontSize="10" fontFamily="monospace" fontWeight="bold">LIVE</text>
                <text x="10" y="52" fill="#FFF" fontSize="7" fontFamily="monospace">Deploy</text>
            </g>

            {/* Countdown Speed Header */}
            <g transform="translate(85, 30)">
                <rect x="0" y="0" width="170" height="34" rx="8" fill="#05121F" stroke="#2EC4A5" strokeWidth="1.2" />
                <circle cx="20" cy="17" r="5" fill="#2EC4A5" className={!reduce ? 'animate-ping' : ''} />
                <text x="35" y="21" fill="#FFF" fontSize="9" fontFamily="monospace" fontWeight="bold">SPRINT: 14 DAYS TO MVP</text>
            </g>

            {/* Live Stripe Monetization Pill */}
            <motion.g
                transform="translate(85, 195)"
                animate={reduce ? {} : { y: [-3, 3, -3] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
                <rect x="0" y="0" width="170" height="42" rx="10" fill="#07192C" stroke="#00D1FF" strokeWidth="1" />
                <text x="18" y="20" fill="#10B981" fontSize="11" fontFamily="monospace" fontWeight="bold">+$249.00 ARR</text>
                <text x="18" y="32" fill="#FFF" fontSize="8" fontFamily="monospace" opacity="0.7">New Customer Subscribed</text>
            </motion.g>
        </svg>
    );
}

// 34. MOBILE APP DESIGN: Native Gesture Studio & Dynamic Island
function SceneMobileAppDesign({ reduce }: { reduce: boolean }) {
    return (
        <svg viewBox="0 0 340 280" className="h-full w-full" fill="none">
            {/* Left Phone Backplate */}
            <g transform="translate(45, 50)" opacity="0.5">
                <rect x="0" y="0" width="95" height="175" rx="18" fill="#0A1828" stroke="#475569" strokeWidth="1" />
                <rect x="25" y="6" width="45" height="10" rx="5" fill="#000" />
            </g>

            {/* Right Phone Backplate */}
            <g transform="translate(200, 50)" opacity="0.5">
                <rect x="0" y="0" width="95" height="175" rx="18" fill="#0A1828" stroke="#475569" strokeWidth="1" />
                <rect x="25" y="6" width="45" height="10" rx="5" fill="#000" />
            </g>

            {/* Center Active iPhone 16 Pro Flagship */}
            <motion.g
                transform="translate(110, 20)"
                animate={reduce ? {} : { y: [-4, 4, -4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
                <rect x="0" y="0" width="120" height="235" rx="24" fill="#040D18" stroke="#00D1FF" strokeWidth="2" />
                
                {/* Dynamic Island */}
                <rect x="35" y="8" width="50" height="14" rx="7" fill="#000" stroke="#FFF" strokeWidth="0.5" opacity="0.8" />
                <circle cx="45" cy="15" r="2.5" fill="#2EC4A5" />
                <circle cx="75" cy="15" r="3" fill="#00D1FF" />

                {/* App Screen Content */}
                <rect x="15" y="36" width="90" height="40" rx="10" fill="#0A243D" stroke="#2EC4A5" strokeWidth="1" />
                <text x="25" y="55" fill="#2EC4A5" fontSize="8" fontFamily="monospace" fontWeight="bold">TOTAL ASSETS</text>
                <text x="25" y="68" fill="#FFF" fontSize="11" fontFamily="sans-serif" fontWeight="bold">$48,920.00</text>

                {/* Gesture Path Ripple */}
                <circle cx="60" cy="130" r="18" stroke="#00D1FF" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.7" />
                <circle cx="60" cy="130" r="6" fill="#00D1FF" className={!reduce ? 'animate-ping' : ''} />
                <text x="35" y="165" fill="#00D1FF" fontSize="7" fontFamily="monospace">SWIPE GESTURE</text>

                {/* Bottom Native Tab Bar */}
                <rect x="15" y="195" width="90" height="28" rx="14" fill="#081A2E" stroke="#FFF" strokeWidth="0.5" opacity="0.8" />
                <circle cx="30" cy="209" r="4" fill="#2EC4A5" />
                <circle cx="60" cy="209" r="4" fill="#FFF" opacity="0.4" />
                <circle cx="90" cy="209" r="4" fill="#FFF" opacity="0.4" />
            </motion.g>
        </svg>
    );
}

// 35. CYBERSECURITY: Impenetrable Zero-Trust Perimeter Shield & DDoS Defense
function SceneSecurityHardening({ reduce }: { reduce: boolean }) {
    return (
        <svg viewBox="0 0 340 280" className="h-full w-full" fill="none">
            {/* Hexagonal Shield Forcefield Perimeter */}
            <motion.polygon
                points="170,30 255,75 255,185 170,230 85,185 85,75"
                stroke="#2EC4A5"
                strokeWidth="2"
                fill="rgba(6,22,36,0.85)"
                animate={reduce ? {} : { scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: '170px 130px' }}
            />

            <polygon points="170,50 235,85 235,170 170,205 105,170 105,85" stroke="#00D1FF" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.6" />

            {/* Central Cryptographic Lock Vault */}
            <rect x="145" y="115" width="50" height="40" rx="8" fill="#0A2A44" stroke="#FFF" strokeWidth="1.5" />
            <path d="M 155 115 A 15 15 0 0 1 185 115" stroke="#FFF" strokeWidth="2.5" fill="none" />
            <circle cx="170" cy="132" r="4" fill="#2EC4A5" />
            <line x1="170" y1="136" x2="170" y2="144" stroke="#2EC4A5" strokeWidth="2" />

            {/* Deflected DDoS Threat Attack Packets */}
            <motion.g
                animate={reduce ? {} : { x: [10, -5, 10] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                <circle cx="55" cy="80" r="4" fill="#EF4444" />
                <line x1="40" y1="80" x2="80" y2="80" stroke="#EF4444" strokeWidth="1.5" />
                <text x="35" y="70" fill="#EF4444" fontSize="7" fontFamily="monospace">DDoS 403</text>
            </motion.g>

            {/* Live Security Clearance Badge */}
            <g transform="translate(85, 205)">
                <rect x="0" y="0" width="170" height="26" rx="6" fill="#030C16" stroke="#2EC4A5" strokeWidth="1" />
                <circle cx="14" cy="13" r="4" fill="#2EC4A5" className={!reduce ? 'animate-ping' : ''} />
                <text x="25" y="17" fill="#2EC4A5" fontSize="8" fontFamily="monospace" fontWeight="bold">ZERO-TRUST: 0 VULNERABILITIES</text>
            </g>
        </svg>
    );
}

/* =========================================================================
   MAIN SERVICE HERO VISUAL COMPONENT
   ========================================================================= */

export function ServiceHeroVisual({ service, className = '' }: ServiceHeroVisualProps) {
    const reduce = useReducedMotion();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (reduce) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x: x * 16, y: y * 16 });
    };

    // Extract exact slug to render its dedicated scene
    const slug = (service.slug || '').toLowerCase();

    // Gather flagship technologies to showcase as orbital corner badges (4 corners with zero artwork overlap)
    const techBadges = useMemo(() => {
        if (service.technologies && service.technologies.length > 0) {
            return service.technologies.slice(0, 4);
        }
        return [
            { name: 'Laravel' },
            { name: 'React' },
            { name: 'TypeScript' },
            { name: 'Figma' }
        ];
    }, [service.technologies]);

    // Strategic 4-corner orbital coordinates around the card perimeter
    const positions = [
        '-top-3.5 -left-3.5',
        '-top-3.5 -right-3.5',
        '-bottom-3.5 -left-3.5',
        '-bottom-3.5 -right-3.5',
    ];

    return (
        <div 
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
            className={`relative flex h-full min-h-[460px] w-full items-center justify-center select-none ${className}`}
        >
            {/* Ambient Nebula Backing Aura */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(0,209,255,0.22),transparent_70%)] blur-3xl" />
                <div className="h-80 w-80 translate-x-8 -translate-y-8 rounded-full bg-[radial-gradient(circle,rgba(46,196,165,0.18),transparent_70%)] blur-3xl" />
            </div>

            {/* Parallax Interactive 3D Canvas */}
            <motion.div
                animate={{ rotateX: -mousePos.y, rotateY: mousePos.x }}
                transition={{ type: 'spring', stiffness: 140, damping: 20 }}
                style={{ perspective: 1200 }}
                className="relative flex h-full w-full max-w-[440px] items-center justify-center"
            >
                {/* Glass Framing Shield for the Bespoke Animated Vector Scene */}
                <div className="relative group flex h-full min-h-[380px] w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-b from-white/[0.08] to-[#081320]/95 p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-2xl transition-all duration-500 hover:border-[#2EC4A5]/60 hover:shadow-[0_0_50px_rgba(46,196,165,0.25)]">
                    {/* Top Sweeping Gradient Sheen */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.12] via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
                    
                    {/* Dedicated 28-Scene Dynamic Routing (NO CLONES) */}
                    <div className="relative flex h-[290px] w-full items-center justify-center">
                        {slug === 'branding' && <SceneBranding reduce={reduce} />}
                        {slug === 'packaging-design' && <ScenePackaging reduce={reduce} />}
                        {slug === 'stationery-kits' && <SceneStationery reduce={reduce} />}
                        {slug === 'design-systems' && <SceneDesignSystems reduce={reduce} />}
                        {slug === 'product-design' && <SceneProductDesign reduce={reduce} />}
                        {slug === 'printing-services' && <ScenePrinting reduce={reduce} />}
                        {slug === 'motion-design' && <SceneMotionDesign reduce={reduce} />}

                        {slug === 'ui-ux' && <SceneUiUx reduce={reduce} />}
                        {slug === 'web-app-development' && <SceneWebApp reduce={reduce} />}
                        {slug === 'app-development' && <SceneMobileApp reduce={reduce} />}
                        {slug === 'saas-platforms' && <SceneSaasPlatforms reduce={reduce} />}
                        {slug === 'ecommerce-platforms' && <SceneEcommerce reduce={reduce} />}
                        {slug === 'internal-portals' && <SceneInternalPortals reduce={reduce} />}

                        {slug === 'website-design-development' && <SceneWebsiteDev reduce={reduce} />}
                        {slug === 'product-development' && <SceneProductDev reduce={reduce} />}
                        {slug === 'api-backends' && <SceneApiBackends reduce={reduce} />}
                        {slug === 'cloud-devops' && <SceneDevOps reduce={reduce} />}
                        {slug === 'realtime-systems' && <SceneRealtime reduce={reduce} />}

                        {slug === 'ai-workflows' && <SceneAiWorkflows reduce={reduce} />}
                        {slug === 'workflow-automation' && <SceneAutomation reduce={reduce} />}
                        {slug === 'rag-enterprise-search' && <SceneRagSearch reduce={reduce} />}
                        {slug === 'computer-vision' && <SceneComputerVision reduce={reduce} />}
                        {slug === 'conversational-ai' && <SceneConversationalAi reduce={reduce} />}

                        {slug === 'seo' && <SceneSeo reduce={reduce} />}
                        {slug === 'digital-marketing' && <SceneMarketing reduce={reduce} />}
                        {slug === 'cro-optimization' && <SceneCro reduce={reduce} />}
                        {slug === 'speed-optimization' && <SceneSpeed reduce={reduce} />}
                        {slug === 'growth-consulting' && <SceneGrowth reduce={reduce} />}
                        {slug === 'web-design' && <SceneWebDesign reduce={reduce} />}
                        {slug === 'web-development' && <SceneWebDev reduce={reduce} />}
                        {slug === 'website-redesign' && <SceneWebsiteRedesign reduce={reduce} />}
                        {slug === 'landing-page-design' && <SceneLandingPage reduce={reduce} />}
                        {slug === 'mvp-development' && <SceneMvpDev reduce={reduce} />}
                        {slug === 'mobile-app-design' && <SceneMobileAppDesign reduce={reduce} />}
                        {slug === 'security-hardening' && <SceneSecurityHardening reduce={reduce} />}

                        {/* Fallback gracefully if custom slug */}
                        {!['branding','packaging-design','stationery-kits','design-systems','product-design','printing-services','motion-design','ui-ux','web-app-development','app-development','saas-platforms','ecommerce-platforms','internal-portals','website-design-development','product-development','api-backends','cloud-devops','realtime-systems','ai-workflows','workflow-automation','rag-enterprise-search','computer-vision','conversational-ai','seo','digital-marketing','cro-optimization','speed-optimization','growth-consulting'].includes(slug) && (
                            <SceneWebApp reduce={reduce} />
                        )}
                    </div>

                    {/* Lower HUD Overlay Bar */}
                    <div className="mt-3 flex w-full items-center justify-between rounded-xl border border-white/15 bg-[#071320]/85 px-4 py-2 shadow-lg backdrop-blur-md">
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-[#2EC4A5]" />
                            <span className="font-mono text-[10px] font-bold tracking-widest text-white uppercase truncate max-w-[200px]">
                                {service.name}
                            </span>
                        </div>
                        <span className="rounded border border-[#00D1FF]/40 bg-[#00D1FF]/10 px-2 py-0.5 font-mono text-[9px] font-bold text-[#00D1FF]">
                            DYNAMIC ARCHITECTURE
                        </span>
                    </div>
                </div>

                {/* Floating Orbiting Tech Badges with Real SVG Logos */}
                {techBadges.map((tech, idx) => (
                    <FloatingTechBadge
                        key={tech.name}
                        tech={tech}
                        positionClass={positions[idx % positions.length]!}
                        delay={0.12 * idx}
                    />
                ))}
            </motion.div>
        </div>
    );
}

export default ServiceHeroVisual;
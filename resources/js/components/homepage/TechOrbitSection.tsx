import { useState } from 'react';
import { Reveal } from '@/animations';

export interface TechItem {
    name: string;
    desc: string;
    category?: 'client' | 'core' | 'cloud' | 'ai';
    version?: string;
    metric?: string;
    color?: string;
}

interface TechOrbitSectionProps {
    content: {
        headline: string;
        description: string;
        techs: TechItem[];
    };
    settings?: {
        orbit_radius?: number;
        orbit_speed?: number;
    };
}

// --------------------------------------------------------------------------
// TECH METADATA CATALOG
// --------------------------------------------------------------------------
interface TechMeta {
    file: string;
    category: 'client' | 'core' | 'cloud' | 'ai';
    categoryLabel: string;
    version: string;
    role: string;
    metric: string;
    accentColor: string;
    glow: string;
}

const TECH_CATALOG: Record<string, TechMeta> = {
    react: {
        file: 'react.svg',
        category: 'client',
        categoryLabel: 'CLIENT LAYER',
        version: 'v19.0',
        role: 'Component Architecture & Virtual DOM',
        metric: '16ms Frame Budget',
        accentColor: '#00D1FF',
        glow: 'rgba(0, 209, 255, 0.25)',
    },
    tailwind: {
        file: 'tailwindcss.svg',
        category: 'client',
        categoryLabel: 'CLIENT LAYER',
        version: 'v4.0',
        role: 'Design Tokens & Zero-Runtime CSS Engine',
        metric: 'Zero Bundle Overhead',
        accentColor: '#2EC4A5',
        glow: 'rgba(46, 196, 165, 0.25)',
    },
    tailwindcss: {
        file: 'tailwindcss.svg',
        category: 'client',
        categoryLabel: 'CLIENT LAYER',
        version: 'v4.0',
        role: 'Design Tokens & Zero-Runtime CSS Engine',
        metric: 'Zero Bundle Overhead',
        accentColor: '#2EC4A5',
        glow: 'rgba(46, 196, 165, 0.25)',
    },
    typescript: {
        file: 'typescript.svg',
        category: 'client',
        categoryLabel: 'CLIENT LAYER',
        version: 'v5.x',
        role: 'End-to-End Type Safety & Data Contracts',
        metric: '100% Type Coverage',
        accentColor: '#3178C6',
        glow: 'rgba(49, 120, 198, 0.25)',
    },
    ts: {
        file: 'typescript.svg',
        category: 'client',
        categoryLabel: 'CLIENT LAYER',
        version: 'v5.x',
        role: 'End-to-End Type Safety & Data Contracts',
        metric: '100% Type Coverage',
        accentColor: '#3178C6',
        glow: 'rgba(49, 120, 198, 0.25)',
    },
    gsap: {
        file: 'greensock.svg',
        category: 'client',
        categoryLabel: 'CLIENT LAYER',
        version: 'v3.12',
        role: 'Spring Physics & Scroll-Driven Choreography',
        metric: '60 FPS Hardware Sync',
        accentColor: '#88CE02',
        glow: 'rgba(136, 206, 2, 0.22)',
    },
    laravel: {
        file: 'laravel.svg',
        category: 'core',
        categoryLabel: 'CORE ENGINE',
        version: 'v13.x',
        role: 'Stateless API Core & High-Throughput Pipelines',
        metric: '< 28ms Edge TTFB',
        accentColor: '#FF2D20',
        glow: 'rgba(255, 45, 32, 0.25)',
    },
    inertia: {
        file: 'inertia.svg',
        category: 'core',
        categoryLabel: 'CORE ENGINE',
        version: 'v3.0',
        role: 'Seamless Monolithic SPA Bridge & State Hydration',
        metric: 'Instant Page Visits',
        accentColor: '#9553E9',
        glow: 'rgba(149, 83, 233, 0.25)',
    },
    nodejs: {
        file: 'nodedotjs.svg',
        category: 'core',
        categoryLabel: 'CORE ENGINE',
        version: 'v22 LTS',
        role: 'Asynchronous Event Loop & Tooling Runtime',
        metric: 'Non-Blocking I/O',
        accentColor: '#5FA04E',
        glow: 'rgba(95, 160, 78, 0.25)',
    },
    node: {
        file: 'nodedotjs.svg',
        category: 'core',
        categoryLabel: 'CORE ENGINE',
        version: 'v22 LTS',
        role: 'Asynchronous Event Loop & Tooling Runtime',
        metric: 'Non-Blocking I/O',
        accentColor: '#5FA04E',
        glow: 'rgba(95, 160, 78, 0.25)',
    },
    php: {
        file: 'php.svg',
        category: 'core',
        categoryLabel: 'CORE ENGINE',
        version: 'v8.4',
        role: 'JIT-Compiled Backend Runtime & Strict Typing',
        metric: 'Native Concurrency',
        accentColor: '#777BB4',
        glow: 'rgba(119, 123, 180, 0.25)',
    },
    docker: {
        file: 'docker.svg',
        category: 'cloud',
        categoryLabel: 'EDGE & CLOUD',
        version: 'OCI Compliant',
        role: 'Immutable Containerized Micro-Architectures',
        metric: 'Zero-Drift Deployments',
        accentColor: '#2496ED',
        glow: 'rgba(36, 150, 237, 0.25)',
    },
    cloudflare: {
        file: 'cloudflare.svg',
        category: 'cloud',
        categoryLabel: 'EDGE & CLOUD',
        version: 'Global Anycast',
        role: 'Global Edge Caching, DDoS Shield & DNS Routing',
        metric: '< 10ms Global DNS',
        accentColor: '#F38020',
        glow: 'rgba(243, 128, 32, 0.25)',
    },
    supabase: {
        file: 'supabase.svg',
        category: 'cloud',
        categoryLabel: 'EDGE & CLOUD',
        version: 'PostgreSQL 16',
        role: 'Realtime Data Sync & Row-Level Security',
        metric: 'Sub-Millisecond Read',
        accentColor: '#3ECF8E',
        glow: 'rgba(62, 207, 142, 0.25)',
    },
    anthropic: {
        file: 'anthropic.svg',
        category: 'ai',
        categoryLabel: 'AI & INTELLIGENCE',
        version: 'Claude 3.5',
        role: 'Contextual AI Workflows & Autonomous Tool Use',
        metric: 'Structured JSON Outputs',
        accentColor: '#D97706',
        glow: 'rgba(217, 119, 6, 0.25)',
    },
    python: {
        file: 'python.svg',
        category: 'ai',
        categoryLabel: 'AI & INTELLIGENCE',
        version: 'v3.12',
        role: 'Telemetry Analytics & Machine Learning Models',
        metric: 'Optimized NumPy/PyTorch',
        accentColor: '#3776AB',
        glow: 'rgba(55, 118, 171, 0.25)',
    },
    figma: {
        file: 'figma.svg',
        category: 'client',
        categoryLabel: 'CLIENT LAYER',
        version: 'Enterprise',
        role: 'Atomic Design Systems & Auto-Layout Tokens',
        metric: '100% Code Cohesion',
        accentColor: '#F24E1E',
        glow: 'rgba(242, 78, 30, 0.25)',
    },
};

function resolveTech(name: string, fallbackDesc: string): TechMeta & { name: string } {
    const slug = name.toLowerCase().replace(/[.\s-]/g, '');
    const meta = TECH_CATALOG[slug] ?? {
        file: 'react.svg',
        category: 'core' as const,
        categoryLabel: 'CORE ENGINE',
        version: 'Modern',
        role: fallbackDesc || 'High-Performance Architecture Component',
        metric: 'Sub-30ms Budget',
        accentColor: '#2EC4A5',
        glow: 'rgba(46, 196, 165, 0.25)',
    };
    return { ...meta, name };
}

// --------------------------------------------------------------------------
// CATEGORY TABS
// --------------------------------------------------------------------------
type CategoryKey = 'all' | 'client' | 'core' | 'cloud' | 'ai';

const CATEGORIES: { key: CategoryKey; label: string }[] = [
    { key: 'all', label: 'All Architecture' },
    { key: 'client', label: 'Client & UI' },
    { key: 'core', label: 'Backend Core' },
    { key: 'cloud', label: 'Edge & Cloud' },
    { key: 'ai', label: 'AI & Telemetry' },
];

const DEFAULT_TECH = resolveTech('React', 'Frontend Engine');

// --------------------------------------------------------------------------
// MAIN COMPONENT: ARCHITECTURE BENTO MATRIX & LIVE TELEMETRY
// --------------------------------------------------------------------------
export function TechOrbitSection({ content }: TechOrbitSectionProps) {
    const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');
    const [hoveredTech, setHoveredTech] = useState<ReturnType<typeof resolveTech> | null>(null);

    // Resolve all techs with their metadata
    const allTechs = (content?.techs || []).map((t) => resolveTech(t.name, t.desc));

    // Filter by active category tab
    const filteredTechs =
        selectedCategory === 'all'
            ? allTechs
            : allTechs.filter((t) => t.category === selectedCategory);

    // Active displayed tech (either hovered, or default to first tech in view)
    const activeTech = hoveredTech || filteredTechs[0] || allTechs[0] || DEFAULT_TECH;

    return (
        <section className="relative w-full overflow-hidden bg-[#0A121E] px-6 py-24 text-white md:py-32">
            {/* Ambient Multi-Layer Mesh Backdrops */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-1/4 -left-32 h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle,_rgba(46,196,165,0.08)_0%,_transparent_70%)] blur-3xl" />
                <div className="absolute right-0 bottom-10 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,_rgba(0,209,255,0.06)_0%,_transparent_70%)] blur-3xl" />
                <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(149,83,233,0.04)_0%,_transparent_70%)] blur-[140px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl">
                <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
                    {/* Left Column: Context & Architectural Principles */}
                    <Reveal variant="fade" className="space-y-6 lg:sticky lg:top-28 lg:col-span-5">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#2EC4A5]/30 bg-[#2EC4A5]/10 px-4 py-1.5 font-mono text-xs font-bold tracking-widest text-[#2EC4A5] uppercase backdrop-blur-md">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-[#2EC4A5]" />
                            ENTERPRISE STACK TOPOLOGY
                        </div>

                        <h2 className="font-sans text-3xl leading-tight font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                            POWERING DIGITAL STANDARDS WITH AN{' '}
                            <span className="bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF] bg-clip-text text-transparent">
                                ELITE STACK ARCHITECTURE
                            </span>
                        </h2>

                        <p className="font-sans text-sm leading-relaxed text-slate-300">
                            We architect on battle-tested, type-safe frameworks calibrated for
                            sub-30ms edge latency, zero unnecessary runtime bloat, and resilient
                            cloud infrastructures engineered for effortless scale.
                        </p>

                        {/* Benchmark Badges */}
                        <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
                            <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#0E1726]/80 px-3.5 py-3 font-mono text-xs font-semibold text-slate-200 backdrop-blur-md transition-all hover:border-[#2EC4A5]/40 hover:bg-[#0E1726]">
                                <span className="h-2 w-2 rounded-full bg-[#2EC4A5] shadow-[0_0_8px_rgba(46,196,165,0.8)]" />
                                Sub-30ms Edge Latency
                            </div>
                            <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#0E1726]/80 px-3.5 py-3 font-mono text-xs font-semibold text-slate-200 backdrop-blur-md transition-all hover:border-[#00D1FF]/40 hover:bg-[#0E1726]">
                                <span className="h-2 w-2 rounded-full bg-[#00D1FF] shadow-[0_0_8px_rgba(0,209,255,0.8)]" />
                                100% Strict Type Safety
                            </div>
                            <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#0E1726]/80 px-3.5 py-3 font-mono text-xs font-semibold text-slate-200 backdrop-blur-md transition-all hover:border-[#9553E9]/40 hover:bg-[#0E1726]">
                                <span className="h-2 w-2 rounded-full bg-[#9553E9] shadow-[0_0_8px_rgba(149,83,233,0.8)]" />
                                Monolithic Speed Bridge
                            </div>
                            <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#0E1726]/80 px-3.5 py-3 font-mono text-xs font-semibold text-slate-200 backdrop-blur-md transition-all hover:border-[#3ECF8E]/40 hover:bg-[#0E1726]">
                                <span className="h-2 w-2 rounded-full bg-[#3ECF8E] shadow-[0_0_8px_rgba(62,207,142,0.8)]" />
                                Immutable Zero-Drift CI
                            </div>
                        </div>

                        {/* Interactive Hint */}
                        <div className="flex items-center gap-2 pt-2 font-mono text-[11px] text-slate-400">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#00D1FF]" />
                            Hover any component on the right to inspect architectural telemetry.
                        </div>
                    </Reveal>

                    {/* Right Column: Architecture Bento Matrix & Live Inspector HUD */}
                    <div className="space-y-6 lg:col-span-7">
                        {/* 1. LIVE TELEMETRY INSPECTOR HUD */}
                        <div
                            className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0C1524]/90 p-5 shadow-2xl backdrop-blur-xl transition-all duration-300"
                            style={{
                                boxShadow: activeTech
                                    ? `0 10px 40px -10px ${activeTech.glow}`
                                    : undefined,
                            }}
                        >
                            {/* Ambient Top Glow Line */}
                            <div
                                className="absolute inset-x-0 top-0 h-[2px] transition-all duration-500"
                                style={{
                                    background: activeTech
                                        ? `linear-gradient(90deg, transparent, ${activeTech.accentColor}, transparent)`
                                        : 'linear-gradient(90deg, transparent, #2EC4A5, transparent)',
                                }}
                            />

                            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                                {/* Left: Active Tech Branding & Role */}
                                <div className="flex items-center gap-3.5">
                                    <div
                                        className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2.5 shadow-inner transition-all duration-300"
                                        style={{
                                            borderColor: `${activeTech.accentColor}50`,
                                            backgroundColor: `${activeTech.accentColor}15`,
                                        }}
                                    >
                                        <img
                                            src={`/tech-icons/${activeTech.file}`}
                                            alt={activeTech.name}
                                            className="h-full w-full object-contain"
                                            loading="lazy"
                                        />
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-sans text-base font-bold tracking-tight text-white sm:text-lg">
                                                {activeTech.name}
                                            </h3>
                                            <span
                                                className="rounded-md border px-1.5 py-0.5 font-mono text-[10px] font-bold"
                                                style={{
                                                    borderColor: `${activeTech.accentColor}40`,
                                                    color: activeTech.accentColor,
                                                    backgroundColor: `${activeTech.accentColor}10`,
                                                }}
                                            >
                                                {activeTech.version}
                                            </span>
                                        </div>
                                        <p className="mt-0.5 font-sans text-xs text-slate-300">
                                            {activeTech.role}
                                        </p>
                                    </div>
                                </div>

                                {/* Right: Telemetry Metric & Status Pill */}
                                <div className="flex shrink-0 items-center gap-3 border-t border-white/10 pt-3 sm:border-t-0 sm:pt-0">
                                    <div className="text-left sm:text-right">
                                        <span className="block font-mono text-[9px] font-bold tracking-wider text-slate-400 uppercase">
                                            Benchmark Target
                                        </span>
                                        <span
                                            className="font-mono text-xs font-bold transition-colors"
                                            style={{ color: activeTech.accentColor }}
                                        >
                                            {activeTech.metric}
                                        </span>
                                    </div>
                                    <div className="flex h-2.5 w-2.5 items-center justify-center">
                                        <span className="relative flex h-2 w-2">
                                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2EC4A5] opacity-75" />
                                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2EC4A5]" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. CATEGORY SELECTOR TABS */}
                        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
                            {CATEGORIES.map((cat) => {
                                const isActive = selectedCategory === cat.key;
                                return (
                                    <button
                                        key={cat.key}
                                        onClick={() => setSelectedCategory(cat.key)}
                                        className={`cursor-pointer rounded-lg px-3 py-1.5 font-mono text-xs font-bold tracking-wide transition-all duration-200 select-none ${
                                            isActive
                                                ? 'border border-[#2EC4A5]/40 bg-[#2EC4A5]/15 text-[#2EC4A5] shadow-[0_0_12px_rgba(46,196,165,0.2)]'
                                                : 'border border-transparent text-slate-400 hover:border-white/10 hover:bg-white/5 hover:text-white'
                                        }`}
                                    >
                                        {cat.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* 3. BENTO ARCHITECTURE GRID */}
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                            {filteredTechs.map((tech) => {
                                const isHovered = activeTech.name === tech.name;
                                return (
                                    <div
                                        key={tech.name}
                                        onMouseEnter={() => setHoveredTech(tech)}
                                        className={`group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-xl border p-4 transition-all duration-300 select-none ${
                                            isHovered
                                                ? 'scale-[1.02] border-white/30 bg-[#0F1C2E] shadow-lg'
                                                : 'border-white/10 bg-[#0C1524]/75 hover:border-white/20 hover:bg-[#0E1A2B]'
                                        }`}
                                        style={{
                                            borderColor: isHovered
                                                ? tech.accentColor
                                                : 'rgba(255, 255, 255, 0.1)',
                                            boxShadow: isHovered
                                                ? `0 0 24px -6px ${tech.glow}`
                                                : undefined,
                                        }}
                                    >
                                        {/* Subtle top indicator bar on hover */}
                                        <div
                                            className="absolute inset-x-0 top-0 h-[2px] transition-opacity duration-300"
                                            style={{
                                                backgroundColor: tech.accentColor,
                                                opacity: isHovered ? 1 : 0,
                                            }}
                                        />

                                        {/* Card Top: Icon & Category Tag */}
                                        <div className="flex items-start justify-between gap-2">
                                            <div
                                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 p-1.5 transition-all duration-300 group-hover:scale-105"
                                                style={{
                                                    backgroundColor: isHovered
                                                        ? `${tech.accentColor}18`
                                                        : 'rgba(255, 255, 255, 0.04)',
                                                    borderColor: isHovered
                                                        ? `${tech.accentColor}50`
                                                        : 'rgba(255, 255, 255, 0.1)',
                                                }}
                                            >
                                                <img
                                                    src={`/tech-icons/${tech.file}`}
                                                    alt={tech.name}
                                                    loading="lazy"
                                                    className="h-full w-full object-contain"
                                                />
                                            </div>

                                            <span className="font-mono text-[9px] font-bold tracking-wider text-slate-500 uppercase transition-colors group-hover:text-slate-300">
                                                {tech.categoryLabel.split(' ')[0]}
                                            </span>
                                        </div>

                                        {/* Card Bottom: Tech Name & Specs */}
                                        <div className="mt-4 space-y-1">
                                            <div className="flex items-center justify-between">
                                                <span className="font-sans text-sm font-bold text-white transition-colors group-hover:text-white">
                                                    {tech.name}
                                                </span>
                                                <span
                                                    className="font-mono text-[10px] font-semibold opacity-80"
                                                    style={{ color: tech.accentColor }}
                                                >
                                                    {tech.version}
                                                </span>
                                            </div>

                                            <p className="line-clamp-1 font-mono text-[10px] text-slate-400 transition-colors group-hover:text-slate-300">
                                                {tech.role}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* 4. FOOTER NOTE */}
                        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 font-mono text-xs text-slate-400">
                            <span className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#2EC4A5]" />
                                Architecture Topology v4.2 // Sub-30ms Global Response Budget
                            </span>
                            <span className="text-[11px] text-[#00D1FF]">
                                100% Production Verified
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

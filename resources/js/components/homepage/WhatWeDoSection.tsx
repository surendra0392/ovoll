import { Link } from '@inertiajs/react';
import {
    ArrowUpRight,
    BrainCircuit,
    CheckCircle2,
    Globe,
    Layers,
    LineChart,
    PenTool,
    Smartphone,
    Sparkles,
    Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { Reveal } from '@/animations';

interface ServiceCard {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    desc: string;
    icon: LucideIcon;
    color: string;
    glow: string;
    borderHover: string;
    gradientBar: string;
    metric: string;
    metricLabel: string;
    tags: string[];
    highlights: string[];
}

export function WhatWeDoSection() {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState({ x: 500, y: 300 });
    const [isHoveringSection, setIsHoveringSection] = useState(false);

    const handleSectionMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const services: ServiceCard[] = [
        {
            id: '01',
            slug: 'branding',
            title: 'Brand Identity & Strategy',
            subtitle: 'Visual Systems & Positioning',
            desc: 'We architect complete brand identities—from logo marks and Pantone systems to brand voice guidelines and corporate collateral.',
            icon: PenTool,
            color: '#00D1FF',
            glow: 'rgba(0, 209, 255, 0.18)',
            borderHover: 'hover:border-[#00D1FF]/50',
            gradientBar: 'from-[#00D1FF] to-[#3B82F6]',
            metric: '100% IP',
            metricLabel: 'Full Asset Transfer',
            tags: ['Figma Tokens', 'Vector Systems', 'Brand Books', 'Typography'],
            highlights: ['Design System Architecture', 'Multi-Format Export Matrix'],
        },
        {
            id: '02',
            slug: 'web-app-development',
            title: 'Web Platforms & Products',
            subtitle: 'High-Performance Web Engines',
            desc: 'Building bespoke full-stack applications with sub-30ms response budgets, GPU-accelerated micro-interactions, and resilient cloud architecture.',
            icon: Globe,
            color: '#2EC4A5',
            glow: 'rgba(46, 196, 165, 0.20)',
            borderHover: 'hover:border-[#2EC4A5]/50',
            gradientBar: 'from-[#2EC4A5] to-[#00D1FF]',
            metric: '< 28ms',
            metricLabel: 'Edge TTFB Response',
            tags: ['React', 'Laravel', 'Tailwind CSS', 'Inertia.js'],
            highlights: ['Stateless API Controllers', 'Zero-Layout-Shift Performance'],
        },
        {
            id: '03',
            slug: 'app-development',
            title: 'Mobile App Ecosystems',
            subtitle: 'Cross-Platform iOS & Android',
            desc: 'Designing and engineering native-speed mobile applications with fluid gesture control, offline sync, and instant push notification pipelines.',
            icon: Smartphone,
            color: '#14B8A6',
            glow: 'rgba(20, 184, 166, 0.18)',
            borderHover: 'hover:border-[#14B8A6]/50',
            gradientBar: 'from-[#14B8A6] to-[#2EC4A5]',
            metric: '60 FPS',
            metricLabel: 'Hardware Acceleration',
            tags: ['React Native', 'Flutter', 'Swift / Kotlin', 'Biometrics'],
            highlights: ['Sub-Second Cold Starts', 'Offline-First SQLite Cache'],
        },
        {
            id: '04',
            slug: 'ui-ux',
            title: 'UI/UX Experience Design',
            subtitle: 'Conversion-Engineered Journeys',
            desc: 'Crafting intuitive user interfaces, micro-interactions, and conversion-focused wireframes through rigorous telemetry and user research.',
            icon: Layers,
            color: '#22D3EE',
            glow: 'rgba(34, 211, 238, 0.18)',
            borderHover: 'hover:border-[#22D3EE]/50',
            gradientBar: 'from-[#22D3EE] to-[#00D1FF]',
            metric: '+42%',
            metricLabel: 'Funnel Conversion Lift',
            tags: ['Figma Auto-Layout', 'Motion Specs', 'Usability Audits'],
            highlights: ['Micro-Interactions', 'WCAG AAA Accessibility'],
        },
        {
            id: '05',
            slug: 'ai-workflows',
            title: 'AI Workflows & Agents',
            subtitle: 'Autonomous LLM Pipelines',
            desc: 'Integrating state-of-the-art AI agents and machine learning pipelines to automate complex workflows and boost operational efficiency.',
            icon: BrainCircuit,
            color: '#8B5CF6',
            glow: 'rgba(139, 92, 246, 0.18)',
            borderHover: 'hover:border-[#8B5CF6]/50',
            gradientBar: 'from-[#8B5CF6] to-[#00D1FF]',
            metric: '12ms',
            metricLabel: 'Vector Search Index',
            tags: ['Claude 3.5', 'Gemini Pro', 'Python Tooling', 'Embeddings'],
            highlights: ['Structured JSON Validation', 'Multi-Agent Autonomous Loops'],
        },
        {
            id: '06',
            slug: 'seo',
            title: 'SEO & Generative Telemetry',
            subtitle: 'Search & AI-Engine Optimization',
            desc: 'Maximizing organic visibility through technical SEO audits, Core Web Vitals optimization, and Generative Engine Optimization (GEO).',
            icon: LineChart,
            color: '#00D1FF',
            glow: 'rgba(0, 209, 255, 0.18)',
            borderHover: 'hover:border-[#00D1FF]/50',
            gradientBar: 'from-[#00D1FF] to-[#2EC4A5]',
            metric: '100/100',
            metricLabel: 'Core Web Vitals',
            tags: ['Technical SEO', 'GEO AI Search', 'Edge Structured Data'],
            highlights: ['Zero CLS Guarantee', 'Real-Time Rank Telemetry'],
        },
    ];

    return (
        <section
            onMouseMove={handleSectionMouseMove}
            onMouseEnter={() => setIsHoveringSection(true)}
            onMouseLeave={() => setIsHoveringSection(false)}
            className="relative z-10 w-full overflow-hidden bg-[#060B14] px-6 py-28 text-white md:px-12 md:py-36"
        >
            {/* Top & Bottom Glowing Divider Lines */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#2EC4A5]/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#00D1FF]/30 to-transparent" />

            {/* 1. INTERACTIVE MOUSE SPOTLIGHT (Tracks with cursor) */}
            <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-700 ease-out select-none"
                style={{
                    opacity: isHoveringSection ? 1 : 0.6,
                    background: `radial-gradient(750px circle at ${mousePos.x}px ${mousePos.y}px, rgba(46, 196, 165, 0.14), rgba(0, 209, 255, 0.05) 40%, transparent 75%)`,
                }}
            />

            {/* 2. ARCHITECTURAL BLUEPRINT GRID with Crosshairs */}
            <div
                className="pointer-events-none absolute inset-0 opacity-40 select-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(46, 196, 165, 0.12) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(46, 196, 165, 0.12) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(ellipse 85% 70% at 50% 50%, #000 30%, transparent 90%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 85% 70% at 50% 50%, #000 30%, transparent 90%)',
                }}
            />

            {/* 3. CONCENTRIC ARCHITECTURAL RADAR RINGS & WATERMARK */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-30 select-none">
                <svg
                    viewBox="0 0 1000 1000"
                    className="h-[1200px] w-[1200px] max-w-none text-[#2EC4A5]"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Concentric Coordinate Rings */}
                    <circle cx="500" cy="500" r="180" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" opacity="0.4" />
                    <circle cx="500" cy="500" r="320" stroke="currentColor" strokeWidth="1" strokeDasharray="6 12" opacity="0.3" />
                    <circle cx="500" cy="500" r="460" stroke="#00D1FF" strokeWidth="1" strokeDasharray="3 6" opacity="0.25" />
                    <circle cx="500" cy="500" r="580" stroke="currentColor" strokeWidth="1" opacity="0.15" />

                    {/* Cross Axis Grid Lines */}
                    <line x1="500" y1="0" x2="500" y2="1000" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />
                    <line x1="0" y1="500" x2="1000" y2="500" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />

                    {/* Diagonal Scanner Axis */}
                    <line x1="150" y1="150" x2="850" y2="850" stroke="#00D1FF" strokeWidth="0.8" opacity="0.15" strokeDasharray="8 8" />
                    <line x1="850" y1="150" x2="150" y2="850" stroke="#00D1FF" strokeWidth="0.8" opacity="0.15" strokeDasharray="8 8" />

                    {/* Orbiting Satellite Points */}
                    <circle cx="500" cy="180" r="4" fill="#2EC4A5" />
                    <circle cx="820" cy="500" r="5" fill="#00D1FF" />
                    <circle cx="500" cy="820" r="4" fill="#8B5CF6" />
                    <circle cx="180" cy="500" r="5" fill="#2EC4A5" />
                </svg>
            </div>

            {/* 4. MASSIVE STENCIL WATERMARK TYPOGRAPHY */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap opacity-[0.03] select-none">
                <span className="font-sans text-[180px] font-black tracking-widest text-white uppercase sm:text-[240px] lg:text-[300px]">
                    OVOLL CORE
                </span>
            </div>

            {/* 5. ATMOSPHERIC MULTI-LAYER AURORA GLOWS */}
            <div className="pointer-events-none absolute inset-0 select-none">
                {/* Top-Left Emerald Plasma */}
                <div className="absolute -top-32 -left-32 h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(46,196,165,0.16)_0%,rgba(46,196,165,0.03)_50%,transparent_70%)] blur-[140px]" />
                
                {/* Bottom-Right Cyan Supernova */}
                <div className="absolute -bottom-32 -right-32 h-[750px] w-[750px] rounded-full bg-[radial-gradient(circle,rgba(0,209,255,0.14)_0%,rgba(0,209,255,0.03)_50%,transparent_70%)] blur-[140px]" />
                
                {/* Center Deep Violet Ambient Core */}
                <div className="absolute top-1/2 left-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.08)_0%,transparent_70%)] blur-[150px]" />
            </div>

            {/* 6. TECHNICAL HUD COORDINATE LABELS */}
            <div className="pointer-events-none absolute inset-x-8 top-8 hidden items-center justify-between font-mono text-[10px] tracking-widest text-slate-500 uppercase opacity-60 md:flex select-none">
                <span>[SYS.TOPOLOGY // 06 DISCIPLINED ENGINES]</span>
                <span>[EDGE MESH LATENCY: &lt;30MS]</span>
                <span>[NODE ID: 0x9F42_OVOLL]</span>
            </div>

            <div className="relative z-10 mx-auto max-w-7xl space-y-16">
                {/* Section Header */}
                <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-12 lg:flex-row lg:items-end">
                    <Reveal className="max-w-2xl space-y-4">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#2EC4A5]/30 bg-[#2EC4A5]/10 px-4 py-1.5 font-mono text-xs font-bold tracking-widest text-[#2EC4A5] uppercase backdrop-blur-md">
                            <Zap className="h-3.5 w-3.5 animate-pulse" />
                            CORE AGENCY CAPABILITIES // 06 DISCIPLINED SERVICES
                        </div>
                        <h2 className="font-sans text-3xl leading-tight font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                            WHAT WE BUILD &{' '}
                            <span className="bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF] bg-clip-text text-transparent">
                                ENGINEER FOR SCALE
                            </span>
                        </h2>
                    </Reveal>

                    <Reveal variant="fade" delay={0.1} className="max-w-md space-y-3">
                        <p className="font-sans text-sm leading-relaxed text-slate-300">
                            From strategic brand positioning to custom type-safe web engines and
                            autonomous AI pipelines, we engineer full-stack digital assets designed
                            to dominate market share.
                        </p>
                        <div className="flex items-center gap-4 pt-1 font-mono text-xs text-slate-400">
                            <span className="flex items-center gap-1.5 text-[#2EC4A5]">
                                <CheckCircle2 className="h-4 w-4" /> Full IP Ownership
                            </span>
                            <span className="flex items-center gap-1.5 text-[#00D1FF]">
                                <Sparkles className="h-4 w-4" /> Sub-30ms Budget
                            </span>
                        </div>
                    </Reveal>
                </div>

                {/* 6 Luxury Service Bento Cards Grid */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, i) => {
                        const Icon = service.icon;
                        const isHovered = hoveredId === service.id;

                        return (
                            <Reveal
                                key={service.id}
                                variant="fade"
                                delay={(i % 3) * 0.08}
                                className="h-full"
                            >
                                <Link
                                    href={`/services/${service.slug}`}
                                    onMouseEnter={() => setHoveredId(service.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#0C1524]/85 p-8 backdrop-blur-xl transition-all duration-500 select-none ${service.borderHover} hover:-translate-y-2`}
                                    style={{
                                        boxShadow: isHovered
                                            ? `0 25px 50px -15px ${service.glow}`
                                            : '0 10px 30px rgba(0, 0, 0, 0.4)',
                                    }}
                                >
                                    {/* Animated Top Gradient Progress Line */}
                                    <div
                                        className={`absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r ${service.gradientBar} transition-transform duration-500 ${
                                            isHovered ? 'scale-x-100' : 'scale-x-0'
                                        }`}
                                    />

                                    {/* Ambient Radial Spotlight Wash on Hover */}
                                    <div
                                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                        style={{
                                            background: `radial-gradient(circle at top right, ${service.glow}, transparent 70%)`,
                                        }}
                                    />

                                    <div className="relative z-10">
                                        {/* Top Bar: Icon, Service Number & Arrow CTA */}
                                        <div className="flex items-start justify-between">
                                            <div
                                                className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-inner transition-all duration-500 group-hover:scale-105"
                                                style={{
                                                    backgroundColor: isHovered
                                                        ? `${service.color}15`
                                                        : 'rgba(255, 255, 255, 0.04)',
                                                    borderColor: isHovered
                                                        ? `${service.color}50`
                                                        : 'rgba(255, 255, 255, 0.1)',
                                                    color: service.color,
                                                }}
                                            >
                                                <Icon className="h-7 w-7" />
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <span className="font-mono text-xs font-bold text-slate-500 transition-colors group-hover:text-slate-400">
                                                    P // {service.id}
                                                </span>
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-[#0A121E]">
                                                    <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Body */}
                                        <div className="my-7 space-y-3">
                                            <span
                                                className="block font-mono text-xs font-bold tracking-wider uppercase"
                                                style={{ color: service.color }}
                                            >
                                                {service.subtitle}
                                            </span>
                                            <h3 className="font-sans text-2xl font-black tracking-tight text-white transition-colors duration-300 group-hover:text-white">
                                                {service.title}
                                            </h3>
                                            <p className="font-sans text-xs leading-relaxed text-slate-400">
                                                {service.desc}
                                            </p>
                                        </div>

                                        {/* Core Highlights List */}
                                        <div className="mb-6 space-y-1.5 border-t border-white/5 pt-4">
                                            {service.highlights.map((h) => (
                                                <div
                                                    key={h}
                                                    className="flex items-center gap-2 font-mono text-[11px] text-slate-300"
                                                >
                                                    <span
                                                        className="h-1 w-1 rounded-full"
                                                        style={{ backgroundColor: service.color }}
                                                    />
                                                    {h}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Tech Tags */}
                                        <div className="flex flex-wrap gap-1.5">
                                            {service.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] font-semibold text-slate-300 transition-colors group-hover:border-white/20 group-hover:text-white"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Bottom Metric Bar */}
                                    <div className="relative z-10 mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                                        <span className="font-mono text-xs text-slate-400">
                                            {service.metricLabel}
                                        </span>
                                        <div className="flex items-center gap-1.5">
                                            <span
                                                className="h-1.5 w-1.5 rounded-full"
                                                style={{ backgroundColor: service.color }}
                                            />
                                            <span
                                                className="font-mono text-base font-black tracking-tight"
                                                style={{ color: service.color }}
                                            >
                                                {service.metric}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}


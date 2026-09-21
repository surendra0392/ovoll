import { Link } from '@inertiajs/react';
import { useReducedMotion } from 'framer-motion';
import {
    ArrowRight,
    CheckCircle2,
    Compass,
    Cpu,
    Gauge,
    Layers,
    LayoutGrid,
    LineChart,
    Package,
    PenTool,
    ShieldCheck,
    Sparkles,
} from 'lucide-react';
import React, { lazy, Suspense, useState } from 'react';
import { Reveal } from '@/animations';
import { HeroSection } from '@/components/homepage/HeroSection';
import { WhatWeDoSection } from '@/components/homepage/WhatWeDoSection';
import { DeferredMount } from '@/components/ui/DeferredMount';
import { SeoHead } from '@/components/seo/SeoHead';
import { LandingLayout } from '@/layouts/LandingLayout';

import { TechOrbitSection } from '@/components/homepage/TechOrbitSection';
const GlassCrystalScene = lazy(() =>
    import('@/components/vfx/GlassCrystal').then((m) => ({ default: m.GlassCrystalScene })),
);
const OrbitalRingsScene = lazy(() =>
    import('@/components/vfx/OrbitalRings').then((m) => ({ default: m.OrbitalRingsScene })),
);

const growthPillars = [
    {
        num: '01',
        icon: Compass,
        title: 'Strategy-First Architecture',
        desc: 'We audit market telemetry, competitor positions, and user intent before drawing a single frame. Every design choice is anchored to a measurable business target.',
    },
    {
        num: '02',
        icon: PenTool,
        title: 'Unified Design & Code',
        desc: 'No handoff friction between designers and developers. Brand identity, design systems, and frontend code are crafted synchronously under one roof.',
    },
    {
        num: '03',
        icon: Gauge,
        title: 'Performance & Sub-30ms Budgets',
        desc: 'We engineer for sub-30ms database responses and 60fps UI animations. Blazing-fast performance directly drives higher search rankings and lower bounce rates.',
    },
    {
        num: '04',
        icon: LineChart,
        title: 'Predictable Demand Pipeline',
        desc: 'We build data-backed conversion paths that turn anonymous visitors into qualified leads, lower acquisition costs, and generate compounding ROI.',
    },
    {
        num: '05',
        icon: Package,
        title: 'Cross-Channel System Consistency',
        desc: 'Whether on mobile screens, desktop web apps, packaging, or physical collateral, your visual identity stays 100% unified and instantly recognizable.',
    },
    {
        num: '06',
        icon: ShieldCheck,
        title: 'Continuous Optimization & Scale',
        desc: 'Launch is just day one. We continuously analyze user behavior, test conversion hypotheses, and iterate to ensure long-term, scalable growth.',
    },
];

const operatingPrinciples = [
    {
        num: '01',
        icon: Cpu,
        title: 'Zero-Bloat Custom Architecture',
        desc: 'We replace slow off-the-shelf templates with custom, hand-crafted codebases. Every line of code is written with purpose, maintaining a strict sub-30ms global response budget.',
        metric: '< 30ms TTFB Budget',
        category: 'ENGINEERING & SPEED',
    },
    {
        num: '02',
        icon: Sparkles,
        title: 'Brand Strategy & Code Co-Design',
        desc: 'Design and technical architecture are executed synchronously. Identity, typography, micro-interactions, and 3D canvas shaders evolve as a single unified ecosystem.',
        metric: '100% Brand Cohesion',
        category: 'DESIGN & IDENTITY',
    },
    {
        num: '03',
        icon: Gauge,
        title: 'Conversion-Engineered UX Motion',
        desc: 'Every micro-animation, hover ripple, and visual transition is purposefully calibrated to direct user focus, eliminate UX friction, and maximize funnel conversions.',
        metric: '+42% Funnel Velocity',
        category: 'USER EXPERIENCE',
    },
    {
        num: '04',
        icon: LineChart,
        title: 'Transparent Real-Time Telemetry',
        desc: 'No vanity reporting or black-box analytics. We embed live performance telemetry, core web vitals monitoring, and funnel conversion tracking directly into your dashboard.',
        metric: 'Real-Time Insights',
        category: 'ANALYTICS & METRICS',
    },
    {
        num: '05',
        icon: ShieldCheck,
        title: 'Sovereign Codebase & IP Ownership',
        desc: 'You retain 100% full ownership of every line of source code, Figma design system, and deployment pipeline. Zero vendor lock-in or recurring runtime license fees.',
        metric: '100% IP Transfer',
        category: 'IP & SECURITY',
    },
    {
        num: '06',
        icon: Layers,
        title: 'Continuous Post-Launch Growth Sprints',
        desc: 'Launch is just day one. We run structured monthly optimization sprints, conducting A/B user tests, fine-tuning load speeds, and expanding features as your market scales.',
        metric: 'Monthly Scale Sprints',
        category: 'OPTIMIZATION & SCALE',
    },
];

const solutionCards = [
    {
        icon: Compass,
        title: 'Brand Clarity',
        desc: 'A sharp position and identity system so the right customers instantly understand why you matter.',
    },
    {
        icon: LineChart,
        title: 'Demand & Pipeline',
        desc: 'Marketing that turns spend into tracked leads, lower acquisition cost, and repeatable revenue.',
    },
    {
        icon: LayoutGrid,
        title: 'Conversion Platforms',
        desc: 'Websites and products engineered to load fast and move visitors to action.',
    },
    {
        icon: Package,
        title: 'Consistent Presence',
        desc: 'Packaging and print that carry one identity from screen to shelf, everywhere you show up.',
    },
];

const processSteps = [
    {
        num: '01',
        name: 'Discovery & Audit',
        title: 'Parameter & Competitor Mapping',
        desc: 'Deep audit of existing telemetry, audience positioning, and competitive gaps to establish core project parameters.',
        deliverables: ['Competitive Audits', 'User Personas', 'Technical Specs'],
    },
    {
        num: '02',
        name: 'Strategy & Scaffolding',
        title: 'Design System & Stack Selection',
        desc: 'Structuring design tokens, route topologies, and performance targets before drafting visual layouts.',
        deliverables: ['Design System Tokens', 'Architecture Blueprint', 'Performance Budget'],
    },
    {
        num: '03',
        name: 'Visual Art Direction',
        title: 'Figma Mockups & Micro-Interactions',
        desc: 'Crafting luxury UI components, motion physics, and high-fidelity interactive wireframes.',
        deliverables: ['Figma Prototypes', 'Motion Specs', 'Component Library'],
    },
    {
        num: '04',
        name: 'Full-Stack Engineering',
        title: 'Laravel & React Development',
        desc: 'Building responsive UI components, WebGL particle shaders, and resilient backend API controllers.',
        deliverables: ['Sub-30ms Endpoints', '60fps Canvas Shaders', 'Clean Code Architecture'],
    },
    {
        num: '05',
        name: 'Testing & Optimization',
        title: 'Core Web Vitals & Security Audit',
        desc: 'Rigorously testing cross-browser rendering, accessibility standards, and edge load times.',
        deliverables: ['100/100 Lighthouse Audit', 'Security Penetration Test', 'SEO Indexing'],
    },
    {
        num: '06',
        name: 'Zero-Downtime Launch',
        title: 'Production Deployment & DNS Sync',
        desc: 'Seamless migration into scalable cloud infrastructure with automated monitoring triggers.',
        deliverables: ['Cloud Deployment', 'SSL & DNS Setup', 'Global CDN Caching'],
    },
    {
        num: '07',
        name: 'Growth & Telemetry',
        title: 'CRO & Continuous Optimization',
        desc: 'Analyzing user interaction heatmaps and conversion metrics to compound ROI post-launch.',
        deliverables: ['Analytics Dashboards', 'A/B Testing', 'Growth Reports'],
    },
];

const insights = [
    {
        category: 'ENGINEERING',
        readTime: '4 MIN READ',
        title: 'Engineering Sub-30ms Page Loads in Modern Laravel & React',
        excerpt:
            'How we eliminate bundle bloat, optimize database queries, and achieve instant page transitions.',
    },
    {
        category: 'BRAND STRATEGY',
        readTime: '6 MIN READ',
        title: 'The Anatomy of an Unforgettable Visual Identity System',
        excerpt:
            'Moving beyond static logos to responsive design tokens that scale across digital and print.',
    },
    {
        category: 'MOTION DESIGN',
        readTime: '5 MIN READ',
        title: 'Crafting 60fps WebGL Particle Systems with Three.js',
        excerpt:
            'Integrating custom GLSL shaders and pointer attraction fields into production React applications.',
    },
    {
        category: 'AI & AUTOMATION',
        readTime: '7 MIN READ',
        title: 'Building Production-Ready AI Workflows with LLM Agents',
        excerpt:
            'From prompt engineering to autonomous tool-use pipelines — shipping AI that actually works in production.',
    },
];

const marqueeItems = [
    'Brand Strategy',
    'Identity Systems',
    'Website Development',
    'Digital Marketing',
    'Packaging & Print',
    'Growth Consulting',
];

const techStack = [
    { name: 'React', desc: 'Frontend Engine' },
    { name: 'Laravel', desc: 'Backend Core' },
    { name: 'Tailwind', desc: 'Utility CSS' },
    { name: 'TypeScript', desc: 'Type Safety' },
    { name: 'Python', desc: 'AI & Telemetry' },
    { name: 'GSAP', desc: 'Motion Specs' },
    { name: 'Inertia', desc: 'SPA Routing' },
    { name: 'Docker', desc: 'Containers' },
    { name: 'Cloudflare', desc: 'Edge CDN' },
    { name: 'Supabase', desc: 'Database & Auth' },
    { name: 'Anthropic', desc: 'AI Models' },
    { name: 'NodeJS', desc: 'Server Runtime' },
];

interface WelcomeProps {
    page?: {
        content?: {
            hero?: {
                subtitle?: string;
                primaryUrl?: string;
                secondaryUrl?: string;
                secondaryCta?: string;
            };
        };
    };
}

export default function Welcome({ page }: WelcomeProps) {
    const reduce = useReducedMotion();
    const [activeStep, setActiveStep] = useState(0);
    const [principlesMousePos, setPrinciplesMousePos] = useState({ x: 600, y: 300 });
    const [isHoveringPrinciples, setIsHoveringPrinciples] = useState(false);
    const [methodologyMousePos, setMethodologyMousePos] = useState({ x: 500, y: 300 });
    const [isHoveringMethodology, setIsHoveringMethodology] = useState(false);

    const handlePrinciplesMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPrinciplesMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const handleMethodologyMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMethodologyMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const cms = page?.content || {};

    const subtitle =
        cms.hero?.subtitle ||
        'OVOLL is a vanguard branding and platform engineering studio. We unite strategic brand positioning, high-converting digital architectures, and real-time telemetry into compounding growth engines.';
    const primaryUrl = cms.hero?.primaryUrl || '/contact';
    const secondaryUrl = cms.hero?.secondaryUrl || '/services';
    const secondaryCta = cms.hero?.secondaryCta || 'Explore Our Services';

    return (
        <>
            <SeoHead
                title="Strategic Branding, UI/UX & Digital Product Engineering Studio"
                description="Vanguard branding and digital product engineering studio in India serving global enterprises. We specialize in strategic brand systems, custom web apps, FMCG packaging, SaaS platforms, and AI automation."
                canonical="https://ovoll.in"
                type="website"
                keywords={[
                    'branding agency India',
                    'UI UX design studio Bangalore',
                    'custom web application development',
                    'enterprise SaaS engineering India',
                    'AI automation solutions Bangalore',
                    'digital product agency Mumbai',
                    'FMCG packaging design agency India',
                    'React Laravel development company',
                    'design and engineering studio',
                    'OVOLL',
                ]}
            />

            <div className="bg-surface-section relative min-h-screen text-white">
                {/* 1. LOVED HERO SECTION */}
                <HeroSection
                    content={{
                        headline: 'WE CRAFT DIGITAL STANDARDS THAT DOMINATE MARKETS',
                        subtitle: subtitle,
                        primary_cta: 'Initiate Project Scoping',
                        primary_url: primaryUrl,
                        secondary_cta: secondaryCta,
                        secondary_url: secondaryUrl,
                    }}
                />

                {/* 2. LOVED KINETIC MARQUEE STRIP */}
                <div className="bg-surface-section-alt relative overflow-hidden border-y border-white/10 py-5 select-none">
                    <div
                        className={`flex w-max items-center gap-8 whitespace-nowrap ${
                            !reduce ? 'animate-[marquee_28s_linear_infinite]' : ''
                        }`}
                    >
                        {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map(
                            (item: string, i: number) => (
                                <div key={`marquee-${i}`} className="flex items-center gap-8">
                                    <span className="font-mono text-sm font-bold tracking-widest text-[#00D1FF] uppercase">
                                        {item}
                                    </span>
                                    <div className="h-2 w-2 rounded-full bg-[#2EC4A5] shadow-[0_0_10px_rgba(46,196,165,0.8)]" />
                                </div>
                            ),
                        )}
                    </div>
                </div>

                {/* 3. METHODOLOGY SECTION ("Turning Strategy into Measurable Growth") */}
                <section
                    onMouseMove={handleMethodologyMouseMove}
                    onMouseEnter={() => setIsHoveringMethodology(true)}
                    onMouseLeave={() => setIsHoveringMethodology(false)}
                    className="relative overflow-hidden bg-[#070D18] border-t border-white/10 py-24 lg:py-32"
                >
                    {/* Glowing Top & Bottom Hairline Dividers */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#2EC4A5]/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#00D1FF]/30 to-transparent" />

                    {/* 1. INTERACTIVE MOUSE SPOTLIGHT (Illuminates growth matrix) */}
                    <div
                        className="pointer-events-none absolute inset-0 transition-opacity duration-700 ease-out select-none"
                        style={{
                            opacity: isHoveringMethodology ? 1 : 0.6,
                            background: `radial-gradient(800px circle at ${methodologyMousePos.x}px ${methodologyMousePos.y}px, rgba(46, 196, 165, 0.15), rgba(0, 209, 255, 0.05) 40%, transparent 80%)`,
                        }}
                    />

                    {/* 2. MICRO-DOT MATRIX with 45-Degree Compounding Growth Rays */}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-35 select-none"
                        style={{
                            backgroundImage: `
                                radial-gradient(rgba(46, 196, 165, 0.18) 1px, transparent 1px),
                                linear-gradient(45deg, rgba(0, 209, 255, 0.04) 1px, transparent 1px)
                            `,
                            backgroundSize: '28px 28px, 56px 56px',
                            maskImage: 'radial-gradient(ellipse 85% 70% at 50% 50%, #000 30%, transparent 90%)',
                            WebkitMaskImage: 'radial-gradient(ellipse 85% 70% at 50% 50%, #000 30%, transparent 90%)',
                        }}
                    />

                    {/* 3. EXPONENTIAL COMPOUNDING CURVES & TELEMETRY VECTOR SVG */}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-30 select-none">
                        <svg
                            viewBox="0 0 1200 800"
                            className="h-[1000px] w-[1400px] max-w-none text-[#2EC4A5]"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* Horizontal & Vertical Metric Graduation Lines */}
                            <line x1="100" y1="700" x2="1100" y2="700" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
                            <line x1="100" y1="100" x2="100" y2="700" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />

                            <line x1="100" y1="550" x2="1100" y2="550" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 8" opacity="0.15" />
                            <line x1="100" y1="400" x2="1100" y2="400" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 8" opacity="0.15" />
                            <line x1="100" y1="250" x2="1100" y2="250" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 8" opacity="0.15" />

                            {/* Exponential Compounding Growth Path 1 (Primary Emerald) */}
                            <path
                                d="M 100 680 C 400 670, 700 580, 950 300 C 1050 180, 1100 120, 1150 80"
                                stroke="#2EC4A5"
                                strokeWidth="2"
                                strokeDasharray="8 6"
                                opacity="0.6"
                            />

                            {/* Compounding Parabolic Path 2 (Cyan Gradient Fill Area) */}
                            <path
                                d="M 100 700 C 450 690, 750 520, 1000 240 L 1000 700 Z"
                                fill="url(#growthAreaGrad)"
                                opacity="0.08"
                            />

                            {/* Secondary Telemetry Waveform */}
                            <path
                                d="M 100 620 Q 300 580 500 630 T 900 480 T 1150 200"
                                stroke="#00D1FF"
                                strokeWidth="1.2"
                                opacity="0.4"
                            />

                            {/* Pulsing Growth Telemetry Nodes along the curve */}
                            <circle cx="500" cy="630" r="5" fill="#00D1FF" />
                            <circle cx="750" cy="520" r="6" fill="#2EC4A5" />
                            <circle cx="950" cy="300" r="7" fill="#00D1FF" />
                            <circle cx="1000" cy="240" r="8" fill="#2EC4A5" />

                            {/* Metric Graduation Labels */}
                            <text x="120" y="240" fill="#2EC4A5" fontSize="12" fontFamily="monospace" opacity="0.5">[ROI COMPOUNDING +400%]</text>
                            <text x="120" y="390" fill="#00D1FF" fontSize="12" fontFamily="monospace" opacity="0.4">[CONVERSION INFLECTION]</text>
                            <text x="950" y="730" fill="#64748B" fontSize="12" fontFamily="monospace" opacity="0.5">[TIME SCALE: Q1 → Q4]</text>

                            <defs>
                                <linearGradient id="growthAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#2EC4A5" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#2EC4A5" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    {/* 4. MASSIVE WATERMARK TYPOGRAPHY */}
                    <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap opacity-[0.025] select-none">
                        <span className="font-sans text-[180px] font-black tracking-widest text-white uppercase sm:text-[240px] lg:text-[300px]">
                            COMPOUNDING VALUE
                        </span>
                    </div>

                    {/* 5. ATMOSPHERIC MULTI-LAYER NEBULA GLOWS */}
                    <div className="pointer-events-none absolute inset-0 select-none">
                        {/* Top-Left Emerald Plasma */}
                        <div className="absolute -top-32 -left-32 h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(46,196,165,0.16)_0%,rgba(46,196,165,0.02)_50%,transparent_70%)] blur-[140px]" />
                        
                        {/* Bottom-Right Cyan Supernova */}
                        <div className="absolute -bottom-32 -right-32 h-[750px] w-[750px] rounded-full bg-[radial-gradient(circle,rgba(0,209,255,0.14)_0%,rgba(0,209,255,0.02)_50%,transparent_70%)] blur-[140px]" />
                        
                        {/* Center Deep Violet Ambient Core */}
                        <div className="absolute top-1/2 left-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.06)_0%,transparent_70%)] blur-[150px]" />
                    </div>

                    {/* 6. TECHNICAL HUD TOP BANNER */}
                    <div className="pointer-events-none absolute inset-x-8 top-8 hidden items-center justify-between font-mono text-[10px] tracking-widest text-slate-500 uppercase opacity-60 md:flex select-none">
                        <span>[METHODOLOGY // 06 GROWTH PILLARS]</span>
                        <span>[COMPOUNDING ENGINE: ACTIVE]</span>
                        <span>[SUB-30MS RESPONSE BUDGET]</span>
                    </div>

                    <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
                        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
                            {/* Left Column */}
                            <Reveal
                                variant="fade"
                                className="space-y-6 lg:sticky lg:top-32 lg:col-span-4"
                            >
                                <div className="inline-flex items-center gap-2 rounded-full border border-[#2EC4A5]/30 bg-[#2EC4A5]/10 px-4 py-1.5 font-mono text-xs font-bold tracking-widest text-[#2EC4A5] uppercase backdrop-blur-md">
                                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#2EC4A5]" />
                                    METHODOLOGY & EXECUTION
                                </div>

                                <h2 className="font-sans text-3xl leading-tight font-black text-white sm:text-4xl lg:text-5xl">
                                    Turning strategy into{' '}
                                    <span className="bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF] bg-clip-text text-transparent">
                                        measurable, compounding growth
                                    </span>
                                </h2>

                                <div className="space-y-4 text-sm leading-relaxed text-slate-300">
                                    <p>
                                        Most agencies build in isolation — separating brand design
                                        from technical architecture and marketing from customer
                                        retention. At OVOLL, we operate as a single unified system.
                                    </p>
                                    <p>
                                        Every project is engineered around sub-30ms performance
                                        budgets, conversion-focused wireframes, and scalable design
                                        systems.
                                    </p>
                                </div>

                                <div className="pt-2">
                                    <Link
                                        href="/about"
                                        className="group inline-flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-[#00D1FF] uppercase transition-colors hover:text-[#2EC4A5]"
                                    >
                                        Learn more about our approach{' '}
                                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </Reveal>

                            {/* Right Grid: 6 Growth Pillars Cards */}
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-8">
                                {growthPillars.map((pillar, i) => {
                                    const Icon = pillar.icon;

                                    return (
                                        <Reveal
                                            key={pillar.title}
                                            variant="fade"
                                            delay={(i % 2) * 0.08}
                                            className="h-full"
                                        >
                                            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0C1524]/85 p-7 backdrop-blur-xl transition-all duration-500 select-none hover:-translate-y-1.5 hover:border-[#2EC4A5]/50 hover:shadow-[0_25px_50px_-15px_rgba(46,196,165,0.2)]">
                                                {/* Animated Top Gradient Accent Line */}
                                                <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#2EC4A5] via-[#00D1FF] to-[#8B5CF6] transition-transform duration-500 group-hover:scale-x-100" />

                                                {/* Localized Hover Spotlight */}
                                                <div
                                                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                                    style={{
                                                        background: 'radial-gradient(circle at top right, rgba(46, 196, 165, 0.15), transparent 70%)',
                                                    }}
                                                />

                                                <div className="relative z-10">
                                                    <div className="flex items-center justify-between">
                                                        <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#2EC4A5] shadow-inner transition-all duration-500 group-hover:scale-110 group-hover:border-[#2EC4A5]/40 group-hover:bg-[#2EC4A5]/15 group-hover:text-[#00D1FF]">
                                                            <Icon className="h-5 w-5" />
                                                        </span>
                                                        <span className="font-mono text-xs font-bold text-slate-500 transition-colors group-hover:text-slate-300">
                                                            M // {pillar.num}
                                                        </span>
                                                    </div>

                                                    <div className="mt-6 space-y-2">
                                                        <h3 className="font-sans text-lg font-bold text-white transition-colors duration-300 group-hover:text-[#00D1FF]">
                                                            {pillar.title}
                                                        </h3>
                                                        <p className="font-sans text-xs leading-relaxed text-slate-400">
                                                            {pillar.desc}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Reveal>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. WHAT YOU GET SECTION ("Four Outcomes That Move The Numbers") */}
                <section className="bg-surface-section relative overflow-hidden border-t border-white/5 py-24 lg:py-32">
                    {/* Ambient Glows */}
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute top-0 right-1/3 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,209,255,0.12),transparent_70%)] blur-3xl" />
                        <div className="absolute bottom-0 left-10 h-[450px] w-[450px] rounded-full bg-[radial-gradient(circle,rgba(46,196,165,0.1),transparent_70%)] blur-3xl" />
                    </div>

                    <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
                        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                            <Reveal className="max-w-2xl space-y-3">
                                <span className="font-mono text-xs font-bold tracking-widest text-[#2EC4A5] uppercase">
                                    What You Get
                                </span>
                                <h2 className="font-sans text-3xl font-black text-white sm:text-4xl md:text-5xl">
                                    Four outcomes that{' '}
                                    <span className="bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF] bg-clip-text text-transparent">
                                        move the numbers
                                    </span>
                                </h2>
                                <p className="font-sans text-sm leading-relaxed text-slate-300">
                                    Every engagement is engineered to deliver strategic results, not
                                    just surface-level assets.
                                </p>
                            </Reveal>

                            {/* Floating 3D WebGL Interactive Crystal Gem */}
                            <div className="relative -mt-6 hidden h-48 w-48 lg:block">
                                <DeferredMount>
                                    <Suspense fallback={null}>
                                        <GlassCrystalScene
                                            shape="crystal"
                                            speed={1.2}
                                            className="h-full w-full"
                                        />
                                    </Suspense>
                                </DeferredMount>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {solutionCards.map((card, i) => {
                                const CardIcon = card.icon;

                                return (
                                    <Reveal
                                        key={card.title}
                                        variant="fade"
                                        delay={(i % 4) * 0.08}
                                        className="h-full"
                                    >
                                        <div className="group bg-surface-card/80 relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00D1FF]/40 hover:shadow-[0_20px_40px_-20px_rgba(0,209,255,0.25)]">
                                            <div>
                                                <div className="flex items-center justify-between">
                                                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#2EC4A5] transition-all group-hover:border-[#00D1FF]/40 group-hover:text-[#00D1FF]">
                                                        <CardIcon className="h-6 w-6" />
                                                    </span>
                                                    <span className="font-mono text-2xl font-black text-white/10 group-hover:text-white/20">
                                                        0{i + 1}
                                                    </span>
                                                </div>
                                                <h3 className="mt-6 font-sans text-lg font-bold text-white group-hover:text-[#00D1FF]">
                                                    {card.title}
                                                </h3>
                                                <p className="mt-2 font-sans text-xs leading-relaxed text-slate-400">
                                                    {card.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* 5. LOVED SERVICES SECTION (6 Interactive Cards) */}
                <WhatWeDoSection />

                {/* 6. SYSTEM STACK TOPOLOGY & ARCHITECTURE */}
                <TechOrbitSection
                    content={{
                        headline: 'ENGINEERED ON HIGH-PERFORMANCE STACK ARCHITECTURE',
                        description:
                            'Sub-30ms edge response budgets, stateless Laravel controllers, modular React architecture, and Tailwind CSS design tokens.',
                        techs: techStack,
                    }}
                />

                {/* 7. OPERATING PRINCIPLES ("How We Work Differently") */}
                <section
                    onMouseMove={handlePrinciplesMouseMove}
                    onMouseEnter={() => setIsHoveringPrinciples(true)}
                    onMouseLeave={() => setIsHoveringPrinciples(false)}
                    className="relative overflow-hidden bg-[#060C16] border-t border-white/10 py-28 lg:py-36"
                >
                    {/* Glowing Top & Bottom Hairline Dividers */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#00D1FF]/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#2EC4A5]/30 to-transparent" />

                    {/* 1. INTERACTIVE MOUSE SPOTLIGHT (Illuminates isometric lattice) */}
                    <div
                        className="pointer-events-none absolute inset-0 transition-opacity duration-700 ease-out select-none"
                        style={{
                            opacity: isHoveringPrinciples ? 1 : 0.6,
                            background: `radial-gradient(800px circle at ${principlesMousePos.x}px ${principlesMousePos.y}px, rgba(0, 209, 255, 0.12), rgba(139, 92, 246, 0.05) 40%, transparent 80%)`,
                        }}
                    />

                    {/* 2. ISOMETRIC TRIANGULAR / DIAMOND LATTICE (Distinct from square grid) */}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-35 select-none"
                        style={{
                            backgroundImage: `
                                linear-gradient(30deg, rgba(0, 209, 255, 0.09) 1px, transparent 1px),
                                linear-gradient(150deg, rgba(0, 209, 255, 0.09) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(46, 196, 165, 0.07) 1px, transparent 1px)
                            `,
                            backgroundSize: '48px 83.14px',
                            maskImage: 'radial-gradient(ellipse 85% 70% at 50% 50%, #000 30%, transparent 90%)',
                            WebkitMaskImage: 'radial-gradient(ellipse 85% 70% at 50% 50%, #000 30%, transparent 90%)',
                        }}
                    />

                    {/* 3. SACRED GEOMETRIC GYROSCOPE & CELESTIAL TORUS BLUEPRINT */}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-25 select-none">
                        <svg
                            viewBox="0 0 1000 1000"
                            className="h-[1300px] w-[1300px] max-w-none text-[#00D1FF]"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* Dodecagon 12-Point Outer Celestial Ring */}
                            <circle cx="500" cy="500" r="420" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" opacity="0.35" />
                            <circle cx="500" cy="500" r="300" stroke="#2EC4A5" strokeWidth="1" strokeDasharray="8 12" opacity="0.25" />
                            <circle cx="500" cy="500" r="160" stroke="currentColor" strokeWidth="1" opacity="0.4" />

                            {/* Triple Nested Orbital Ellipses (Golden Ratio 120-degree rotation) */}
                            <ellipse cx="500" cy="500" rx="460" ry="190" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
                            <ellipse cx="500" cy="500" rx="460" ry="190" stroke="#2EC4A5" strokeWidth="0.8" opacity="0.2" transform="rotate(60 500 500)" />
                            <ellipse cx="500" cy="500" rx="460" ry="190" stroke="#8B5CF6" strokeWidth="0.8" opacity="0.2" transform="rotate(120 500 500)" />

                            {/* Degree Tick Markers on Outer Perimeter */}
                            <line x1="500" y1="60" x2="500" y2="80" stroke="currentColor" strokeWidth="1.5" />
                            <line x1="500" y1="920" x2="500" y2="940" stroke="currentColor" strokeWidth="1.5" />
                            <line x1="60" y1="500" x2="80" y2="500" stroke="currentColor" strokeWidth="1.5" />
                            <line x1="920" y1="500" x2="940" y2="500" stroke="currentColor" strokeWidth="1.5" />

                            {/* Center Sacred Matrix Core */}
                            <circle cx="500" cy="500" r="6" fill="#00D1FF" />
                            <circle cx="500" cy="500" r="24" stroke="#00D1FF" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
                        </svg>
                    </div>

                    {/* 4. MASSIVE STENCIL WATERMARK TYPOGRAPHY */}
                    <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap opacity-[0.025] select-none">
                        <span className="font-sans text-[180px] font-black tracking-widest text-white uppercase sm:text-[240px] lg:text-[300px]">
                            ENGINEERED RIGOR
                        </span>
                    </div>

                    {/* 5. MULTI-LAYER AURORA ATMOSPHERE */}
                    <div className="pointer-events-none absolute inset-0 select-none">
                        {/* Top-Right Violet Nebula */}
                        <div className="absolute -top-32 -right-32 h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.14)_0%,rgba(139,92,246,0.02)_50%,transparent_70%)] blur-[140px]" />
                        
                        {/* Bottom-Left Cyan/Emerald Nebula */}
                        <div className="absolute -bottom-32 -left-32 h-[750px] w-[750px] rounded-full bg-[radial-gradient(circle,rgba(0,209,255,0.12)_0%,rgba(46,196,165,0.03)_50%,transparent_70%)] blur-[140px]" />
                        
                        {/* Center Emerald Ambient Core */}
                        <div className="absolute top-1/2 left-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(46,196,165,0.07)_0%,transparent_70%)] blur-[150px]" />
                    </div>

                    {/* 6. TECHNICAL HUD TOP BANNER */}
                    <div className="pointer-events-none absolute inset-x-8 top-8 hidden items-center justify-between font-mono text-[10px] tracking-widest text-slate-500 uppercase opacity-60 md:flex select-none">
                        <span>[OPERATING SYSTEM // 06 CORE LAWS]</span>
                        <span>[FRAMEWORK: ZERO-WASTE ENGINEERING]</span>
                        <span>[VERIFICATION: 100% PRODUCTION PROVEN]</span>
                    </div>

                    <div className="relative z-10 mx-auto max-w-7xl space-y-16 px-6 md:px-12">
                        {/* Centered Header */}
                        <Reveal
                            variant="fade"
                            className="relative mx-auto max-w-3xl space-y-5 text-center"
                        >
                            <div className="relative z-10 inline-flex items-center gap-2 rounded-full border border-[#2EC4A5]/30 bg-[#2EC4A5]/10 px-4 py-1.5 font-mono text-xs font-bold tracking-widest text-[#2EC4A5] uppercase backdrop-blur-md">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-[#2EC4A5]" />
                                WHY OVOLL • OPERATING PRINCIPLES
                            </div>

                            <h2 className="relative z-10 font-sans text-3xl leading-tight font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                                How we work differently to build{' '}
                                <span className="bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF] bg-clip-text text-transparent">
                                    high-impact platforms
                                </span>
                            </h2>

                            <p className="relative z-10 mx-auto max-w-2xl font-sans text-sm leading-relaxed text-slate-300">
                                We discard traditional agency bloat, trial-and-error marketing, and
                                disconnected teams. By uniting brand strategy, high-converting
                                digital platforms, and real-time telemetry into one accountable
                                operating system, every dollar invested answers to measurable
                                business growth.
                            </p>
                        </Reveal>

                        {/* 6-Card Operating Principles 3-Column Grid */}
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {operatingPrinciples.map((pillar, i) => {
                                const Icon = pillar.icon;

                                return (
                                    <Reveal
                                        key={pillar.title}
                                        variant="fade"
                                        delay={(i % 3) * 0.08}
                                        className="h-full"
                                    >
                                        <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#0C1524]/85 p-8 backdrop-blur-xl transition-all duration-500 select-none hover:-translate-y-2 hover:border-[#00D1FF]/50 hover:shadow-[0_25px_50px_-15px_rgba(0,209,255,0.2)]">
                                            {/* Top Gradient Accent Line */}
                                            <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#00D1FF] via-[#2EC4A5] to-[#8B5CF6] transition-transform duration-500 group-hover:scale-x-100" />

                                            {/* Localized Hover Spotlight */}
                                            <div
                                                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                                style={{
                                                    background: 'radial-gradient(circle at top right, rgba(0, 209, 255, 0.15), transparent 70%)',
                                                }}
                                            />

                                            <div className="relative z-10">
                                                {/* Header Bar: Icon & P 01 Badge */}
                                                <div className="flex items-center justify-between">
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#00D1FF] shadow-inner transition-all duration-500 group-hover:scale-110 group-hover:border-[#00D1FF]/40 group-hover:bg-[#00D1FF]/15 group-hover:text-white">
                                                        <Icon className="h-6 w-6" />
                                                    </div>
                                                    <span className="rounded-full border border-[#2EC4A5]/30 bg-[#2EC4A5]/10 px-3 py-1 font-mono text-[10px] font-bold text-[#2EC4A5]">
                                                        P // {pillar.num}
                                                    </span>
                                                </div>

                                                {/* Title & Description */}
                                                <div className="mt-8 space-y-3">
                                                    <span className="block font-mono text-[10px] font-bold tracking-widest text-[#2EC4A5] uppercase">
                                                        {pillar.category}
                                                    </span>
                                                    <h3 className="font-sans text-xl font-bold text-white transition-colors duration-300 group-hover:text-[#00D1FF]">
                                                        {pillar.title}
                                                    </h3>
                                                    <p className="font-sans text-xs leading-relaxed text-slate-400">
                                                        {pillar.desc}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Card Footer: Metric + Arrow */}
                                            <div className="relative z-10 mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                                                <span className="font-mono text-[10px] font-bold tracking-widest text-slate-400 uppercase transition-colors group-hover:text-[#2EC4A5]">
                                                    {pillar.metric}
                                                </span>
                                                <ArrowRight className="h-4 w-4 text-slate-500 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-[#00D1FF]" />
                                            </div>
                                        </div>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* 7. PROCESS SECTION ("How Ideas Become Living Products") */}
                <section className="bg-surface-section-alt relative overflow-hidden border-t border-white/5 py-28">
                    <div className="relative mx-auto max-w-7xl space-y-16 px-6 md:px-12">
                        <Reveal width="full" className="max-w-3xl space-y-4">
                            <span className="font-mono text-xs font-bold tracking-widest text-[#2EC4A5] uppercase">
                                Execution Roadmap
                            </span>
                            <h2 className="font-sans text-3xl font-black text-white sm:text-4xl md:text-5xl">
                                HOW IDEAS BECOME{' '}
                                <span className="bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF] bg-clip-text text-transparent">
                                    LIVING PRODUCTS
                                </span>
                            </h2>
                            <p className="font-sans text-sm leading-relaxed text-slate-400">
                                A 7-stage disciplined methodology connecting parameter discovery
                                through engineering, zero-downtime launch, and conversion growth.
                            </p>
                        </Reveal>

                        {/* Interactive Process Stage Rail */}
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                            {/* Active Detail Card */}
                            <div className="bg-surface-card/90 flex flex-col justify-between rounded-3xl border border-[#2EC4A5]/30 p-8 shadow-2xl backdrop-blur-xl lg:col-span-5">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="font-mono text-xs font-bold text-[#00D1FF]">
                                            STAGE {processSteps[activeStep]!.num} //{' '}
                                            {processSteps[activeStep]!.name}
                                        </span>
                                        <span className="h-2 w-2 animate-ping rounded-full bg-[#2EC4A5]" />
                                    </div>
                                    <h3 className="font-sans text-2xl font-black text-white">
                                        {processSteps[activeStep]!.title}
                                    </h3>
                                    <p className="font-sans text-sm leading-relaxed text-slate-300">
                                        {processSteps[activeStep]!.desc}
                                    </p>
                                </div>

                                <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
                                    <span className="block font-mono text-xs tracking-wider text-slate-400 uppercase">
                                        Key Stage Deliverables:
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {processSteps[activeStep]!.deliverables.map((d) => (
                                            <span
                                                key={d}
                                                className="inline-flex items-center gap-1.5 rounded-lg border border-[#2EC4A5]/30 bg-[#2EC4A5]/10 px-3 py-1 font-mono text-xs font-semibold text-[#2EC4A5]"
                                            >
                                                <CheckCircle2 className="h-3.5 w-3.5" />
                                                {d}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Stage Rail Buttons */}
                            <div className="space-y-3 lg:col-span-7">
                                {processSteps.map((step, idx) => {
                                    const isActive = activeStep === idx;

                                    return (
                                        <button
                                            key={step.num}
                                            onClick={() => setActiveStep(idx)}
                                            className={`group relative flex w-full items-center justify-between rounded-2xl border p-5 text-left transition-all duration-300 select-none ${
                                                isActive
                                                    ? 'border-[#2EC4A5]/50 bg-[#2EC4A5]/10 shadow-[0_0_25px_rgba(46,196,165,0.15)]'
                                                    : 'border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/5'
                                            }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <span
                                                    className={`font-mono text-base font-black ${
                                                        isActive
                                                            ? 'text-[#00D1FF]'
                                                            : 'text-slate-500'
                                                    }`}
                                                >
                                                    {step.num}
                                                </span>
                                                <span
                                                    className={`font-sans text-base font-bold transition-colors ${
                                                        isActive
                                                            ? 'text-white'
                                                            : 'text-slate-400 group-hover:text-white'
                                                    }`}
                                                >
                                                    {step.name}
                                                </span>
                                            </div>
                                            <ArrowRight
                                                className={`h-4 w-4 transition-transform ${
                                                    isActive
                                                        ? 'translate-x-1 text-[#2EC4A5]'
                                                        : 'text-slate-600 group-hover:translate-x-1 group-hover:text-white'
                                                }`}
                                            />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 8. OVOLL JOURNAL / INSIGHTS SECTION */}
                <section className="bg-surface-section relative overflow-hidden border-t border-white/5 py-28">
                    <div className="relative mx-auto max-w-7xl px-6 md:px-12">
                        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
                            {/* Left Intro Column */}
                            {/* fade (not wipe): preserves the lg:sticky scroll-stick */}
                            <Reveal
                                variant="fade"
                                className="space-y-6 lg:sticky lg:top-32 lg:col-span-5 lg:self-start"
                            >
                                <span className="font-mono text-xs font-bold tracking-widest text-[#2EC4A5] uppercase">
                                    The OVOLL Journal
                                </span>
                                <h2 className="font-sans text-3xl leading-tight font-black text-white sm:text-4xl">
                                    We share the{' '}
                                    <span className="bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF] bg-clip-text text-transparent">
                                        thinking behind the craft
                                    </span>
                                </h2>
                                <p className="font-sans text-sm leading-relaxed text-slate-300">
                                    Field notes on motion design, performance engineering, sub-30ms
                                    architectures, and the editorial systems that make interfaces
                                    feel world-class.
                                </p>

                                <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-2">
                                    <Reveal variant="fade" delay={0} className="h-full">
                                        <div className="flex items-start gap-3 border-l-2 border-[#2EC4A5]/20 pl-4">
                                            <div className="mt-0.5 hidden h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#2EC4A5]/30 bg-[#2EC4A5]/10 md:flex">
                                                <Sparkles className="h-3.5 w-3.5 text-[#2EC4A5]" />
                                            </div>
                                            <div>
                                                <span className="font-sans text-sm font-bold text-white">
                                                    Motion Design Systems
                                                </span>
                                                <p className="font-sans text-xs leading-relaxed text-slate-400">
                                                    Micro-interaction patterns, spring-physics
                                                    curves, and scroll-driven choreography that make
                                                    UIs feel alive.
                                                </p>
                                            </div>
                                        </div>
                                    </Reveal>
                                    <Reveal variant="fade" delay={0.08} className="h-full">
                                        <div className="flex items-start gap-3 border-l-2 border-[#00D1FF]/20 pl-4">
                                            <div className="mt-0.5 hidden h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#00D1FF]/30 bg-[#00D1FF]/10 md:flex">
                                                <Gauge className="h-3.5 w-3.5 text-[#00D1FF]" />
                                            </div>
                                            <div>
                                                <span className="font-sans text-sm font-bold text-white">
                                                    Performance Engineering
                                                </span>
                                                <p className="font-sans text-xs leading-relaxed text-slate-400">
                                                    Core Web Vitals, edge caching strategies, and
                                                    bundle optimization techniques that keep load
                                                    times under 30ms.
                                                </p>
                                            </div>
                                        </div>
                                    </Reveal>
                                    <Reveal variant="fade" delay={0.16} className="h-full">
                                        <div className="flex items-start gap-3 border-l-2 border-[#8B5CF6]/20 pl-4">
                                            <div className="mt-0.5 hidden h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 md:flex">
                                                <Layers className="h-3.5 w-3.5 text-[#8B5CF6]" />
                                            </div>
                                            <div>
                                                <span className="font-sans text-sm font-bold text-white">
                                                    3D WebGL Experiences
                                                </span>
                                                <p className="font-sans text-xs leading-relaxed text-slate-400">
                                                    Shader art, procedural geometry, and GPU-driven
                                                    visual effects that push what the browser can
                                                    render.
                                                </p>
                                            </div>
                                        </div>
                                    </Reveal>
                                    <Reveal variant="fade" delay={0.24} className="h-full">
                                        <div className="flex items-start gap-3 border-l-2 border-[#14B8A6]/20 pl-4">
                                            <div className="mt-0.5 hidden h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#14B8A6]/30 bg-[#14B8A6]/10 md:flex">
                                                <PenTool className="h-3.5 w-3.5 text-[#14B8A6]" />
                                            </div>
                                            <div>
                                                <span className="font-sans text-sm font-bold text-white">
                                                    Editorial Systems
                                                </span>
                                                <p className="font-sans text-xs leading-relaxed text-slate-400">
                                                    Content architecture, typography hierarchies,
                                                    and visual grammar that make interfaces feel
                                                    world-class.
                                                </p>
                                            </div>
                                        </div>
                                    </Reveal>
                                </div>

                                <div>
                                    <Link
                                        href="/studio"
                                        className="hover:text-surface-section inline-flex items-center gap-2 rounded-full border border-[#2EC4A5]/40 bg-[#2EC4A5]/10 px-6 py-3 font-mono text-xs font-bold tracking-wider text-[#00D1FF] uppercase transition-all hover:bg-[#2EC4A5]"
                                    >
                                        Explore journal articles <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </Reveal>

                            {/* Right Articles List */}
                            <div className="space-y-6 lg:col-span-7">
                                {insights.map((article, i) => (
                                    <Link
                                        key={article.title}
                                        href="/studio"
                                        className="group bg-surface-card/70 relative flex items-start gap-6 rounded-2xl border border-white/10 p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#2EC4A5]/40 hover:shadow-[0_15px_30px_rgba(46,196,165,0.15)]"
                                    >
                                        <span className="font-mono text-3xl font-black text-white/15 transition-colors group-hover:text-[#2EC4A5]">
                                            0{i + 1}
                                        </span>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <span className="font-mono text-[10px] font-bold tracking-wider text-[#2EC4A5] uppercase">
                                                    {article.category}
                                                </span>
                                                <span className="text-slate-600">•</span>
                                                <span className="font-mono text-[10px] text-slate-400">
                                                    {article.readTime}
                                                </span>
                                            </div>
                                            <h3 className="font-sans text-lg font-bold text-white transition-colors group-hover:text-[#00D1FF]">
                                                {article.title}
                                            </h3>
                                            <p className="font-sans text-xs leading-relaxed text-slate-400">
                                                {article.excerpt}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 9. FINAL CALL TO ACTION ("Let's Build Something Extraordinary Together") */}
                <section className="bg-surface-section-alt relative overflow-hidden border-t border-white/10 py-32 text-center lg:py-40">
                    {/* Multi-Layer Radial Backglow & Interactive 3D Orbital Rings */}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <div className="h-[650px] w-[650px] rounded-full bg-[radial-gradient(circle,rgba(46,196,165,0.18)_0%,rgba(0,209,255,0.1)_40%,transparent_70%)] blur-[100px]" />
                        <div className="absolute h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.15)_0%,transparent_70%)] blur-2xl" />
                    </div>

                    {/* 3D WebGL Orbital Rings Canvas in background */}
                    <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-40">
                        <DeferredMount rootMargin="400px">
                            <Suspense fallback={null}>
                                <OrbitalRingsScene
                                    count={4}
                                    speed={0.8}
                                    className="h-96 w-full max-w-2xl"
                                />
                            </Suspense>
                        </DeferredMount>
                    </div>

                    <Reveal
                        width="full"
                        className="relative z-10 mx-auto max-w-4xl space-y-8 px-6 select-none"
                    >
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#2EC4A5]/30 bg-[#2EC4A5]/10 px-4 py-1.5 font-mono text-xs font-bold tracking-widest text-[#2EC4A5] uppercase backdrop-blur-md">
                            <Sparkles className="h-3.5 w-3.5" /> Start A Dialogue
                        </div>

                        <h2 className="font-sans text-4xl leading-tight font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                            LET'S BUILD A NEW{' '}
                            <span className="bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF] bg-clip-text text-transparent">
                                DIGITAL STANDARD
                            </span>{' '}
                            TOGETHER.
                        </h2>

                        <p className="mx-auto max-w-2xl font-sans text-base leading-relaxed text-slate-300">
                            We partner with visionary founders and engineering leaders to build
                            brand identity systems, high-speed web platforms, and growth engines.
                        </p>

                        <div className="flex justify-center pt-4">
                            <a
                                href={primaryUrl}
                                className="text-surface-section inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF] px-10 py-5 font-mono text-sm font-bold tracking-wider uppercase shadow-[0_0_40px_rgba(46,196,165,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(0,209,255,0.6)]"
                            >
                                Initiate Project Scoping <ArrowRight className="h-4 w-4" />
                            </a>
                        </div>
                    </Reveal>
                </section>
            </div>
        </>
    );
}

Welcome.layout = (page: React.ReactNode) => <LandingLayout>{page}</LandingLayout>;

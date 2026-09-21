import { Link } from '@inertiajs/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    ArrowRight,
    Check,
    Layers,
    LineChart,
    Quote,
    ShieldCheck,
    Sparkles,
    Compass,
    Gauge,
    LayoutGrid,
    Megaphone,
    Package,
    PenTool,
    Smartphone,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Reveal } from '@/animations';

const iconMap: Record<string, LucideIcon> = {
    Layers,
    Sparkles,
    LineChart,
    ShieldCheck,
    Compass,
    Gauge,
    LayoutGrid,
    Megaphone,
    Package,
    PenTool,
    Smartphone,
    Check,
};

/**
 * Capability icons resolved to local brand marks (public/tech-icons) so the
 * About cards share the same visual language as the services pages. Each key
 * is the brand slug of the stack behind that capability; any icon not listed
 * here falls back to the lucide map above.
 */
const brandIconFiles: Record<string, string> = {
    laravel: 'laravel.svg',
    react: 'react.svg',
    googleanalytics: 'googleanalytics.svg',
    typescript: 'typescript.svg',
};

import { PageBreadcrumbs } from '@/components/navigation/PageBreadcrumbs';
import { SeoHead } from '@/components/seo/SeoHead';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { LandingLayout } from '@/layouts/LandingLayout';
import { cn } from '@/utils';

// Static CSS-only visual elements (no Three.js dependency):
//   · GlassCrystalScene — CSS gradient crystal with float animation
//   · ProductCanvas      — SVG wireframe shapes per variant
//   · OrbitalRingsScene  — SVG orbital rings with CSS rotation
import { GlassCrystalScene } from '@/components/vfx/GlassCrystal';
import ProductCanvas from '@/components/three/ProductCanvas';
import { OrbitalRingsScene } from '@/components/vfx/OrbitalRings';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface CmsCapability extends Omit<Capability, 'icon'> {
    /** CMS may store the icon as a string key (resolved via iconMap) or as a component. */
    icon?: string | LucideIcon;
}

interface AboutCmsContent {
    capabilities?: CmsCapability[];
    processSteps?: ProcessStep[];
    clientGains?: Array<string | { title: string }>;
    hero?: {
        title?: string | null;
        subtitle?: string;
        badge?: string;
    };
}

interface AboutProps {
    page?: { content?: AboutCmsContent };
}

/* ------------------------------------------------------------------ */
/*  Static content — OVOLL's studio story. Kept here (not DB-driven)   */
/*  so the page reads as a curated narrative; the controller may still */
/*  override the hero copy via `sections`.                             */
/* ------------------------------------------------------------------ */

interface Capability {
    /** Brand slug resolved to a local tech-icons mark, or a lucide icon. */
    icon?: string | LucideIcon;
    title: string;
    description: string;
    /** Tailwind gradient stops — each block gets its own distinct accent. */
    bar: string;
    /** rgba glow tuned to the same accent (always-on ambient wash). */
    glow: string;
    /** stronger rgba used for the coloured drop-shadow on hover. */
    shadow: string;
    /** icon colour for this card. */
    iconColor: string;
}

const capabilities: Capability[] = [
    {
        icon: Compass,
        title: 'Strategic Product Architecture',
        description:
            'We design structured systems rooted in real workflows, clear data models, and a scalable foundation — not throwaway prototypes.',
        bar: 'from-[#2EC4A5] to-[#00D1FF]',
        glow: 'rgba(46,196,165,0.18)',
        shadow: 'rgba(46,196,165,0.45)',
        iconColor: 'text-[#2EC4A5]',
    },

    {
        icon: Sparkles,
        title: 'Premium Engineering & Design',
        description:
            'Type-safe React and Laravel paired with cinematic, GPU-accelerated interfaces that feel considered down to the last pixel.',
        bar: 'from-[#00D1FF] to-[#22D3EE]',
        glow: 'rgba(0,209,255,0.18)',
        shadow: 'rgba(0,209,255,0.45)',
        iconColor: 'text-[#00D1FF]',
    },

    {
        icon: LineChart,
        title: 'Digital Growth Execution',
        description:
            'From launch to scale, we ship performant, SEO-ready platforms instrumented for measurable, compounding growth.',
        bar: 'from-[#14B8A6] to-[#2EC4A5]',
        glow: 'rgba(20,184,166,0.18)',
        shadow: 'rgba(20,184,166,0.45)',
        iconColor: 'text-[#14B8A6]',
    },

    {
        icon: ShieldCheck,
        title: 'Long-Term Product Partnership',
        description:
            'We work as engineering partners — not vendors — accountable to your roadmap and the business impact behind it.',
        bar: 'from-[#22D3EE] to-[#00D1FF]',
        glow: 'rgba(34,211,238,0.18)',
        shadow: 'rgba(34,211,238,0.45)',
        iconColor: 'text-[#22D3EE]',
    },
];

interface ProcessStep {
    step: string;
    title: string;
    description: string;
    accent: string;
}

const processSteps: ProcessStep[] = [
    {
        step: '01',
        title: 'Discovery & Positioning',
        description:
            'We map your users, domain, and objectives to define a sharp product direction before a single line of code.',
        accent: 'from-[#2EC4A5] to-[#00D1FF]',
    },
    {
        step: '02',
        title: 'Product Architecture',
        description:
            'We shape the data models, systems, and interface language that keep the build consistent as it grows.',
        accent: 'from-[#00D1FF] to-[#22D3EE]',
    },
    {
        step: '03',
        title: 'Engineering & Design',
        description:
            'We ship in tight, tested increments — production-grade code and interfaces refined in the same loop.',
        accent: 'from-[#14B8A6] to-[#2EC4A5]',
    },
    {
        step: '04',
        title: 'Growth Optimization',
        description:
            'We refine continuously with analytics, performance budgets, and iteration built around real usage.',
        accent: 'from-[#22D3EE] to-[#00D1FF]',
    },
];

const clientGains: string[] = [
    'A structured, scalable product foundation built to last',
    'Cinematic, performance-obsessed interfaces at 60fps',
    'Type-safe, test-covered code you actually own',
    'A partner accountable to measurable business impact',
];

export default function About({ page }: AboutProps) {
    const heroRef = useRef<HTMLDivElement>(null);
    const capsRef = useRef<HTMLDivElement>(null);
    const processRef = useRef<HTMLDivElement>(null);
    const gainsRef = useRef<HTMLDivElement>(null);

    const [mousePos, setMousePos] = useState({ x: 700, y: 350 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const cms: AboutCmsContent = page?.content ?? {};

    const activeCapabilities = cms.capabilities?.length ? cms.capabilities : capabilities;

    const activeProcessSteps = cms.processSteps?.length ? cms.processSteps : processSteps;

    const activeClientGains = cms.clientGains?.length
        ? cms.clientGains.map((g) => (typeof g === 'string' ? g : g.title))
        : clientGains;

    const heroTitle = cms.hero?.title ?? null;
    const heroSubtitle =
        cms.hero?.subtitle ??
        'OVOLL is a premium design and engineering studio. We combine strategic product architecture, cinematic WebGL interfaces, and modular type-safe codebases to build platforms that scale.';
    const heroBadge = cms.hero?.badge ?? 'ABOUT OVOLL';

    // Animation orchestration
    useEffect(() => {
        const ctx = gsap.context(() => {
            const reveal = (el: HTMLElement | null, selector: string, y = 30) => {
                if (!el) {
                    return;
                }

                gsap.fromTo(
                    el.querySelectorAll(selector),
                    { opacity: 0, y },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        stagger: 0.1,
                        ease: 'power3.out',
                        scrollTrigger: { trigger: el, start: 'top 85%' },
                    },
                );
            };

            reveal(heroRef.current, '.animate-fade-up');
        });

        return () => ctx.revert();
    }, []);

    const aboutSchemas = [
        {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            '@id': 'https://ovoll.in/about#aboutpage',
            name: 'About OVOLL — Digital Product Studio & Engineering Partner',
            description: 'Learn about OVOLL\'s mission, architectural philosophy, multidisciplinary engineering team, and our commitment to building high-conversion digital experiences.',
            url: 'https://ovoll.in/about',
            mainEntity: {
                '@type': 'Organization',
                name: 'OVOLL',
                url: 'https://ovoll.in',
                logo: 'https://ovoll.in/favicon.svg',
            },
        },
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: 'https://ovoll.in',
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'About',
                    item: 'https://ovoll.in/about',
                },
            ],
        },
    ];

    return (
        <>
            <SeoHead
                title="About OVOLL — Strategic Branding & Digital Product Studio"
                description="Learn about OVOLL's mission, engineering philosophy, and multidisciplinary design studio in India building high-converting brand flagships and enterprise software for ambitious companies worldwide."
                canonical="https://ovoll.in/about"
                type="website"
                keywords={[
                    'about OVOLL',
                    'digital product studio India',
                    'strategic branding studio Bangalore',
                    'engineering partner India',
                    'full-stack design agency Mumbai',
                    'SaaS design studio team',
                ]}
                schema={aboutSchemas}
            />

            <PageBreadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />

            <div
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="relative z-10 min-h-screen overflow-hidden bg-[#060C16] text-white"
            >
                {/* 1. INTERACTIVE MOUSE SPOTLIGHT */}
                <div
                    className="pointer-events-none absolute inset-0 transition-opacity duration-700 ease-out select-none"
                    style={{
                        opacity: isHovering ? 1 : 0.6,
                        background: `radial-gradient(900px circle at ${mousePos.x}px ${mousePos.y}px, rgba(46, 196, 165, 0.14), rgba(0, 209, 255, 0.05) 40%, transparent 80%)`,
                    }}
                />

                {/* 2. ARCHITECTURAL BLUEPRINT GRID */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-30 select-none"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(46, 196, 165, 0.12) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(46, 196, 165, 0.12) 1px, transparent 1px)
                        `,
                        backgroundSize: '48px 48px',
                        maskImage: 'radial-gradient(ellipse 85% 70% at 50% 35%, #000 30%, transparent 90%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 85% 70% at 50% 35%, #000 30%, transparent 90%)',
                    }}
                />

                {/* 3. SACRED GEOMETRY ORBITAL BLUEPRINT SVG */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-25 select-none">
                    <svg
                        viewBox="0 0 1200 1200"
                        className="h-[1400px] w-[1400px] max-w-none text-[#2EC4A5]"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="600" cy="600" r="520" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" opacity="0.3" />
                        <circle cx="600" cy="600" r="380" stroke="#00D1FF" strokeWidth="1" strokeDasharray="8 12" opacity="0.25" />
                        <circle cx="600" cy="600" r="220" stroke="currentColor" strokeWidth="1" opacity="0.3" />

                        {/* Diagonal Scanner Axis */}
                        <line x1="200" y1="200" x2="1000" y2="1000" stroke="#00D1FF" strokeWidth="0.8" opacity="0.2" strokeDasharray="6 6" />
                        <line x1="1000" y1="200" x2="200" y2="1000" stroke="#00D1FF" strokeWidth="0.8" opacity="0.2" strokeDasharray="6 6" />

                        {/* Orbiting Satellite Points */}
                        <circle cx="600" cy="220" r="5" fill="#2EC4A5" />
                        <circle cx="980" cy="600" r="6" fill="#00D1FF" />
                        <circle cx="600" cy="980" r="5" fill="#8B5CF6" />
                        <circle cx="220" cy="600" r="6" fill="#2EC4A5" />
                    </svg>
                </div>

                {/* 4. MASSIVE STENCIL WATERMARK */}
                <div className="pointer-events-none absolute top-48 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-[0.025] select-none">
                    <span className="font-sans text-[180px] font-black tracking-widest text-white uppercase sm:text-[240px] lg:text-[300px]">
                        OVOLL STUDIO
                    </span>
                </div>

                {/* 5. ATMOSPHERIC NEBULA GLOWS */}
                <div className="pointer-events-none absolute inset-0 select-none">
                    <div className="absolute -top-32 -left-32 h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(46,196,165,0.15)_0%,rgba(46,196,165,0.02)_50%,transparent_70%)] blur-[140px]" />
                    <div className="absolute top-1/3 -right-32 h-[750px] w-[750px] rounded-full bg-[radial-gradient(circle,rgba(0,209,255,0.12)_0%,rgba(0,209,255,0.02)_50%,transparent_70%)] blur-[140px]" />
                </div>

                {/* 1. HERO — split layout with a transmission-glass torus-knot */}
                <section ref={heroRef} className="relative overflow-hidden pt-10 pb-14 select-none">
                    <div className="container-editorial relative grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
                        <div className="space-y-8 lg:col-span-7">
                            <Badge variant="flag" size="sm" className="animate-fade-up">
                                {heroBadge}
                            </Badge>
                            <h1 className="typo-display-xl animate-fade-up max-w-3xl leading-none tracking-tight">
                                {heroTitle ?? (
                                    <>
                                        We build digital products that{' '}
                                        <span className="text-gradient bg-gradient-to-r from-[#14B8A6] to-[#00D1FF]">
                                            lead markets — not follow them.
                                        </span>
                                    </>
                                )}
                            </h1>

                            <p className="typo-body-large reading-width animate-fade-up max-w-xl text-white/50">
                                {heroSubtitle}
                            </p>
                            <div className="animate-fade-up flex flex-wrap items-center gap-6 pt-2">
                                <Link href="/contact">
                                    <Button
                                        variant="gradient"
                                        size="md"
                                        rightIcon={<ArrowRight className="h-4 w-4" />}
                                        className="cursor-pointer rounded-full"
                                    >
                                        Let's build together
                                    </Button>
                                </Link>
                                <span className="font-mono text-xs tracking-widest text-white/40 uppercase">
                                    Design · Engineering · Growth
                                </span>
                            </div>
                        </div>

                        <div className="relative h-[300px] lg:col-span-5 lg:h-[420px]">
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(0,209,255,0.12),transparent_65%)] blur-2xl" />
                            <GlassCrystalScene className="h-full w-full" shape="knot" speed={0.9} />
                        </div>
                    </div>
                </section>

                {/* 2. CAPABILITIES — each block carries its own gradient accent */}
                <section
                    ref={capsRef}
                    className="container-editorial border-t border-white/5 py-16 md:py-20"
                >
                    <Reveal width="full" className="mb-12 max-w-2xl space-y-4 select-none">
                        <span className="typo-caption text-[#2EC4A5]">WHAT WE DO</span>
                        <h2 className="typo-heading-xl text-white">
                            Structured thinking, engineered into product.
                        </h2>
                    </Reveal>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {activeCapabilities.map((cap, i) => {
                            const Icon =
                                typeof cap.icon === 'string'
                                    ? iconMap[cap.icon] || Layers
                                    : cap.icon || Layers;
                            const brandIcon =
                                typeof cap.icon === 'string' ? brandIconFiles[cap.icon] : undefined;

                            return (
                                <Reveal
                                    key={cap.title}
                                    variant="fade"
                                    delay={(i % 4) * 0.08}
                                    className="h-full"
                                >
                                    <div
                                        className="cap-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0A1420]/60 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-white/20"
                                        style={
                                            {
                                                '--card-glow': cap.glow,
                                                '--card-shadow': cap.shadow,
                                            } as React.CSSProperties
                                        }
                                    >
                                        <div
                                            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                            style={{
                                                background: `radial-gradient(circle at top right, var(--card-glow), transparent 70%)`,
                                            }}
                                        />

                                        <span
                                            className={cn(
                                                'absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r transition-transform duration-500 group-hover:scale-x-100',
                                                cap.bar,
                                            )}
                                        />

                                        <div className="relative">
                                            <span
                                                className={cn(
                                                    'mb-8 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors duration-500 group-hover:border-white/20 group-hover:bg-white/10',
                                                    cap.iconColor,
                                                )}
                                            >
                                                {brandIcon ? (
                                                    <img
                                                        src={`/tech-icons/${brandIcon}`}
                                                        alt={cap.title}
                                                        className="h-6 w-6 object-contain"
                                                    />
                                                ) : (
                                                    <Icon className="h-6 w-6" />
                                                )}
                                            </span>
                                            <h3 className="typo-heading-s mb-3 text-white transition-colors duration-500">
                                                {cap.title}
                                            </h3>
                                            <p className="typo-body-small leading-relaxed text-white/55">
                                                {cap.description}
                                            </p>
                                        </div>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </section>

                {/* 3. OUR APPROACH — narrative beside a category 3D scene */}
                <section className="container-editorial border-t border-white/5 py-16 md:py-20">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
                        <div className="space-y-6 lg:col-span-7">
                            <span className="typo-caption text-[#2EC4A5]">OUR APPROACH</span>
                            <h2 className="typo-heading-xl text-white">
                                How we build market-leading products.
                            </h2>
                            <p className="typo-body reading-width text-white/50">
                                Our strength lies in structured thinking and disciplined execution.
                                Every engagement begins with clarity — understanding your market,
                                users, and long-term objectives. We don't rely on trends or
                                guesswork; we build products with intention, precision, and a
                                scalable vision.
                            </p>
                            <p className="typo-body reading-width text-white/50">
                                From product architecture and interface design to engineering and
                                performance strategy, our framework keeps every touchpoint
                                consistent. Sustainable growth is engineered through structure and
                                clarity — never shortcuts.
                            </p>
                        </div>
                        <div className="relative h-64 lg:col-span-5 lg:h-80">
                            <ProductCanvas variant="enterprise" colorful />
                        </div>
                    </div>
                </section>

                {/* 4. PROCESS — the four-step framework, each with its own accent */}
                <section
                    ref={processRef}
                    className="container-editorial border-t border-white/5 py-16 md:py-20"
                >
                    <Reveal width="full" className="mb-12 max-w-2xl space-y-4 select-none">
                        <span className="typo-caption text-[#2EC4A5]">THE FRAMEWORK</span>
                        <h2 className="typo-heading-xl text-white">
                            A disciplined path from idea to impact.
                        </h2>
                    </Reveal>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {activeProcessSteps.map((step, i) => (
                            <Reveal
                                key={step.step}
                                variant="fade"
                                delay={(i % 4) * 0.08}
                                className="h-full"
                            >
                                <div className="process-step group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#0A1420]/60 p-7">
                                    <span
                                        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${step.accent}`}
                                    />
                                    <div
                                        className={`font-display bg-gradient-to-r bg-clip-text text-4xl font-extrabold text-transparent ${step.accent} select-none`}
                                    >
                                        {step.step}
                                    </div>
                                    <h4 className="typo-label mt-4 leading-tight text-white">
                                        {step.title}
                                    </h4>
                                    <p className="typo-body-small mt-2 leading-relaxed text-white/50">
                                        {step.description}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>

                {/* 5. PHILOSOPHY — pull quote beside a floating 3D accent */}
                <section className="bg-surface-section relative overflow-hidden border-t border-white/5 py-16 md:py-20">
                    <div className="container-editorial grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
                        <div className="relative order-2 h-56 lg:order-1 lg:col-span-4 lg:h-72">
                            <ProductCanvas variant="community" />
                        </div>
                        <div className="order-1 space-y-6 lg:order-2 lg:col-span-8">
                            <Quote className="h-10 w-10 text-[#2EC4A5]/60" />
                            <blockquote className="typo-heading-l max-w-3xl text-white">
                                Strong products aren't built by chance. They're engineered through
                                clarity, structure, and disciplined execution.
                            </blockquote>
                            <div className="flex items-center gap-3 pt-2">
                                <span className="h-px w-10 bg-[#2EC4A5]" />
                                <span className="font-mono text-xs tracking-widest text-white/50 uppercase">
                                    The OVOLL Studio Philosophy
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. CLIENT GAINS — checklist of outcomes */}
                <section
                    ref={gainsRef}
                    className="container-editorial border-t border-white/5 py-16 md:py-20"
                >
                    <Reveal width="full" className="mb-12 max-w-2xl space-y-4 select-none">
                        <span className="typo-caption text-[#2EC4A5]">THE OUTCOME</span>
                        <h2 className="typo-heading-xl text-white">
                            What you gain working with OVOLL.
                        </h2>
                    </Reveal>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        {activeClientGains.map((gain: string, i) => (
                            <Reveal
                                key={gain}
                                variant="fade"
                                delay={(i % 2) * 0.08}
                                className="h-full"
                            >
                                <div className="gain-item group relative flex h-full items-start gap-5 rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:bg-white/[0.04]">
                                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#00D1FF]/10 text-[#00D1FF]">
                                        <Check className="h-4 w-4" />
                                    </div>
                                    <span className="typo-body-large text-slate-200">{gain}</span>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>

                {/* 7. CTA — orbital rings drift behind the closing copy */}
                <section className="relative overflow-hidden border-t border-white/5 py-20 md:py-28">
                    <div className="pointer-events-none absolute inset-0">
                        <OrbitalRingsScene className="h-full w-full" opacity={0.4} speed={0.7} />
                        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_30%,var(--color-surface-section)_80%)]" />
                    </div>

                    <div className="relative mx-auto max-w-3xl space-y-8 text-center">
                        <span className="typo-caption text-[#2EC4A5]">LET'S BUILD</span>
                        <h2 className="typo-heading-xl text-white">
                            Ready to engineer your next{' '}
                            <span className="text-gradient bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF]">
                                market-leading product?
                            </span>
                        </h2>
                        <p className="typo-body reading-width mx-auto max-w-xl text-white/50">
                            Tell us what you're building. We'll map the architecture, design the
                            experience, and ship it with you.
                        </p>
                        <div className="flex justify-center pt-2">
                            <Link href="/contact">
                                <Button
                                    variant="gradient"
                                    size="md"
                                    rightIcon={<ArrowRight className="h-4 w-4" />}
                                    className="cursor-pointer rounded-full"
                                >
                                    Start a conversation
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

About.layout = (page: React.ReactNode) => <LandingLayout>{page}</LandingLayout>;

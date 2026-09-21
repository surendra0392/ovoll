import { Link } from '@inertiajs/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    CheckCircle2,
    HelpCircle,
    ArrowRight,
    Calendar,
    Compass,
    Target,
    ShieldAlert,
    Layers,
    Sparkles,
    Check,
    Cpu
} from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { Reveal } from '@/animations';
import { PageBreadcrumbs } from '@/components/navigation/PageBreadcrumbs';
import { SeoHead } from '@/components/seo/SeoHead';
import { Button } from '@/components/ui/Button';
import { LandingLayout } from '@/layouts/LandingLayout';
import { cn } from '@/utils';
import { ServiceHeroVisual } from '@/components/services/ServiceHeroVisual';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Map tech names to local SVG icon filenames in /tech-icons/
const TECH_ICON_MAP: Record<string, string> = {
    'adobexd': 'adobexd',
    'adobe xd': 'adobexd',
    'xd': 'adobexd',
    'framer': 'framer',
    'framer & webflow': 'framer',
    'framer motion': 'framer',
    'invision': 'invision',
    'invision & principle': 'invision',
    'sketch': 'sketch',
    'adobe photoshop': 'photoshop',
    'photoshop': 'photoshop',
    'adobe illustrator': 'illustrator',
    'illustrator': 'illustrator',
    'adobe indesign': 'illustrator',
    'indesign': 'illustrator',
    'adobe dimension': 'blender',
    'dimension': 'blender',
    'adobe acrobat pro': 'illustrator',
    'acrobat pro': 'illustrator',
    'solidworks': 'blender',
    'blender 3d': 'blender',
    'blender': 'blender',
    'cinema 4d': 'blender',
    'canva enterprise': 'canva',
    'canva': 'canva',
    'tailwind css & css grid': 'tailwindcss',
    'tailwind css & bootstrap': 'tailwindcss',
    'tailwind css': 'tailwindcss',
    'bootstrap': 'bootstrap',
    'bootstrap 5': 'bootstrap',
    'figma': 'figma',
    'react': 'react',
    'react & next.js': 'react',
    'react & inertia.js': 'react',
    'react native': 'react',
    'react three fiber': 'threedotjs',
    'three.js & webgl': 'threedotjs',
    'laravel': 'laravel',
    'laravel horizon': 'laravel',
    'laravel reverb': 'laravel',
    'laravel echo': 'laravel',
    'laravel queue systems': 'laravel',
    'laravel & inertia.js': 'laravel',
    'filament': 'laravel',
    'core php & cakephp': 'php',
    'core php': 'php',
    'cakephp': 'php',
    'codeigniter': 'php',
    'php & laravel': 'php',
    'php': 'php',
    'vue.js': 'vue',
    'vue js': 'vue',
    'vue': 'vue',
    'wordpress': 'wordpress',
    'wordpress & headless cms': 'wordpress',
    'headless cms': 'wordpress',
    'inertia.js': 'inertia',
    'inertia': 'inertia',
    'inertia & react': 'inertia',
    'htmx': 'htmx',
    'htmx & websockets': 'htmx',
    'typescript': 'typescript',
    'typescript & javascript': 'typescript',
    'javascript': 'javascript',
    'node.js & express': 'nodedotjs',
    'node.js': 'nodedotjs',
    'node': 'nodedotjs',
    'postgresql & mysql': 'supabase',
    'postgresql': 'supabase',
    'mysql': 'supabase',
    'redis': 'laravel',
    'docker & cloudflare': 'docker',
    'docker': 'docker',
    'kubernetes': 'kubernetes',
    'aws': 'aws',
    'aws textract': 'aws',
    'cloudflare': 'cloudflare',
    'cloudflare edge': 'cloudflare',
    'cloudflare & aws': 'cloudflare',
    'vercel / cloudflare': 'cloudflare',
    'anthropic claude': 'anthropic',
    'anthropic': 'anthropic',
    'claude / gpt-4o': 'anthropic',
    'openai / anthropic api': 'anthropic',
    'openai gpt-4o': 'googlegemini',
    'openai': 'googlegemini',
    'google gemini': 'googlegemini',
    'gemini': 'googlegemini',
    'python': 'python',
    'pytorch': 'python',
    'opencv': 'python',
    'tensorflow': 'tensorflow',
    'lighthouse': 'lighthouse',
    'google tag manager': 'googleanalytics',
    'google analytics': 'googleanalytics',
    'meta pixel & capi': 'meta',
    'meta': 'meta',
    'screaming frog': 'googlesearchconsole',
    'google search console': 'googlesearchconsole',
    'android sdk': 'android',
    'android': 'android',
    'apple ios': 'apple',
    'apple': 'apple',
    'ios': 'apple',
    'flutter': 'flutter',
    'firebase': 'firebase',
    'supabase': 'supabase',
    'after effects & lottie': 'greensock',
    'lottie & after effects': 'greensock',
    'gsap & scrolltrigger': 'greensock',
    'puppeteer & playwright': 'nodedotjs',
    'vite': 'laravel',
    'pwa': 'pwa',
    'workbox': 'pwa',
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

function TechLogoBadge({ name }: { name: string }) {
    const [failed, setFailed] = useState(false);
    const slug = getTechIconSlug(name);
    const iconSrc = `/tech-icons/${slug}.svg`;

    if (failed) {
        return <Cpu className="h-5 w-5 text-[#00D1FF]" />;
    }

    return (
        <img
            src={iconSrc}
            alt={`${name} logo`}
            className="h-6 w-6 object-contain transition-transform duration-300 group-hover:scale-110"
            onError={() => setFailed(true)}
        />
    );
}

interface ServiceItem {
    id: number;
    slug: string;
    name: string;
    description: string;
    problem_solution?: {
        problem: string;
        solution: string;
    };
    deliverables?: Array<{ title: string; description: string }>;
    process_timeline?: Array<{ title: string; desc: string }>;
    technologies?: Array<{ name: string; desc: string }>;
    pricing_comparison?: Array<{ name: string; price: string; desc: string }>;
    faqs?: Array<{ question: string; answer: string }>;
    seo?: {
        meta_title?: string;
        meta_description?: string;
        keywords?: string;
    };
    settings?: {
        timeline?: string;
        ideal_project?: string;
        outcome?: string;
    };
}

interface ShowProps {
    service: ServiceItem;
}

interface MilestoneDetail {
    badge: string;
    timeline: string;
    deliverables: string[];
    status: string;
}

function getMilestoneMetadata(idx: number, title: string, desc: string, total: number): MilestoneDetail {
    const cleanTitle = title.toLowerCase();
    
    if (idx === 0 || cleanTitle.includes('audit') || cleanTitle.includes('discovery') || cleanTitle.includes('analysis') || cleanTitle.includes('planning') || cleanTitle.includes('concept')) {
        return {
            badge: 'PHASE 01 · STRATEGY & SCOPING',
            timeline: 'Sprint 01 · Week 1-2',
            deliverables: [
                'Architecture & Blueprint Specification',
                'Competitive Diagnostic & Strategy Deck',
                'Technical Feasibility & Milestone Sign-Off'
            ],
            status: 'FOUNDATION'
        };
    }
    
    if (idx === total - 1 || cleanTitle.includes('delivery') || cleanTitle.includes('deployment') || cleanTitle.includes('launch') || cleanTitle.includes('handover') || cleanTitle.includes('inspection')) {
        return {
            badge: `PHASE 0${idx + 1} · PRODUCTION DEPLOYMENT`,
            timeline: `Sprint 0${idx + 1} · Final Launch`,
            deliverables: [
                'End-to-End Test & Speed Verification',
                'Production Deployment & DNS / SSL Launch',
                'Complete Asset Handover & Documentation'
            ],
            status: 'GO-LIVE'
        };
    }

    return {
        badge: `PHASE 0${idx + 1} · ITERATIVE ENGINEERING`,
        timeline: `Sprint 0${idx + 1} · Week ${idx * 2 + 1}-${idx * 2 + 2}`,
        deliverables: [
            'High-Fidelity Component Construction',
            'Live Staging Environment Previews',
            'Continuous Integration & Feedback Sync'
        ],
        status: 'EXECUTION'
    };
}

export default function Show({ service }: ShowProps) {
    const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    const metaTitle = service.seo?.meta_title ?? `${service.name} — OVOLL`;
    const metaDescription = service.seo?.meta_description ?? service.description;

    const canonicalUrl = `https://ovoll.in/services/${service.slug}`;

    const serviceSchemas = [
        {
            '@context': 'https://schema.org',
            '@type': 'Service',
            '@id': `${canonicalUrl}#service`,
            name: service.name,
            description: service.description,
            provider: {
                '@type': 'Organization',
                name: 'OVOLL',
                url: 'https://ovoll.in',
                logo: 'https://ovoll.in/favicon.svg',
            },
            areaServed: [
                { '@type': 'Country', name: 'India' },
                { '@type': 'Country', name: 'United States' },
                { '@type': 'Country', name: 'United Kingdom' },
                { '@type': 'Country', name: 'United Arab Emirates' },
                { '@type': 'Country', name: 'Singapore' },
                { '@type': 'Country', name: 'Australia' },
                { '@type': 'Country', name: 'Worldwide' },
            ],
            offers: {
                '@type': 'Offer',
                availability: 'https://schema.org/InStock',
                priceCurrency: 'INR',
                url: `${canonicalUrl}#scoping`,
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
                    name: 'Services',
                    item: 'https://ovoll.in/services',
                },
                {
                    '@type': 'ListItem',
                    position: 3,
                    name: service.name,
                    item: canonicalUrl,
                },
            ],
        },
        ...(service.faqs && service.faqs.length > 0
            ? [
                  {
                      '@context': 'https://schema.org',
                      '@type': 'FAQPage',
                      mainEntity: service.faqs.map((faq) => ({
                          '@type': 'Question',
                          name: faq.question,
                          acceptedAnswer: {
                              '@type': 'Answer',
                              text: faq.answer,
                          },
                      })),
                  },
              ]
            : []),
    ];

    useEffect(() => {
        if (heroRef.current) {
            gsap.fromTo(
                heroRef.current.querySelectorAll('.animate-hero-up'),
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                },
            );
        }

        if (contentRef.current) {
            const sections = contentRef.current.querySelectorAll('.animate-section');
            sections.forEach((sec) => {
                gsap.fromTo(
                    sec,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: sec,
                            start: 'top 85%',
                        },
                    },
                );
            });
        }
    }, [service.slug]);

    return (
        <>
            <SeoHead
                title={metaTitle}
                description={metaDescription}
                canonical={canonicalUrl}
                type="service"
                keywords={
                    service.seo?.keywords
                        ? service.seo.keywords
                        : [
                              service.name,
                              `${service.name} agency India`,
                              `${service.name} services Bangalore`,
                              `${service.name} consulting`,
                              'enterprise software engineering',
                              'OVOLL services',
                          ]
                }
                schema={serviceSchemas}
            />

            <PageBreadcrumbs
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Services', href: '/services' },
                    { label: service.name },
                ]}
            />

            <div className="relative z-10 min-h-screen bg-transparent pt-10 pb-24 text-white">
                {/* 1. HERO SECTION & SIDEBAR METADATA */}
                <div
                    ref={heroRef}
                    className="container-editorial grid min-h-[520px] grid-cols-1 items-center gap-12 overflow-visible lg:grid-cols-12 lg:gap-16"
                >
                    {/* Atmospheric Nebula Glow */}
                    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(46,196,165,0.12),transparent_70%)] blur-3xl" />
                        <div className="absolute -top-20 right-1/4 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(0,209,255,0.10),transparent_70%)] blur-3xl" />
                    </div>

                    <div className="space-y-8 text-center select-none lg:col-span-7 lg:text-left">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#2EC4A5]/30 bg-[#2EC4A5]/10 px-4 py-1.5 font-mono text-xs tracking-widest text-[#2EC4A5] uppercase">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2EC4A5]" />
                            Service Blueprint Specifications
                        </span>
                        <h1 className="typo-display-xl animate-hero-up leading-tight tracking-tight text-white">
                            <span className="text-gradient">{service.name}</span>
                        </h1>
                        <p className="typo-body-large animate-hero-up reading-width mx-auto max-w-xl leading-relaxed text-white/60 lg:mx-0">
                            {service.description}
                        </p>

                        {/* Blueprint parameters glass sidebar strip */}
                        <div className="animate-hero-up mt-12 grid grid-cols-1 gap-4 text-left md:grid-cols-3">
                            <div className="group rounded-2xl border border-white/10 bg-[#071320]/80 p-5 backdrop-blur-xl transition-all duration-300 hover:border-[#2EC4A5]/40 hover:bg-[#0b1c2e]">
                                <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-wider text-[#2EC4A5] uppercase">
                                    <Calendar className="h-3.5 w-3.5 text-[#00D1FF]" /> Timeline
                                </span>
                                <p className="font-display mt-2 text-sm font-bold text-white">
                                    {service.settings?.timeline ?? '4-6 weeks'}
                                </p>
                            </div>
                            <div className="group rounded-2xl border border-white/10 bg-[#071320]/80 p-5 backdrop-blur-xl transition-all duration-300 hover:border-[#00D1FF]/40 hover:bg-[#0b1c2e]">
                                <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-wider text-[#00D1FF] uppercase">
                                    <Compass className="h-3.5 w-3.5 text-[#2EC4A5]" /> Ideal Project
                                </span>
                                <p className="font-display mt-2 text-sm leading-snug font-bold text-white">
                                    {service.settings?.ideal_project ?? 'New product launch'}
                                </p>
                            </div>
                            <div className="group rounded-2xl border border-white/10 bg-[#071320]/80 p-5 backdrop-blur-xl transition-all duration-300 hover:border-[#2EC4A5]/40 hover:bg-[#0b1c2e]">
                                <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-wider text-[#2EC4A5] uppercase">
                                    <Target className="h-3.5 w-3.5 text-[#00D1FF]" /> Target Outcome
                                </span>
                                <p className="font-display mt-2 text-sm leading-snug font-bold text-white">
                                    {service.settings?.outcome ?? 'Cohesive brand equity'}
                                </p>
                            </div>
                        </div>

                        <div className="animate-hero-up pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                            <Link href="/contact">
                                <Button
                                    variant="gradient"
                                    size="md"
                                    className="text-black rounded-full bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF] px-8 py-3.5 font-bold tracking-wide shadow-[0_10px_30px_-10px_rgba(46,196,165,0.5)] transition-all duration-300 hover:scale-105"
                                >
                                    Initiate Blueprint Scoping{' '}
                                    <ArrowRight className="ml-2 inline-block h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="/services">
                                <Button
                                    variant="ghost"
                                    size="md"
                                    className="rounded-full border border-white/20 px-6 py-3.5 text-xs font-mono font-bold tracking-widest text-white/80 uppercase hover:border-[#2EC4A5] hover:text-white"
                                >
                                    View All Services
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Dynamic Hero Visual Container — Domain-tailored animated visual & floating tech stack */}
                    <div className="animate-hero-up pointer-events-auto relative flex min-h-[420px] w-full items-center justify-center overflow-visible select-none lg:col-span-5 lg:min-h-[520px]">
                        <ServiceHeroVisual service={service} className="w-full" />
                    </div>
                </div>

                <div ref={contentRef} className="mt-28 space-y-36">
                    {/* 2. PROBLEM & SOLUTION SECTION */}
                    {service.problem_solution && (
                        <div className="container-editorial animate-section border-t border-white/10 pt-20">
                            <div className="mb-14 space-y-3 text-center lg:text-left">
                                <span className="inline-flex items-center gap-2 rounded-full border border-[#2EC4A5]/30 bg-[#2EC4A5]/10 px-4 py-1.5 font-mono text-xs tracking-widest text-[#2EC4A5] uppercase">
                                    Strategic Diagnostic
                                </span>
                                <h2 className="typo-heading-xl text-white">
                                    Problem vs{' '}
                                    <span className="text-gradient">Vanguard Resolution</span>
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                                {/* The Friction Point */}
                                <div className="group relative flex flex-col justify-between space-y-6 rounded-3xl border border-red-500/20 bg-gradient-to-b from-red-950/20 to-[#0F0812]/90 p-8 md:p-10 backdrop-blur-xl transition-all duration-500 hover:border-red-500/40 hover:shadow-[0_20px_50px_rgba(239,68,68,0.1)]">
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3.5 py-1 font-mono text-[11px] font-bold tracking-widest text-red-400 uppercase">
                                                <ShieldAlert className="h-3.5 w-3.5" /> The Friction Point
                                            </span>
                                            <span className="font-mono text-xs font-bold text-red-500/50">PROBLEM</span>
                                        </div>
                                        <h3 className="typo-heading-m font-bold tracking-tight text-white uppercase">
                                            The Commercial Challenge
                                        </h3>
                                        <p className="typo-body-small leading-relaxed text-white/70 text-base">
                                            {service.problem_solution.problem}
                                        </p>
                                    </div>
                                    <div className="pt-4 border-t border-red-500/10 flex items-center gap-2 text-xs font-mono text-red-400/80">
                                        <span>STATUS:</span>
                                        <span className="font-bold">CAUSES REVENUE LEAKAGE & CHURN</span>
                                    </div>
                                </div>

                                {/* Our Resolution */}
                                <div className="group relative flex flex-col justify-between space-y-6 rounded-3xl border border-[#2EC4A5]/30 bg-gradient-to-b from-[#2EC4A5]/10 to-[#071618]/90 p-8 md:p-10 backdrop-blur-xl transition-all duration-500 hover:border-[#2EC4A5]/60 hover:shadow-[0_20px_50px_rgba(46,196,165,0.15)]">
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <span className="inline-flex items-center gap-2 rounded-full border border-[#2EC4A5]/30 bg-[#2EC4A5]/10 px-3.5 py-1 font-mono text-[11px] font-bold tracking-widest text-[#2EC4A5] uppercase">
                                                <CheckCircle2 className="h-3.5 w-3.5" /> Vanguard Resolution
                                            </span>
                                            <span className="font-mono text-xs font-bold text-[#2EC4A5]/50">SOLUTION</span>
                                        </div>
                                        <h3 className="typo-heading-m font-bold tracking-tight text-white uppercase">
                                            Our Engineered Approach
                                        </h3>
                                        <p className="typo-body-small leading-relaxed text-white/70 text-base">
                                            {service.problem_solution.solution}
                                        </p>
                                    </div>
                                    <div className="pt-4 border-t border-[#2EC4A5]/15 flex items-center gap-2 text-xs font-mono text-[#2EC4A5]">
                                        <span>OUTCOME:</span>
                                        <span className="font-bold">PREDICTABLE HIGH-CONVERTING SCALE</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 3. DELIVERABLES SECTION */}
                    {service.deliverables && service.deliverables.length > 0 && (
                        <div className="container-editorial animate-section border-t border-white/10 pt-20">
                            <Reveal className="mb-14 space-y-3 text-center lg:text-left">
                                <span className="inline-flex items-center gap-2 rounded-full border border-[#2EC4A5]/30 bg-[#2EC4A5]/10 px-4 py-1.5 font-mono text-xs tracking-widest text-[#2EC4A5] uppercase">
                                    Deliverable Assets
                                </span>
                                <h2 className="typo-heading-xl text-white">
                                    Key Deliverables{' '}
                                    <span className="text-gradient">Handed Over</span>
                                </h2>
                            </Reveal>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {service.deliverables.map((item, idx) => (
                                    <Reveal
                                        key={idx}
                                        variant="fade"
                                        delay={(idx % 3) * 0.08}
                                        className="h-full"
                                    >
                                        <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#071320]/80 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#2EC4A5]/60 hover:bg-[#0A1B2E] hover:shadow-[0_25px_50px_-20px_rgba(46,196,165,0.25)]">
                                            <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF] transition-transform duration-500 group-hover:scale-x-100" />
                                            
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#2EC4A5]/30 bg-[#2EC4A5]/10 text-[#2EC4A5] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#2EC4A5] group-hover:text-black">
                                                        <CheckCircle2 className="h-5 w-5" />
                                                    </span>
                                                    <span className="font-mono text-xs font-bold text-white/30">
                                                        0{idx + 1}
                                                    </span>
                                                </div>
                                                <h3 className="typo-heading-s font-bold tracking-tight text-white uppercase transition-colors group-hover:text-[#2EC4A5]">
                                                    {item.title}
                                                </h3>
                                                <p className="typo-body-small leading-relaxed text-white/60">
                                                    {item.description}
                                                </p>
                                            </div>

                                            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
                                                <span>SPECIFICATION:</span>
                                                <span className="text-[#2EC4A5] font-semibold">PRODUCTION READY</span>
                                            </div>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 4. DISCIPLINED SPRINT EXECUTION ROADMAP */}
                    {service.process_timeline && service.process_timeline.length > 0 && (
                        <div className="container-editorial animate-section border-t border-white/10 pt-20">
                            <Reveal className="mb-14 space-y-3 text-center lg:text-left">
                                <span className="inline-flex items-center gap-2 rounded-full border border-[#2EC4A5]/30 bg-[#2EC4A5]/10 px-4 py-1.5 font-mono text-xs tracking-widest text-[#2EC4A5] uppercase">
                                    Disciplined Execution
                                </span>
                                <h2 className="typo-heading-xl text-white">
                                    Roadmap & <span className="text-gradient">Sprint Milestones</span>
                                </h2>
                                <p className="text-white/60 text-sm max-w-xl">
                                    Structured in transparent, fast-paced sprint stages with clear, distinct verification criteria at every milestone.
                                </p>
                            </Reveal>

                            {/* Connected Process Track Pipeline Header */}
                            <div className="hidden lg:grid grid-cols-3 gap-6 mb-6 px-4">
                                {service.process_timeline.map((_, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#2EC4A5]/40 bg-[#2EC4A5]/10 font-mono text-xs font-bold text-[#2EC4A5]">
                                            0{idx + 1}
                                        </div>
                                        <div className="h-0.5 flex-1 bg-gradient-to-r from-[#2EC4A5]/50 to-white/10" />
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                {service.process_timeline.map((step, idx) => {
                                    const meta = getMilestoneMetadata(idx, step.title, step.desc, service.process_timeline!.length);

                                    return (
                                        <Reveal
                                            key={idx}
                                            variant="fade"
                                            delay={(idx % 3) * 0.08}
                                            className="h-full"
                                        >
                                            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-[#081728]/90 via-[#061220]/90 to-[#040B14]/95 p-8 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-[#2EC4A5]/60 hover:shadow-[0_25px_50px_-15px_rgba(46,196,165,0.2)]">
                                                {/* Ambient Background Aura */}
                                                <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(46,196,165,0.12),transparent_70%)] blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-40" />

                                                <div className="space-y-6">
                                                    {/* Header Phase Pill & Timeline Window */}
                                                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                                        <span className="rounded-full border border-[#2EC4A5]/30 bg-[#2EC4A5]/10 px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-[#2EC4A5] uppercase">
                                                            {meta.badge}
                                                        </span>
                                                        <span className="font-mono text-xs font-semibold text-white/40">
                                                            {meta.timeline}
                                                        </span>
                                                    </div>

                                                    {/* Title & Core Sprint Objective */}
                                                    <div>
                                                        <h3 className="typo-heading-s font-bold tracking-tight text-white uppercase transition-colors group-hover:text-[#2EC4A5] text-lg">
                                                            {step.title}
                                                        </h3>
                                                        <p className="typo-body-small mt-2.5 leading-relaxed text-white/70 text-sm">
                                                            {step.desc}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Unique, Domain-Accurate Milestone Deliverables List */}
                                                <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                                                    <div className="font-mono text-[10px] font-bold tracking-wider text-white/40 uppercase">
                                                        Key Sprint Deliverables:
                                                    </div>
                                                    {meta.deliverables.map((item, itemIdx) => (
                                                        <div key={itemIdx} className="flex items-start gap-2.5 text-xs text-white/80">
                                                            <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#2EC4A5]/20 text-[#2EC4A5] mt-0.5">
                                                                <Check className="h-2.5 w-2.5 stroke-[3]" />
                                                            </div>
                                                            <span className="leading-snug">{item}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Milestone Verification Tag */}
                                                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-white/40">
                                                    <span>STATUS:</span>
                                                    <span className="text-[#2EC4A5] font-semibold">{meta.status} VERIFIED</span>
                                                </div>
                                            </div>
                                        </Reveal>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* 5. TECHNOLOGIES STACK (WITH REAL AUTHENTIC BRAND SVG LOGOS) */}
                    {service.technologies && service.technologies.length > 0 && (
                        <div className="container-editorial animate-section border-t border-white/10 pt-20">
                            <Reveal className="mb-14 space-y-3 text-center lg:text-left">
                                <span className="inline-flex items-center gap-2 rounded-full border border-[#2EC4A5]/30 bg-[#2EC4A5]/10 px-4 py-1.5 font-mono text-xs tracking-widest text-[#2EC4A5] uppercase">
                                    Engineered Stack
                                </span>
                                <h2 className="typo-heading-xl text-white">
                                    Selected <span className="text-gradient">Technology Ecosystem</span>
                                </h2>
                                <p className="text-white/60 text-sm max-w-xl">
                                    Built exclusively with battle-tested frameworks, native engines, and industry-standard toolsets.
                                </p>
                            </Reveal>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {service.technologies.map((tech, idx) => (
                                    <Reveal
                                        key={idx}
                                        variant="fade"
                                        delay={(idx % 4) * 0.08}
                                        className="h-full"
                                    >
                                        <div className="group relative flex h-full flex-col justify-between rounded-3xl border border-white/15 bg-[#071422]/90 p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-[#00D1FF]/60 hover:bg-[#0A1E32] hover:shadow-[0_20px_40px_rgba(0,209,255,0.15)]">
                                            <div>
                                                <div className="mb-6 flex items-center justify-between">
                                                    {/* Real Authentic SVG Brand Logo */}
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] p-2.5 shadow-inner transition-all duration-500 group-hover:scale-110 group-hover:border-[#00D1FF] group-hover:bg-[#00D1FF]/10">
                                                        <TechLogoBadge name={tech.name} />
                                                    </div>
                                                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#2EC4A5] shadow-[0_0_8px_#2EC4A5]" />
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="typo-label font-bold text-white uppercase text-base group-hover:text-[#00D1FF] transition-colors">
                                                        {tech.name}
                                                    </div>
                                                    <p className="font-mono text-xs leading-relaxed text-white/55">
                                                        {tech.desc}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-white/40">
                                                <span>TIER:</span>
                                                <span className="text-[#2EC4A5] font-semibold">VERIFIED STACK</span>
                                            </div>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 6. SCOPING SCENARIOS MATRIX */}
                    <div className="container-editorial animate-section border-t border-white/10 pt-20">
                        <div className="mb-14 space-y-4 text-center lg:text-left select-none">
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#2EC4A5]/30 bg-[#2EC4A5]/10 px-4 py-1.5 font-mono text-xs tracking-widest text-[#2EC4A5] uppercase">
                                SCENARIO ALIGNMENT
                            </span>
                            <h2 className="typo-heading-xl text-white">
                                Project Scoping <span className="text-gradient">Scenarios</span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            <div className="group rounded-3xl border border-white/15 bg-gradient-to-b from-[#081524] to-[#040C16] p-8 backdrop-blur-xl transition-all duration-300 hover:border-[#2EC4A5]/60 hover:shadow-[0_20px_40px_rgba(46,196,165,0.15)]">
                                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-[#2EC4A5] uppercase border border-[#2EC4A5]/30 bg-[#2EC4A5]/10 px-2.5 py-1 rounded-full">
                                    Scenario A: MVP Launch
                                </span>
                                <h3 className="font-display text-lg font-bold text-white uppercase mt-5">
                                    Rapid Market Validation
                                </h3>
                                <p className="typo-body-small leading-relaxed text-white/60 text-sm mt-3">
                                    Perfect for early-stage founders seeking clean architecture patterns, scalable model definitions, and a working prototype to showcase to seed investors.
                                </p>
                            </div>
                            <div className="group rounded-3xl border border-white/15 bg-gradient-to-b from-[#081524] to-[#040C16] p-8 backdrop-blur-xl transition-all duration-300 hover:border-[#00D1FF]/60 hover:shadow-[0_20px_40px_rgba(0,209,255,0.15)]">
                                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-[#00D1FF] uppercase border border-[#00D1FF]/30 bg-[#00D1FF]/10 px-2.5 py-1 rounded-full">
                                    Scenario B: Scale & Refactor
                                </span>
                                <h3 className="font-display text-lg font-bold text-white uppercase mt-5">
                                    Technical Debt Elimination
                                </h3>
                                <p className="typo-body-small leading-relaxed text-white/60 text-sm mt-3">
                                    Designed for firms suffering from slow page loading times, messy backend controllers, and high server billing costs. We clean schemas and optimize queries under 30ms.
                                </p>
                            </div>
                            <div className="group rounded-3xl border border-white/15 bg-gradient-to-b from-[#081524] to-[#040C16] p-8 backdrop-blur-xl transition-all duration-300 hover:border-[#8B5CF6]/60 hover:shadow-[0_20px_40px_rgba(139,92,246,0.15)]">
                                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-[#8B5CF6] uppercase border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-2.5 py-1 rounded-full">
                                    Scenario C: Flagship Redesign
                                </span>
                                <h3 className="font-display text-lg font-bold text-white uppercase mt-5">
                                    Cinematic Brand Presence
                                </h3>
                                <p className="typo-body-small leading-relaxed text-white/60 text-sm mt-3">
                                    Ideal for elite brands launching new flagship sites with custom 3D WebGL interfaces, vector animation shaders, and smooth GSAP choreography.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 7. FAQS SECTION */}
                    {service.faqs && service.faqs.length > 0 && (
                        <div className="container-editorial animate-section border-t border-white/10 pt-20">
                            <div className="mx-auto max-w-4xl space-y-14">
                                <div className="space-y-3 text-center">
                                    <span className="inline-flex items-center gap-2 rounded-full border border-[#2EC4A5]/30 bg-[#2EC4A5]/10 px-4 py-1.5 font-mono text-xs tracking-widest text-[#2EC4A5] uppercase">
                                        COMMON INQUIRIES
                                    </span>
                                    <h2 className="typo-heading-xl text-white">
                                        Frequently Asked <span className="text-gradient">Questions</span>
                                    </h2>
                                </div>

                                <div className="space-y-4">
                                    {service.faqs.map((faq, idx) => {
                                        const isOpen = faqOpenIndex === idx;

                                        return (
                                            <div
                                                key={idx}
                                                className="rounded-2xl border border-white/10 bg-[#071320]/70 p-6 backdrop-blur-md transition-all duration-300 hover:border-[#2EC4A5]/40"
                                            >
                                                <button
                                                    onClick={() => setFaqOpenIndex(isOpen ? null : idx)}
                                                    className="flex w-full items-center justify-between text-left focus:outline-none"
                                                >
                                                    <span className="typo-label flex items-center gap-3 text-white text-base font-semibold">
                                                        <HelpCircle className="h-4 w-4 text-[#2EC4A5] shrink-0" />
                                                        {faq.question}
                                                    </span>
                                                    <span className="font-mono text-sm font-bold text-[#2EC4A5] ml-4 shrink-0">
                                                        {isOpen ? '—' : '+'}
                                                    </span>
                                                </button>
                                                <div
                                                    className={cn(
                                                        'overflow-hidden transition-all duration-300 ease-out',
                                                        isOpen ? 'mt-4 max-h-[200px] opacity-100' : 'max-h-0 opacity-0',
                                                    )}
                                                >
                                                    <p className="typo-body-small pl-7 leading-relaxed text-white/60 text-sm">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 8. HIGH-IMPACT FINAL CTA SECTION */}
                    <div className="container-editorial animate-section border-t border-white/10 pt-20">
                        <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-r from-[#071828] via-[#0A2238] to-[#081524] p-10 md:p-16 text-center shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
                            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                <div className="h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(46,196,165,0.2),transparent_70%)] blur-3xl" />
                            </div>

                            <div className="relative z-10 mx-auto max-w-2xl space-y-6">
                                <span className="inline-flex items-center gap-2 rounded-full border border-[#2EC4A5]/40 bg-[#2EC4A5]/10 px-4 py-1.5 font-mono text-xs tracking-widest text-[#2EC4A5] uppercase">
                                    <Sparkles className="h-3.5 w-3.5" /> Ready for Production
                                </span>
                                <h2 className="typo-display-l text-white font-extrabold">
                                    Ready to Engineer Your <span className="text-gradient">Next Flagship?</span>
                                </h2>
                                <p className="text-white/70 text-base leading-relaxed">
                                    Schedule a direct scoping sprint with our principal architects to define your roadmap, deliverables, and production timeline.
                                </p>
                                <div className="pt-4 flex flex-wrap justify-center gap-4">
                                    <Link href="/contact">
                                        <Button
                                            variant="gradient"
                                            size="lg"
                                            className="text-black rounded-full bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF] px-9 py-4 font-bold tracking-wide shadow-lg hover:scale-105 transition-all"
                                        >
                                            Schedule Scoping Call <ArrowRight className="ml-2 inline-block h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Show.layout = (page: React.ReactNode) => <LandingLayout>{page}</LandingLayout>;
import { Link } from '@inertiajs/react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, AlertTriangle, CheckCircle2, HelpCircle } from 'lucide-react';

import React, { useState } from 'react';

import { Reveal } from '@/animations';

import { CustomCursor } from '@/components/motion/CustomCursor';
import { PageBreadcrumbs } from '@/components/navigation/PageBreadcrumbs';
import { SeoHead } from '@/components/seo/SeoHead';
import { Badge } from '@/components/ui/Badge';
import { LandingLayout } from '@/layouts/LandingLayout';
import { cn } from '@/utils';

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
}

interface CategoryItem {
    id: number;
    slug: string;
    name: string;
    icon: string;
    description: string;
    services: ServiceItem[];
}

interface HubProps {
    categories: CategoryItem[];
    page?: { content?: { hero?: Record<string, string> } } | null;
}

// Per-card hover accents for the tech stack grid — same subtle border + soft
// shadow-glow effect, rotated through the four brand colors so each card differs.
// Full static class strings so Tailwind's JIT keeps them.
const techAccents = [
    {
        border: 'group-hover:border-[#2EC4A5]/50 hover:border-[#2EC4A5]/40',
        shadow: 'hover:shadow-[0_20px_40px_-20px_rgba(46,196,165,0.4)]',
        bar: 'from-[#2EC4A5] to-[#00D1FF]',
        glow: 'bg-[radial-gradient(circle,rgba(46,196,165,0.16),transparent_70%)]',
        iconText: 'group-hover:text-[#2EC4A5]',
        title: 'group-hover:text-[#2EC4A5]',
    },
    {
        border: 'hover:border-[#00D1FF]/40',
        shadow: 'hover:shadow-[0_20px_40px_-20px_rgba(0,209,255,0.4)]',
        bar: 'from-[#00D1FF] to-[#22D3EE]',
        glow: 'bg-[radial-gradient(circle,rgba(0,209,255,0.16),transparent_70%)]',
        iconText: 'group-hover:text-[#00D1FF]',
        title: 'group-hover:text-[#00D1FF]',
    },
    {
        border: 'hover:border-[#14B8A6]/40',
        shadow: 'hover:shadow-[0_20px_40px_-20px_rgba(20,184,166,0.4)]',
        bar: 'from-[#14B8A6] to-[#2EC4A5]',
        glow: 'bg-[radial-gradient(circle,rgba(20,184,166,0.16),transparent_70%)]',
        iconText: 'group-hover:text-[#14B8A6]',
        title: 'group-hover:text-[#14B8A6]',
    },
    {
        border: 'hover:border-[#22D3EE]/40',
        shadow: 'hover:shadow-[0_20px_40px_-20px_rgba(34,211,238,0.4)]',
        bar: 'from-[#22D3EE] to-[#00D1FF]',
        glow: 'bg-[radial-gradient(circle,rgba(34,211,238,0.16),transparent_70%)]',
        iconText: 'group-hover:text-[#22D3EE]',
        title: 'group-hover:text-[#22D3EE]',
    },
];

/* ------------------------------------------------------------------ */
/*  Tech logo — real brand mark served locally from public/tech-icons  */
/*  (downloaded from Simple Icons, no runtime CDN dependency), with a   */
/*  branded monogram fallback so a card is never blank.                 */
/* ------------------------------------------------------------------ */

function TechLogo({ name, slug }: { name: string; slug: string }) {
    const [failed, setFailed] = useState(false);
    const src = `/tech-icons/${slug}.svg`;

    if (failed) {
        return (
            <span className="font-display text-sm font-bold text-[#2EC4A5]">
                {name.slice(0, 2).toUpperCase()}
            </span>
        );
    }

    return (
        <img
            src={src}
            alt={`${name} logo`}
            loading="lazy"
            width={24}
            height={24}
            onError={() => setFailed(true)}
            className="relative h-6 w-6 object-contain"
        />
    );
}

export default function Hub({ categories = [], page = null }: HubProps) {
    const hero = page?.content?.hero ?? {};

    const reduce = useReducedMotion();
    const [activeChallenge, setActiveChallenge] = useState(0);
    const [activeMethodStep, setActiveMethodStep] = useState(0);
    const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);
    const [mousePos, setMousePos] = useState({ x: 700, y: 350 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    // Marquee strip — category names (falls back to capability labels if empty).
    const marqueeItems =
        categories.length > 0
            ? categories.map((c) => c.name)
            : [
                  'Brand Strategy',
                  'Website Development',
                  'App Development',
                  'Digital Marketing',
                  'Design & Print',
                  'Growth Consulting',
              ];

    const businessChallenges = [
        {
            title: 'Weak Branding',
            cause: 'Generic templates and uninspired visual elements fail to project market credibility, making services feel like commodities.',
            formula:
                'We create custom design systems, typography coordinates, and strict HSL brand token variables.',
            outcome:
                'Immediate lift in perceived value, command over premium pricing, and visual consistency across all touchpoints.',
        },
        {
            title: 'Sluggish Site Speeds',
            cause: 'Bloated page packages and unoptimized database queries degrade client conversion retention, losing inbound traffic.',
            formula:
                'We budget all query latency scopes under 30ms and achieve 100/100 Lighthouse performance metrics.',
            outcome:
                'Lower bounce rates, increased search engine crawl indexing, and a snappy user experience.',
        },
        {
            title: 'Disconnected Systems',
            cause: 'Fragmented tech stacks cause manual data entries, high software costs, and data misalignment.',
            formula:
                'We unify strategy, frontend layouts, and secure Laravel pipelines into a single continuous delivery loop.',
            outcome:
                'Automated administrative syncs, reduced API latency, and zero manual translation loss.',
        },
        {
            title: 'Poor Conversions',
            cause: 'Confusing visual hierarchies and sluggish click pathways lead to high check-out cart abandonment.',
            formula:
                'We structure clear UX pathways, spring-physics micro-interactions, and conversion-focused layouts.',
            outcome:
                'Measurable rise in lead capture, lower customer acquisition costs, and higher checkout rates.',
        },
        {
            title: 'Technical Debt',
            cause: 'Rapidly written, unstandardized codebases become brittle, making feature iterations extremely slow and expensive.',
            formula:
                'We write PSR-12 compliant PHP code, strict TypeScript typings, and run Pest feature unit test gates.',
            outcome:
                'High development velocity, secure scaling pipelines, and simple onboarding cycles.',
        },
        {
            title: 'Lost Opportunities',
            cause: 'Sluggish feature launches and failure to adapt to generative search engines make brands invisible to new buyers.',
            formula:
                'We deploy advanced SEO schema indexes, semantic header tags, and build custom AI automated agents.',
            outcome:
                'High search visibility, continuous operational efficiency, and rapid customer acquisition.',
        },
        {
            title: 'Fragile Security',
            cause: 'Unhardened endpoints, missing validation, and outdated dependencies expose data and erode customer trust after a breach.',
            formula:
                'We enforce input validation at every trust boundary, pinned dependencies, and audited auth and access-control layers.',
            outcome:
                'Reduced attack surface, safer data handling, and durable customer confidence.',
        },
    ];

    const methodSteps = [
        {
            name: 'Discovery',
            desc: 'Auditing constraints and opportunity boundaries.',
            detail: 'We open every engagement by listening. Intensive stakeholder interviews surface the real business goals hiding behind feature requests, while a technical audit of existing platforms exposes bottlenecks, data debt, and scalability ceilings. We leave this phase with objective, measurable performance parameters — not assumptions — so every later decision has a benchmark to answer to.',
        },
        {
            name: 'Research',
            desc: 'Uncovering competitor visual and technical strategies.',
            detail: 'Before a single pixel moves, we study the terrain. We benchmark direct competitors, deconstruct their visual languages and technical stacks, and map the exact friction points where users currently stall or abandon. The output is a clear picture of where the market leaves value on the table — and the specific openings your product can own.',
        },
        {
            name: 'Strategy',
            desc: 'Mapping system architecture blueprints and token guidelines.',
            detail: 'Findings become an architecture. We define the technology stack, scope state-management and data flows, and codify the entire design language into reusable token variables — color scales, type ramps, spacing, and motion eases. This blueprint is the contract every design and engineering choice is measured against, so nothing drifts off-goal as the build scales.',
        },
        {
            name: 'Design',
            desc: 'Choreographing pixel layouts and custom motion curves.',
            detail: 'We craft high-contrast, responsive layouts on a disciplined grid, then bring them to life with bespoke motion. Custom cubic-bezier easing presets, spring-physics micro-interactions, and 3D accents are designed as a system — not decoration — so the interface feels alive, premium, and unmistakably yours across every breakpoint.',
        },
        {
            name: 'Engineering',
            desc: 'Writing clean backend models and frontend code.',
            detail: 'Design meets clean, typed code. We build robust Laravel backends with well-documented APIs, background queues, and secure data pipelines, paired with reactive React components that ship with real loading, empty, and error states. Every layer is written to be fast by default, strictly typed, and genuinely maintainable long after launch.',
        },
        {
            name: 'QA & Auditing',
            desc: 'Verifying latency parameters and memory leak buffers.',
            detail: 'Nothing ships on faith. Automated PHPUnit/Pest suites and frontend unit tests guard against regressions, while we profile rendering framerates, audit memory buffers, and run cross-browser, device, and accessibility passes. Quality here is proven with evidence — measured latency, verified budgets, and green test gates — never assumed.',
        },
        {
            name: 'Launch',
            desc: 'Transitioning to cloud edge systems with zero downtime.',
            detail: 'Go-live is calm and controlled. We run blue-green deployments across cloud nodes for zero-downtime cutover, verify CDN edge caches, harden security, and synchronize production routing. Final Lighthouse diagnostics and a staged rollout with live monitoring mean launch day is a formality — the hard verification already happened.',
        },
        {
            name: 'Growth',
            desc: 'Evaluating telemetry feedback and continuous code tuning.',
            detail: 'Launch is the starting line, not the finish. We watch real telemetry, monitor Lighthouse scores, and analyze how users actually interact — then run conversion experiments and tune queries to compound the numbers month after month. A strong debut becomes sustained, measurable growth instead of a one-off spike.',
        },
    ];

    // Real brand logos served from the Simple Icons CDN (https://cdn.simpleicons.org/<slug>).
    // No dependency added — each logo renders in its official brand color, with a
    // white override for marks that are otherwise black/dark on our dark cards.
    const techStack: Array<{ name: string; slug: string; color?: string; desc: string }> = [
        {
            name: 'Core PHP',
            slug: 'php',
            desc: 'Battle-tested server language powering secure, high-throughput application logic and integrations.',
        },
        {
            name: 'Laravel',
            slug: 'laravel',
            desc: 'Robust MVC framework with built-in security middleware, queues, and expressive Eloquent relationships.',
        },
        {
            name: 'Node.js',
            slug: 'nodedotjs',
            desc: 'Event-driven JavaScript runtime for real-time services, APIs, and tooling that scale under concurrency.',
        },
        {
            name: 'jQuery',
            slug: 'jquery',
            desc: 'Reliable DOM scripting and AJAX for legacy interfaces and quick enhancements where a full framework is overkill.',
        },

        {
            name: 'HTML5',
            slug: 'html5',
            desc: 'Semantic, accessible markup that gives search engines and assistive tech a clean document structure.',
        },
        {
            name: 'CSS3',
            slug: 'css',
            desc: 'Modern layout, custom properties, and hardware-accelerated transitions for crisp, responsive interfaces.',
        },
        {
            name: 'Tailwind CSS',
            slug: 'tailwindcss',
            desc: 'Utility-first styling with a strict design-token system, so the brand stays consistent as it scales.',
        },
        {
            name: 'Bootstrap',
            slug: 'bootstrap',
            desc: 'Rapid, dependable component scaffolding for admin panels and internal tools that ship fast.',
        },
        {
            name: 'HTMX',
            slug: 'htmx',
            desc: 'Hypermedia-driven interactivity that delivers dynamic UX with a fraction of the JavaScript weight.',
        },
        {
            name: 'React',
            slug: 'react',
            desc: 'React concurrent rendering and fine-grained reconciliation power fluid, stateful interfaces.',
        },
        {
            name: 'React Native',
            slug: 'react',
            desc: 'One codebase, native iOS and Android apps with the same performance budgets as our web work.',
        },
        {
            name: 'TypeScript',
            slug: 'typescript',
            desc: 'Strict compile-time typing that eliminates whole classes of runtime errors before they ship.',
        },
        {
            name: 'GSAP',
            slug: 'greensock',
            desc: 'Precision timeline animation and choreographed motion that make interfaces feel alive and premium.',
        },
        {
            name: 'Three.js',
            slug: 'threedotjs',
            color: 'FFFFFF',
            desc: 'GPU-driven WebGL scenes and particle systems for immersive, 60fps 3D experiences in the browser.',
        },
        {
            name: 'AI',
            slug: 'anthropic',
            color: 'FFFFFF',
            desc: 'Custom LLM pipelines, semantic routing, and automated agents that speed operational workflows.',
        },
        {
            name: 'Cloudflare',
            slug: 'cloudflare',
            desc: 'Edge CDN deployments for low latency and 99.99% guaranteed availability worldwide.',
        },
        {
            name: 'Android',
            slug: 'android',
            desc: 'Native Android builds tuned for the platform, from material patterns to background services.',
        },
        {
            name: 'Docker',
            slug: 'docker',
            desc: 'Containerized environments so every build runs identically from local machine to production.',
        },
        {
            name: 'WordPress',
            slug: 'wordpress',
            desc: 'Flexible CMS builds and custom themes for content-driven sites that non-technical teams can run.',
        },
        {
            name: 'Inertia.js',
            slug: 'inertia',
            desc: 'The modern monolith — SPA-grade React interfaces wired straight to Laravel, with no separate API layer.',
        },
        {
            name: 'PWA',
            slug: 'pwa',
            desc: 'Installable, offline-capable progressive web apps that feel native without an app-store gate.',
        },
        {
            name: 'AMP',
            slug: 'amp',
            desc: 'Accelerated Mobile Pages for near-instant mobile loads and stronger visibility in mobile search.',
        },
        {
            name: 'Firebase',
            slug: 'firebase',
            desc: 'Realtime databases, auth, and serverless functions for shipping live features without managing servers.',
        },
        {
            name: 'Supabase',
            slug: 'supabase',
            desc: 'Open-source Postgres backend with instant APIs, auth, and realtime — a scalable managed data layer.',
        },
    ];

    const faqs = [
        {
            q: 'How do you coordinate with our internal technical teams?',
            a: 'We communicate directly via Git repositories, Slack nodes, and shared Figma assets. There are no account managers; you sync directly with executing engineers.',
        },
        {
            q: "What is OVOLL's stance on project deadlines?",
            a: 'Every timeline is mapped deterministically with clear milestones. We launch features sequentially to preserve quality and velocity.',
        },
        {
            q: 'Can we edit the services lists dynamically?',
            a: 'Yes. Our Services page is fully database-driven. Categories, deliverables, timelines, FAQs, and relations can be updated via the Filament admin panel.',
        },
    ];

    const hubSchemas = [
        {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            '@id': 'https://ovoll.in/services#collection',
            name: 'Services & Solution Ecosystems — OVOLL',
            description: 'Explore OVOLL\'s 5 core digital ecosystems: Brand Experience, Digital Products, Engineering & Tech, AI Automation, and Performance Growth.',
            url: 'https://ovoll.in/services',
            provider: {
                '@type': 'Organization',
                name: 'OVOLL',
                url: 'https://ovoll.in',
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
            ],
        },
        {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.a,
                },
            })),
        },
    ];

    return (
        <>
            <SeoHead
                title="Strategic Digital Services & Solution Ecosystems — OVOLL"
                description="Explore OVOLL's 34 specialized services across Brand Identity, UI/UX Design, Custom Web & SaaS Development, FMCG Packaging, and AI Automation in India and globally."
                canonical="https://ovoll.in/services"
                type="website"
                keywords={[
                    'branding agency in India',
                    'UI UX design company Bangalore',
                    'custom software development agency Mumbai',
                    'enterprise SaaS development Delhi NCR',
                    'fintech product design studio Hyderabad',
                    'FMCG packaging design agency Pune',
                    'digital growth studio India',
                    'custom web app development',
                    'design systems and token architecture',
                ]}
                schema={hubSchemas}
            />
            <CustomCursor />

            <PageBreadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Services' }]} />

            <div
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="relative z-10 min-h-screen overflow-hidden bg-[#060B14] font-sans text-white"
            >
                {/* 1. INTERACTIVE MOUSE SPOTLIGHT */}
                <div
                    className="pointer-events-none absolute inset-0 transition-opacity duration-700 ease-out select-none"
                    style={{
                        opacity: isHovering ? 1 : 0.6,
                        background: `radial-gradient(850px circle at ${mousePos.x}px ${mousePos.y}px, rgba(46, 196, 165, 0.14), rgba(0, 209, 255, 0.05) 40%, transparent 80%)`,
                    }}
                />

                {/* 2. SYSTEM TOPOLOGY MATRIX GRID */}
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

                {/* 3. SACRED CIRCUIT ARCHITECTURE SVG */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-25 select-none">
                    <svg
                        viewBox="0 0 1200 1200"
                        className="h-[1400px] w-[1400px] max-w-none text-[#2EC4A5]"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="600" cy="600" r="500" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" opacity="0.3" />
                        <circle cx="600" cy="600" r="350" stroke="#00D1FF" strokeWidth="1" strokeDasharray="8 12" opacity="0.25" />
                        <circle cx="600" cy="600" r="200" stroke="currentColor" strokeWidth="1" opacity="0.3" />

                        {/* Diagonal Circuit Lines */}
                        <line x1="200" y1="200" x2="1000" y2="1000" stroke="#00D1FF" strokeWidth="0.8" opacity="0.2" strokeDasharray="6 6" />
                        <line x1="1000" y1="200" x2="200" y2="1000" stroke="#00D1FF" strokeWidth="0.8" opacity="0.2" strokeDasharray="6 6" />

                        {/* Topology Satellite Nodes */}
                        <circle cx="600" cy="200" r="5" fill="#2EC4A5" />
                        <circle cx="950" cy="600" r="6" fill="#00D1FF" />
                        <circle cx="600" cy="950" r="5" fill="#8B5CF6" />
                        <circle cx="250" cy="600" r="6" fill="#2EC4A5" />
                    </svg>
                </div>

                {/* 4. MASSIVE STENCIL WATERMARK */}
                <div className="pointer-events-none absolute top-44 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-[0.025] select-none">
                    <span className="font-sans text-[180px] font-black tracking-widest text-white uppercase sm:text-[240px] lg:text-[300px]">
                        SOLUTIONS MESH
                    </span>
                </div>

                {/* 5. ATMOSPHERIC NEBULA GLOWS */}
                <div className="pointer-events-none absolute inset-0 select-none">
                    <div className="absolute -top-32 -left-32 h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(46,196,165,0.15)_0%,transparent_70%)] blur-[140px]" />
                    <div className="absolute top-1/3 -right-32 h-[750px] w-[750px] rounded-full bg-[radial-gradient(circle,rgba(0,209,255,0.12)_0%,transparent_70%)] blur-[140px]" />
                </div>

                {/* CHAPTER 1: EDITORIAL INTRODUCTION (static hero + ambient glow) */}
                <section className="relative overflow-hidden pt-10 pb-20 select-none">

                    <div className="container-editorial relative">
                        <Reveal width="full" className="mx-auto max-w-5xl space-y-8 text-center">
                            <Badge variant="flag" size="sm">
                                {hero.badge || 'Blueprints & Strategy'}
                            </Badge>
                            <h1 className="typo-display-xl mx-auto max-w-4xl text-white uppercase">
                                {hero.titleLead || 'We build digital ecosystems that accelerate'}{' '}
                                <span className="text-gradient bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF]">
                                    {hero.titleHighlight || 'business transformation.'}
                                </span>
                            </h1>
                            <p className="typo-body-large reading-width mx-auto max-w-xl text-white/50">
                                {hero.subtitle ||
                                    'OVOLL replaces standard templates with custom, database-driven visual architectures mapped directly to your commercial objectives.'}
                            </p>
                        </Reveal>
                    </div>
                </section>

                {/* KINETIC MARQUEE (capability strip) */}
                <div className="relative overflow-hidden border-y border-white/5 py-6">
                    <div
                        className={cn(
                            'flex w-max items-center gap-8 whitespace-nowrap',
                            !reduce && 'animate-[marquee_28s_linear_infinite]',
                        )}
                    >
                        {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
                            <span key={i} className="flex items-center gap-8">
                                <span className="font-display text-lg font-semibold tracking-tight text-white/35">
                                    {item}
                                </span>
                                <span className="h-1.5 w-1.5 rounded-full bg-[#2EC4A5]/40" />
                            </span>
                        ))}
                    </div>
                </div>

                {/* CHAPTER 2: BUSINESS CHALLENGES (Diagnostic) */}
                <section className="container-editorial section-padding relative border-t border-white/5">
                    <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-24">
                        {/* Left: Text */}
                        <Reveal
                            variant="fade"
                            className="space-y-8 select-none lg:sticky lg:top-36 lg:col-span-5"
                        >
                            <span className="typo-caption text-[#2EC4A5]">THE DIAGNOSTIC</span>
                            <h2 className="typo-heading-xl text-white">
                                Why Digital Products Struggle
                            </h2>
                            <p className="typo-body reading-width leading-relaxed text-white/50">
                                Select a challenge to examine its systemic root cause and OVOLL's
                                blueprint formula.
                            </p>

                            {/* Detailed Diagnostic Panel */}
                            <div className="space-y-6 rounded-2xl border border-white/10 bg-[#081220]/40 p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm">
                                <div className="space-y-2">
                                    <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-wider text-red-400 uppercase">
                                        <AlertTriangle className="h-3.5 w-3.5" /> Root Cause
                                        Analysis
                                    </span>
                                    <h3 className="font-display text-lg font-bold text-white uppercase">
                                        {businessChallenges[activeChallenge]!.title}
                                    </h3>
                                    <p className="typo-body-small leading-relaxed text-white/60">
                                        {businessChallenges[activeChallenge]!.cause}
                                    </p>
                                </div>
                                <div className="space-y-2 border-t border-white/5 pt-4">
                                    <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-wider text-[#2EC4A5] uppercase">
                                        <CheckCircle2 className="h-3.5 w-3.5" /> OVOLL Formula
                                    </span>
                                    <p className="typo-body-small leading-relaxed text-white/60">
                                        {businessChallenges[activeChallenge]!.formula}
                                    </p>
                                </div>
                                <div className="border-t border-white/5 pt-4 font-mono text-[9px] text-[#00D1FF]">
                                    Expected Outcome: {businessChallenges[activeChallenge]!.outcome}
                                </div>
                            </div>
                        </Reveal>

                        {/* Right: Challenges Selectors */}
                        <div className="space-y-2 select-none lg:col-span-7">
                            {businessChallenges.map((challenge, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveChallenge(idx)}
                                    onMouseEnter={() => setActiveChallenge(idx)}
                                    className={cn(
                                        'flex w-full items-center justify-between border-t border-white/10 px-6 py-6 text-left transition-all duration-300',
                                        activeChallenge === idx
                                            ? 'border-l-2 border-l-[#2EC4A5] bg-[#2EC4A5]/5 pl-8 text-white'
                                            : 'text-white/60 hover:bg-white/2 hover:pl-8 hover:text-white',
                                    )}
                                >
                                    <div className="flex items-center gap-6">
                                        <span className="font-mono text-sm text-[#2EC4A5]">
                                            0{idx + 1}
                                        </span>
                                        <span className="font-display text-lg font-bold uppercase">
                                            {challenge.title}
                                        </span>
                                    </div>
                                    <ArrowRight
                                        className={cn(
                                            'h-4 w-4 transition-transform duration-300',
                                            activeChallenge === idx
                                                ? 'translate-x-1 text-[#2EC4A5]'
                                                : 'opacity-20',
                                        )}
                                    />
                                </button>
                            ))}
                            <div className="w-full border-t border-white/10" />
                        </div>
                    </div>
                </section>

                {/* CHAPTER 3: SOLUTION ECOSYSTEM (Dynamic Categories, gradient cards) */}
                <section className="bg-surface-section relative overflow-hidden border-t border-white/5 py-20 lg:py-28">
                    {/* Ambient glow + faint blueprint grid */}
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(46,196,165,0.08),transparent_70%)] blur-3xl" />
                        <div className="absolute right-1/4 -bottom-32 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(0,209,255,0.07),transparent_70%)] blur-3xl" />
                        <div
                            className="absolute inset-0 opacity-[0.04]"
                            style={{
                                backgroundImage:
                                    'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                                backgroundSize: '48px 48px',
                            }}
                        />
                    </div>

                    <div className="container-editorial relative space-y-24">
                        <Reveal width="full" className="space-y-4">
                            <span className="typo-caption text-[#2EC4A5]">
                                THE BLUEPRINT MATRIX
                            </span>
                            <h2 className="typo-heading-xl text-white">
                                Solution <span className="text-gradient">Ecosystems</span>
                            </h2>
                            <p className="typo-body-small reading-width max-w-md text-white/50">
                                Explore our services grouped by core ecosystem. Select a blueprint
                                to view deliverables and technology setups.
                            </p>
                        </Reveal>

                        {/* Rendering dynamic categories */}
                        <div className="space-y-32">
                            {categories.map((category) => (
                                <div key={category.id} className="space-y-12">
                                    <Reveal
                                        width="full"
                                        className="space-y-3 border-l-2 border-[#2EC4A5] pl-6"
                                    >
                                        <h3 className="font-display text-2xl font-extrabold tracking-wide text-white uppercase md:text-3xl">
                                            {category.name}
                                        </h3>
                                        <p className="typo-body-small reading-width max-w-xl text-white/40">
                                            {category.description}
                                        </p>
                                    </Reveal>

                                    {/* Services Grid — Glossy Translucent Glassmorphic Cards with Dynamic Color Themes */}
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                        {category.services.map((service, i) => {
                                            const luxuryCardThemes = [
                                                {
                                                    color: '#2EC4A5',
                                                    gradient:
                                                        'from-[#2EC4A5] via-[#14B8A6] to-[#00D1FF]',
                                                    glow: 'bg-[radial-gradient(circle,rgba(46,196,165,0.22),transparent_70%)]',
                                                    badge: 'border-[#2EC4A5]/30 bg-[#2EC4A5]/10 text-[#2EC4A5]',
                                                    hoverBorder: 'group-hover:border-[#2EC4A5]/50',
                                                    hoverTitle: 'group-hover:text-[#2EC4A5]',
                                                    hoverButton:
                                                        'group-hover:border-[#2EC4A5]/50 group-hover:bg-[#2EC4A5] group-hover:text-black',
                                                },
                                                {
                                                    color: '#00D1FF',
                                                    gradient:
                                                        'from-[#00D1FF] via-[#22D3EE] to-[#14B8A6]',
                                                    glow: 'bg-[radial-gradient(circle,rgba(0,209,255,0.22),transparent_70%)]',
                                                    badge: 'border-[#00D1FF]/30 bg-[#00D1FF]/10 text-[#00D1FF]',
                                                    hoverBorder: 'group-hover:border-[#00D1FF]/50',
                                                    hoverTitle: 'group-hover:text-[#00D1FF]',
                                                    hoverButton:
                                                        'group-hover:border-[#00D1FF]/50 group-hover:bg-[#00D1FF] group-hover:text-black',
                                                },
                                                {
                                                    color: '#14B8A6',
                                                    gradient:
                                                        'from-[#14B8A6] via-[#2EC4A5] to-[#00D1FF]',
                                                    glow: 'bg-[radial-gradient(circle,rgba(20,184,166,0.22),transparent_70%)]',
                                                    badge: 'border-[#14B8A6]/30 bg-[#14B8A6]/10 text-[#14B8A6]',
                                                    hoverBorder: 'group-hover:border-[#14B8A6]/50',
                                                    hoverTitle: 'group-hover:text-[#2EC4A5]',
                                                    hoverButton:
                                                        'group-hover:border-[#14B8A6]/50 group-hover:bg-[#14B8A6] group-hover:text-black',
                                                },
                                                {
                                                    color: '#22D3EE',
                                                    gradient:
                                                        'from-[#22D3EE] via-[#00D1FF] to-[#2EC4A5]',
                                                    glow: 'bg-[radial-gradient(circle,rgba(34,211,238,0.22),transparent_70%)]',
                                                    badge: 'border-[#22D3EE]/30 bg-[#22D3EE]/10 text-[#22D3EE]',
                                                    hoverBorder: 'group-hover:border-[#22D3EE]/50',
                                                    hoverTitle: 'group-hover:text-[#22D3EE]',
                                                    hoverButton:
                                                        'group-hover:border-[#22D3EE]/50 group-hover:bg-[#22D3EE] group-hover:text-black',
                                                },
                                                {
                                                    color: '#2EC4A5',
                                                    gradient:
                                                        'from-[#2EC4A5] via-[#00D1FF] to-[#14B8A6]',
                                                    glow: 'bg-[radial-gradient(circle,rgba(46,196,165,0.22),transparent_70%)]',
                                                    badge: 'border-[#2EC4A5]/30 bg-[#2EC4A5]/10 text-[#2EC4A5]',
                                                    hoverBorder: 'group-hover:border-[#2EC4A5]/50',
                                                    hoverTitle: 'group-hover:text-[#14B8A6]',
                                                    hoverButton:
                                                        'group-hover:border-[#2EC4A5]/50 group-hover:bg-[#2EC4A5] group-hover:text-black',
                                                },
                                                {
                                                    color: '#00D1FF',
                                                    gradient:
                                                        'from-[#00D1FF] via-[#14B8A6] to-[#2EC4A5]',
                                                    glow: 'bg-[radial-gradient(circle,rgba(0,209,255,0.22),transparent_70%)]',
                                                    badge: 'border-[#00D1FF]/30 bg-[#00D1FF]/10 text-[#00D1FF]',
                                                    hoverBorder: 'group-hover:border-[#00D1FF]/50',
                                                    hoverTitle: 'group-hover:text-[#00D1FF]',
                                                    hoverButton:
                                                        'group-hover:border-[#00D1FF]/50 group-hover:bg-[#00D1FF] group-hover:text-black',
                                                },
                                            ];

                                            const theme =
                                                luxuryCardThemes[
                                                    (service.id + i) % luxuryCardThemes.length
                                                ]!;

                                            return (
                                                <Reveal
                                                    key={service.id}
                                                    variant="fade"
                                                    delay={(i % 3) * 0.1}
                                                    className="h-full"
                                                >
                                                    <div
                                                        role="article"
                                                        aria-labelledby={`service-name-${service.id}`}
                                                        aria-describedby={`service-desc-${service.id}`}
                                                        className={cn(
                                                            'group bg-surface-section-alt/80 hover:bg-surface-card relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 p-8 backdrop-blur-md transition-all duration-500 will-change-transform hover:-translate-y-2 hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]',
                                                            theme.hoverBorder,
                                                        )}
                                                    >
                                                        {/* Ambient corner glow on hover */}
                                                        <div
                                                            className={cn(
                                                                'pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100',
                                                                theme.glow,
                                                            )}
                                                        />

                                                        {/* Glossy diagonal sheen reflection */}
                                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

                                                        {/* Top sweeping gradient accent line */}
                                                        <span
                                                            className={cn(
                                                                'absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r transition-transform duration-500 group-hover:scale-x-100',
                                                                theme.gradient,
                                                            )}
                                                        />

                                                        <div className="relative flex flex-1 flex-col space-y-6">
                                                            <div className="flex items-center justify-between">
                                                                <span
                                                                    className={cn(
                                                                        'rounded-full border px-3 py-1 font-mono text-[10px] font-bold tracking-widest uppercase transition-all duration-300',
                                                                        theme.badge,
                                                                    )}
                                                                >
                                                                    {category.name}
                                                                </span>
                                                                <span className="font-mono text-xs font-bold text-white/30 transition-colors group-hover:text-white/80">
                                                                    0{i + 1}
                                                                </span>
                                                            </div>

                                                            <h4
                                                                id={`service-name-${service.id}`}
                                                                className={cn(
                                                                    'typo-heading-s font-bold tracking-tight text-white uppercase transition-colors duration-500',
                                                                    theme.hoverTitle,
                                                                )}
                                                            >
                                                                {service.name}
                                                            </h4>

                                                            <p
                                                                id={`service-desc-${service.id}`}
                                                                className="typo-body-small reading-width line-clamp-3 leading-relaxed text-white/60 transition-colors duration-500 group-hover:text-white/85"
                                                            >
                                                                {service.description}
                                                            </p>

                                                            <div className="mt-auto pt-8">
                                                                <Link
                                                                    href={`/services/${service.slug}`}
                                                                    className="w-full"
                                                                >
                                                                    <div
                                                                        className={cn(
                                                                            'flex w-full items-center justify-between rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 font-mono text-xs font-bold tracking-wider text-white shadow-md backdrop-blur-md transition-all duration-500',
                                                                            theme.hoverButton,
                                                                        )}
                                                                    >
                                                                        <span>
                                                                            Explore Blueprint
                                                                        </span>
                                                                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Reveal>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CHAPTER 4: PROCESS METHODOLOGY */}
                <section className="container-editorial section-padding relative border-t border-white/5">
                    <div className="space-y-16">
                        <Reveal width="full" className="space-y-4">
                            <span className="typo-caption text-[#2EC4A5]">THE LIFECYCLE</span>
                            <h2 className="typo-heading-xl text-white">
                                Our Delivery <span className="text-gradient">Method</span>
                            </h2>
                        </Reveal>

                        {/* Interactive Workflow Dial */}
                        <div className="relative grid grid-cols-1 items-center gap-16 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] lg:grid-cols-12 lg:gap-24 lg:p-12">
                            {/* Very light glossy top sheen + faint brand tint */}
                            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(150deg,rgba(255,255,255,0.06),transparent_45%)]" />
                            <div className="pointer-events-none absolute -top-24 left-1/3 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(46,196,165,0.06),transparent_70%)] blur-3xl" />

                            {/* Left: Step selectors */}
                            <div className="relative flex flex-col gap-3 lg:col-span-5">
                                {methodSteps.map((step, idx) => {
                                    const isActive = activeMethodStep === idx;

                                    return (
                                        <button
                                            key={step.name}
                                            onClick={() => setActiveMethodStep(idx)}
                                            onMouseEnter={() => setActiveMethodStep(idx)}
                                            className={`typo-caption flex items-center justify-between rounded-lg border p-3 text-left transition-all duration-260 focus:outline-none ${
                                                isActive
                                                    ? 'border-[#2EC4A5]/30 bg-[#2EC4A5]/5 text-white'
                                                    : 'border-transparent text-white/40 hover:text-white'
                                            }`}
                                        >
                                            <span>
                                                0{idx + 1} / {step.name}
                                            </span>
                                            {isActive && (
                                                <span className="h-1.5 w-1.5 rounded-full bg-[#2EC4A5]" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Right: Step Description */}
                            <div className="flex h-full min-h-[240px] flex-col justify-between border-t border-white/10 pt-8 lg:col-span-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-16">
                                <motion.div
                                    key={methodSteps[activeMethodStep]!.name}
                                    initial={reduce ? false : { opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    className="space-y-6"
                                >
                                    <div className="space-y-2">
                                        <span className="typo-caption text-[#00D1FF]">
                                            Stage Focus
                                        </span>
                                        <h3 className="typo-heading-l text-white uppercase">
                                            {methodSteps[activeMethodStep]!.name}
                                        </h3>
                                    </div>
                                    <p className="typo-body reading-width max-w-xl text-white/50">
                                        {methodSteps[activeMethodStep]!.detail}
                                    </p>
                                </motion.div>

                                <div className="typo-caption mt-8 border-t border-white/5 pt-6 text-white/30">
                                    AUTOMATED TELEMETRY CHECKPOINT / SECURE GATE
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CHAPTER 5: TECHNOLOGY STACK (4-column glossy card grid) */}
                <section className="bg-surface-section relative overflow-hidden border-t border-white/5 py-20 lg:py-28">
                    {/* Ambient glow + faint blueprint grid */}
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(46,196,165,0.07),transparent_70%)] blur-3xl" />
                        <div className="absolute right-1/4 -bottom-24 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(0,209,255,0.06),transparent_70%)] blur-3xl" />
                        <div
                            className="absolute inset-0 opacity-[0.04]"
                            style={{
                                backgroundImage:
                                    'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                                backgroundSize: '48px 48px',
                            }}
                        />
                    </div>

                    <div className="container-editorial relative space-y-14">
                        <Reveal width="full" className="max-w-2xl space-y-4">
                            <span className="typo-caption text-[#2EC4A5]">THE ARCHITECTURE</span>
                            <h2 className="typo-heading-xl text-white">
                                The technologies we{' '}
                                <span className="text-gradient">build with</span>
                            </h2>
                            <p className="typo-body reading-width text-white/55">
                                A deliberate, modern stack — chosen per project for speed, security,
                                and longevity. From typed backends to GPU-driven 3D, every tool
                                earns its place.
                            </p>
                        </Reveal>

                        {/* 4-column glossy tech cards — subtle tinted border + soft
                            shadow-glow on hover, rotating through four brand colors. */}
                        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
                            {techStack.map((tech, idx) => {
                                const accent = techAccents[idx % techAccents.length]!;

                                return (
                                    <Reveal
                                        key={tech.name}
                                        variant="fade"
                                        delay={(idx % 4) * 0.08}
                                        className="h-full"
                                    >
                                        <div
                                            className={cn(
                                                'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0A1420]/60 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5',
                                                accent.border,
                                                accent.shadow,
                                            )}
                                        >
                                            {/* Top gradient accent bar — grows on hover */}
                                            <span
                                                className={cn(
                                                    'absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r transition-transform duration-500 group-hover:scale-x-100',
                                                    accent.bar,
                                                )}
                                            />
                                            {/* Ambient corner glow in this card's accent color */}
                                            <div
                                                className={cn(
                                                    'pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100',
                                                    accent.glow,
                                                )}
                                            />

                                            <span
                                                className={cn(
                                                    'relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] transition-all duration-500',
                                                    accent.iconText,
                                                )}
                                            >
                                                <span
                                                    className={cn(
                                                        'absolute inset-0 rounded-xl opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100',
                                                        accent.glow,
                                                    )}
                                                />
                                                <TechLogo name={tech.name} slug={tech.slug} />
                                            </span>

                                            <h3
                                                className={cn(
                                                    'typo-heading-s relative mt-5 text-white transition-colors duration-500',
                                                    accent.title,
                                                )}
                                            >
                                                {tech.name}
                                            </h3>
                                            <p className="typo-body-small relative mt-2 leading-relaxed text-white/55">
                                                {tech.desc}
                                            </p>
                                        </div>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* CHAPTER 6: DIALOGUE FAQs */}
                <section className="container-editorial section-padding relative border-t border-white/5">
                    <div className="mx-auto max-w-4xl space-y-16">
                        <Reveal width="full" className="space-y-4 text-center">
                            <span className="typo-caption text-[#2EC4A5]">COMMON QUESTIONS</span>
                            <h2 className="typo-heading-xl text-white">
                                FAQ & <span className="text-gradient">Objections</span>
                            </h2>
                        </Reveal>

                        <div className="space-y-4 border-t border-white/10">
                            {faqs.map((faq, idx) => {
                                const isOpen = faqOpenIndex === idx;

                                return (
                                    <div key={idx} className="border-b border-white/10 pb-4">
                                        <button
                                            onClick={() => setFaqOpenIndex(isOpen ? null : idx)}
                                            className="flex w-full items-center justify-between py-4 text-left focus:outline-none"
                                        >
                                            <span className="typo-label flex items-center gap-3 text-white">
                                                <HelpCircle className="h-4 w-4 text-[#2EC4A5]" />
                                                {faq.q}
                                            </span>
                                            <span className="font-mono text-xs text-[#2EC4A5]">
                                                {isOpen ? '—' : '+'}
                                            </span>
                                        </button>
                                        <div
                                            className={cn(
                                                'overflow-hidden transition-all duration-300 ease-[var(--ease-out)]',
                                                isOpen
                                                    ? 'mt-2 max-h-[140px] opacity-100'
                                                    : 'max-h-0 opacity-0',
                                            )}
                                        >
                                            <p className="typo-body-small reading-width pl-7 leading-relaxed text-white/50">
                                                {faq.a}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

Hub.layout = (page: React.ReactNode) => <LandingLayout>{page}</LandingLayout>;

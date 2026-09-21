import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Bot,
    Boxes,
    BrainCircuit,
    Briefcase,
    Building2,
    BookOpen,
    Car,
    Cloud,
    Cpu,
    CreditCard,
    Database,
    Film,
    Gift,
    Globe,
    HeartHandshake,
    HeartPulse,
    Landmark,
    Layers,
    LineChart,
    ListTodo,
    Newspaper,
    Package,
    PackageOpen,
    Palette,
    PenTool,
    Printer,
    ReceiptText,
    Rocket,
    School,
    Shield,
    ShoppingBasket,
    ShoppingCart,
    Signature,
    Smartphone,
    Store,
    UserCog,
    Users,
    UtensilsCrossed,
    Video,
    Wrench,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Reveal } from '@/animations';

const iconMap: Record<string, LucideIcon> = {
    ArrowRight,
    Bot,
    Boxes,
    BrainCircuit,
    Briefcase,
    Building2,
    BookOpen,
    Car,
    Cloud,
    Cpu,
    CreditCard,
    Database,
    Film,
    Gift,
    Globe,
    HeartHandshake,
    HeartPulse,
    Landmark,
    Layers,
    LineChart,
    ListTodo,
    Newspaper,
    Package,
    PackageOpen,
    Palette,
    PenTool,
    Printer,
    ReceiptText,
    Rocket,
    School,
    Shield,
    ShoppingBasket,
    ShoppingCart,
    Signature,
    Smartphone,
    Store,
    UserCog,
    Users,
    UtensilsCrossed,
    Video,
    Wrench,
};

import { CustomCursor } from '@/components/motion/CustomCursor';
import { PageBreadcrumbs } from '@/components/navigation/PageBreadcrumbs';
import { SeoHead } from '@/components/seo/SeoHead';
import type { ProductVariant } from '@/components/three/ProductCanvas';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MouseReactiveCard } from '@/components/ui/MouseReactiveCard';
import { LandingLayout } from '@/layouts/LandingLayout';
import { cn } from '@/utils';

// Dynamic visual elements:
//   · ProductsHeroVisual — Multi-tier interactive product matrix
//   · ProductCanvas      — 11 distinct category animations
//   · OrbitalRingsScene  — SVG orbital rings with CSS rotation
import { ProductsHeroVisual } from '@/components/products/ProductsHeroVisual';
import ProductCanvas from '@/components/three/ProductCanvas';
import { OrbitalRingsScene } from '@/components/vfx/OrbitalRings';

/* ------------------------------------------------------------------ */
/*  Product catalogue — the TYPES of products OVOLL builds.            */
/*  This is a curated showcase (not the digital-asset store), so it is */
/*  defined here rather than pulled from the DB. Each item carries a   */
/*  real lucide icon; no images are used anywhere on this page.        */
/* ------------------------------------------------------------------ */

interface ProductType {
    name: string;
    icon: LucideIcon;
    description: string;
    tags: string[];
}

interface ProductGroup {
    category: string;
    caption: string;
    /** Selects the hand-designed WebGL scene rendered beside the group. */
    variant: ProductVariant;
    items: ProductType[];
}

/** Shape of a product group as delivered by the CMS (icons by name). */
interface CmsProductGroup {
    category: string;
    items: Array<{
        name: string;
        icon: string;
        description: string;
        tags: string[];
    }>;
}

type ProductsPageProps = {
    productGroups?: CmsProductGroup[];
    page?: {
        content?: {
            hero?: {
                badge?: string;
                titleLead?: string;
                titleHighlight?: string;
                subtitle?: string;
            };
        };
    };
};

const CATEGORY_META: Record<string, { caption: string; variant: ProductVariant }> = {
    'Business & Enterprise': { caption: 'Systems that run the back office', variant: 'enterprise' },
    'eCommerce & Marketplace': { caption: 'Storefronts built to convert', variant: 'commerce' },
    'On-Demand Apps': { caption: 'Marketplaces that move in real time', variant: 'ondemand' },
    'Education & Healthcare': { caption: 'Platforms people rely on daily', variant: 'care' },
    'Portals & Community': { caption: 'Where audiences gather and match', variant: 'community' },
    'Design & Print': { caption: 'Brand identity, from screen to paper', variant: 'design' },
    'SaaS & Cloud Platforms': { caption: 'Multi-tenant products built to scale', variant: 'saas' },
    'Mobile Applications': { caption: 'Native apps for iOS and Android', variant: 'mobile' },
    'Fintech & Payments': { caption: 'Money movement, compliant by design', variant: 'fintech' },
    'AI & Automation': { caption: 'Intelligence wired into your workflow', variant: 'ai' },
    'Media & Streaming': { caption: 'Content delivery at broadcast scale', variant: 'media' },
};

// Brand accent gradients (registered globally in app.css), rotated per card.
const cardAccents = [
    {
        bar: 'from-[#2EC4A5] to-[#00D1FF]',
        glow: 'rgba(46,196,165,0.16)',
        text: 'group-hover:text-[#2EC4A5]',
    },
    {
        bar: 'from-[#00D1FF] to-[#22D3EE]',
        glow: 'rgba(0,209,255,0.16)',
        text: 'group-hover:text-[#00D1FF]',
    },
    {
        bar: 'from-[#14B8A6] to-[#2EC4A5]',
        glow: 'rgba(20,184,166,0.16)',
        text: 'group-hover:text-[#14B8A6]',
    },
    {
        bar: 'from-[#22D3EE] to-[#00D1FF]',
        glow: 'rgba(34,211,238,0.16)',
        text: 'group-hover:text-[#22D3EE]',
    },
];

export default function Index() {
    const { productGroups: dbProductGroups = [], page } = usePage<ProductsPageProps>().props;
    const hero = page?.content?.hero ?? {};
    const [mousePos, setMousePos] = useState({ x: 700, y: 350 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    // Map DB items to frontend structure
    const productGroups: ProductGroup[] = dbProductGroups.map((group) => {
        const meta = CATEGORY_META[group.category] || {
            caption: 'Specialised Solutions',
            variant: 'enterprise',
        };

        return {
            category: group.category,
            caption: meta.caption,
            variant: meta.variant,
            items: group.items.map((item) => ({
                name: item.name,
                icon: iconMap[item.icon]! || iconMap.Package,
                description: item.description,
                tags: item.tags,
            })),
        };
    });

    const totalProductTypes = productGroups.reduce((sum, group) => sum + group.items.length, 0);

    const productSchemas = [
        {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'OVOLL Product Suites & Digital Architectures',
            description:
                'Explore OVOLL\'s 57+ custom-engineered product types across 11 core suites: SaaS Platforms, Native Mobile Apps, AI Workflows, Marketplaces, and Enterprise Portals.',
            numberOfItems: totalProductTypes,
            itemListElement: productGroups.flatMap((group, groupIdx) =>
                group.items.map((item, itemIdx) => ({
                    '@type': 'ListItem',
                    position: groupIdx * 10 + itemIdx + 1,
                    item: {
                        '@type': 'SoftwareApplication',
                        name: item.name,
                        description: item.description,
                        applicationCategory: group.category,
                        provider: {
                            '@type': 'Organization',
                            name: 'OVOLL',
                        },
                    },
                })),
            ),
        },
    ];

    return (
        <>
            <SeoHead
                title="57+ Custom Digital Products & Software Solutions — OVOLL"
                description="Explore OVOLL's 57+ custom-engineered product types across 11 core suites: SaaS platforms, mobile applications, AI engines, and enterprise portals in India and globally."
                canonical="https://ovoll.in/products"
                type="website"
                keywords={[
                    'custom SaaS product development',
                    'enterprise web application solutions',
                    'AI engine platform development',
                    'mobile app engineering India',
                    'B2B software development studio Bangalore',
                    'custom fintech platforms',
                    'marketplace software engineering',
                ]}
                schema={productSchemas}
            />
            <CustomCursor />

            <PageBreadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Products' }]} />

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

                {/* 2. PRODUCT SPECIFICATION BLUEPRINT GRID */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-30 select-none"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(46, 196, 165, 0.12) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(46, 196, 165, 0.12) 1px, transparent 1px)
                        `,
                        backgroundSize: '44px 44px',
                        maskImage: 'radial-gradient(ellipse 85% 70% at 50% 35%, #000 30%, transparent 90%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 85% 70% at 50% 35%, #000 30%, transparent 90%)',
                    }}
                />

                {/* 3. PRODUCT WIREFRAME ORBITAL SVG */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-25 select-none">
                    <svg
                        viewBox="0 0 1200 1200"
                        className="h-[1400px] w-[1400px] max-w-none text-[#00D1FF]"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="600" cy="600" r="500" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" opacity="0.3" />
                        <circle cx="600" cy="600" r="350" stroke="#2EC4A5" strokeWidth="1" strokeDasharray="6 12" opacity="0.25" />
                        <circle cx="600" cy="600" r="180" stroke="currentColor" strokeWidth="1" opacity="0.3" />

                        {/* Engineering Crosshairs */}
                        <line x1="600" y1="50" x2="600" y2="1150" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />
                        <line x1="50" y1="600" x2="1150" y2="600" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />

                        <circle cx="600" cy="180" r="5" fill="#2EC4A5" />
                        <circle cx="950" cy="600" r="6" fill="#00D1FF" />
                        <circle cx="600" cy="950" r="5" fill="#8B5CF6" />
                        <circle cx="250" cy="600" r="6" fill="#2EC4A5" />
                    </svg>
                </div>

                {/* 4. MASSIVE STENCIL WATERMARK */}
                <div className="pointer-events-none absolute top-40 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-[0.025] select-none">
                    <span className="font-sans text-[180px] font-black tracking-widest text-white uppercase sm:text-[240px] lg:text-[300px]">
                        PRODUCT SUITE
                    </span>
                </div>

                {/* 5. ATMOSPHERIC NEBULA GLOWS */}
                <div className="pointer-events-none absolute inset-0 select-none">
                    <div className="absolute -top-32 -left-32 h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(46,196,165,0.15)_0%,transparent_70%)] blur-[140px]" />
                    <div className="absolute top-1/3 -right-32 h-[750px] w-[750px] rounded-full bg-[radial-gradient(circle,rgba(0,209,255,0.12)_0%,transparent_70%)] blur-[140px]" />
                </div>

                {/* CHAPTER 1: HERO */}
                <section className="relative overflow-hidden pt-10 pb-16 select-none">

                    <div className="container-editorial relative grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
                        <Reveal variant="fade" className="space-y-8 lg:col-span-7">
                            <Badge variant="flag" size="sm">
                                {hero.badge || 'Products We Build'}
                            </Badge>
                            <h1 className="typo-display-xl max-w-3xl text-white uppercase">
                                {hero.titleLead || 'The kinds of products we'}{' '}
                                <span className="text-gradient bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF]">
                                    {hero.titleHighlight || 'design and engineer.'}
                                </span>
                            </h1>
                            <p className="typo-body-large reading-width max-w-xl text-white/50">
                                {hero.subtitle ||
                                    'From enterprise systems to on-demand marketplaces, OVOLL builds custom platforms end to end — every one tuned for speed, security, and scale. Explore the product types we ship.'}
                            </p>
                            <div className="flex flex-wrap items-center gap-6 pt-2">
                                <Link href="/contact">
                                    <Button
                                        variant="gradient"
                                        size="md"
                                        rightIcon={<ArrowRight className="h-4 w-4" />}
                                        className="cursor-pointer rounded-full"
                                    >
                                        Discuss your product
                                    </Button>
                                </Link>
                                <span className="font-mono text-xs tracking-widest text-white/40 uppercase">
                                    {totalProductTypes}+ product types · fully custom
                                </span>
                            </div>
                        </Reveal>

                        {/* Hero centerpiece — interactive multi-device product suite matrix */}
                        <div className="relative min-h-[360px] lg:col-span-5 lg:min-h-[440px]">
                            <ProductsHeroVisual className="h-full w-full" />
                        </div>
                    </div>
                </section>

                {/* CHAPTER 2: PRODUCT GROUPS */}
                <section className="bg-surface-section relative overflow-hidden border-t border-white/5 py-20 lg:py-28">
                    <div className="pointer-events-none absolute inset-0">
                        <div
                            className="absolute inset-0 opacity-[0.04]"
                            style={{
                                backgroundImage:
                                    'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                                backgroundSize: '48px 48px',
                            }}
                        />
                    </div>

                    <div className="container-editorial relative space-y-28">
                        {productGroups.map((group, groupIdx) => (
                            <div key={group.category} className="space-y-12">
                                {/* Group header with its own category-specific 3D
                                    scene. The scene alternates sides per group so
                                    the page rhythm stays lively rather than static. */}
                                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                                    <Reveal
                                        variant="fade"
                                        className={cn(
                                            'space-y-3 border-l-2 border-[#2EC4A5] pl-6 lg:col-span-8',
                                            groupIdx % 2 === 1 && 'lg:order-2',
                                        )}
                                    >
                                        <span className="font-mono text-[10px] tracking-widest text-[#2EC4A5] uppercase">
                                            {String(groupIdx + 1).padStart(2, '0')} /{' '}
                                            {group.caption}
                                        </span>
                                        <h2 className="font-display text-2xl font-extrabold tracking-wide text-white uppercase md:text-3xl">
                                            {group.category}
                                        </h2>
                                    </Reveal>
                                    <div
                                        className={cn(
                                            'relative hidden h-40 lg:col-span-4 lg:block',
                                            groupIdx % 2 === 1 && 'lg:order-1',
                                        )}
                                    >
                                        <ProductCanvas variant={group.variant} />
                                    </div>
                                </div>

                                {/* Product-type cards with 3D tilt on hover */}
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {group.items.map((item, i) => {
                                        const accent = cardAccents[i % cardAccents.length]!;
                                        const Icon = item.icon;

                                        return (
                                            <Reveal
                                                key={item.name}
                                                variant="fade"
                                                delay={(i % 3) * 0.08}
                                                className="h-full"
                                            >
                                                <MouseReactiveCard className="group h-full rounded-2xl border border-white/10 bg-[#0A1420]/60 backdrop-blur-sm transition-colors duration-500 hover:border-white/25">
                                                    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl p-7">
                                                        {/* Top gradient accent bar — grows on hover */}
                                                        <span
                                                            className={cn(
                                                                'absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r transition-transform duration-500 group-hover:scale-x-100',
                                                                accent.bar,
                                                            )}
                                                        />
                                                        {/* Ambient corner glow in this card's accent color */}
                                                        <div
                                                            className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                                            style={{
                                                                background: `radial-gradient(circle, ${accent.glow}, transparent 70%)`,
                                                            }}
                                                        />

                                                        <span className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                                                            <span
                                                                className="absolute inset-0 rounded-xl opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
                                                                style={{
                                                                    background: `radial-gradient(circle, ${accent.glow}, transparent 70%)`,
                                                                }}
                                                            />
                                                            <Icon
                                                                className={cn(
                                                                    'relative h-6 w-6 text-white/80 transition-colors duration-500',
                                                                    accent.text,
                                                                )}
                                                            />
                                                        </span>

                                                        <h3
                                                            className={cn(
                                                                'typo-heading-s relative mt-5 text-white transition-colors duration-500',
                                                                accent.text,
                                                            )}
                                                        >
                                                            {item.name}
                                                        </h3>
                                                        <p className="typo-body-small relative mt-2 leading-relaxed text-white/55">
                                                            {item.description}
                                                        </p>

                                                        <div className="relative mt-auto flex flex-wrap gap-2 pt-6">
                                                            {item.tags.map((tag) => (
                                                                <span
                                                                    key={tag}
                                                                    className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 font-mono text-[9px] tracking-widest text-white/50 uppercase"
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </MouseReactiveCard>
                                            </Reveal>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CHAPTER 3: CTA — orbital rings drift behind the copy */}
                <section className="section-padding relative overflow-hidden border-t border-white/5">
                    {/* Ambient 3D backdrop — pulsing orbital rings, dimmed so text stays legible */}
                    <div className="pointer-events-none absolute inset-0">
                        <OrbitalRingsScene className="h-full w-full" opacity={0.4} speed={0.7} />
                        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_30%,var(--color-surface-section)_80%)]" />
                    </div>

                    <Reveal
                        variant="fade"
                        className="relative mx-auto max-w-3xl space-y-8 text-center"
                    >
                        <span className="typo-caption text-[#2EC4A5]">DON'T SEE YOURS?</span>
                        <h2 className="typo-heading-xl text-white">
                            We build custom products{' '}
                            <span className="text-gradient">around your idea.</span>
                        </h2>
                        <p className="typo-body reading-width mx-auto max-w-xl text-white/50">
                            These are the patterns we ship most often — but the real work starts
                            with your specific problem. Tell us what you're building and we'll map
                            the architecture.
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
                    </Reveal>
                </section>
            </div>
        </>
    );
}

Index.layout = (page: React.ReactNode) => <LandingLayout>{page}</LandingLayout>;

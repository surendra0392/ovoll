import { Link, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen,
    Layers,
    ArrowRight,
    Clock,
    Calendar,
    User,
    ChevronRight,
    Search as SearchIcon,
    Info,
} from 'lucide-react';

import React, { useState } from 'react';
import { Reveal } from '@/animations';

import { CustomCursor } from '@/components/motion/CustomCursor';
import { PageBreadcrumbs } from '@/components/navigation/PageBreadcrumbs';
import { SeoHead } from '@/components/seo/SeoHead';
import { Badge, Button, Card } from '@/components/ui';

interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    reading_time: number;
    published_at: string;
    is_featured: boolean;
    is_pinned: boolean;
    author: {
        name: string;
    };
    category: {
        name: string;
        slug: string;
    } | null;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    articles_count: number;
}

interface Pagination {
    current_page: number;
    last_page: number;
    has_more: boolean;
}

interface IndexProps {
    featured: Article | null;
    /** Inertia merge prop — appended to on each "load more" partial reload. */
    articles: Article[];
    pagination: Pagination;
    categories: Category[];
    page?: { content?: { hero?: Record<string, string> } } | null;
}

export default function Index({ featured, articles, pagination, page = null }: IndexProps) {
    const hero = page?.content?.hero ?? {};
    const [selectedTopic, setSelectedTopic] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 700, y: 350 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    // AJAX "load more": partial reload of only the merge-prop articles + meta,
    // requesting the next page. Inertia appends the batch — no full page visit.
    const loadMore = () => {
        if (isLoadingMore || !pagination.has_more) {
            return;
        }

        // Inertia v3 reload preserves scroll position and page state by default.
        router.reload({
            only: ['articles', 'pagination'],
            data: { page: pagination.current_page + 1 },
            onStart: () => setIsLoadingMore(true),
            onFinish: () => setIsLoadingMore(false),
        });
    };

    // Coordinate positions and connections for Chapter 3 Knowledge Map.
    // Coordinates are tuned to fit within the visible column (no horizontal scroll).
    const knowledgeNodes = [
        { id: 'all', label: 'All Domains', x: 48, y: 70, connections: ['brand', 'systems'] },
        { id: 'brand', label: 'Brand Strategy', x: 152, y: 150, connections: ['systems', 'ux'] },
        { id: 'systems', label: 'Design Systems', x: 256, y: 80, connections: ['ui', 'motion'] },
        { id: 'ux', label: 'UX Design', x: 256, y: 220, connections: ['ui', 'accessibility'] },
        { id: 'ui', label: 'UI Architectures', x: 360, y: 150, connections: ['react', 'threejs'] },
        { id: 'laravel', label: 'Laravel 13', x: 464, y: 90, connections: ['performance'] },
        {
            id: 'react',
            label: 'React 19',
            x: 464,
            y: 210,
            connections: ['typescript', 'performance'],
        },
        { id: 'threejs', label: 'Three.js & GLSL', x: 360, y: 280, connections: ['motion'] },
        { id: 'motion', label: 'Motion Design', x: 464, y: 310, connections: ['performance'] },
        {
            id: 'typescript',
            label: 'TypeScript Specs',
            x: 568,
            y: 210,
            connections: ['performance'],
        },
        { id: 'performance', label: 'Performance Budgets', x: 672, y: 150, connections: [] },
        {
            id: 'accessibility',
            label: 'Accessibility (A11y)',
            x: 360,
            y: 40,
            connections: ['performance'],
        },
        { id: 'ai', label: 'AI & Automation', x: 568, y: 90, connections: ['performance'] },
        { id: 'seo', label: 'SEO & Crawling', x: 672, y: 40, connections: [] },
        { id: 'business', label: 'Business Strategy', x: 152, y: 40, connections: ['growth'] },
        { id: 'growth', label: 'Growth Engines', x: 256, y: 310, connections: [] },
    ];

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();

        if (!newsletterEmail) {
            return;
        }

        setIsSubscribed(true);
        setNewsletterEmail('');
    };

    // Live filtering combining Knowledge Node selections and keyword queries
    const getFilteredArticles = () => {
        let list = articles || [];

        if (selectedTopic !== 'all') {
            const term = selectedTopic.toLowerCase();
            list = list.filter((art) => {
                const title = art.title.toLowerCase();
                const excerpt = art.excerpt.toLowerCase();

                if (term === 'brand') {
                    return title.includes('brand') || excerpt.includes('brand');
                }

                if (term === 'systems') {
                    return title.includes('system') || excerpt.includes('system');
                }

                if (term === 'ux') {
                    return (
                        title.includes('ux') ||
                        excerpt.includes('ux') ||
                        title.includes('easing') ||
                        title.includes('compliance')
                    );
                }

                if (term === 'ui') {
                    return (
                        title.includes('ui') ||
                        excerpt.includes('ui') ||
                        title.includes('rendering')
                    );
                }

                if (term === 'laravel') {
                    return title.includes('laravel') || excerpt.includes('laravel');
                }

                if (term === 'react') {
                    return title.includes('react') || excerpt.includes('react');
                }

                if (term === 'threejs') {
                    return (
                        title.includes('webgl') ||
                        excerpt.includes('webgl') ||
                        title.includes('instancedmesh') ||
                        title.includes('three.js')
                    );
                }

                if (term === 'motion') {
                    return (
                        title.includes('motion') ||
                        excerpt.includes('motion') ||
                        title.includes('easing')
                    );
                }

                if (term === 'typescript') {
                    return (
                        title.includes('typescript') ||
                        excerpt.includes('typescript') ||
                        title.includes('safe')
                    );
                }

                if (term === 'performance') {
                    return (
                        title.includes('performance') ||
                        excerpt.includes('performance') ||
                        title.includes('latency') ||
                        title.includes('speed')
                    );
                }

                if (term === 'accessibility') {
                    return (
                        title.includes('accessibility') ||
                        excerpt.includes('accessibility') ||
                        title.includes('wcag')
                    );
                }

                if (term === 'ai') {
                    return (
                        title.includes('ai') || excerpt.includes('ai') || title.includes('prompt')
                    );
                }

                if (term === 'seo') {
                    return (
                        title.includes('seo') ||
                        excerpt.includes('seo') ||
                        title.includes('crawling') ||
                        title.includes('visibility') ||
                        title.includes('search')
                    );
                }

                if (term === 'business') {
                    return (
                        title.includes('business') ||
                        excerpt.includes('business') ||
                        title.includes('valuation')
                    );
                }

                if (term === 'growth') {
                    return (
                        title.includes('growth') ||
                        excerpt.includes('growth') ||
                        title.includes('conversion')
                    );
                }

                return title.includes(term) || excerpt.includes(term);
            });
        }

        if (searchQuery.trim() !== '') {
            const q = searchQuery.toLowerCase();
            list = list.filter(
                (art) =>
                    art.title.toLowerCase().includes(q) || art.excerpt.toLowerCase().includes(q),
            );
        }

        return list;
    };

    const filteredArticles = getFilteredArticles();

    // A keyword/topic filter is active only when the user has narrowed the set;
    // the "Load More" control is hidden while filtering (it paginates the full set).
    const isFiltering = selectedTopic !== 'all' || searchQuery.trim() !== '';

    const heroArticle = featured ||
        (articles && articles[0]) || {
            title: 'Mathematical Easing Curves in Premium Interaction Design',
            slug: 'mathematical-easing-curves-in-premium-interaction-design',
            excerpt:
                'Why traditional springy, bouncy transitions disrupt corporate trust and how utilizing precise cubic-bezier curves (0.16, 1, 0.3, 1) creates a sense of luxury-engineering.',
            reading_time: 6,
            published_at: new Date().toISOString(),
            author: { name: 'Sarah Connor' },
            category: { name: 'Design & Motion', slug: 'design' },
        };

    const formattedHeroDate = new Date(heroArticle.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <>
            <SeoHead title="Editorial Journal — OVOLL Insights">
                <script type="application/ld+json">
                    {JSON.stringify({
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
                                name: 'Insights',
                                item: 'https://ovoll.in/insights',
                            },
                        ],
                    })}
                </script>
            </SeoHead>
            <CustomCursor />

            <PageBreadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Insights' }]} />

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

                {/* 2. KNOWLEDGE NETWORK GRID */}
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

                {/* 3. CONSTELLATION MESH SVG */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-25 select-none">
                    <svg
                        viewBox="0 0 1200 1200"
                        className="h-[1400px] w-[1400px] max-w-none text-[#2EC4A5]"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="600" cy="600" r="520" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" opacity="0.3" />
                        <circle cx="600" cy="600" r="360" stroke="#00D1FF" strokeWidth="1" strokeDasharray="8 12" opacity="0.25" />
                        <circle cx="600" cy="600" r="200" stroke="currentColor" strokeWidth="1" opacity="0.3" />

                        {/* Diagonal Axes */}
                        <line x1="200" y1="200" x2="1000" y2="1000" stroke="#00D1FF" strokeWidth="0.8" opacity="0.2" strokeDasharray="6 6" />
                        <line x1="1000" y1="200" x2="200" y2="1000" stroke="#00D1FF" strokeWidth="0.8" opacity="0.2" strokeDasharray="6 6" />

                        <circle cx="600" cy="200" r="5" fill="#2EC4A5" />
                        <circle cx="960" cy="600" r="6" fill="#00D1FF" />
                        <circle cx="600" cy="960" r="5" fill="#8B5CF6" />
                        <circle cx="240" cy="600" r="6" fill="#2EC4A5" />
                    </svg>
                </div>

                {/* 4. MASSIVE STENCIL WATERMARK */}
                <div className="pointer-events-none absolute top-40 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-[0.025] select-none">
                    <span className="font-sans text-[180px] font-black tracking-widest text-white uppercase sm:text-[240px] lg:text-[300px]">
                        RESEARCH JOURNAL
                    </span>
                </div>

                {/* 5. ATMOSPHERIC NEBULA GLOWS */}
                <div className="pointer-events-none absolute inset-0 select-none">
                    <div className="absolute -top-32 -left-32 h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(46,196,165,0.15)_0%,transparent_70%)] blur-[140px]" />
                    <div className="absolute top-1/3 -right-32 h-[750px] w-[750px] rounded-full bg-[radial-gradient(circle,rgba(0,209,255,0.12)_0%,transparent_70%)] blur-[140px]" />
                </div>

                {/* Header spacer */}
                <div className="h-6" />

                {/* ---------------------------------------------------- */}
                {/* CHAPTER 1 — Editorial Hero */}
                {/* ---------------------------------------------------- */}
                <section className="container-editorial relative px-6 py-20 md:py-32">
                    <div className="relative border-b border-white/10 pb-16">
                        <div className="absolute bottom-[5px] -left-1 font-mono text-[9px] text-white/30 select-none">
                            +
                        </div>
                        <div className="absolute -right-1 bottom-[5px] font-mono text-[9px] text-white/30 select-none">
                            +
                        </div>

                        <div className="mx-auto max-w-4xl space-y-8 text-center">
                            <div className="flex items-center justify-center gap-2 select-none">
                                <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[#2EC4A5]" />
                                <span className="font-mono text-xs tracking-[0.2em] text-[#2EC4A5] uppercase">
                                    {hero.badge || 'OVOLL TECHNICAL JOURNAL // VOLUME 01'}
                                </span>
                            </div>
                            <h1 className="typo-display-xl mx-auto max-w-4xl leading-none tracking-tight text-white uppercase">
                                {hero.titleLead || 'Knowledge'}{' '}
                                <span className="text-gradient bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF]">
                                    {hero.titleHighlight || 'Explorer.'}
                                </span>
                            </h1>
                            <p className="typo-body-large mx-auto max-w-2xl leading-relaxed font-light text-white/60">
                                {hero.subtitle ||
                                    'Explanations of technical decisions, interface blueprints, and growth systems written by OVOLL partners and senior architects.'}
                            </p>
                        </div>
                    </div>
                </section>

                {/* ---------------------------------------------------- */}
                {/* CHAPTER 2 — Featured Research */}
                {/* ---------------------------------------------------- */}
                <section className="container-editorial relative border-b border-white/5 py-12">
                    <div className="mx-auto max-w-7xl">
                        {/* We put p-0 on Card and the layout grid inside it to prevent intermediate wrapper layout issues */}
                        <Card
                            variant="glass"
                            className="group relative overflow-hidden rounded-none border border-white/5 p-0"
                        >
                            <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 bg-[radial-gradient(circle,_rgba(46,196,165,0.03)_0%,_transparent_75%)] blur-[40px]" />

                            <div className="grid grid-cols-1 items-stretch gap-8 p-8 md:gap-12 md:p-12 lg:grid-cols-12">
                                <div className="relative z-10 flex flex-col justify-center space-y-6 select-none lg:col-span-8">
                                    <div className="flex items-center gap-4 font-mono text-[10px] text-[#2EC4A5]">
                                        <span className="border border-[#2EC4A5] bg-[#2EC4A5]/10 px-2 py-0.5 text-[9px] tracking-widest uppercase">
                                            FLAGSHIP RESEARCH
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            <span>{heroArticle.reading_time} MIN READ</span>
                                        </span>
                                    </div>
                                    <h2 className="typo-heading-xl cursor-pointer tracking-tight text-white uppercase transition-colors duration-300 group-hover:text-[#2EC4A5]">
                                        <Link href={`/insights/${heroArticle.slug}`}>
                                            {heroArticle.title}
                                        </Link>
                                    </h2>
                                    <p className="max-w-2xl text-sm leading-relaxed font-light text-white/60">
                                        {heroArticle.excerpt}
                                    </p>
                                </div>

                                <div className="relative z-10 flex min-w-[200px] flex-col justify-center gap-6 border-t border-white/5 pt-6 font-mono text-[10px] lg:col-span-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                                    <div className="space-y-1">
                                        <span className="block text-[8px] tracking-wider text-white/40 uppercase">
                                            AUTHOR
                                        </span>
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase">
                                            <User className="h-3.5 w-3.5 text-[#00D1FF]" />
                                            <span>{heroArticle.author.name}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-1 border-t border-white/5 pt-4">
                                        <span className="block text-[8px] tracking-wider text-white/40 uppercase">
                                            PUBLISHED
                                        </span>
                                        <div className="flex items-center gap-1.5 text-white/70 uppercase">
                                            <Calendar className="h-3.5 w-3.5 text-[#2EC4A5]" />
                                            <span>{formattedHeroDate}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-1 border-t border-white/5 pt-4">
                                        <span className="block text-[8px] tracking-wider text-[#2EC4A5] uppercase">
                                            DOMAIN
                                        </span>
                                        <div className="text-xs font-bold text-white uppercase">
                                            {heroArticle.category?.name || 'TECHNOLOGY'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </section>

                {/* ---------------------------------------------------- */}
                {/* CHAPTER 3 — Knowledge Explorer (Interactive Map) */}
                {/* ---------------------------------------------------- */}
                <section className="container-editorial relative border-b border-white/5 py-20">
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-[#2EC4A5] uppercase select-none">
                                <Layers className="h-3 w-3" />
                                <span>03 / Connected Knowledge Node</span>
                            </div>
                            <h2 className="typo-heading-l tracking-tight text-white uppercase">
                                Interactive Knowledge Map
                            </h2>
                            <p className="typo-body-small max-w-xl font-light text-white/50">
                                Hover over the nodes below to trace engineering, design, and growth
                                strategy interconnections, and dynamically filter the editorial
                                catalog below.
                            </p>
                        </div>

                        {/* Interactive Node Graph Map with layout grid backgrounds */}
                        <div className="relative grid min-h-[400px] grid-cols-1 items-center gap-8 overflow-hidden rounded-none border border-white/5 bg-[#0E1624]/20 p-8 lg:grid-cols-12">
                            <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(#2EC4A5_1px,_transparent_1px)] bg-[size:24px_24px] opacity-5" />
                            <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 bg-[radial-gradient(circle,_rgba(46,196,165,0.03)_0%,_transparent_75%)] blur-[40px]" />

                            <div className="z-10 overflow-x-auto py-8 lg:col-span-9">
                                <div className="relative mx-auto h-[340px] w-[720px] max-w-full">
                                    {/* SVG Connection Vectors */}

                                    <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full">
                                        {knowledgeNodes.map((node) =>
                                            node.connections.map((targetId) => {
                                                const targetNode = knowledgeNodes.find(
                                                    (n) => n.id === targetId,
                                                );

                                                if (!targetNode) {
                                                    return null;
                                                }

                                                const isHighlighted =
                                                    selectedTopic === node.id ||
                                                    selectedTopic === targetId;

                                                return (
                                                    <motion.line
                                                        key={`${node.id}-${targetId}`}
                                                        x1={node.x}
                                                        y1={node.y}
                                                        x2={targetNode.x}
                                                        y2={targetNode.y}
                                                        stroke={
                                                            isHighlighted
                                                                ? '#2EC4A5'
                                                                : 'rgba(255, 255, 255, 0.05)'
                                                        }
                                                        strokeWidth={isHighlighted ? 2.2 : 0.8}
                                                        initial={{ strokeDasharray: '4 4' }}
                                                        animate={{
                                                            strokeDashoffset: isHighlighted
                                                                ? -20
                                                                : 0,
                                                        }}
                                                        transition={{
                                                            repeat: Infinity,
                                                            duration: 2,
                                                            ease: 'linear',
                                                        }}
                                                    />
                                                );
                                            }),
                                        )}
                                    </svg>

                                    {/* Map Node Buttons */}
                                    {knowledgeNodes.map((node) => {
                                        const isSelected = selectedTopic === node.id;

                                        return (
                                            <button
                                                key={node.id}
                                                onMouseEnter={() => setSelectedTopic(node.id)}
                                                onClick={() => setSelectedTopic(node.id)}
                                                style={{ left: node.x - 48, top: node.y - 16 }}
                                                className={`absolute z-10 flex h-8 w-24 items-center justify-center rounded-none border px-1 text-center font-mono text-[8px] leading-tight tracking-tight transition-all duration-300 focus:outline-none ${
                                                    isSelected
                                                        ? 'border-[#2EC4A5] bg-[#0E1624] font-bold text-white shadow-[0_0_15px_rgba(46,196,165,0.15)]'
                                                        : 'bg-surface-raised border-white/5 text-white/50 hover:border-white/20 hover:text-white'
                                                }`}
                                            >
                                                {node.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Dynamic details sidebar */}
                            <div className="z-10 flex h-full min-h-[180px] flex-col justify-center border-t border-white/5 pt-6 font-mono text-[10px] lg:col-span-3 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={selectedTopic}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="space-y-4"
                                    >
                                        <span className="block text-[8px] tracking-wider text-[#2EC4A5] uppercase">
                                            KNOWLEDGE MATRIX
                                        </span>
                                        <h3 className="text-xs font-bold text-white uppercase">
                                            {
                                                knowledgeNodes.find((n) => n.id === selectedTopic)
                                                    ?.label
                                            }
                                        </h3>
                                        <p className="font-sans text-xs leading-relaxed font-light text-white/50">
                                            {selectedTopic === 'all'
                                                ? 'Displaying all seeded R&D records across layout easing, Laravel scalability targets, and conversion models.'
                                                : `Currently filtering articles matching ${selectedTopic.toUpperCase()} topics. Hover other nodes to trace systems connection maps.`}
                                        </p>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---------------------------------------------------- */}
                {/* CHAPTER 4 — Latest Articles (Asymmetric Multi-Layouts) */}
                {/* ---------------------------------------------------- */}
                <section className="container-editorial relative border-b border-white/5 py-20">
                    <div className="space-y-12">
                        <div className="flex flex-col justify-between gap-6 border-b border-white/5 pb-8 md:flex-row md:items-end">
                            <Reveal className="space-y-4">
                                <div className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-[#2EC4A5] uppercase select-none">
                                    <BookOpen className="h-3 w-3" />
                                    <span>04 / Editorial Journal</span>
                                </div>
                                <h2 className="typo-heading-l tracking-tight text-white uppercase">
                                    Active Research Index
                                </h2>
                            </Reveal>

                            {/* Live Keyword Search Input Box */}
                            <div className="relative w-full md:w-80">
                                <SearchIcon className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-white/30" />
                                <input
                                    type="text"
                                    placeholder="Filter by keyword..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full border border-white/15 bg-[#0E1624]/60 py-2.5 pr-4 pl-10 font-mono text-[10px] text-white placeholder-white/30 transition-colors focus:border-[#2EC4A5] focus:outline-none"
                                />
                            </div>
                        </div>

                        {filteredArticles.length === 0 ? (
                            <div className="rounded-none border border-white/5 bg-[#0E1624]/20 py-16 text-center">
                                <Info className="mx-auto mb-3 h-8 w-8 text-white/30" />
                                <p className="font-mono text-xs text-white/40">
                                    No articles found matching this filter query.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-10 select-none">
                                {/* ASYMMETRIC GRID LOOPING */}
                                {filteredArticles.map((art, idx) => {
                                    const artDate = new Date(art.published_at).toLocaleDateString(
                                        'en-US',
                                        {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        },
                                    );

                                    // Layout Style A: Large Feature Story
                                    if (idx === 0) {
                                        return (
                                            <Reveal
                                                key={art.id}
                                                variant="fade"
                                                delay={0}
                                                className="h-full"
                                            >
                                                <Card
                                                    variant="glass"
                                                    className="group relative overflow-hidden rounded-none border border-white/5 p-0 transition-all hover:border-[#2EC4A5]/25"
                                                >
                                                    <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-[#2EC4A5] to-transparent" />
                                                    <div className="flex min-h-[300px] flex-col justify-between p-8 md:p-12">
                                                        <div className="max-w-3xl space-y-4">
                                                            <div className="flex items-center gap-4 font-mono text-[9px] text-[#2EC4A5]">
                                                                <span className="tracking-widest text-[#00D1FF] uppercase">
                                                                    {art.category?.name ||
                                                                        'GENERAL'}
                                                                </span>
                                                                <span>•</span>
                                                                <span>
                                                                    {art.reading_time} MIN READ
                                                                </span>
                                                            </div>
                                                            <h3 className="typo-heading-l font-bold tracking-tight text-white uppercase transition-colors duration-300 group-hover:text-[#2EC4A5]">
                                                                <Link
                                                                    href={`/insights/${art.slug}`}
                                                                >
                                                                    {art.title}
                                                                </Link>
                                                            </h3>
                                                            <p className="max-w-2xl font-sans text-xs leading-relaxed font-light text-white/50">
                                                                {art.excerpt}
                                                            </p>
                                                        </div>
                                                        <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4 font-mono text-[9px] text-white/40">
                                                            <span>
                                                                AUTHOR:{' '}
                                                                {art.author.name.toUpperCase()}
                                                            </span>
                                                            <Link
                                                                href={`/insights/${art.slug}`}
                                                                className="flex items-center gap-1 text-[#2EC4A5] transition-colors hover:text-white"
                                                            >
                                                                <span>READ CASE ANALYSIS</span>
                                                                <ArrowRight className="h-3 w-3" />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Reveal>
                                        );
                                    }

                                    // Layout Style B: Case Study Layout (side-by-side columns)
                                    if (idx === 1 || idx === 2) {
                                        return (
                                            <Reveal
                                                key={art.id}
                                                variant="fade"
                                                delay={(idx - 1) * 0.07}
                                                className="h-full"
                                            >
                                                <Card
                                                    variant="glass"
                                                    className="group relative overflow-hidden rounded-none border border-white/5 p-0 transition-all hover:border-white/10"
                                                >
                                                    <div className="grid grid-cols-1 items-stretch gap-6 p-8 md:grid-cols-12">
                                                        <div className="flex flex-col justify-center space-y-4 md:col-span-8">
                                                            <div className="flex items-center gap-3 font-mono text-[9px] text-white/40">
                                                                <span className="font-bold text-[#00D1FF]">
                                                                    {art.category?.name.toUpperCase() ||
                                                                        'SYSTEMS'}
                                                                </span>
                                                                <span>•</span>
                                                                <span>
                                                                    {art.reading_time} MIN READ
                                                                </span>
                                                            </div>
                                                            <h4 className="typo-heading-s font-bold tracking-tight text-white uppercase transition-colors group-hover:text-[#2EC4A5]">
                                                                <Link
                                                                    href={`/insights/${art.slug}`}
                                                                >
                                                                    {art.title}
                                                                </Link>
                                                            </h4>
                                                            <p className="font-sans text-xs leading-relaxed font-light text-white/50">
                                                                {art.excerpt}
                                                            </p>
                                                        </div>
                                                        <div className="flex min-w-[160px] flex-col justify-center gap-4 border-t border-white/5 pt-6 font-mono text-[9px] md:col-span-4 md:border-t-0 md:border-l md:pt-0 md:pl-8">
                                                            <div>
                                                                <span className="block text-[8px] tracking-wider text-white/30 uppercase">
                                                                    AUTHOR LOG
                                                                </span>
                                                                <span className="font-bold text-white uppercase">
                                                                    {art.author.name}
                                                                </span>
                                                            </div>
                                                            <Link
                                                                href={`/insights/${art.slug}`}
                                                                className="inline-flex items-center gap-1.5 text-[#2EC4A5] transition-colors hover:text-white"
                                                            >
                                                                <span>OPEN BRIEF</span>
                                                                <ChevronRight className="h-3.5 w-3.5" />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Reveal>
                                        );
                                    }

                                    // Layout Style C: Quick Reads (Clean technical database rows)
                                    return (
                                        <Reveal
                                            key={art.id}
                                            variant="fade"
                                            delay={Math.min(idx * 0.06, 0.3)}
                                            className="h-full"
                                        >
                                            <div className="group grid grid-cols-1 items-center gap-4 border-b border-white/5 py-5 font-mono text-[9px] text-white/50 transition-all hover:bg-white/1 md:grid-cols-12">
                                                <div className="text-white/30 uppercase md:col-span-2">
                                                    {artDate}
                                                </div>
                                                <div className="md:col-span-6">
                                                    <h4 className="text-xs font-bold tracking-tight text-white uppercase transition-colors group-hover:text-[#2EC4A5]">
                                                        <Link href={`/insights/${art.slug}`}>
                                                            {art.title}
                                                        </Link>
                                                    </h4>
                                                </div>
                                                <div className="text-[#00D1FF] uppercase md:col-span-3">
                                                    {art.category?.name || 'GENERAL'}
                                                </div>
                                                <div className="flex items-center justify-end gap-3 text-right md:col-span-1">
                                                    <span>{art.reading_time} MIN</span>
                                                    <Link
                                                        href={`/insights/${art.slug}`}
                                                        className="flex h-6 w-6 items-center justify-center border border-white/10 transition-all hover:border-[#2EC4A5] hover:text-[#2EC4A5]"
                                                    >
                                                        <ArrowRight className="h-3 w-3" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </Reveal>
                                    );
                                })}
                            </div>
                        )}

                        {/* AJAX Load More — appends the next page via a partial
                            Inertia reload, no full page refresh. Hidden while a
                            keyword/topic filter is narrowing the loaded set. */}
                        {!isFiltering && pagination.has_more && (
                            <div className="flex flex-col items-center gap-3 pt-4 select-none">
                                <Button
                                    variant="secondary"
                                    size="md"
                                    onClick={loadMore}
                                    isLoading={isLoadingMore}
                                    rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                                    className="rounded-none font-mono text-[10px] tracking-wider uppercase transition-all hover:bg-[#2EC4A5] hover:text-black"
                                >
                                    {isLoadingMore ? 'Loading' : 'Load More Articles'}
                                </Button>

                                <span className="font-mono text-[9px] tracking-wider text-white/30 uppercase">
                                    Page {pagination.current_page} / {pagination.last_page}
                                </span>
                            </div>
                        )}
                    </div>
                </section>

                {/* ---------------------------------------------------- */}
                {/* CHAPTER 5 — Join the Journal */}
                {/* ---------------------------------------------------- */}
                <section className="container-editorial relative border-b border-white/5 py-24">
                    <div className="mx-auto max-w-4xl space-y-8 text-center select-none">
                        <Badge
                            variant="default"
                            size="sm"
                            className="font-mono text-xs tracking-widest uppercase"
                        >
                            THE OVOLL JOURNAL
                        </Badge>
                        <h2 className="typo-heading-xl tracking-tight text-white uppercase">
                            Subscribe to OVOLL Journal
                        </h2>
                        <p className="typo-body mx-auto max-w-md text-xs leading-relaxed font-light text-white/50">
                            Receive technical architecture briefs, CSS easing guides, and workflow
                            automation parameters directly from our senior team. No marketing fluff,
                            only code and design coordinates.
                        </p>

                        <form
                            onSubmit={handleSubscribe}
                            className="mx-auto flex max-w-md gap-3 font-mono text-[10px]"
                        >
                            <input
                                id="insights-newsletter-email"
                                name="email"
                                autoComplete="email"
                                type="email"
                                placeholder="name@company.com"
                                value={newsletterEmail}
                                onChange={(e) => setNewsletterEmail(e.target.value)}
                                className="flex-1 rounded-none border border-white/10 bg-[#0E1624]/60 px-5 py-3 text-xs text-white placeholder-white/30 transition-all focus:border-[#2EC4A5] focus:outline-none"
                                required
                            />
                            <Button
                                variant="gradient"
                                size="sm"
                                type="submit"
                                className="rounded-none font-mono text-[9px] tracking-wider uppercase"
                            >
                                Request Access
                            </Button>
                        </form>
                        {isSubscribed && (
                            <div className="animate-pulse font-mono text-xs text-[#2EC4A5]">
                                Access granted. Your email parameters have been registered.
                            </div>
                        )}
                    </div>
                </section>

                {/* ---------------------------------------------------- */}
                {/* CHAPTER 6 — Final Action Alignment Dialogue */}

                {/* ---------------------------------------------------- */}
                <section className="container-editorial relative overflow-hidden py-32 text-center select-none">
                    <div className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,_rgba(46,196,165,0.03)_0%,_transparent_75%)] blur-[40px]" />

                    <Reveal width="full" className="relative z-10 mx-auto max-w-4xl space-y-8">
                        <Badge
                            variant="default"
                            size="sm"
                            className="font-mono text-xs tracking-widest uppercase"
                        >
                            INITIATE ALIGNMENT
                        </Badge>
                        <h2 className="typo-heading-xl tracking-tight text-white uppercase">
                            Have a complex technical requirement?
                        </h2>
                        <p className="typo-body mx-auto max-w-md text-xs leading-relaxed font-light text-white/50">
                            Outline your product specifications and schedule an architectural review
                            with our engineering leads.
                        </p>
                        <div className="pt-4">
                            <Link href="/contact">
                                <Button
                                    variant="gradient"
                                    size="lg"
                                    rightIcon={<ArrowRight className="h-3 w-3" />}
                                    className="rounded-none font-mono text-[10px] tracking-wider uppercase"
                                >
                                    Schedule Consultation
                                </Button>
                            </Link>
                        </div>
                    </Reveal>
                </section>
            </div>
        </>
    );
}

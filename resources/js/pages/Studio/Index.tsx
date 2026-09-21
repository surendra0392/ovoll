import { Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Layers,
    Terminal,
    ExternalLink,
    Play,
    Info,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { CustomCursor } from '@/components/motion/CustomCursor';
import { PageBreadcrumbs } from '@/components/navigation/PageBreadcrumbs';
import { SeoHead } from '@/components/seo/SeoHead';
import { Badge, Button, Card } from '@/components/ui';

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    color: string;
}

interface ToolData {
    id: number;
    name: string;
    slug: string;
    description: string;
    is_featured: boolean;
    component_name: string;
    settings?: {
        question: string;
        approach: string;
        outcome: string;
        lessons: string;
    };
    category?: {
        name: string;
        slug: string;
        color: string;
    };
}

interface IndexProps {
    categories: Category[];
    allTools: ToolData[];
    page?: { content?: { hero?: Record<string, string> } } | null;
}

const TOOLS_PER_PAGE = 9;

export default function Index({ categories = [], allTools = [], page = null }: IndexProps) {
    const hero = page?.content?.hero ?? {};
    // Category selection filter
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // Prototype grid pagination
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Filter tools dynamically based on selected category slug
    const filteredTools = useMemo(
        () =>
            selectedCategory === 'all'
                ? allTools
                : allTools.filter((t) => t.category?.slug === selectedCategory),
        [allTools, selectedCategory],
    );

    const totalPages = Math.max(1, Math.ceil(filteredTools.length / TOOLS_PER_PAGE));
    const paginatedTools = filteredTools.slice(
        (currentPage - 1) * TOOLS_PER_PAGE,
        currentPage * TOOLS_PER_PAGE,
    );

    const selectCategory = (slug: string) => {
        setSelectedCategory(slug);
        setCurrentPage(1);
    };

    const studioSchema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'OVOLL Studio — Digital Laboratory',
        description:
            'Interactive developer utilities, design token generators, shader labs, and engineering prototypes.',
        url: 'https://ovoll.in/studio',
        isPartOf: {
            '@type': 'WebSite',
            name: 'OVOLL',
            url: 'https://ovoll.in',
        },
    };

    return (
        <>
            <SeoHead
                title="Developer Tools & Digital Laboratory — OVOLL Studio"
                description="Discover 30+ interactive developer utilities, WebGL shaders, CSS generators, and AI experiments crafted by OVOLL Studio for engineers and designers."
                canonical="https://ovoll.in/studio"
                keywords={[
                    'developer tools',
                    'interactive web lab',
                    'design token generator',
                    'CSS gradient lab',
                    'contrast ratio checker',
                    'free developer utilities India',
                    'OVOLL Studio',
                    'front-end tools',
                    'software engineering laboratory',
                ]}
                schema={studioSchema}
            />
            <CustomCursor />

            <PageBreadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Studio' }]} />

            <div className="relative z-10 min-h-screen overflow-hidden bg-transparent font-sans text-white">
                {/* Header spacer */}
                <div className="h-6" />

                {/* ---------------------------------------------------- */}
                {/* CHAPTER 1 — Laboratory Entrance */}
                {/* ---------------------------------------------------- */}
                <section className="container-editorial relative px-6 py-20 md:py-32">
                    <div className="relative border-y border-white/10 py-16">
                        {/* Precision overlay ticks */}
                        <div className="absolute -top-[5px] -left-1 font-mono text-[9px] text-white/30 select-none">
                            +
                        </div>
                        <div className="absolute -top-[5px] -right-1 font-mono text-[9px] text-white/30 select-none">
                            +
                        </div>
                        <div className="absolute -bottom-[5px] -left-1 font-mono text-[9px] text-white/30 select-none">
                            +
                        </div>
                        <div className="absolute -right-1 -bottom-[5px] font-mono text-[9px] text-white/30 select-none">
                            +
                        </div>

                        <div className="mx-auto max-w-4xl space-y-8 text-center">
                            <div className="flex items-center justify-center gap-2 select-none">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-[#2EC4A5]" />
                                <span className="font-mono text-xs tracking-[0.2em] text-[#2EC4A5] uppercase">
                                    {hero.badge || 'R&D LAB STATUS: ACTIVE // SEC_ALIGN_SYS_B09'}
                                </span>
                            </div>
                            <h1 className="typo-display-xl tracking-tight text-white uppercase">
                                {hero.titleLead || 'OVOLL'}{' '}
                                <span className="text-gradient bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF]">
                                    {hero.titleHighlight || 'Studio.'}
                                </span>
                            </h1>
                            <p className="typo-body-large mx-auto max-w-2xl leading-relaxed font-light text-white/60">
                                {hero.subtitle ||
                                    'Our public innovation laboratory. We believe in showing our homework. Below, explore our live design system parameters, interactive engineering prototypes, practical AI webhooks, and downloadable utility templates.'}
                            </p>
                        </div>
                    </div>
                </section>

                {/* ---------------------------------------------------- */}
                {/* CHAPTER 2 — Innovation Areas (Categories) */}
                {/* ---------------------------------------------------- */}
                <section className="container-editorial relative border-b border-white/5 py-12">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-[#2EC4A5] uppercase select-none">
                            <Layers className="h-3 w-3" />
                            <span>01 / R&D Focus Areas</span>
                        </div>
                        <h2 className="typo-heading-m tracking-tight text-white uppercase">
                            Innovation Categories
                        </h2>
                        <div className="flex flex-wrap gap-2.5">
                            <button
                                onClick={() => selectCategory('all')}
                                className={`rounded-none border px-4 py-2 font-mono text-xs transition-all duration-200 focus:outline-none ${
                                    selectedCategory === 'all'
                                        ? 'border-[#2EC4A5] bg-[#2EC4A5]/10 text-white'
                                        : 'bg-surface-raised border-white/5 text-white/50 hover:border-white/20 hover:text-white'
                                }`}
                            >
                                All Focus Areas ({allTools.length})
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => selectCategory(cat.slug)}
                                    style={{
                                        borderColor:
                                            selectedCategory === cat.slug ? cat.color : undefined,
                                    }}
                                    className={`rounded-none border px-4 py-2 font-mono text-xs transition-all duration-200 focus:outline-none ${
                                        selectedCategory === cat.slug
                                            ? 'bg-white/5 text-white'
                                            : 'bg-surface-raised border-white/5 text-white/50 hover:border-white/20 hover:text-white'
                                    }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ---------------------------------------------------- */}
                {/* CHAPTER 3 — Interactive Experiments Grid */}
                {/* ---------------------------------------------------- */}
                <section className="container-editorial relative border-b border-white/5 py-20">
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-[#2EC4A5] uppercase select-none">
                                <Terminal className="h-3 w-3" />
                                <span>02 / Live Experiments</span>
                            </div>
                            <h2 className="typo-heading-l tracking-tight text-white uppercase">
                                Active Prototypes
                            </h2>
                            <p className="typo-body-small max-w-xl font-light text-white/50">
                                Explore interactive models built to solve interface bottlenecks.
                                Click any item to inspect its underlying research diagnostic
                                questions, tactical approach, and lessons learned.
                            </p>
                        </div>

                        {filteredTools.length === 0 ? (
                            <div className="rounded-none border border-white/5 bg-[#0E1624]/20 py-16 text-center">
                                <Info className="mx-auto mb-3 h-8 w-8 text-white/30" />
                                <p className="font-mono text-xs text-white/40">
                                    No prototypes currently deployed in this focus area.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    <AnimatePresence mode="popLayout">
                                        {paginatedTools.map((tool) => (
                                            <motion.div
                                                layout
                                                key={tool.id}
                                                initial={{ opacity: 0, scale: 0.98 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.98 }}
                                                transition={{ duration: 0.3 }}
                                                className="h-full"
                                            >
                                                <Card
                                                    variant="glass"
                                                    className="group relative h-full overflow-hidden rounded-none border border-white/5 p-8 transition-all duration-300 hover:border-[#2EC4A5]/25 hover:shadow-[0_0_25px_rgba(46,196,165,0.06)]"
                                                >
                                                    <div className="flex h-full flex-col">
                                                        <div className="space-y-4">
                                                            {/* Category accent tag pinned to the card's top edge */}
                                                            <div
                                                                className="-mx-8 -mt-8 h-[3px]"
                                                                style={{
                                                                    backgroundColor:
                                                                        tool.category?.color ||
                                                                        '#2EC4A5',
                                                                }}
                                                            />
                                                            <div className="flex items-center justify-between">
                                                                <span className="font-mono text-[9px] tracking-widest text-[#00D1FF] uppercase">
                                                                    {tool.category?.name ||
                                                                        'R&D PROTOTYPE'}
                                                                </span>
                                                                <span className="font-mono text-[10px] text-white/30">
                                                                    ID: {tool.slug.toUpperCase()}
                                                                </span>
                                                            </div>
                                                            <h3 className="typo-heading-s font-bold text-white transition-colors duration-300 group-hover:text-[#2EC4A5]">
                                                                {tool.name}
                                                            </h3>
                                                            <p className="line-clamp-2 text-xs leading-relaxed font-light text-white/50">
                                                                {tool.description}
                                                            </p>

                                                            {/* Seeded settings metadata block */}
                                                            {tool.settings && (
                                                                <div className="space-y-3 border-t border-white/5 pt-4 font-mono text-[10px] text-white/45">
                                                                    <div className="space-y-1">
                                                                        <span className="block text-[9px] font-bold tracking-wider text-white/80 uppercase">
                                                                            The Question:
                                                                        </span>
                                                                        <p className="line-clamp-2 text-white/60 italic">
                                                                            "
                                                                            {tool.settings.question}
                                                                            "
                                                                        </p>
                                                                    </div>
                                                                    <div className="space-y-1">
                                                                        <span className="block text-[9px] font-bold tracking-wider text-white/80 uppercase">
                                                                            Lessons Learned:
                                                                        </span>
                                                                        <p className="line-clamp-2 text-white/60">
                                                                            {tool.settings.lessons}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="mt-auto border-t border-white/5 pt-6">
                                                            <Button
                                                                asChild
                                                                variant="secondary"

                                                                size="sm"
                                                                className="w-full justify-between transition-all duration-300 group-hover:bg-[#2EC4A5]/10 group-hover:text-white"
                                                            >
                                                                <Link
                                                                    href={`/studio/tool/${tool.slug}`}
                                                                >
                                                                    <span>Run Experiment</span>
                                                                    <Play className="h-3 w-3 fill-current" />
                                                                </Link>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>

                                {/* Pagination controls */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-2 pt-4 select-none">
                                        <button
                                            onClick={() =>
                                                setCurrentPage((p) => Math.max(1, p - 1))
                                            }
                                            disabled={currentPage === 1}
                                            aria-label="Previous page"
                                            className="bg-surface-raised flex h-9 w-9 items-center justify-center rounded-none border border-white/5 text-white/60 transition-all duration-200 hover:border-white/20 hover:text-white disabled:pointer-events-none disabled:opacity-30"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </button>

                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                            (page) => (
                                                <button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    aria-current={
                                                        currentPage === page ? 'page' : undefined
                                                    }
                                                    className={`h-9 min-w-9 rounded-none border px-3 font-mono text-xs transition-all duration-200 focus:outline-none ${
                                                        currentPage === page
                                                            ? 'border-[#2EC4A5] bg-[#2EC4A5]/10 text-white'
                                                            : 'bg-surface-raised border-white/5 text-white/50 hover:border-white/20 hover:text-white'
                                                    }`}
                                                >
                                                    {page}
                                                </button>
                                            ),
                                        )}

                                        <button
                                            onClick={() =>
                                                setCurrentPage((p) => Math.min(totalPages, p + 1))
                                            }
                                            disabled={currentPage === totalPages}
                                            aria-label="Next page"
                                            className="bg-surface-raised flex h-9 w-9 items-center justify-center rounded-none border border-white/5 text-white/60 transition-all duration-200 hover:border-white/20 hover:text-white disabled:pointer-events-none disabled:opacity-30"
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>

                {/* ---------------------------------------------------- */}
                {/* CHAPTER 4 — Final Scoping Invitation */}
                {/* ---------------------------------------------------- */}
                <section className="container-editorial relative overflow-hidden py-32 text-center select-none">
                    <div className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,_rgba(46,196,165,0.03)_0%,_transparent_75%)] blur-[40px]" />

                    <div className="relative z-10 mx-auto max-w-4xl space-y-8">
                        <Badge
                            variant="default"
                            size="sm"
                            className="font-mono text-xs tracking-widest uppercase"
                        >
                            INITIATE ALIGNMENT
                        </Badge>
                        <h2 className="typo-heading-xl tracking-tight text-white uppercase">
                            Have an experimental R&D challenge?
                        </h2>
                        <p className="typo-body mx-auto max-w-md text-xs leading-relaxed font-light text-white/50">
                            Reach out to schedule a deep-dive session. Let's outline your technical
                            parameters and co-design a custom engineering prototype.
                        </p>
                        <div className="pt-4">
                            <Button
                                asChild
                                variant="gradient"
                                size="lg"
                                className="font-mono text-[10px] tracking-wider uppercase"
                            >
                                <Link href="/contact">
                                    <span>Schedule R&D Call</span>
                                    <ExternalLink className="h-3 w-3" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

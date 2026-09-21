import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, Search, BookOpen, Download, FileText, CheckCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { AnimatedSection } from '@/components/motion/AnimatedSection';
import { PageTransitionWrapper } from '@/components/motion/PageTransitionWrapper';
import { SeoHead } from '@/components/seo/SeoHead';
import { Button } from '@/components/ui/Button';
import { Image } from '@/components/ui/Image';
import { Input } from '@/components/ui/Input';
import { MouseReactiveCard } from '@/components/ui/MouseReactiveCard';
import { LandingLayout } from '@/layouts';
import hubRoutes from '@/routes/hub';

interface Category {
    id: number;
    name: string;
    slug: string;
    icon: string;
}

interface Resource {
    id: number;
    title: string;
    slug: string;
    type: string;
    excerpt: string | null;
    cover_image: string | null;
    reading_time: number;
    published_at: string;
    category?: Category;
    author?: { name: string; avatar: string | null };
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface IndexProps {
    resources: {
        data: Resource[];
        links: PaginationLink[];
        current_page: number;
        last_page: number;
    };
    categories: Category[];
    filters: {
        category?: string;
        type?: string;
        q?: string;
    };
}

const TYPE_ICONS: Record<string, LucideIcon> = {
    article: FileText,
    guide: BookOpen,
    checklist: CheckCircle,
    download: Download,
};

export default function KnowledgeHubIndex({ resources, categories, filters }: IndexProps) {
    const [searchQuery, setSearchQuery] = useState(filters.q || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            hubRoutes.index.url({ query: { ...filters, q: searchQuery || null } }),
            {},
            { preserveState: true },
        );
    };

    const getTypeIcon = (type: string) => {
        const Icon = TYPE_ICONS[type] || FileText;

        return <Icon className="h-4 w-4" />;
    };

    const hubCollectionSchema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'OVOLL Knowledge Hub',
        description:
            'Engineering blueprints, architectural playbooks, and digital product transformation guides.',
        url: 'https://ovoll.in/hub',
        isPartOf: {
            '@type': 'WebSite',
            name: 'OVOLL',
            url: 'https://ovoll.in',
        },
    };

    return (
        <PageTransitionWrapper>
            <SeoHead
                title="Knowledge Hub — Engineering Blueprints, Playbooks & Guides"
                description="Access OVOLL's open technical knowledge base of system design playbooks, full-stack benchmarks, SaaS engineering blueprints, and digital transformation guides for tech leaders in India and globally."
                canonical="https://ovoll.in/hub"
                keywords={[
                    'enterprise architecture guide',
                    'engineering blueprints India',
                    'software design playbook',
                    'tech whitepapers',
                    'SaaS scalability guide',
                    'system design resources',
                    'CTO playbook',
                    'OVOLL knowledge hub',
                ]}
                schema={hubCollectionSchema}
            />

            <main className="bg-surface-raised relative min-h-screen overflow-hidden pt-32 pb-24 text-white selection:bg-[#00D1FF]/30 selection:text-white">
                {/* Background radial gradient in brand Teal/Cyan */}
                <div className="pointer-events-none absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,_rgba(20,184,166,0.05)_0%,_transparent_65%)]" />
                <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,_rgba(0,209,255,0.04)_0%,_transparent_65%)]" />

                {/* Hero Section */}
                <AnimatedSection className="relative z-10 container mx-auto mb-20 max-w-4xl px-6 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="mx-auto mb-6 max-w-4xl text-5xl leading-[1.1] font-bold tracking-tighter text-white md:text-7xl"
                    >
                        Learn. Grow.{' '}
                        <span className="text-gradient bg-gradient-to-r from-[#14B8A6] to-[#00D1FF]">
                            Scale.
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                        className="mb-10 text-xl text-white/60"
                    >
                        Premium insights, guides, and resources to accelerate your digital growth.
                    </motion.p>

                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                        onSubmit={handleSearch}
                        className="relative mx-auto flex max-w-2xl gap-2"
                    >
                        <div className="relative flex-1">
                            <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-white/30" />
                            <Input
                                id="hub-search"
                                type="text"
                                placeholder="Search articles, guides, resources..."
                                className="bg-surface-raised/60 h-14 w-full rounded-full border-[#14B8A6]/20 pl-12 text-lg text-white placeholder-white/30 transition-all duration-300 focus:border-[#00D1FF]/50 focus:ring-[#00D1FF]/20"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button
                            type="submit"
                            size="lg"
                            className="text-surface-raised h-14 rounded-full bg-gradient-to-r from-[#14B8A6] to-[#00D1FF] px-8 font-semibold shadow-[0_0_20px_rgba(20,184,166,0.2)] transition-shadow hover:shadow-[0_0_30px_rgba(20,184,166,0.4)]"
                        >
                            Search
                        </Button>
                    </motion.form>
                </AnimatedSection>

                {/* Filters */}
                <AnimatedSection
                    delay={0.3}
                    className="relative z-10 mx-auto mb-12 w-full max-w-7xl px-6 md:px-8"
                >
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6">
                        <div className="flex flex-wrap gap-2">
                            <Link
                                href={hubRoutes.index.url({
                                    query: { ...filters, category: null },
                                })}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${!filters.category ? 'text-surface-raised bg-gradient-to-r from-[#14B8A6] to-[#00D1FF] font-semibold shadow-[0_0_15px_rgba(0,209,255,0.3)]' : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'}`}
                            >
                                All Topics
                            </Link>
                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={hubRoutes.index.url({
                                        query: { ...filters, category: category.slug },
                                    })}
                                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${filters.category === category.slug ? 'text-surface-raised bg-gradient-to-r from-[#14B8A6] to-[#00D1FF] font-semibold shadow-[0_0_15px_rgba(0,209,255,0.3)]' : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'}`}
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {['article', 'guide', 'download'].map((type) => (
                                <Link
                                    key={type}
                                    href={hubRoutes.index.url({
                                        query: {
                                            ...filters,
                                            type: filters.type === type ? null : type,
                                        },
                                    })}
                                    className={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors duration-300 ${filters.type === type ? 'border-[#00D1FF] bg-[#14B8A6]/10 text-[#00D1FF]' : 'border-white/10 text-white/60 hover:border-[#14B8A6]/30 hover:text-white'}`}
                                >
                                    {getTypeIcon(type)}
                                    <span className="capitalize">{type}s</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>

                {/* Resources Grid */}
                <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
                    {resources.data.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {resources.data.map((resource, i) => (
                                <AnimatedSection key={resource.id} delay={0.1 * i} className="flex">
                                    <MouseReactiveCard
                                        role="article"
                                        aria-labelledby={`resource-title-${resource.id}`}
                                        aria-describedby={`resource-desc-${resource.id}`}
                                        className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[#14B8A6]/15 bg-[#0E1624]/60 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all duration-500"
                                    >
                                        <Link
                                            href={hubRoutes.show.url(resource.slug)}
                                            className="flex flex-1 flex-col"
                                        >
                                            {resource.cover_image && (
                                                <div className="relative aspect-[16/9] overflow-hidden">
                                                    <Image
                                                        src={`/storage/${resource.cover_image}`}
                                                        alt={resource.title}
                                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                    <div className="bg-surface-raised/90 absolute top-4 left-4 flex items-center gap-1.5 rounded-full border border-[#14B8A6]/20 px-3 py-1 text-xs font-semibold tracking-wider text-[#00D1FF] uppercase backdrop-blur-sm">
                                                        {getTypeIcon(resource.type)}
                                                        {resource.type}
                                                    </div>
                                                </div>
                                            )}
                                            <div className="flex flex-1 flex-col p-6">
                                                <div className="mb-4 flex items-center gap-4 text-sm text-white/40">
                                                    {resource.category && (
                                                        <span className="font-semibold text-[#14B8A6]">
                                                            {resource.category.name}
                                                        </span>
                                                    )}
                                                    <span>•</span>
                                                    <span>{resource.reading_time} min read</span>
                                                </div>
                                                <h2
                                                    id={`resource-title-${resource.id}`}
                                                    className="mb-3 line-clamp-2 text-2xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-[#00D1FF]"
                                                >
                                                    {resource.title}
                                                </h2>
                                                {resource.excerpt && (
                                                    <p
                                                        id={`resource-desc-${resource.id}`}
                                                        className="mb-6 line-clamp-3 flex-1 text-sm leading-relaxed text-white/50"
                                                    >
                                                        {resource.excerpt}
                                                    </p>
                                                )}
                                                <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-6">
                                                    <div className="flex items-center gap-3">
                                                        {resource.author?.avatar ? (
                                                            <Image
                                                                src={`/storage/${resource.author.avatar}`}
                                                                alt={resource.author.name}
                                                                className="h-8 w-8 rounded-full"
                                                            />
                                                        ) : (
                                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#14B8A6]/10 text-xs font-medium text-[#14B8A6]">
                                                                {resource.author?.name?.charAt(0) ||
                                                                    'O'}
                                                            </div>
                                                        )}
                                                        <span className="text-sm font-medium text-white/60">
                                                            {resource.author?.name || 'OVOLL Team'}
                                                        </span>
                                                    </div>
                                                    <ArrowRight className="h-5 w-5 transform text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#00D1FF]" />
                                                </div>
                                            </div>
                                        </Link>
                                    </MouseReactiveCard>
                                </AnimatedSection>
                            ))}
                        </div>
                    ) : (
                        <div className="py-32 text-center">
                            <h2 className="text-muted-foreground mb-4 text-2xl font-semibold">
                                No resources found
                            </h2>
                            <p className="text-muted-foreground mx-auto mb-8 max-w-md">
                                Try adjusting your search query or filters to find what you're
                                looking for.
                            </p>
                            <Button asChild>
                                <Link href={hubRoutes.index.url()}>Clear all filters</Link>
                            </Button>
                        </div>
                    )}

                    {/* Pagination - Simple */}
                    {resources.last_page > 1 && (
                        <div className="mt-16 flex justify-center gap-2">
                            {resources.links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url || '#'}
                                    className={`rounded-md px-4 py-2 ${link.active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'} ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </PageTransitionWrapper>
    );
}

KnowledgeHubIndex.layout = (page: React.ReactNode) => <LandingLayout>{page}</LandingLayout>;

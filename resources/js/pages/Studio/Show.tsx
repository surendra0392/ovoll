import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Share2, Check, ArrowRight, Sparkles, Terminal, Cpu } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { SeoHead } from '@/components/seo/SeoHead';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import studioRoutes from '@/routes/studio';
import { useStudioStore } from '@/store/useStudioStore';
import { ToolRenderer } from './ToolRegistry';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Category {
    id: number;
    name: string;
    slug: string;
    color: string;
}

interface ToolData {
    id: number;
    name: string;
    slug: string;
    description: string;
    icon: string;
    component_name: string;
    is_featured: boolean;
    is_new: boolean;
    is_pro: boolean;
    usage_count: number;
    category?: Category;
    settings?: {
        question?: string;
        approach?: string;
        outcome?: string;
        lessons?: string;
    };
}

interface ShowProps {
    tool: ToolData;
    relatedTools: ToolData[];
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function StudioShow({ tool, relatedTools }: ShowProps) {
    const { isFavorite, toggleFavorite, addRecentlyUsed } = useStudioStore();
    const fav = isFavorite(tool.slug);
    const [copied, setCopied] = useState(false);

    // Track recently used
    useEffect(() => {
        addRecentlyUsed(tool.slug);

        // Fire analytics (fire-and-forget)
        fetch(studioRoutes.track.url(tool.slug), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN':
                    document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ||
                    '',
            },
            body: JSON.stringify({ metadata: { referrer: document.referrer } }),
        }).catch(() => {});
    }, [tool.slug, addRecentlyUsed]);

    const handleShare = useCallback(async () => {
        const url = window.location.href;

        if (navigator.share) {
            await navigator.share({ title: tool.name, text: tool.description, url });
        } else {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }, [tool]);

    const toolSchemas = [
        {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: `${tool.name} — OVOLL Studio`,
            description: tool.description,
            url: `https://ovoll.in/studio/tool/${tool.slug}`,
            applicationCategory: tool.category?.name ?? 'DeveloperApplication',
            operatingSystem: 'All',
            offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
            },
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
                    name: 'Studio',
                    item: 'https://ovoll.in/studio',
                },
                {
                    '@type': 'ListItem',
                    position: 3,
                    name: tool.name,
                    item: `https://ovoll.in/studio/tool/${tool.slug}`,
                },
            ],
        },
    ];

    return (
        <>
            <SeoHead
                title={`${tool.name} | OVOLL Studio`}
                description={tool.description}
                canonical={`https://ovoll.in/studio/tool/${tool.slug}`}
                type="website"
                schema={toolSchemas}
            />

            <main className="relative z-10 min-h-screen bg-transparent pt-28 pb-24 text-white">
                <div className="container-editorial">
                    {/* Back Button */}
                    <div className="mb-8">
                        <Link
                            href={studioRoutes.index.url()}
                            className="inline-flex items-center gap-2 font-mono text-xs text-white/50 transition-colors hover:text-white"
                        >
                            <ArrowLeft className="h-4 w-4 text-[#2EC4A5]" />
                            <span>BACK TO INNOVATION LABORATORY</span>
                        </Link>
                    </div>

                    {/* Header */}
                    <motion.header
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mb-12 border-b border-white/5 pb-10"
                    >
                        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center gap-3">
                                    {tool.category && (
                                        <Badge
                                            variant="outline"
                                            style={{
                                                borderColor: tool.category.color,
                                                color: tool.category.color,
                                            }}
                                            className="font-mono text-[9px] tracking-wider uppercase"
                                        >
                                            {tool.category.name}
                                        </Badge>
                                    )}
                                    {tool.is_new && (
                                        <Badge variant="secondary" className="font-mono text-[9px]">
                                            NEW EXPT
                                        </Badge>
                                    )}
                                    {tool.is_pro && (
                                        <Badge variant="default" className="font-mono text-[9px]">
                                            LAB COMPILER
                                        </Badge>
                                    )}
                                </div>
                                <h1 className="typo-heading-xl tracking-tight text-white uppercase">
                                    {tool.name}
                                </h1>
                                <p className="max-w-2xl text-sm leading-relaxed font-light text-white/60">
                                    {tool.description}
                                </p>
                            </div>

                            <div className="flex shrink-0 items-center gap-2 font-mono text-[10px]">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => toggleFavorite(tool.slug)}
                                    className="gap-2 rounded-none transition-all hover:border-[#2EC4A5]"
                                >
                                    <Heart
                                        className={`h-3 w-3 ${fav ? 'fill-red-500 text-red-500' : 'text-white/50'}`}
                                    />
                                    <span>{fav ? 'FAVORITED' : 'FAVORITE'}</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleShare}
                                    className="gap-2 rounded-none transition-all hover:border-[#00D1FF]"
                                >
                                    {copied ? (
                                        <Check className="h-3 w-3 text-[#2EC4A5]" />
                                    ) : (
                                        <Share2 className="h-3 w-3 text-white/50" />
                                    )}
                                    <span>{copied ? 'COPIED!' : 'SHARE'}</span>
                                </Button>
                            </div>
                        </div>
                    </motion.header>

                    {/* Side-by-Side Workspace Layout */}
                    <div className="mb-20 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
                        {/* Interactive Experiment Sandbox */}
                        <motion.div
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="relative flex min-h-[500px] flex-col justify-center overflow-hidden border border-white/5 bg-[#0E1624]/20 p-6 md:p-10 lg:col-span-8"
                        >
                            <div className="pointer-events-none absolute top-3 left-4 flex items-center gap-2 font-mono text-[8px] text-white/35 select-none">
                                <Cpu className="h-3 w-3 text-[#00D1FF]" />
                                <span>LIVE EXPERIMENT WORKSPACE // COMPILER: LOADED</span>
                            </div>

                            <div className="relative z-10 w-full">
                                <ToolRenderer componentName={tool.component_name} />
                            </div>
                        </motion.div>

                        {/* R&D Diagnostic Panel */}
                        <motion.div
                            initial={{ opacity: 0, x: 15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-surface-raised/60 flex flex-col justify-between space-y-6 border border-white/5 p-8 font-mono text-[10px] lg:col-span-4"
                        >
                            <div className="space-y-6">
                                <div className="flex items-center gap-2 border-b border-white/5 pb-3 select-none">
                                    <Terminal className="h-4 w-4 text-[#2EC4A5]" />
                                    <span className="font-bold tracking-wider text-white uppercase">
                                        R&D Briefing Log
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    {/* The Question */}
                                    <div className="space-y-1">
                                        <span className="block text-[9px] tracking-wider text-white/40 uppercase">
                                            01 // The Question
                                        </span>
                                        <p className="leading-relaxed font-light text-white italic">
                                            "
                                            {tool.settings?.question ||
                                                'No research query recorded.'}
                                            "
                                        </p>
                                    </div>

                                    {/* Approach */}
                                    <div className="space-y-1">
                                        <span className="block text-[9px] tracking-wider text-white/40 uppercase">
                                            02 // The Approach
                                        </span>
                                        <p className="leading-relaxed font-light text-white/70">
                                            {tool.settings?.approach ||
                                                'No tactical approach logged.'}
                                        </p>
                                    </div>

                                    {/* Outcome */}
                                    <div className="space-y-1">
                                        <span className="block text-[9px] tracking-wider text-white/40 uppercase">
                                            03 // The Outcome
                                        </span>
                                        <p className="leading-relaxed font-light text-[#2EC4A5]">
                                            {tool.settings?.outcome ||
                                                'No outcome parameters evaluated.'}
                                        </p>
                                    </div>

                                    {/* Lessons Learned */}
                                    <div className="space-y-1">
                                        <span className="block text-[9px] tracking-wider text-white/40 uppercase">
                                            04 // Lessons Learned
                                        </span>
                                        <p className="leading-relaxed font-light text-white/70">
                                            {tool.settings?.lessons || 'No lessons compiled.'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-white/5 pt-4 text-[9px] text-white/30 select-none">
                                <span>USAGE: {tool.usage_count} INVOCATIONS</span>
                                <span>VER: 1.0.4-STAGE</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Related Tools */}
                    {relatedTools.length > 0 && (
                        <section className="border-t border-white/5 pt-16">
                            <div className="mb-8 flex items-center gap-3 select-none">
                                <Sparkles className="h-4 w-4 text-[#2EC4A5]" />
                                <h2 className="typo-heading-s tracking-tight text-white uppercase">
                                    More {tool.category?.name} Prototypes
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 gap-4 font-mono text-[10px] sm:grid-cols-2 lg:grid-cols-4">
                                {relatedTools.map((related) => (
                                    <Link
                                        key={related.id}
                                        href={studioRoutes.show.url(related.slug)}
                                        className="group flex h-[160px] flex-col justify-between rounded-none border border-white/5 bg-[#0E1624]/20 p-6 transition-all duration-300 hover:border-[#2EC4A5]/40"
                                    >
                                        <div className="space-y-2">
                                            <span className="text-[9px] tracking-widest text-[#00D1FF] uppercase">
                                                {related.category?.name || 'R&D PROTOTYPE'}
                                            </span>
                                            <h3 className="text-xs font-bold text-white uppercase transition-colors group-hover:text-[#2EC4A5]">
                                                {related.name}
                                            </h3>
                                        </div>
                                        <div className="mt-4 flex items-center justify-end border-t border-white/5 pt-3">
                                            <ArrowRight className="h-3.5 w-3.5 text-white/40 transition-all group-hover:translate-x-1 group-hover:text-[#2EC4A5]" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </>
    );
}

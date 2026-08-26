import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { SeoHead } from '@/components/seo/SeoHead';
import { Card, Badge } from '@/components/ui';
import { LandingLayout } from '@/layouts';

interface RecommendedArticle {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    reading_time?: number;
    category?: { name?: string } | null;
}

interface SuccessProps {
    recommendedArticles?: RecommendedArticle[];
}

export default function Success({ recommendedArticles = [] }: SuccessProps) {
    return (
        <>
            <SeoHead title="Partnership Initiated — OVOLL" />

            <div className="relative z-10 min-h-screen overflow-hidden bg-transparent font-sans text-white">
                <div className="h-32" />

                <main className="mx-auto max-w-5xl space-y-16 px-6 py-16 text-center select-none">
                    {/* Celebration Header */}
                    <motion.div
                        initial={{ scale: 0.96, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-6"
                    >
                        <Badge
                            variant="default"
                            size="sm"
                            className="font-mono text-xs tracking-widest uppercase"
                        >
                            Discovery Initiated // Chapter 01
                        </Badge>
                        <h1 className="text-4xl leading-none font-extrabold tracking-tight text-white uppercase md:text-6xl">
                            Parameters Registered <br />
                            <span className="text-gradient bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF]">
                                & Validated.
                            </span>
                        </h1>
                        <p className="mx-auto max-w-xl text-sm leading-relaxed font-light text-white/50">
                            Your project discovery answers have been registered in our database. Our
                            lead system architects will review the parameters immediately.
                        </p>
                    </motion.div>

                    {/* Next Steps Layout Block */}
                    <Card
                        variant="glass"
                        className="rounded-none border border-white/5 p-0 text-left"
                    >
                        <div className="space-y-8 p-8 md:p-12">
                            <span className="block font-mono text-[9px] font-bold tracking-widest text-[#2EC4A5] uppercase">
                                Expected Next Steps
                            </span>

                            <div className="grid grid-cols-1 gap-8 font-mono text-[10px] text-white/50 md:grid-cols-3">
                                <div className="space-y-2 border-l border-white/10 pl-4">
                                    <div className="font-bold text-white uppercase">
                                        01 / Architectural Audit
                                    </div>
                                    <div className="font-sans text-[11px] leading-relaxed font-light">
                                        We audit target latency budgets, layout criteria, and
                                        structural constraints within 12 hours.
                                    </div>
                                </div>
                                <div className="space-y-2 border-l border-white/10 pl-4">
                                    <div className="font-bold text-[#00D1FF] uppercase">
                                        02 / Technical Discovery
                                    </div>
                                    <div className="font-sans text-[11px] leading-relaxed font-light">
                                        You receive a secure calendar invite to schedule a 30-minute
                                        alignment session.
                                    </div>
                                </div>
                                <div className="space-y-2 border-l border-white/10 pl-4">
                                    <div className="font-bold text-white uppercase">
                                        03 / Scope & Kickoff
                                    </div>
                                    <div className="font-sans text-[11px] leading-relaxed font-light">
                                        We commit initial schema architectures and initialize the
                                        team repository to start the sprints.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Dynamic Insights Article Recommendations */}
                    {recommendedArticles.length > 0 && (
                        <div className="space-y-8 text-left">
                            <div className="flex items-center justify-between border-t border-white/10 pt-12">
                                <div className="space-y-1">
                                    <span className="block font-mono text-[9px] font-bold tracking-widest text-[#2EC4A5] uppercase">
                                        Readings Brief
                                    </span>
                                    <h2 className="text-xl font-bold tracking-tight text-white uppercase">
                                        While You Wait
                                    </h2>
                                </div>
                                <Link
                                    href="/insights"
                                    className="inline-flex items-center gap-1 font-mono text-[9px] font-bold tracking-wider text-[#00D1FF] uppercase hover:underline"
                                >
                                    Open Editorial Journal <ArrowRight className="h-3 w-3" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                {recommendedArticles.map((article) => (
                                    <Card
                                        key={article.id}
                                        variant="glass"
                                        className="group flex h-64 flex-col justify-between rounded-none border border-white/5 p-0 transition-all duration-300 hover:border-[#2EC4A5]/25"
                                    >
                                        <div className="space-y-4 p-6">
                                            <div className="flex items-center justify-between font-mono text-[9px] text-white/40">
                                                <span className="text-[#2EC4A5] uppercase">
                                                    {article.category?.name || 'Technical'}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />{' '}
                                                    {article.reading_time || '5'} Min
                                                </span>
                                            </div>
                                            <h3 className="line-clamp-2 text-sm font-bold tracking-tight text-white uppercase transition-colors group-hover:text-[#00D1FF]">
                                                {article.title}
                                            </h3>
                                            <p className="line-clamp-3 font-sans text-xs leading-relaxed font-light text-white/50">
                                                {article.excerpt}
                                            </p>
                                        </div>
                                        <div className="border-t border-white/5 p-6">
                                            <Link
                                                href={`/insights/${article.slug}`}
                                                className="inline-flex items-center gap-1 font-mono text-[9px] font-bold tracking-wider text-[#00D1FF] uppercase hover:underline"
                                            >
                                                Read Article <ArrowRight className="h-3 w-3" />
                                            </Link>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}

Success.layout = (page: React.ReactNode) => <LandingLayout>{page}</LandingLayout>;

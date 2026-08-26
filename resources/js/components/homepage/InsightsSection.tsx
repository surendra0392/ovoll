import { Badge, Card } from '@/components/ui';

interface ArticleItem {
    title: string;
    category: string;
    time: string;
    date: string;
    excerpt?: string;
}

interface InsightsSectionProps {
    content: {
        headline: string;
        articles: ArticleItem[];
    };
    settings?: {
        limit?: number;
    };
}

export function InsightsSection(_props: InsightsSectionProps) {
    const featuredArticle: ArticleItem = {
        title: 'Mathematical Easing Curves in Premium Interaction Design',
        category: 'Motion Design',
        time: '6 min read',
        date: 'July 11, 2026',
        excerpt:
            'Why springy, bouncy eases disrupt corporate trust and how utilizing precise cubic-bezier curves (0.16, 1, 0.3, 1) creates a sense of luxury-engineering and mechanical feedback.',
    };

    const secondaryArticles: ArticleItem[] = [
        {
            title: 'GPU InstancedMesh Sanitation Patterns',
            category: 'WebGL Performance',
            time: '4 min read',
            date: 'July 08, 2026',
        },
        {
            title: 'Stateless Route Syncs in React Single Page Apps',
            category: 'Architecture',
            time: '5 min read',
            date: 'July 05, 2026',
        },
    ];

    return (
        <section className="relative z-10 w-full bg-transparent px-6 py-32 text-white md:py-48">
            <div className="mx-auto max-w-7xl">
                {/* Section Header */}
                <div className="mb-16 space-y-6 md:mb-24">
                    <Badge variant="default" size="sm">
                        Section 09 — Editorial Insights
                    </Badge>
                    <h2 className="text-3xl leading-tight font-extrabold tracking-tight text-white md:text-5xl">
                        Editorial Insights: <br />
                        <span className="text-gradient bg-gradient-to-r from-[#14B8A6] to-[#00D1FF]">
                            Curated technical design perspectives.
                        </span>
                    </h2>
                </div>

                {/* Editorial Magazine Layout */}
                <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-16">
                    {/* Left 7 Cols: Featured Article */}
                    <div className="flex lg:col-span-7">
                        <Card
                            variant="glass"
                            className="group relative flex flex-1 flex-col justify-between overflow-hidden border border-white/5 p-8 transition-all duration-300 hover:border-[#14B8A6]/20 md:p-12"
                        >
                            <div className="pointer-events-none absolute top-0 right-0 h-72 w-72 bg-[radial-gradient(circle,_rgba(20,184,166,0.06)_0%,_transparent_70%)] blur-[50px]" />

                            <div className="relative z-10 space-y-6">
                                <div className="flex items-center justify-between font-mono text-xs font-bold tracking-widest text-[#00D1FF]">
                                    <span>FEATURED PREVIEW</span>
                                    <span>{featuredArticle.time}</span>
                                </div>
                                <h3 className="text-2xl leading-tight font-extrabold tracking-tight text-white transition-colors duration-260 group-hover:text-[#00D1FF] md:text-3xl">
                                    {featuredArticle.title}
                                </h3>
                                <p className="max-w-xl text-sm leading-relaxed font-medium text-white/50">
                                    {featuredArticle.excerpt}
                                </p>
                            </div>

                            <div className="relative z-10 mt-8 flex items-center justify-between border-t border-white/5 pt-6">
                                <span className="font-mono text-xs font-bold tracking-wider text-[#14B8A6] uppercase">
                                    {featuredArticle.category}
                                </span>
                                <span className="font-mono text-xs text-white/30">
                                    {featuredArticle.date}
                                </span>
                            </div>
                        </Card>
                    </div>

                    {/* Right 5 Cols: Secondary Articles list */}
                    <div className="flex flex-col justify-between gap-6 lg:col-span-5">
                        {secondaryArticles.map((article, idx) => (
                            <Card
                                key={idx}
                                variant="glass"
                                className="group flex flex-1 flex-col justify-between border border-white/5 p-8 transition-all duration-300 hover:border-[#14B8A6]/20"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between font-mono text-[10px] font-bold tracking-widest text-[#14B8A6] uppercase">
                                        <span>{article.category}</span>
                                        <span>{article.time}</span>
                                    </div>
                                    <h4 className="text-base leading-snug font-bold text-white transition-colors duration-260 group-hover:text-[#00D1FF]">
                                        {article.title}
                                    </h4>
                                </div>

                                <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                                    <span className="font-mono text-[9px] font-bold tracking-wider text-[#00D1FF]">
                                        READ INSIGHT
                                    </span>
                                    <span className="font-mono text-[10px] text-white/30">
                                        {article.date}
                                    </span>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

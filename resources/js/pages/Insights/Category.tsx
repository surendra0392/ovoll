import { Link } from '@inertiajs/react';
import { ArrowLeft, Clock, Image as ImageIcon } from 'lucide-react';
import { SeoHead } from '@/components/seo/SeoHead';
import { Card } from '@/components/ui/Card';
import { Image } from '@/components/ui/Image';

interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    cover_image: string | null;
    reading_time: number;
    published_at: string;
    author: {
        name: string;
        avatar: string | null;
    };
}

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    cover_image: string | null;
}

interface Props {
    category: Category;
    articles: {
        data: Article[];
        next_page_url: string | null;
        total: number;
    };
}

export default function InsightsCategory({ category, articles }: Props) {
    const categorySchema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `${category.name} Insights — OVOLL`,
        description:
            category.description ||
            `Explore technical insights, architectural case studies, and engineering strategies on ${category.name} by OVOLL.`,
        url: `https://ovoll.in/insights/category/${category.slug}`,
        isPartOf: {
            '@type': 'WebSite',
            name: 'OVOLL',
            url: 'https://ovoll.in',
        },
    };

    return (
        <div className="bg-background relative min-h-screen overflow-hidden">
            <SeoHead
                title={`${category.name} Insights & Perspectives`}
                description={
                    category.description ||
                    `Explore technical insights, architectural case studies, and engineering strategies on ${category.name} by OVOLL.`
                }
                canonical={`https://ovoll.in/insights/category/${category.slug}`}
                keywords={[
                    category.name,
                    `${category.name} insights`,
                    `${category.name} architecture`,
                    'software engineering insights India',
                    'digital agency thought leadership',
                    'OVOLL perspectives',
                ]}
                schema={categorySchema}
            />

            <div className="h-24"></div>

            <main className="container mx-auto max-w-6xl px-6 py-12">
                {/* Category Header */}
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <Link
                        href="/insights"
                        className="text-muted-foreground hover:text-primary mb-8 inline-flex items-center text-sm transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Insights
                    </Link>

                    <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
                        {category.name}
                    </h1>

                    {category.description && (
                        <p className="text-muted-foreground text-xl">{category.description}</p>
                    )}
                </div>

                {/* Articles */}
                <div>
                    <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
                        <h2 className="text-2xl font-bold tracking-tight">
                            Articles in {category.name}
                        </h2>
                        <span className="text-muted-foreground">{articles.total} articles</span>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {articles.data.map((article) => (
                            <Link key={article.id} href={`/insights/${article.slug}`}>
                                <Card className="group hover:border-primary/30 flex h-full flex-col overflow-hidden border-white/5 bg-white/5 transition-all duration-300 hover:-translate-y-1">
                                    {' '}
                                    <div className="bg-surface-raised/20 relative aspect-video overflow-hidden">
                                        {article.cover_image ? (
                                            <Image
                                                src={`/storage/${article.cover_image}`}
                                                alt={article.title}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center p-4">
                                                <ImageIcon className="h-full w-full opacity-30" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-1 flex-col p-6">
                                        <div className="text-muted-foreground mb-4 flex items-center justify-between text-xs">
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" /> {article.reading_time}{' '}
                                                min
                                            </span>
                                        </div>
                                        <h4 className="group-hover:text-primary mb-3 line-clamp-2 text-xl font-bold transition-colors">
                                            {article.title}
                                        </h4>
                                        <p className="text-muted-foreground mb-6 line-clamp-3 text-sm">
                                            {article.excerpt}
                                        </p>
                                        <div className="mt-auto flex items-center gap-3">
                                            <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white/10">
                                                {article.author.avatar ? (
                                                    <Image
                                                        src={`/storage/${article.author.avatar}`}
                                                        alt={article.author.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-xs font-semibold">
                                                        {article.author.name.charAt(0)}
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-sm font-medium">
                                                {article.author.name}
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

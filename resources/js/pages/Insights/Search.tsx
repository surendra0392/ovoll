import { Link } from '@inertiajs/react';
import { Search as SearchIcon, Clock, Image as ImageIcon } from 'lucide-react';
import { SeoHead } from '@/components/seo/SeoHead';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Image } from '@/components/ui/Image';
import { Input } from '@/components/ui/Input';

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

interface Props {
    articles: {
        data: Article[];
        next_page_url: string | null;
        total: number;
    };
    categories: Category[];
    filters: {
        q?: string;
        category?: string;
    };
}

export default function InsightsSearch({ articles, categories, filters }: Props) {
    const isFiltering = filters.q || filters.category;

    return (
        <div className="bg-background relative min-h-screen overflow-hidden">
            <SeoHead
                title={filters.q ? `Search: "${filters.q}" | Insights` : 'Search Insights & Publications'}
                description="Search through OVOLL's comprehensive library of software engineering, brand identity, digital product design, and AI automation insights."
                canonical="https://ovoll.in/insights/search"
                noIndex={Boolean(isFiltering)}
                keywords={[
                    'search tech insights',
                    'software engineering articles',
                    'design case studies search',
                    'OVOLL library',
                ]}
            />

            <div className="h-24"></div>

            <main className="container mx-auto max-w-6xl px-6 py-12">
                {/* Search Header */}
                <div className="mb-16">
                    <h1 className="mb-8 text-4xl font-bold tracking-tight md:text-5xl">
                        Explore Insights
                    </h1>

                    <form
                        action="/insights/search"
                        method="GET"
                        className="mb-8 flex max-w-3xl gap-2"
                    >
                        {filters.category && (
                            <input type="hidden" name="category" value={filters.category} />
                        )}
                        <div className="relative flex-1">
                            <SearchIcon className="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
                            <Input
                                type="search"
                                name="q"
                                defaultValue={filters.q}
                                placeholder="Search articles, topics, or authors..."
                                className="focus:border-primary h-14 w-full rounded-2xl border-white/10 bg-white/5 pl-12 text-lg"
                            />
                        </div>
                        <Button type="submit" size="lg" className="h-14 rounded-2xl px-8">
                            Search
                        </Button>
                    </form>

                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-muted-foreground mr-2 text-sm">Categories:</span>
                        <Link href={`/insights/search${filters.q ? `?q=${filters.q}` : ''}`}>
                            <Badge
                                variant={!filters.category ? 'default' : 'outline'}
                                className={`cursor-pointer rounded-full px-4 py-1.5 ${!filters.category ? 'bg-primary' : 'hover:bg-primary/20'}`}
                            >
                                All
                            </Badge>
                        </Link>
                        {categories.map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/insights/search?category=${cat.id}${filters.q ? `&q=${filters.q}` : ''}`}
                            >
                                <Badge
                                    variant={
                                        filters.category == cat.id.toString()
                                            ? 'default'
                                            : 'outline'
                                    }
                                    className={`cursor-pointer rounded-full px-4 py-1.5 ${filters.category == cat.id.toString() ? 'bg-primary' : 'hover:bg-primary/20'}`}
                                >
                                    {cat.name} ({cat.articles_count})
                                </Badge>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Results List */}
                <div>
                    <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
                        <h2 className="text-2xl font-bold tracking-tight">
                            {isFiltering ? `Search Results (${articles.total})` : 'All Articles'}
                        </h2>
                    </div>

                    {articles.data.length === 0 ? (
                        <div className="rounded-3xl border border-white/5 bg-white/5 py-20 text-center">
                            <SearchIcon className="text-muted-foreground mx-auto mb-4 h-12 w-12 opacity-50" />
                            <h3 className="mb-2 text-xl font-bold">No articles found</h3>
                            <p className="text-muted-foreground">
                                Try adjusting your search or filters to find what you're looking
                                for.
                            </p>
                            <Button asChild variant="outline" className="mt-6">
                                <Link href="/insights/search">Clear Filters</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {articles.data.map((article) => (
                                <Link key={article.id} href={`/insights/${article.slug}`}>
                                    <Card className="group hover:border-primary/30 flex h-full flex-col overflow-hidden border-white/5 bg-white/5 transition-all duration-300 hover:-translate-y-1">
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
                                                {article.category && (
                                                    <span className="text-primary font-medium tracking-wide uppercase">
                                                        {article.category.name}
                                                    </span>
                                                )}
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />{' '}
                                                    {article.reading_time} min
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
                    )}
                </div>
            </main>
        </div>
    );
}

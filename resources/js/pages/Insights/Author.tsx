import { Link } from '@inertiajs/react';
import { ArrowLeft, Clock, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { SeoHead } from '@/components/seo/SeoHead';
import { Badge } from '@/components/ui/Badge';
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
    category: {
        name: string;
        slug: string;
    } | null;
}

interface Author {
    id: number;
    name: string;
    slug: string;
    bio: string | null;
    role: string | null;
    expertise: string[] | null;
    avatar: string | null;
    social_links: {
        twitter?: string;
        linkedin?: string;
        website?: string;
    } | null;
}

interface Props {
    author: Author;
    articles: {
        data: Article[];
        next_page_url: string | null;
        total: number;
    };
}

export default function InsightsAuthor({ author, articles }: Props) {
    return (
        <div className="bg-background relative min-h-screen overflow-hidden">
            <SeoHead title={`${author.name} | OVOLL Authors`} />

            <div className="h-24"></div>

            <main className="container mx-auto max-w-6xl px-6 py-12">
                {/* Author Profile Header */}
                <div className="mx-auto mb-20 max-w-4xl text-center">
                    <Link
                        href="/insights"
                        className="text-muted-foreground hover:text-primary mb-12 inline-flex items-center text-sm transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Insights
                    </Link>

                    <div className="bg-primary/20 mx-auto mb-8 h-32 w-32 overflow-hidden rounded-full border-4 border-white/5 md:h-40 md:w-40">
                        {author.avatar ? (
                            <Image
                                src={`/storage/${author.avatar}`}
                                alt={author.name}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="text-primary flex h-full w-full items-center justify-center text-5xl font-bold">
                                {author.name.charAt(0)}
                            </div>
                        )}
                    </div>

                    <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                        {author.name}
                    </h1>

                    {author.role && (
                        <div className="text-primary mb-6 text-xl font-medium">{author.role}</div>
                    )}

                    {author.bio && (
                        <p className="text-muted-foreground mb-8 text-lg">{author.bio}</p>
                    )}

                    {author.expertise && author.expertise.length > 0 && (
                        <div className="mb-8 flex flex-wrap justify-center gap-2">
                            {author.expertise.map((exp, i) => (
                                <Badge
                                    key={i}
                                    variant="outline"
                                    className="rounded-full border-white/10 bg-white/5"
                                >
                                    {exp}
                                </Badge>
                            ))}
                        </div>
                    )}

                    {author.social_links && (
                        <div className="flex justify-center gap-4">
                            {author.social_links.twitter && (
                                <a
                                    href={author.social_links.twitter}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:bg-primary hover:text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors"
                                ></a>
                            )}
                            {author.social_links.linkedin && (
                                <a
                                    href={author.social_links.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:bg-primary hover:text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors"
                                ></a>
                            )}
                            {author.social_links.website && (
                                <a
                                    href={author.social_links.website}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:bg-primary hover:text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors"
                                >
                                    <LinkIcon className="h-4 w-4" />
                                </a>
                            )}
                        </div>
                    )}
                </div>

                {/* Articles */}
                <div>
                    <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
                        <h2 className="text-2xl font-bold tracking-tight">
                            Articles by {author.name}
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
                                            {article.category && (
                                                <span className="text-primary font-medium tracking-wide uppercase">
                                                    {article.category.name}
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" /> {article.reading_time}{' '}
                                                min
                                            </span>
                                        </div>
                                        <h4 className="group-hover:text-primary mb-3 line-clamp-2 text-xl font-bold transition-colors">
                                            {article.title}
                                        </h4>
                                        <p className="text-muted-foreground line-clamp-3 text-sm">
                                            {article.excerpt}
                                        </p>
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

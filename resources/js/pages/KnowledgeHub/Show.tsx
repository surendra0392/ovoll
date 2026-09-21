import { Link } from '@inertiajs/react';
import { ArrowLeft, Clock, Calendar, Download } from 'lucide-react';
import { AnimatedSection } from '@/components/motion/AnimatedSection';
import { PageTransitionWrapper } from '@/components/motion/PageTransitionWrapper';
import { SeoHead } from '@/components/seo/SeoHead';
import { Button } from '@/components/ui/Button';
import { Image } from '@/components/ui/Image';
import hubRoutes from '@/routes/hub';

type Block =
    | { type: 'text'; data: { content: string } }
    | { type: 'image'; data: { url: string; alt?: string; caption?: string } }
    | { type: 'code'; data: { language?: string; code: string } }
    | { type: 'quote'; data: { text: string; author?: string } };

interface Resource {
    id: number;
    title: string;
    slug: string;
    type: string;
    excerpt: string | null;
    content: Block[];
    cover_image: string | null;
    download_file: string | null;
    reading_time: number;
    published_at: string;
    category?: { name: string; slug: string };
    author?: { name: string; avatar: string | null; bio: string | null };
    tags?: { id: number; name: string }[];
}

interface ShowProps {
    resource: Resource;
    relatedResources: Resource[];
}

const BlockRenderer = ({ blocks }: { blocks: Block[] }) => {
    if (!blocks || !Array.isArray(blocks)) {
        return null;
    }

    return (
        <div className="prose prose-lg dark:prose-invert max-w-none">
            {blocks.map((block, index) => {
                switch (block.type) {
                    case 'text':
                        return (
                            <div
                                key={index}
                                dangerouslySetInnerHTML={{ __html: block.data.content }}
                            />
                        );

                    case 'image':
                        return (
                            <figure key={index} className="my-10">
                                <Image
                                    src={`/storage/${block.data.url}`}
                                    alt={block.data.alt || ''}
                                    className="w-full rounded-xl"
                                />
                                {block.data.caption && (
                                    <figcaption className="text-muted-foreground mt-3 text-center text-sm">
                                        {block.data.caption}
                                    </figcaption>
                                )}
                            </figure>
                        );

                    case 'code':
                        return (
                            <div
                                key={index}
                                className="my-8 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950"
                            >
                                <div className="flex items-center border-b border-zinc-800 bg-zinc-900 px-4 py-2 text-xs text-zinc-400">
                                    {block.data.language || 'code'}
                                </div>
                                <pre className="overflow-x-auto p-4 text-sm text-zinc-300">
                                    <code>{block.data.code}</code>
                                </pre>
                            </div>
                        );

                    case 'quote':
                        return (
                            <blockquote
                                key={index}
                                className="border-primary text-foreground my-8 border-l-4 pl-6 text-xl font-medium italic"
                            >
                                "{block.data.text}"
                                {block.data.author && (
                                    <footer className="text-muted-foreground mt-3 text-base not-italic">
                                        — {block.data.author}
                                    </footer>
                                )}
                            </blockquote>
                        );

                    default:
                        return null;
                }
            })}
        </div>
    );
};

export default function KnowledgeHubShow({ resource, relatedResources }: ShowProps) {
    const formattedDate = new Date(resource.published_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    const hubSchemas = [
        {
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            headline: resource.title,
            description: resource.excerpt,
            datePublished: resource.published_at,
            dateModified: resource.published_at,
            author: resource.author
                ? {
                      '@type': 'Person',
                      name: resource.author.name,
                      jobTitle: resource.author.role ?? 'Partner',
                  }
                : {
                      '@type': 'Organization',
                      name: 'OVOLL',
                  },
            publisher: {
                '@type': 'Organization',
                name: 'OVOLL',
                logo: 'https://ovoll.in/favicon.svg',
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
                    name: 'Knowledge Hub',
                    item: 'https://ovoll.in/hub',
                },
                {
                    '@type': 'ListItem',
                    position: 3,
                    name: resource.title,
                    item: `https://ovoll.in/hub/${resource.slug}`,
                },
            ],
        },
    ];

    return (
        <PageTransitionWrapper>
            <SeoHead
                title={`${resource.title} — Blueprint & Technical Guide`}
                description={
                    resource.excerpt ||
                    `Technical guide and implementation blueprint on ${resource.title} by OVOLL.`
                }
                canonical={`https://ovoll.in/hub/${resource.slug}`}
                type="article"
                image={resource.cover_image ? `/storage/${resource.cover_image}` : undefined}
                keywords={[
                    resource.title,
                    resource.category?.name || 'Architecture',
                    resource.type,
                    'engineering blueprint',
                    'technical playbook India',
                    'software architecture resource',
                    'OVOLL Knowledge Hub',
                ]}
                schema={hubSchemas}
            />

            <main className="bg-background min-h-screen pt-32 pb-24">
                <article className="container mx-auto max-w-4xl px-6">
                    <Link
                        href={hubRoutes.index.url()}
                        className="text-muted-foreground hover:text-primary mb-8 inline-flex items-center gap-2 text-sm font-medium transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Hub
                    </Link>

                    {/* Header */}
                    <header className="mb-12">
                        <div className="text-muted-foreground mb-6 flex items-center gap-3 text-sm">
                            {resource.category && (
                                <Link
                                    href={hubRoutes.index.url({
                                        query: { category: resource.category.slug },
                                    })}
                                    className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-3 py-1 font-medium transition-colors"
                                >
                                    {resource.category.name}
                                </Link>
                            )}
                            <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {resource.reading_time} min read
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {formattedDate}
                            </div>
                        </div>

                        <h1 className="text-foreground mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                            {resource.title}
                        </h1>

                        {resource.excerpt && (
                            <p className="text-muted-foreground text-xl leading-relaxed md:text-2xl">
                                {resource.excerpt}
                            </p>
                        )}
                    </header>

                    {/* Cover Image */}
                    {resource.cover_image && (
                        <div className="border-border mb-16 overflow-hidden rounded-2xl border">
                            <Image
                                src={`/storage/${resource.cover_image}`}
                                alt={resource.title}
                                className="h-auto max-h-[600px] w-full object-cover"
                            />
                        </div>
                    )}

                    {/* Download Action (if applicable) */}
                    {(resource.type === 'download' || resource.type === 'checklist') &&
                        resource.download_file && (
                            <div className="bg-card border-border mb-12 flex flex-col items-center justify-between gap-6 rounded-2xl border p-8 md:flex-row">
                                <div>
                                    <h2 className="mb-2 text-2xl font-bold">Get the Resource</h2>
                                    <p className="text-muted-foreground">
                                        Download the complete {resource.type} for offline use.
                                    </p>
                                </div>
                                <Button size="lg" asChild className="gap-2">
                                    <a href={`/storage/${resource.download_file}`} download>
                                        <Download className="h-5 w-5" />
                                        Download {resource.type}
                                    </a>
                                </Button>
                            </div>
                        )}

                    {/* Main Content */}
                    <div className="mb-16">
                        <BlockRenderer blocks={resource.content} />
                    </div>

                    {/* Tags */}
                    {resource.tags && resource.tags.length > 0 && (
                        <div className="border-border mb-16 flex flex-wrap gap-2 border-t pt-8">
                            <span className="text-foreground mr-2 py-2 text-sm font-medium">
                                Tags:
                            </span>
                            {resource.tags.map((tag) => (
                                <span
                                    key={tag.id}
                                    className="bg-muted text-muted-foreground rounded-md px-3 py-1.5 text-sm"
                                >
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Author Box */}
                    {resource.author && (
                        <div className="bg-muted/50 border-border flex flex-col items-center gap-6 rounded-2xl border p-8 sm:flex-row sm:items-start">
                            {resource.author.avatar ? (
                                <Image
                                    src={`/storage/${resource.author.avatar}`}
                                    alt={resource.author.name}
                                    className="h-20 w-20 rounded-full"
                                />
                            ) : (
                                <div className="bg-primary/20 text-primary flex h-20 w-20 items-center justify-center rounded-full text-3xl font-bold">
                                    {resource.author.name.charAt(0)}
                                </div>
                            )}
                            <div className="flex-1 text-center sm:text-left">
                                <h2 className="mb-2 text-xl font-bold">
                                    Written by {resource.author.name}
                                </h2>
                                {resource.author.bio && (
                                    <p className="text-muted-foreground leading-relaxed">
                                        {resource.author.bio}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </article>

                {/* Related Resources */}
                {relatedResources && relatedResources.length > 0 && (
                    <section className="container mx-auto mt-32 max-w-6xl px-6">
                        <div className="border-border mb-10 flex items-center justify-between border-b pb-6">
                            <h2 className="text-3xl font-bold tracking-tight">Keep reading</h2>
                            <Button variant="outline" asChild>
                                <Link href={hubRoutes.index.url()}>View all</Link>
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            {relatedResources.map((item, i) => (
                                <AnimatedSection
                                    key={item.id}
                                    delay={0.1 * i}
                                    role="article"
                                    aria-labelledby={`related-title-${item.id}`}
                                    className="group bg-card border-border hover:border-primary/50 flex h-full flex-col overflow-hidden rounded-2xl border transition-colors duration-300"
                                >
                                    <Link
                                        href={hubRoutes.show.url(item.slug)}
                                        className="flex flex-1 flex-col"
                                    >
                                        {item.cover_image && (
                                            <div className="relative aspect-[16/9] overflow-hidden">
                                                <Image
                                                    src={`/storage/${item.cover_image}`}
                                                    alt={item.title}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>
                                        )}
                                        <div className="flex flex-1 flex-col p-6">
                                            <div className="text-muted-foreground mb-3 flex items-center gap-3 text-xs">
                                                {item.category && (
                                                    <span className="text-primary">
                                                        {item.category.name}
                                                    </span>
                                                )}
                                                <span>•</span>
                                                <span>{item.reading_time} min read</span>
                                            </div>
                                            <h3
                                                id={`related-title-${item.id}`}
                                                className="group-hover:text-primary mb-3 line-clamp-2 text-xl font-semibold transition-colors"
                                            >
                                                {item.title}
                                            </h3>
                                        </div>
                                    </Link>
                                </AnimatedSection>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </PageTransitionWrapper>
    );
}

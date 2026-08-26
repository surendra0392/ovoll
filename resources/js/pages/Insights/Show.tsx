import { Link } from '@inertiajs/react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
    Copy,
    Check,
    Info,
    AlertTriangle,
    CheckCircle,
    User,
    BookOpen,
    ChevronLeft,
} from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { SeoHead } from '@/components/seo/SeoHead';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

type Block =
    | { type: 'text'; data: { content: string } }
    | {
          type: 'callout';
          data: { type: string; title?: string; message: string };
      }
    | { type: 'quote'; data: { quote: string; author?: string; role?: string } }
    | { type: 'code'; data: { language?: string; code: string } };

interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: Block[];
    cover_image: string | null;
    reading_time: number;
    published_at: string;
    author: {
        name: string;
        avatar: string | null;
        role: string | null;
        bio: string | null;
    };
    category: {
        name: string;
        slug: string;
    } | null;
    tags: Array<{ name: string; slug: string }>;
    relatedArticles: Array<{ title: string; slug: string; cover_image: string | null }>;
}

interface Props {
    article: Article;
}

// Block Renderer Component
const BlockRenderer = ({ block }: { block: Block }) => {
    const [copied, setCopied] = useState(false);

    const handleCopyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    switch (block.type) {
        case 'text':
            return (
                <div
                    className="prose prose-invert prose-headings:text-white prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tight prose-h2:text-lg prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-l-2 prose-h2:border-[#2EC4A5] prose-h2:pl-3 prose-h3:text-sm prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-[#00D1FF] prose-p:mb-6 prose-p:max-w-[65ch] prose-strong:text-white prose-strong:font-semibold prose-a:text-[#2EC4A5] prose-a:underline hover:prose-a:text-white my-8 max-w-none font-sans text-base leading-relaxed font-light text-white/80 transition-colors"
                    dangerouslySetInnerHTML={{ __html: block.data.content }}
                />
            );
        case 'callout': {
            const icons = {
                info: <Info className="h-4 w-4 text-[#00D1FF]" />,
                warning: <AlertTriangle className="h-4 w-4 text-yellow-400" />,
                success: <CheckCircle className="h-4 w-4 text-[#2EC4A5]" />,
                danger: <AlertTriangle className="h-4 w-4 text-red-400" />,
            };
            const colors = {
                info: 'bg-[#0E1624]/60 border-[#00D1FF]/20 text-white/80',
                warning: 'bg-yellow-500/5 border-yellow-500/10 text-white/80',
                success: 'bg-[#2EC4A5]/5 border-[#2EC4A5]/10 text-white/80',
                danger: 'bg-red-500/5 border-red-500/10 text-white/80',
            };

            return (
                <div
                    className={`my-8 rounded-none border p-5 ${colors[block.data.type as keyof typeof colors] || colors.info} flex items-start gap-4 font-mono text-[10px]`}
                >
                    <div className="mt-0.5 shrink-0">
                        {icons[block.data.type as keyof typeof icons] || icons.info}
                    </div>
                    <div className="space-y-1">
                        {block.data.title && (
                            <h4 className="font-bold tracking-wider text-white uppercase">
                                {block.data.title}
                            </h4>
                        )}
                        <div className="leading-relaxed font-light">{block.data.message}</div>
                    </div>
                </div>
            );
        }
        case 'quote':
            return (
                <blockquote className="my-10 border-l-2 border-[#2EC4A5] py-2 pl-6 md:pl-8">
                    <p className="mb-4 font-serif text-lg leading-relaxed font-light text-white italic">
                        "{block.data.quote}"
                    </p>
                    {block.data.author && (
                        <footer className="flex items-center gap-2 font-mono text-[9px] text-white/40">
                            <span className="h-[1px] w-4 bg-white/20"></span>
                            <span className="font-bold text-white/60 uppercase">
                                {block.data.author}
                            </span>
                            {block.data.role && <span>— {block.data.role}</span>}
                        </footer>
                    )}
                </blockquote>
            );
        case 'code':
            return (
                <div className="my-8 overflow-hidden rounded-none border border-white/5 bg-[#0E1624]/60 font-mono text-[10px]">
                    <div className="flex items-center justify-between border-b border-white/5 bg-white/3 px-4 py-2 text-white/40">
                        <span className="text-[9px] uppercase">
                            {block.data.language || 'code'}
                        </span>
                        <button
                            onClick={() => handleCopyCode(block.data.code)}
                            className="flex items-center gap-1 transition-colors hover:text-white"
                        >
                            {copied ? (
                                <>
                                    <Check className="h-3 w-3 text-[#2EC4A5]" />
                                    <span className="text-[8px] text-[#2EC4A5]">COPIED</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="h-3 w-3" />
                                    <span className="text-[8px]">COPY</span>
                                </>
                            )}
                        </button>
                    </div>
                    <pre className="max-w-[65ch] overflow-x-auto p-4 leading-relaxed text-white/70">
                        <code>{block.data.code}</code>
                    </pre>
                </div>
            );
        default:
            return null;
    }
};

export default function ArticleShow({ article }: Props) {
    const [copied, setCopied] = useState(false);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Extract H2 headings from content blocks to populate the Table of Contents
    const headings = useMemo(() => {
        const foundHeadings: Array<{ id: string; text: string }> = [];
        article.content?.forEach((block) => {
            if (block.type === 'text' && typeof block.data.content === 'string') {
                const regex = /<h2>(.*?)<\/h2>/g;
                let match;

                while ((match = regex.exec(block.data.content)) !== null) {
                    const text = match[1]!.replace(/<[^>]*>/g, ''); // strip inline tags
                    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    foundHeadings.push({ id, text });
                }
            }
        });

        return foundHeadings;
    }, [article]);

    // Inject IDs into rendered headings in the DOM so the ToC anchors resolve
    useEffect(() => {
        setTimeout(() => {
            const h2Elements = document.querySelectorAll('article h2');
            h2Elements.forEach((el) => {
                const text = el.textContent || '';
                const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                el.setAttribute('id', id);
            });
        }, 100);
    }, [article]);

    const formattedDate = new Date(article.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // FAQs Schema injection mock
    const faqQuestions = [
        {
            q: `What is the focus of this article?`,
            a: article.excerpt,
        },
    ];

    return (
        <div className="relative min-h-screen bg-transparent font-sans text-white">
            <SeoHead>
                <title>{`${article.title} | OVOLL Editorial Journal`}</title>
                <meta name="description" content={article.excerpt} />

                {/* JSON-LD Schemas */}
                {/* 1. Article Schema */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'NewsArticle',
                        headline: article.title,
                        description: article.excerpt,
                        datePublished: article.published_at,
                        dateModified: article.published_at,
                        author: {
                            '@type': 'Person',
                            name: article.author.name,
                            jobTitle: article.author.role || 'Partner',
                            description: article.author.bio || '',
                        },
                        publisher: {
                            '@type': 'Organization',
                            name: 'OVOLL',
                            logo: {
                                '@type': 'ImageObject',
                                url: 'https://ovoll.in/favicon.svg',
                            },
                        },
                    })}
                </script>

                {/* 2. Breadcrumbs Schema */}
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
                            {
                                '@type': 'ListItem',
                                position: 3,
                                name: article.title,
                                item: `https://ovoll.in/insights/${article.slug}`,
                            },
                        ],
                    })}
                </script>

                {/* 3. FAQ Schema */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        mainEntity: faqQuestions.map((faq) => ({
                            '@type': 'Question',
                            name: faq.q,
                            acceptedAnswer: {
                                '@type': 'Answer',
                                text: faq.a,
                            },
                        })),
                    })}
                </script>
            </SeoHead>

            {/* Reading Progress Indicator */}
            <motion.div
                className="fixed top-0 right-0 left-0 z-50 h-1 origin-left bg-[#2EC4A5]"
                style={{ scaleX }}
            />

            <div className="h-32" />

            <div className="container-editorial border-b border-white/10 py-12 select-none">
                <Link
                    href="/insights"
                    className="mb-12 inline-flex items-center gap-1 font-mono text-[9px] tracking-widest text-white/40 uppercase transition-colors hover:text-[#2EC4A5]"
                >
                    <ChevronLeft className="h-3.5 w-3.5" /> Back to Journal Index
                </Link>

                <header className="max-w-4xl space-y-6">
                    <div className="flex items-center gap-4 font-mono text-[9px] text-[#2EC4A5]">
                        {article.category && (
                            <span className="border border-[#2EC4A5]/30 bg-[#2EC4A5]/10 px-2 py-0.5 tracking-widest uppercase">
                                {article.category.name}
                            </span>
                        )}
                        <span>{article.reading_time} MIN READ</span>
                    </div>

                    <h1 className="typo-display-l max-w-3xl leading-none tracking-tight text-white uppercase">
                        {article.title}
                    </h1>

                    <p className="max-w-2xl text-sm leading-relaxed font-light text-white/60">
                        {article.excerpt}
                    </p>

                    <div className="mt-8 flex max-w-xs items-center gap-3 border-t border-white/5 pt-4 font-mono text-[9px]">
                        <div className="space-y-0.5">
                            <span className="block text-[8px] tracking-wider text-white/30 uppercase">
                                AUTHOR
                            </span>
                            <span className="font-bold text-white uppercase">
                                {article.author.name}
                            </span>
                        </div>
                        <span className="text-white/10">|</span>
                        <div className="space-y-0.5">
                            <span className="block text-[8px] tracking-wider text-white/30 uppercase">
                                PUBLISHED
                            </span>
                            <span className="text-white/60 uppercase">{formattedDate}</span>
                        </div>
                    </div>
                </header>
            </div>

            <main className="container-editorial py-16">
                <div className="grid items-start gap-12 lg:grid-cols-[220px_1fr_260px]">
                    {/* Left Column: Dynamic Table of Contents */}
                    <aside className="sticky top-40 hidden space-y-6 border-r border-white/5 pr-4 font-mono text-[9px] select-none lg:block">
                        <div className="mb-2 flex items-center gap-1.5 tracking-wider text-white/30 uppercase">
                            <BookOpen className="h-3 w-3 text-[#2EC4A5]" />
                            <span>Sections</span>
                        </div>
                        {headings.length === 0 ? (
                            <span className="text-white/20 italic">No sections found</span>
                        ) : (
                            <ul className="space-y-3">
                                {headings.map((heading) => (
                                    <li key={heading.id}>
                                        <a
                                            href={`#${heading.id}`}
                                            className="block leading-snug tracking-tight text-white/50 uppercase transition-colors hover:text-[#2EC4A5]"
                                        >
                                            {heading.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </aside>

                    {/* Middle Column: Structured Content Blocks */}
                    <article className="min-w-0">
                        {article.content && Array.isArray(article.content) ? (
                            article.content.map((block, index) => (
                                <BlockRenderer key={index} block={block} />
                            ))
                        ) : (
                            <div
                                className="prose prose-invert prose-lg max-w-none text-white/70"
                                dangerouslySetInnerHTML={{
                                    __html: article.content as unknown as string,
                                }}
                            />
                        )}

                        {/* Tags */}
                        {article.tags && article.tags.length > 0 && (
                            <div className="mt-16 flex flex-wrap gap-2 border-t border-white/5 pt-8 font-mono text-[9px] select-none">
                                <span className="mr-2 py-1 text-white/30 uppercase">TAGS:</span>
                                {article.tags.map((tag) => (
                                    <Badge
                                        key={tag.slug}
                                        variant="secondary"
                                        className="cursor-pointer rounded-none border-white/10 text-[8px] tracking-wider uppercase hover:border-[#2EC4A5] hover:text-[#2EC4A5]"
                                    >
                                        #{tag.name}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        {/* Author Bio Box */}
                        <div className="mt-16 flex flex-col items-center gap-6 rounded-none border border-white/5 bg-[#0E1624]/20 p-8 text-left font-mono text-[10px] select-none md:flex-row md:items-start">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-white/10 bg-white/5 text-[9px] text-white/30 uppercase">
                                <User className="h-6 w-6 text-[#2EC4A5]" />
                            </div>
                            <div className="space-y-2">
                                <div className="space-y-0.5">
                                    <span className="block text-[8px] text-white/30 uppercase">
                                        AUTHOR PROFILE
                                    </span>
                                    <h4 className="font-bold text-white uppercase">
                                        {article.author.name}
                                    </h4>
                                </div>
                                {article.author.role && (
                                    <div className="text-[9px] tracking-wider text-[#2EC4A5] uppercase">
                                        {article.author.role}
                                    </div>
                                )}
                                <p className="max-w-xl font-sans text-xs leading-relaxed font-light text-white/50">
                                    {article.author.bio}
                                </p>
                            </div>
                        </div>
                    </article>

                    {/* Right Column: Share & Related Sidebar */}
                    <aside className="sticky top-40 space-y-12 font-mono text-[10px] select-none">
                        {/* Social Share */}
                        <div className="space-y-4">
                            <h4 className="text-[9px] tracking-wider text-white/30 uppercase">
                                SHARE SPECIFICATION
                            </h4>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={copyToClipboard}
                                    className="gap-1.5 rounded-none border-white/10 bg-[#0E1624]/60 font-mono text-[9px] text-white/70 hover:border-[#2EC4A5] hover:text-[#2EC4A5]"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="h-3 w-3 text-[#2EC4A5]" />
                                            <span>COPIED</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="h-3.5 w-3.5" />
                                            <span>COPY LINK</span>
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>

                        {/* Further Reading */}
                        {article.relatedArticles && article.relatedArticles.length > 0 && (
                            <div className="space-y-4">
                                <h4 className="text-[9px] tracking-wider text-white/30 uppercase">
                                    FURTHER READING
                                </h4>
                                <div className="space-y-4">
                                    {article.relatedArticles.map((related, i) => (
                                        <Link
                                            key={i}
                                            href={`/insights/${related.slug}`}
                                            className="group block border border-white/5 bg-[#0E1624]/20 p-4 transition-colors hover:border-white/10"
                                        >
                                            <div className="space-y-2">
                                                <span className="text-[8px] tracking-wider text-[#2EC4A5] uppercase">
                                                    ARTICLE RELATION
                                                </span>
                                                <h5 className="text-xs leading-tight font-bold text-white uppercase transition-colors group-hover:text-[#2EC4A5]">
                                                    {related.title}
                                                </h5>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </aside>
                </div>
            </main>
        </div>
    );
}

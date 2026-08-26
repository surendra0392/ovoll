import { cn } from '@/utils';

interface BlogCardProps extends React.HTMLAttributes<HTMLElement> {
    title: string;
    excerpt: string;
    image?: string;
    date?: string;
    category?: string;
    href?: string;
}

export function BlogCard({ title, excerpt, image, date, category, href = '#', className, ...props }: BlogCardProps) {
    return (
        <article className={cn('group', className)} {...props}>
            <a href={href} className="block">
                {image && (
                    <div className="relative mb-4 overflow-hidden rounded-xl bg-muted aspect-video">
                        <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async" />
                    </div>
                )}
                <div className="flex items-center gap-3 mb-2">
                    {category && <span className="text-xs font-medium text-accent">{category}</span>}
                    {date && <span className="text-xs text-muted-foreground">{date}</span>}
                </div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">{excerpt}</p>
            </a>
        </article>
    );
}

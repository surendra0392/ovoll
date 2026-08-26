import { cn } from '@/utils';

interface QuoteCardProps extends React.HTMLAttributes<HTMLQuoteElement> {
    quote: string;
    author: string;
    role?: string;
    avatar?: string;
}

export function QuoteCard({ quote, author, role, avatar, className, ...props }: QuoteCardProps) {
    return (
        <blockquote className={cn('rounded-xl border border-border bg-background p-6', className)} {...props}>
            <svg className="mb-4 h-8 w-8 text-muted-foreground/30" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179z" /></svg>
            <p className="text-base text-foreground leading-relaxed italic">{quote}</p>
            <footer className="mt-4 flex items-center gap-3">
                {avatar && <img src={avatar} alt={author} className="h-10 w-10 rounded-full bg-muted object-cover" loading="lazy" decoding="async" />}
                <div>
                    <cite className="text-sm font-semibold text-foreground not-italic">{author}</cite>
                    {role && <p className="text-xs text-muted-foreground">{role}</p>}
                </div>
            </footer>
        </blockquote>
    );
}

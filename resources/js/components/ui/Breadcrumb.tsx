import { cn } from '@/utils';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
    items: BreadcrumbItem[];
    separator?: React.ReactNode;
}

export function Breadcrumb({ items, separator, className, ...props }: BreadcrumbProps) {
    const sep = separator ?? (
        <svg className="h-4 w-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
    );

    return (
        <nav aria-label="Breadcrumb" className={cn('flex items-center gap-1.5 text-sm', className)} {...props}>
            {items.map((item, i) => (
                <span key={i} className="flex items-center gap-1.5">
                    {i > 0 && <span aria-hidden="true">{sep}</span>}
                    {item.href && i < items.length - 1 ? (
                        <a href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">{item.label}</a>
                    ) : (
                        <span className={cn(i === items.length - 1 ? 'text-foreground font-medium' : 'text-muted-foreground')} aria-current={i === items.length - 1 ? 'page' : undefined}>
                            {item.label}
                        </span>
                    )}
                </span>
            ))}
        </nav>
    );
}

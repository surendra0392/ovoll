import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/utils';

export interface BreadcrumbCrumb {
    label: string;
    href?: string;
}

interface PageBreadcrumbsProps {
    items: BreadcrumbCrumb[];
    className?: string;
}

/**
 * Brand-styled breadcrumb trail for interior pages.
 *
 * Renders in the normal document flow (not absolutely positioned) inside a
 * `container-editorial`, so it always clears the fixed header and lines up with
 * page content. The last crumb is the current page and is not a link.
 */
export function PageBreadcrumbs({ items, className }: PageBreadcrumbsProps) {
    return (
        <nav
            aria-label="Breadcrumb"
            className={cn('container-editorial pt-28 pb-2 md:pt-32', className)}
        >
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-widest text-white/40 uppercase select-none">
                {items.map((item, i) => {
                    const isLast = i === items.length - 1;

                    return (
                        <li key={i} className="flex items-center gap-2">
                            {i > 0 && (
                                <ChevronRight aria-hidden className="h-3 w-3 text-[#2EC4A5]/50" />
                            )}
                            {item.href && !isLast ? (
                                <Link
                                    href={item.href}
                                    className="transition-colors hover:text-[#00D1FF]"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span
                                    aria-current={isLast ? 'page' : undefined}
                                    className={cn(isLast && 'text-white/80')}
                                >
                                    {item.label}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

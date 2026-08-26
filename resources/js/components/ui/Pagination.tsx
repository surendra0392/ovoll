import { cn } from '@/utils';
import { Button } from './Button';

interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    siblingCount?: number;
}

function generateRange(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function Pagination({ currentPage, totalPages, onPageChange, siblingCount = 1, className, ...props }: PaginationProps) {
    const range = () => {
        const totalNumbers = siblingCount * 2 + 3;
        if (totalPages <= totalNumbers + 2) return generateRange(1, totalPages);

        const leftSibling = Math.max(currentPage - siblingCount, 1);
        const rightSibling = Math.min(currentPage + siblingCount, totalPages);

        const showLeftDots = leftSibling > 2;
        const showRightDots = rightSibling < totalPages - 1;

        if (!showLeftDots && showRightDots) {
            const leftRange = generateRange(1, 3 + 2 * siblingCount);
            return [...leftRange, -1, totalPages];
        }
        if (showLeftDots && !showRightDots) {
            const rightRange = generateRange(totalPages - (3 + 2 * siblingCount) + 1, totalPages);
            return [1, -1, ...rightRange];
        }
        const middleRange = generateRange(leftSibling, rightSibling);
        return [1, -1, ...middleRange, -2, totalPages];
    };

    const pages = range();

    return (
        <nav aria-label="Pagination" className={cn('flex items-center gap-1', className)} {...props}>
            <Button variant="ghost" size="sm" disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)} aria-label="Previous page">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </Button>
            {pages.map((page, i) =>
                page < 0 ? (
                    <span key={`dots-${i}`} className="px-2 text-muted-foreground">…</span>
                ) : (
                    <Button
                        key={page}
                        variant={currentPage === page ? 'primary' : 'ghost'}
                        size="sm"
                        onClick={() => onPageChange(page)}
                        aria-current={currentPage === page ? 'page' : undefined}
                        className="min-w-[32px]"
                    >
                        {page}
                    </Button>
                )
            )}
            <Button variant="ghost" size="sm" disabled={currentPage >= totalPages} onClick={() => onPageChange(currentPage + 1)} aria-label="Next page">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </Button>
        </nav>
    );
}

import { forwardRef } from 'react';
import { cn } from '@/utils';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
    cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
    gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
    ({ className, cols = 1, gap = 'md', ...props }, ref) => {
        const gridCols = {
            1: 'grid-cols-1',
            2: 'grid-cols-1 sm:grid-cols-2',
            3: 'grid-cols-1 md:grid-cols-3',
            4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
            5: 'grid-cols-1 sm:grid-cols-3 lg:grid-cols-5',
            6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
            12: 'grid-cols-4 md:grid-cols-6 lg:grid-cols-12',
        };

        const gridGaps = {
            none: 'gap-0',
            sm: 'gap-4',
            md: 'gap-8',
            lg: 'gap-12',
            xl: 'gap-16',
        };

        return (
            <div
                ref={ref}
                className={cn('grid', gridCols[cols], gridGaps[gap], className)}
                {...props}
            />
        );
    }
);
Grid.displayName = 'Grid';

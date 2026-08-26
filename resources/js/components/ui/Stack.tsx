import { forwardRef } from 'react';
import { cn } from '@/utils';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
    direction?: 'row' | 'col';
    align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around';
    gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
    ({ className, direction = 'col', align = 'stretch', justify = 'start', gap = 'md', ...props }, ref) => {
        const stackGaps = {
            none: 'gap-0',
            sm: 'gap-2',
            md: 'gap-4',
            lg: 'gap-8',
            xl: 'gap-12',
        };

        const stackAlign = {
            start: 'items-start',
            center: 'items-center',
            end: 'items-end',
            stretch: 'items-stretch',
            baseline: 'items-baseline',
        };

        const stackJustify = {
            start: 'justify-start',
            center: 'justify-center',
            end: 'justify-end',
            between: 'justify-between',
            around: 'justify-around',
        };

        return (
            <div
                ref={ref}
                className={cn(
                    'flex',
                    direction === 'col' ? 'flex-col' : 'flex-row',
                    stackAlign[align],
                    stackJustify[justify],
                    stackGaps[gap],
                    className
                )}
                {...props}
            />
        );
    }
);
Stack.displayName = 'Stack';

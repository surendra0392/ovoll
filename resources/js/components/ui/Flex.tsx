import { forwardRef } from 'react';
import { cn } from '@/utils';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
    direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
    align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
    wrap?: boolean;
    gap?: number;
    inline?: boolean;
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
    ({ direction = 'row', align, justify, wrap, gap, inline, className, ...props }, ref) => {
        const dirMap: Record<string, string> = { row: 'flex-row', col: 'flex-col', 'row-reverse': 'flex-row-reverse', 'col-reverse': 'flex-col-reverse' };
        const alignMap: Record<string, string> = { start: 'items-start', center: 'items-center', end: 'items-end', stretch: 'items-stretch', baseline: 'items-baseline' };
        const justifyMap: Record<string, string> = { start: 'justify-start', center: 'justify-center', end: 'justify-end', between: 'justify-between', around: 'justify-around', evenly: 'justify-evenly' };

        return (
            <div
                ref={ref}
                className={cn(
                    inline ? 'inline-flex' : 'flex',
                    dirMap[direction],
                    align && alignMap[align],
                    justify && justifyMap[justify],
                    wrap && 'flex-wrap',
                    gap !== undefined && `gap-${gap}`,
                    className
                )}
                {...props}
            />
        );
    }
);

Flex.displayName = 'Flex';

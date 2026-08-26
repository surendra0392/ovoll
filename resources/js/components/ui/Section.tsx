import { forwardRef } from 'react';
import { cn } from '@/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {}

export const Section = forwardRef<HTMLElement, SectionProps>(
    ({ className, ...props }, ref) => {
        return (
            <section
                ref={ref}
                className={cn('py-16 md:py-24 lg:py-32', className)}
                {...props}
            />
        );
    }
);
Section.displayName = 'Section';

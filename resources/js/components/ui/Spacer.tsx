import { cn } from '@/utils';

export interface SpacerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    className?: string;
}

export const Spacer = ({ size = 'md', className }: SpacerProps) => {
    const sizes = {
        sm: 'h-8 lg:h-12',
        md: 'h-16 lg:h-24',
        lg: 'h-24 lg:h-32',
        xl: 'h-32 lg:h-48',
        '2xl': 'h-48 lg:h-64',
    };

    return <div aria-hidden="true" className={cn(sizes[size], className)} />;
};

import { cn } from '@/utils';

export function Spinner({
    className,
    size = 'md',
}: {
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}) {
    const sizes = {
        sm: 'h-4 w-4 border-2',
        md: 'h-8 w-8 border-2',
        lg: 'h-12 w-12 border-[3px]',
        xl: 'h-16 w-16 border-4',
    };

    return (
        <div className={cn('relative flex items-center justify-center', sizes[size], className)}>
            {/* Outer orbital ring */}
            <div
                className={cn(
                    'absolute inset-0 animate-[spin_1.5s_linear_infinite] rounded-full border-solid border-[#14B8A6] border-t-transparent shadow-[0_0_15px_rgba(20,184,166,0.5)]',
                    sizes[size].split(' ').pop(),
                )}
            />
            {/* Inner orbital ring (counter-rotating) */}
            <div
                className={cn(
                    'absolute animate-[spin_2s_linear_infinite_reverse] rounded-full border-solid border-[#00D1FF] border-t-transparent opacity-80 shadow-[0_0_10px_rgba(0,209,255,0.4)]',
                    sizes[size].split(' ').pop(),
                )}
                style={{ inset: '15%' }}
            />
            {/* Core glow */}
            <div className="absolute h-2 w-2 animate-pulse rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
        </div>
    );
}

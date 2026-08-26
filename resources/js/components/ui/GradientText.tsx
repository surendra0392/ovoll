import { cn } from '@/utils';

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
    from?: string;
    to?: string;
    via?: string;
    animate?: boolean;
}

export function GradientText({
    from = 'from-accent',
    to = 'to-[color-mix(in_srgb,var(--brand-accent),black_30%)]',
    via,
    animate = false,
    className,
    children,
    ...props
}: GradientTextProps) {
    return (
        <span
            className={cn(
                'bg-gradient-to-r bg-clip-text text-transparent',
                from,
                via,
                to,
                animate && 'animate-gradient bg-[length:200%_auto]',
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}

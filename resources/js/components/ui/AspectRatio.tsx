import { cn } from '@/utils';

interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
    ratio?: number;
}

export function AspectRatio({ ratio = 16 / 9, className, children, style, ...props }: AspectRatioProps) {
    return (
        <div
            className={cn('relative w-full overflow-hidden', className)}
            style={{ ...style, aspectRatio: String(ratio) }}
            {...props}
        >
            {children}
        </div>
    );
}

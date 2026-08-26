import { cn } from '@/utils';

export function HoverLift({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn('transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl', className)}
            {...props}
        >
            {children}
        </div>
    );
}

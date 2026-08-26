import { cn } from '@/utils';

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    orientation?: 'horizontal' | 'vertical';
}

export function ButtonGroup({ className, orientation = 'horizontal', children, ...props }: ButtonGroupProps) {
    return (
        <div
            role="group"
            className={cn(
                'inline-flex',
                orientation === 'horizontal'
                    ? '[&>*:first-child]:rounded-r-none [&>*:last-child]:rounded-l-none [&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:not(:first-child)]:-ml-px'
                    : 'flex-col [&>*:first-child]:rounded-b-none [&>*:last-child]:rounded-t-none [&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:not(:first-child)]:-mt-px',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

import { cn } from '@/utils';

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action, className, ...props }: EmptyStateProps) {
    return (
        <div className={cn('flex flex-col items-center justify-center rounded-xl border border-dashed border-border p-12 text-center', className)} {...props}>
            {icon && <div className="mb-4 text-muted-foreground/50">{icon}</div>}
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            {description && <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>}
            {action && <div className="mt-6">{action}</div>}
        </div>
    );
}

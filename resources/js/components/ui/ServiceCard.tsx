import { cn } from '@/utils';

interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export function ServiceCard({ icon, title, description, className, ...props }: ServiceCardProps) {
    return (
        <div
            className={cn(
                'group relative rounded-xl border border-border bg-background p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1',
                className
            )}
            {...props}
        >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/5 text-primary transition-colors group-hover:bg-primary/10">
                {icon}
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
    );
}

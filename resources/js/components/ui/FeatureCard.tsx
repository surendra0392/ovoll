import { cn } from '@/utils';

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: React.ReactNode;
    title: string;
    description: string;
    badge?: string;
}

export function FeatureCard({ icon, title, description, badge, className, ...props }: FeatureCardProps) {
    return (
        <div
            className={cn(
                'group relative rounded-xl bg-muted/50 border border-border/50 p-6 transition-all duration-300 hover:bg-muted hover:border-border',
                className
            )}
            {...props}
        >
            {badge && (
                <span className="mb-3 inline-flex rounded-full bg-accent/10 text-accent px-2.5 py-0.5 text-xs font-medium">
                    {badge}
                </span>
            )}
            {icon && <div className="mb-4 text-primary">{icon}</div>}
            <h3 className="text-base font-semibold text-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
    );
}

import { cn } from '@/utils';

interface PricingCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    price: string;
    period?: string;
    description: string;
    features: string[];
    cta?: React.ReactNode;
    highlighted?: boolean;
    badge?: string;
}

export function PricingCard({ title, price, period = '/mo', description, features, cta, highlighted = false, badge, className, ...props }: PricingCardProps) {
    return (
        <div
            className={cn(
                'relative rounded-2xl p-8 transition-all duration-300',
                highlighted
                    ? 'border-2 border-primary bg-background shadow-xl scale-[1.02]'
                    : 'border border-border bg-background hover:border-primary/30 hover:shadow-lg',
                className
            )}
            {...props}
        >
            {badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                    {badge}
                </span>
            )}
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
            <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight text-foreground">{price}</span>
                <span className="text-sm text-muted-foreground">{period}</span>
            </div>
            <ul className="mt-8 space-y-3">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-foreground">
                        <svg className="h-4 w-4 shrink-0 text-success" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        {feature}
                    </li>
                ))}
            </ul>
            {cta && <div className="mt-8">{cta}</div>}
        </div>
    );
}

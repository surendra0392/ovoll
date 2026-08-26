import { cn } from '@/utils';

interface PricingTableProps extends React.HTMLAttributes<HTMLDivElement> {
    tiers: {
        name: string;
        price: string;
        period?: string;
        description: string;
        features: string[];
        ctaText: string;
        highlighted?: boolean;
    }[];
}

export function PricingTable({ tiers, className, ...props }: PricingTableProps) {
    return (
        <div className={cn('grid gap-6 md:grid-cols-2 lg:grid-cols-3', className)} {...props}>
            {tiers.map((tier, i) => (
                <div
                    key={i}
                    className={cn(
                        'flex flex-col rounded-2xl p-8 border',
                        tier.highlighted
                            ? 'border-primary bg-primary/5 shadow-lg relative'
                            : 'border-border bg-background hover:border-primary/50 transition-colors'
                    )}
                >
                    {tier.highlighted && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                            Most Popular
                        </span>
                    )}
                    <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground min-h-[40px]">{tier.description}</p>
                    <div className="mt-4 flex items-baseline text-4xl font-extrabold text-foreground">
                        {tier.price}
                        {tier.period && <span className="ml-1 text-lg font-medium text-muted-foreground">{tier.period}</span>}
                    </div>
                    <ul className="mt-8 flex-1 space-y-4">
                        {tier.features.map((feature, j) => (
                            <li key={j} className="flex items-start">
                                <svg className="h-5 w-5 shrink-0 text-success mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                <span className="text-sm text-muted-foreground">{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <button
                        className={cn(
                            'mt-8 w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors',
                            tier.highlighted
                                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                : 'bg-muted text-foreground hover:bg-muted/80'
                        )}
                    >
                        {tier.ctaText}
                    </button>
                </div>
            ))}
        </div>
    );
}

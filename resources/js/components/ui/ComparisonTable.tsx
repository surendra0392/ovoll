import { cn } from '@/utils';

interface ComparisonFeature {
    name: string;
    description?: string;
}

interface ComparisonPlan {
    name: string;
    price?: string;
    highlighted?: boolean;
    values: (boolean | string | React.ReactNode)[];
}

interface ComparisonTableProps extends React.HTMLAttributes<HTMLDivElement> {
    features: ComparisonFeature[];
    plans: ComparisonPlan[];
}

export function ComparisonTable({ features, plans, className, ...props }: ComparisonTableProps) {
    return (
        <div className={cn('w-full overflow-x-auto', className)} {...props}>
            <table className="w-full min-w-[600px] text-left text-sm border-collapse">
                <thead>
                    <tr>
                        <th className="w-1/3 p-4 border-b border-border font-medium text-muted-foreground">Features</th>
                        {plans.map((plan, i) => (
                            <th key={i} className={cn('p-4 border-b border-border text-center font-semibold', plan.highlighted ? 'text-primary' : 'text-foreground')}>
                                <div className="text-base">{plan.name}</div>
                                {plan.price && <div className="mt-1 text-sm font-normal text-muted-foreground">{plan.price}</div>}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {features.map((feature, i) => (
                        <tr key={i} className="hover:bg-muted/50 transition-colors">
                            <td className="p-4">
                                <div className="font-medium text-foreground">{feature.name}</div>
                                {feature.description && <div className="text-xs text-muted-foreground mt-0.5">{feature.description}</div>}
                            </td>
                            {plans.map((plan, j) => {
                                const value = plan.values[i];
                                return (
                                    <td key={j} className={cn('p-4 text-center', plan.highlighted && 'bg-primary/5')}>
                                        {typeof value === 'boolean' ? (
                                            value ? (
                                                <svg className="mx-auto h-5 w-5 text-success" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                            ) : (
                                                <svg className="mx-auto h-5 w-5 text-muted-foreground/30" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
                                            )
                                        ) : (
                                            <span className="text-foreground">{value}</span>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

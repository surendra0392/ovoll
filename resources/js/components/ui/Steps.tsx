import { cn } from '@/utils';

interface Step {
    label: string;
    description?: string;
}

interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
    steps: Step[];
    currentStep: number;
    orientation?: 'horizontal' | 'vertical';
}

export function Steps({ steps, currentStep, orientation = 'horizontal', className, ...props }: StepsProps) {
    return (
        <div
            className={cn('flex', orientation === 'horizontal' ? 'items-start' : 'flex-col', className)}
            role="list"
            aria-label="Progress steps"
            {...props}
        >
            {steps.map((step, i) => {
                const status = i < currentStep ? 'complete' : i === currentStep ? 'current' : 'upcoming';
                return (
                    <div
                        key={i}
                        role="listitem"
                        className={cn(
                            'flex',
                            orientation === 'horizontal' ? 'flex-1 items-center' : 'items-start gap-4',
                            i < steps.length - 1 && orientation === 'vertical' && 'pb-8'
                        )}
                    >
                        <div className={cn('flex items-center', orientation === 'vertical' && 'flex-col')}>
                            <div
                                className={cn(
                                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors',
                                    status === 'complete' && 'bg-primary text-primary-foreground',
                                    status === 'current' && 'border-2 border-primary text-primary bg-background',
                                    status === 'upcoming' && 'border border-border text-muted-foreground bg-background'
                                )}
                                aria-current={status === 'current' ? 'step' : undefined}
                            >
                                {status === 'complete' ? (
                                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                ) : (
                                    i + 1
                                )}
                            </div>
                            {i < steps.length - 1 && orientation === 'vertical' && (
                                <div className={cn('mt-2 w-px flex-1 min-h-[24px]', status === 'complete' ? 'bg-primary' : 'bg-border')} />
                            )}
                        </div>
                        {orientation === 'horizontal' && i < steps.length - 1 && (
                            <div className={cn('mx-2 h-px flex-1', status === 'complete' ? 'bg-primary' : 'bg-border')} />
                        )}
                        <div className={cn(orientation === 'horizontal' ? 'hidden md:block absolute mt-10' : 'pt-0.5')}>
                            <p className={cn('text-sm font-medium', status === 'upcoming' ? 'text-muted-foreground' : 'text-foreground')}>{step.label}</p>
                            {step.description && <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

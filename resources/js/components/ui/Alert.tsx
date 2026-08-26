import { cn } from '@/utils';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'info' | 'success' | 'warning' | 'danger';
    title?: string;
    dismissible?: boolean;
    onDismiss?: () => void;
}

export function Alert({ variant = 'info', title, dismissible, onDismiss, className, children, ...props }: AlertProps) {
    const variants: Record<string, string> = {
        info: 'bg-info/5 border-info/20 text-info [&>svg]:text-info',
        success: 'bg-success/5 border-success/20 text-success [&>svg]:text-success',
        warning: 'bg-warning/5 border-warning/20 text-warning [&>svg]:text-warning',
        danger: 'bg-danger/5 border-danger/20 text-danger [&>svg]:text-danger',
    };

    return (
        <div role="alert" className={cn('relative rounded-lg border p-4', variants[variant], className)} {...props}>
            <div className="flex items-start gap-3">
                <div className="flex-1">
                    {title && <h5 className="mb-1 font-semibold leading-none">{title}</h5>}
                    <div className="text-sm opacity-90">{children}</div>
                </div>
                {dismissible && (
                    <button onClick={onDismiss} className="shrink-0 opacity-70 hover:opacity-100 transition-opacity" aria-label="Dismiss">
                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                )}
            </div>
        </div>
    );
}

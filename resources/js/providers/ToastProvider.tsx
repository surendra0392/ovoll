import { Toaster } from 'sonner';

export function ToastProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <Toaster
                position="bottom-right"
                richColors
                closeButton
                toastOptions={{
                    classNames: {
                        toast: 'glass text-foreground border-border shadow-lg',
                        title: 'font-semibold',
                        description: 'text-muted-foreground text-sm',
                        actionButton: 'bg-primary text-primary-foreground',
                        cancelButton: 'bg-muted text-foreground',
                    },
                }}
                // Sonner renders toasts inside a role="status" region with
                // aria-live="polite" by default, ensuring screen readers
                // announce toast messages without taking focus.
            />
        </>
    );
}

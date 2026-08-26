import { Button } from '../ui/Button';

export function NetworkError({ onRetry }: { onRetry?: () => void }) {
    return (
        <div className="bg-muted/30 border-border flex flex-col items-center justify-center rounded-xl border p-8 text-center">
            <h2 className="mb-2 text-xl font-semibold">Connection Issue</h2>
            <p className="text-muted-foreground mb-6 max-w-sm">
                We're having trouble connecting to the server. Please check your internet connection
                and try again.
            </p>
            <Button onClick={onRetry || (() => window.location.reload())} variant="outline">
                Try Again
            </Button>
        </div>
    );
}

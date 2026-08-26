import { Button } from '../ui/Button';

export function NotFound() {
    return (
        <div className="bg-background text-foreground flex min-h-[60vh] flex-col items-center justify-center p-4 text-center">
            <h1 className="mb-4 font-mono text-6xl font-bold tracking-tighter">404</h1>
            <p className="text-muted-foreground mb-8 text-xl">Page not found.</p>
            <Button onClick={() => (window.location.href = '/')} variant="primary">
                Return to Home
            </Button>
        </div>
    );
}

import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';
import { Button } from '../ui/Button';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center p-4 text-center">
                    <h1 className="mb-4 text-4xl font-bold">Something went wrong</h1>
                    <p className="text-muted-foreground mb-8 max-w-md">
                        We're sorry, but an unexpected error occurred. Our team has been notified.
                    </p>
                    <p className="text-danger mb-4 font-mono text-sm">
                        {this.state.error?.message}
                    </p>
                    <div className="flex gap-4">
                        <Button onClick={() => window.location.reload()} variant="primary">
                            Refresh Page
                        </Button>
                        <Button onClick={() => (window.location.href = '/')} variant="outline">
                            Go Home
                        </Button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

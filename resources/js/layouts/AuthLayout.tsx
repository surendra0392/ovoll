import { Container } from '../components/ui/Container';

export function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-muted/30 text-foreground flex min-h-screen flex-col items-center justify-center p-4">
            <Container className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <a href="/" className="text-2xl font-bold tracking-tighter">
                        OVOLL
                    </a>
                </div>
                {children}
            </Container>
        </div>
    );
}

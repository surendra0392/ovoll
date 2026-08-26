import { Footer } from '../components/navigation/Footer';
import { Header } from '../components/navigation/Header';

export function ErrorLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-background text-foreground flex min-h-screen flex-col">
            <Header />
            <main className="flex flex-1 flex-col items-center justify-center p-4">{children}</main>
            <Footer />
        </div>
    );
}

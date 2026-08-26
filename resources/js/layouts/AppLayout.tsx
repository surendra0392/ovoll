import { SkipLink } from '@/components/a11y/SkipLink';
import { SEO } from '@/components/seo';

export function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-background text-foreground selection:bg-primary/20 selection:text-primary min-h-screen font-sans antialiased">
            <SkipLink />
            <SEO />
            <main id="main" className="relative flex min-h-screen flex-col">
                {children}
            </main>
        </div>
    );
}

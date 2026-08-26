import { SEO } from '@/components/seo';
import { Container } from '../components/ui/Container';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-background text-foreground flex min-h-screen">
            <SEO />
            {/* Sidebar Placeholder */}
            <aside className="border-border bg-muted/10 sticky top-0 hidden h-screen w-64 flex-col border-r p-6 md:flex">
                <a href="/" className="mb-8 text-xl font-bold tracking-tighter">
                    OVOLL
                </a>
                <nav className="flex flex-col gap-2">
                    <a
                        href="/dashboard"
                        className="hover:text-primary hover:bg-muted rounded-md px-3 py-2 text-sm font-medium transition-colors"
                    >
                        Overview
                    </a>
                    <a
                        href="/dashboard/settings"
                        className="hover:text-primary hover:bg-muted rounded-md px-3 py-2 text-sm font-medium transition-colors"
                    >
                        Settings
                    </a>
                </nav>
            </aside>
            <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-12">
                <Container>{children}</Container>
            </main>
        </div>
    );
}

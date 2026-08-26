import { SeoHead } from '@/components/seo/SeoHead';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { cn } from '@/utils';
import { BreakpointFrame } from '../components/dev/BreakpointFrame';
import { GridOverlay } from '../components/dev/GridOverlay';
import { PerformanceMonitor } from '../components/dev/PerformanceMonitor';
import { PlaygroundInspector } from './PlaygroundInspector';
import { PlaygroundSidebar } from './PlaygroundSidebar';
import { PlaygroundToolbar } from './PlaygroundToolbar';

interface PlaygroundLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export function PlaygroundLayout({
    children,
    title = 'OVOLL UI Playground',
}: PlaygroundLayoutProps) {
    const { theme, showGrid, rtl } = usePlaygroundStore();

    // In a real app we'd sync this with HTML dir and class, but for the playground wrapper:
    return (
        <div
            className={cn(
                'bg-background text-foreground flex h-screen w-full overflow-hidden font-sans antialiased',
                theme === 'dark' ? 'dark' : '', // A more robust theme provider should handle the root, but this scopes it.
            )}
            dir={rtl ? 'rtl' : 'ltr'}
        >
            <SeoHead title={title} />

            {/* Left Sidebar */}
            <PlaygroundSidebar />

            {/* Main Canvas Area */}
            <main className="border-border relative flex flex-1 flex-col overflow-hidden border-r">
                {/* Top Controls */}
                <PlaygroundToolbar />

                {/* Resizable Preview Container */}
                <div className="bg-muted/10 relative flex flex-1 items-center justify-center overflow-auto p-4 lg:p-8">
                    {/* Visual Grid Overlays */}
                    {showGrid && <GridOverlay />}

                    <BreakpointFrame>{children}</BreakpointFrame>
                </div>
            </main>

            {/* Right Inspector */}
            <PlaygroundInspector />

            {/* Global Metrics */}
            <PerformanceMonitor />
        </div>
    );
}

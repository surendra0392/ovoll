import { Button, Tooltip, Switch } from '@/components/ui';
import type { Breakpoint } from '@/store/usePlaygroundStore';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';

export function PlaygroundToolbar() {
    const {
        breakpoint,
        setBreakpoint,
        theme,
        setTheme,
        showGrid,
        setShowGrid,
        showBorders,
        setShowBorders,
        reduceMotion,
        setReduceMotion,
    } = usePlaygroundStore();

    const breakpoints: { id: Breakpoint; icon: React.ReactNode; label: string }[] = [
        {
            id: 'mobile',
            label: 'Mobile (375px)',
            icon: (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                </svg>
            ),
        },
        {
            id: 'tablet',
            label: 'Tablet (768px)',
            icon: (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                </svg>
            ),
        },
        {
            id: 'laptop',
            label: 'Laptop (1024px)',
            icon: (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                </svg>
            ),
        },
        {
            id: 'desktop',
            label: 'Desktop (100%)',
            icon: (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                </svg>
            ),
        },
    ];

    return (
        <header className="border-border bg-card flex h-14 shrink-0 items-center justify-between border-b px-4">
            <div className="flex items-center gap-2">
                {/* Breakpoint Switcher */}
                <div className="bg-muted/50 flex items-center rounded-md p-1">
                    {breakpoints.map((bp) => (
                        <Tooltip key={bp.id} content={bp.label}>
                            <button
                                onClick={() => setBreakpoint(bp.id)}
                                className={`rounded-sm p-1.5 transition-colors ${breakpoint === bp.id ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                {bp.icon}
                            </button>
                        </Tooltip>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-6">
                {/* Quick Toggles */}
                <div className="flex items-center gap-4">
                    <label className="flex cursor-pointer items-center gap-2 text-xs font-medium">
                        <Switch checked={showGrid} onCheckedChange={setShowGrid} size="sm" />
                        Grid
                    </label>
                    <label className="flex cursor-pointer items-center gap-2 text-xs font-medium">
                        <Switch checked={showBorders} onCheckedChange={setShowBorders} size="sm" />
                        Borders
                    </label>
                    <label className="flex cursor-pointer items-center gap-2 text-xs font-medium">
                        <Switch
                            checked={reduceMotion}
                            onCheckedChange={setReduceMotion}
                            size="sm"
                        />
                        No Motion
                    </label>
                </div>

                <div className="bg-border h-4 w-px" />

                {/* Theme Switcher */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </Button>
            </div>
        </header>
    );
}

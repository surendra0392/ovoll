import { Link } from '@inertiajs/react';
import { Text } from '@/components/ui';
import { useLabStore } from '@/store/useLabStore';
import { cn } from '@/utils';

const CATEGORIES = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
    },
    {
        id: 'hero',
        label: 'Hero Concepts',
        icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
    },
    {
        id: 'scroll',
        label: 'Scrolling Stories',
        icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4',
    },
    {
        id: 'threejs',
        label: 'Three.js',
        icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
    },
    {
        id: 'background',
        label: 'Backgrounds',
        icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
    },
    {
        id: 'cursor',
        label: 'Cursor',
        icon: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122',
    },
    {
        id: 'text',
        label: 'Typography',
        icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
    },
    {
        id: 'card',
        label: 'Card Lab',
        icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    },
    {
        id: 'section',
        label: 'Sections',
        icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 10h16M4 15h16',
    },
    { id: 'ai', label: 'AI Experiments', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    {
        id: 'sound',
        label: 'Sound Lab',
        icon: 'M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z',
    },
    { id: 'performance', label: 'Performance', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
    {
        id: 'vault',
        label: 'Idea Vault',
        icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    },
] as const;

export function LabSidebar() {
    const { activeCategory, setActiveCategory, sidebarOpen } = useLabStore();

    if (!sidebarOpen) {
        return null;
    }

    return (
        <aside className="z-50 flex h-full w-64 shrink-0 flex-col border-r border-white/10 bg-black/50 backdrop-blur-xl">
            {/* Header */}
            <div className="flex h-16 items-center border-b border-white/10 px-6">
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-lg font-bold text-black">
                        O
                    </div>
                    <div>
                        <Text variant="body" className="leading-tight font-semibold text-white">
                            OVOLL
                        </Text>
                        <Text variant="caption" className="leading-tight text-white/50">
                            Experience Lab
                        </Text>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="custom-scrollbar flex-1 space-y-1 overflow-y-auto px-4 py-6">
                <Text
                    variant="caption"
                    className="mb-4 block px-3 font-bold tracking-widest text-white/30 uppercase"
                >
                    Laboratories
                </Text>

                {CATEGORIES.map((cat) => {
                    const isActive = activeCategory === cat.id;

                    return (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={cn(
                                'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                                isActive
                                    ? 'bg-white/10 text-white shadow-sm'
                                    : 'text-white/60 hover:bg-white/5 hover:text-white',
                            )}
                        >
                            <svg
                                className="h-5 w-5 opacity-70"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.5}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d={cat.icon} />
                            </svg>
                            {cat.label}
                        </button>
                    );
                })}
            </nav>

            {/* Footer Status */}
            <div className="border-t border-white/10 p-4">
                <div className="flex items-center gap-2 px-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <Text variant="caption" className="text-white/50">
                        Lab Engine Online
                    </Text>
                </div>
            </div>
        </aside>
    );
}

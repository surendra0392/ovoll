import { usePage } from '@inertiajs/react';
import { Text, Input } from '@/components/ui';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { cn } from '@/utils';

const UI_LABS = [
    { category: 'Foundation', items: ['Typography', 'Color', 'Icons', 'Loaders'] },
    {
        category: 'Components',
        items: ['Buttons', 'Forms', 'Cards', 'Navigation', 'Feedback', 'Tables'],
    },
    { category: 'Premium', items: ['Glass', 'Premium Animations', 'Three.js'] },
    {
        category: 'Patterns',
        items: ['Pricing', 'Portfolio', 'Testimonials', 'Timeline', 'Sections'],
    },
];

const VFX_LABS = [
    {
        category: 'Visual Effects',
        items: ['VFX Backgrounds', 'VFX Materials', 'VFX Text', 'VFX SVG', 'VFX 3D'],
    },
];

export function PlaygroundSidebar() {
    const { activeLab, setActiveLab, sidebarOpen } = usePlaygroundStore();
    const { url } = usePage();
    const isEffects = url.includes('/dev/effects');
    const labs = isEffects ? VFX_LABS : UI_LABS;

    if (!sidebarOpen) {
        return null;
    }

    return (
        <aside className="border-border bg-card flex w-64 shrink-0 flex-col border-r">
            {/* Header */}
            <div className="border-border flex items-center gap-3 border-b p-4">
                <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                    <span className="text-primary-foreground text-lg leading-none font-bold">
                        O
                    </span>
                </div>
                <div>
                    <Text variant="h6" className="leading-none">
                        OVOLL
                    </Text>
                    <Text variant="caption" className="text-muted-foreground mt-0.5">
                        Design Playground
                    </Text>
                </div>
            </div>

            {/* Search */}
            <div className="border-border border-b p-4">
                <Input
                    placeholder="Search components..."
                    leftIcon={
                        <svg
                            className="text-muted-foreground h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    }
                />
            </div>

            {/* Nav */}
            <div className="flex-1 space-y-6 overflow-y-auto p-4">
                {labs.map((group) => (
                    <div key={group.category}>
                        <Text
                            variant="caption"
                            className="text-muted-foreground mb-2 px-2 font-semibold tracking-wider uppercase"
                        >
                            {group.category}
                        </Text>
                        <ul className="space-y-0.5">
                            {group.items.map((item) => {
                                const id = item.toLowerCase().replace(/[\s.]+/g, '-');
                                const isActive = activeLab === id;

                                return (
                                    <li key={item}>
                                        <button
                                            onClick={() => setActiveLab(id)}
                                            className={cn(
                                                'w-full rounded-md px-2 py-1.5 text-left text-sm transition-colors',
                                                isActive
                                                    ? 'bg-primary text-primary-foreground font-medium'
                                                    : 'text-foreground hover:bg-muted/50',
                                            )}
                                        >
                                            {item}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </aside>
    );
}

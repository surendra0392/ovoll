import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { cn } from '@/utils';

export function GridOverlay({ className }: React.HTMLAttributes<HTMLDivElement>) {
    const { showBaseline } = usePlaygroundStore();

    return (
        <div
            className={cn(
                'pointer-events-none absolute inset-0 z-[100] flex justify-center px-4 opacity-10',
                className,
            )}
        >
            <div className="flex h-full w-full max-w-7xl">
                {/* 12 Column Grid */}
                <div className="flex h-full w-full justify-between gap-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="bg-primary h-full w-full" />
                    ))}
                </div>
            </div>

            {/* 8px Baseline Grid Overlay */}
            {showBaseline && (
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_7px,var(--color-primary)_8px)] bg-[size:100%_8px] opacity-20" />
            )}
        </div>
    );
}

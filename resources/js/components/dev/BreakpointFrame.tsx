import { motion } from 'framer-motion';
import type { Breakpoint } from '@/store/usePlaygroundStore';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { cn } from '@/utils';

const BREAKPOINT_WIDTHS: Record<Breakpoint, string | number> = {
    mobile: 375,
    tablet: 768,
    laptop: 1024,
    desktop: '100%',
    ultrawide: 1440,
};

export function BreakpointFrame({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
    const { breakpoint, showBorders } = usePlaygroundStore();
    const width = BREAKPOINT_WIDTHS[breakpoint];

    return (
        <motion.div
            layout
            initial={false}
            animate={{ width }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={cn(
                'bg-background ring-border relative flex h-full max-h-[85vh] flex-col overflow-hidden rounded-xl shadow-2xl ring-1',
                showBorders && 'ring-primary/50 ring-2',
                className,
            )}
        >
            {/* Mock Browser/Device Header */}
            <div className="border-border bg-muted/50 flex h-8 shrink-0 items-center border-b px-3">
                <div className="flex gap-1.5">
                    <div className="bg-danger/80 h-2.5 w-2.5 rounded-full" />
                    <div className="bg-warning/80 h-2.5 w-2.5 rounded-full" />
                    <div className="bg-success/80 h-2.5 w-2.5 rounded-full" />
                </div>
                <div className="bg-background text-muted-foreground mx-auto flex h-5 items-center justify-center rounded px-4 text-[10px] shadow-sm">
                    {breakpoint} - {width}
                    {typeof width === 'number' ? 'px' : ''}
                </div>
            </div>

            {/* Content Canvas */}
            <div
                className={cn(
                    'relative flex-1 overflow-x-hidden overflow-y-auto p-6',
                    showBorders && 'outline-primary/30 outline outline-1',
                )}
            >
                {children}
            </div>
        </motion.div>
    );
}

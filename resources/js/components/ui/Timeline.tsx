import { cn } from '@/utils';

interface TimelineItem {
    title: string;
    description?: string;
    date?: string;
    icon?: React.ReactNode;
    status?: 'complete' | 'current' | 'upcoming';
}

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
    items: TimelineItem[];
}

export function Timeline({ items, className, ...props }: TimelineProps) {
    return (
        <div className={cn('relative pl-1', className)} {...props}>
            {items.map((item, i) => {
                const status = item.status || (i === 0 ? 'current' : 'upcoming');
                return (
                    <div key={i} className="relative flex gap-6 pb-8 last:pb-0">
                        {/* Glowing connector line */}
                        {i < items.length - 1 && (
                            <div 
                                className={cn(
                                    'absolute left-[15px] top-8 w-[2px] h-[calc(100%-1.75rem)] origin-top',
                                    status === 'complete' 
                                        ? 'bg-gradient-to-b from-[#00D1FF]/40 to-[#14B8A6]/15' 
                                        : 'bg-[#14B8A6]/10'
                                )} 
                            />
                        )}
                        
                        {/* Orbital Marker */}
                        <div className={cn(
                            'relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-260 ease-[var(--ease-out)]',
                            status === 'complete' && 'border-[#00D1FF]/30 bg-gradient-to-r from-[#14B8A6] to-[#00D1FF] text-surface-raised shadow-[0_0_15px_rgba(0,209,255,0.3)]',
                            status === 'current' && 'border-[#00D1FF] bg-[#0E1624] shadow-[0_0_15px_rgba(0,209,255,0.2)]',
                            status === 'upcoming' && 'border-[#14B8A6]/15 bg-[#0E1624]/60 text-white/30',
                        )}>
                            {item.icon || (status === 'complete' ? (
                                <svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <div className={cn(
                                    'h-2 w-2 rounded-full transition-transform duration-260 ease-[var(--ease-out)]', 
                                    status === 'current' ? 'bg-[#00D1FF] animate-pulse' : 'bg-white/20'
                                )} />
                            ))}
                        </div>

                        {/* Content Card with hover slide */}
                        <div className="pt-1 select-none">
                            <div className="flex items-center gap-3">
                                <h3 className={cn('text-sm font-semibold tracking-wide transition-colors duration-260', status === 'upcoming' ? 'text-white/40' : 'text-white')}>{item.title}</h3>
                                {item.date && <span className="text-[10px] font-mono tracking-wider text-[#14B8A6]/60 uppercase font-semibold">{item.date}</span>}
                            </div>
                            {item.description && <p className="mt-1 text-sm text-white/50 leading-relaxed font-medium">{item.description}</p>}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

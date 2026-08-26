import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils';

interface Tab {
    id: string;
    label: string;
    content?: React.ReactNode;
    disabled?: boolean;
}

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
    tabs: Tab[];
    defaultTab?: string;
    variant?: 'underline' | 'pills' | 'glass';
    onTabChange?: (id: string) => void;
}

export function Tabs({ tabs, defaultTab, variant = 'underline', onTabChange, className, ...props }: TabsProps) {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

    const handleTabClick = (id: string) => {
        setActiveTab(id);
        onTabChange?.(id);
    };

    const tabListStyles: Record<string, string> = {
        underline: 'border-b border-[#14B8A6]/15 gap-2 pb-0',
        pills: 'bg-[#0E1624]/60 border border-white/5 rounded-xl p-1 gap-1',
        glass: 'ovoll-glass rounded-xl p-1 gap-1',
    };

    const tabItemBase = 'relative inline-flex items-center justify-center whitespace-nowrap px-5 py-2.5 text-sm font-semibold transition-colors duration-260 ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00D1FF]/40 disabled:pointer-events-none disabled:opacity-40';

    const tabItemStyles: Record<string, { active: string; inactive: string }> = {
        underline: {
            active: 'text-[#00D1FF] -mb-px',
            inactive: 'text-white/40 hover:text-white',
        },
        pills: {
            active: 'text-surface-raised font-bold',
            inactive: 'text-white/50 hover:text-white',
        },
        glass: {
            active: 'text-[#00D1FF]',
            inactive: 'text-white/50 hover:text-white',
        },
    };

    const activeContent = tabs.find((t) => t.id === activeTab)?.content;

    return (
        <div className={cn('w-full', className)} {...props}>
            <div role="tablist" className={cn('flex items-center', tabListStyles[variant])}>
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            role="tab"
                            id={`tab-${tab.id}`}
                            aria-selected={isActive}
                            aria-controls={`tabpanel-${tab.id}`}
                            disabled={tab.disabled}
                            className={cn(tabItemBase, isActive ? tabItemStyles[variant]!.active : tabItemStyles[variant]!.inactive)}
                            onClick={() => handleTabClick(tab.id)}
                        >
                            {/* Sliding Active Indicator */}
                            {isActive && variant === 'underline' && (
                                <motion.span
                                    layoutId="active-tab-underline"
                                    className="absolute inset-x-3 bottom-0 h-[2.5px] rounded-full bg-gradient-to-r from-[#14B8A6] to-[#00D1FF] z-10"
                                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                                />
                            )}
                            
                            {isActive && variant === 'pills' && (
                                <motion.div
                                    layoutId="active-tab-pill"
                                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#14B8A6] to-[#00D1FF] z-0 shadow-sm"
                                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                                />
                            )}
                            
                            {isActive && variant === 'glass' && (
                                <motion.div
                                    layoutId="active-tab-glass"
                                    className="absolute inset-0 rounded-lg bg-surface-raised border border-[#14B8A6]/35 shadow-[0_0_12px_rgba(20,184,166,0.15)] z-0"
                                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                                />
                            )}

                            <span className="relative z-10">{tab.label}</span>
                        </button>
                    );
                })}
            </div>
            {activeContent && (
                <div role="tabpanel" id={`tabpanel-${activeTab}`} aria-labelledby={`tab-${activeTab}`} className="mt-6">
                    {activeContent}
                </div>
            )}
        </div>
    );
}

import React, { useState, useId } from 'react';
import { cn } from '@/utils';

interface TooltipProps {
    content: string;
    children: React.ReactElement<{ 'aria-describedby'?: string }>;
    side?: 'top' | 'bottom' | 'left' | 'right';
    className?: string;
}

export function Tooltip({ content, children, side = 'top', className }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const tooltipId = useId();

    const positions: Record<string, string> = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    return (
        <div className="relative inline-flex" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)} onFocus={() => setIsVisible(true)} onBlur={() => setIsVisible(false)}>
            {React.isValidElement(children) ? React.cloneElement(children, {
                'aria-describedby': isVisible ? tooltipId : undefined,
            }) : children}
            {isVisible && (
                <div id={tooltipId} role="tooltip" className={cn('absolute z-[var(--z-index-toast)] whitespace-nowrap rounded-md bg-surface-raised border border-[#14B8A6]/30 px-3 py-1.5 text-xs text-white shadow-[0_0_15px_rgba(20,184,166,0.15)] pointer-events-none', positions[side], className)}>
                    {content}
                </div>
            )}
        </div>
    );
}

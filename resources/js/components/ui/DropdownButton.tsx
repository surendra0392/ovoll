import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, type ButtonProps } from './Button';
import { cn } from '@/utils';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { MOTION_DURATION, MOTION_EASE } from '@/utils';

interface DropdownItem {
    label: string;
    onClick: () => void;
    disabled?: boolean;
}

interface DropdownButtonProps extends Omit<ButtonProps, 'onClick'> {
    items: DropdownItem[];
    label: string;
}

export function DropdownButton({ items, label, variant = 'outline', size, className, ...props }: DropdownButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    useFocusTrap(menuRef, isOpen);

    return (
        <div className="relative inline-block">
            <Button
                variant={variant}
                size={size}
                className={className}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-haspopup="menu"
                rightIcon={
                    <svg 
                        className={cn('h-4 w-4 transition-transform duration-260 ease-[var(--ease-out)]', isOpen && 'rotate-180')} 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth="2.5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                }
                {...props}
            >
                {label}
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-[99]" onClick={() => setIsOpen(false)} />
                        <motion.div
                            ref={menuRef}
                            role="menu"
                            aria-orientation="vertical"
                            initial={{ opacity: 0, scale: 0.95, y: 5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 5 }}
                            transition={{ duration: MOTION_DURATION.fast, ease: MOTION_EASE.out }}
                            className="absolute right-0 z-[100] mt-2 min-w-[190px] rounded-xl border border-[#14B8A6]/15 bg-[#0E1624]/90 p-1.5 shadow-2xl backdrop-blur-xl origin-top-right"
                        >
                            {items.map((item, i) => (
                                <button
                                    key={i}
                                    role="menuitem"
                                    disabled={item.disabled}
                                    className="flex w-full items-center rounded-lg px-4 py-2.5 text-sm text-white/70 hover:bg-[#14B8A6]/10 hover:text-white transition-colors duration-260 ease-[var(--ease-out)] disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:bg-[#14B8A6]/10 focus-visible:text-white"
                                    onClick={() => {
                                        item.onClick();
                                        setIsOpen(false);
                                    }}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

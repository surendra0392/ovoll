import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { MOTION_DURATION, MOTION_EASE } from '@/utils';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    side?: 'left' | 'right';
    className?: string;
}

export function Drawer({ isOpen, onClose, title, children, side = 'right', className }: DrawerProps) {
    const drawerRef = useRef<HTMLDivElement>(null);
    useFocusTrap(drawerRef, isOpen);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    const slideVariants = {
        left: {
            hidden: { x: '-100%' },
            visible: { x: 0 },
        },
        right: {
            hidden: { x: '100%' },
            visible: { x: 0 },
        },
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[99999] overflow-hidden">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: MOTION_DURATION.normal, ease: MOTION_EASE.out }}
                        className="absolute inset-0 bg-surface-raised/80 backdrop-blur-md"
                        onClick={onClose}
                        aria-hidden="true"
                    />

                    {/* Drawer Content Container */}
                    <motion.div
                        ref={drawerRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={title ? 'drawer-title' : undefined}
                        variants={slideVariants[side]}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: MOTION_DURATION.normal, ease: MOTION_EASE.out }}
                        className={cn(
                            'fixed top-0 h-full w-80 bg-[#0E1624]/90 p-7 shadow-2xl backdrop-blur-xl flex flex-col',
                            side === 'right' 
                                ? 'right-0 border-l border-[#14B8A6]/15 rounded-l-2xl' 
                                : 'left-0 border-r border-[#14B8A6]/15 rounded-r-2xl',
                            className
                        )}
                    >
                        <div className="flex items-center justify-between mb-6">
                            {title && <h2 id="drawer-title" className="text-lg font-bold text-white tracking-tight">{title}</h2>}
                            <button
                                onClick={onClose}
                                className="rounded-lg p-1.5 text-white/40 transition-colors duration-260 ease-[var(--ease-out)] hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00D1FF]/40 ml-auto"
                                aria-label="Close"
                            >
                                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto pr-1 -mr-1">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

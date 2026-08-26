import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { MOTION_DURATION, MOTION_EASE } from '@/utils';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    className?: string;
}

export function Modal({ isOpen, onClose, title, description, children, size = 'md', className }: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    useFocusTrap(modalRef, isOpen);

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

    const sizes: Record<string, string> = {
        sm: 'max-w-sm',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-[calc(100vw-2rem)]',
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
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

                    {/* Dialog Container */}
                    <motion.div
                        ref={modalRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={title ? 'modal-title' : undefined}
                        aria-describedby={description ? 'modal-description' : undefined}
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: MOTION_DURATION.normal, ease: MOTION_EASE.out }}
                        className={cn(
                            'relative w-full rounded-2xl border border-[#14B8A6]/15 bg-[#0E1624]/85 p-8 shadow-2xl backdrop-blur-xl z-10',
                            sizes[size],
                            className
                        )}
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute right-5 top-5 rounded-lg p-1.5 text-white/40 transition-colors duration-260 ease-[var(--ease-out)] hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00D1FF]/40"
                            aria-label="Close"
                        >
                            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {title && <h2 id="modal-title" className="text-xl font-bold text-white tracking-tight">{title}</h2>}
                        {description && <p id="modal-description" className="mt-2 text-sm text-white/50 leading-relaxed font-medium">{description}</p>}
                        
                        <div className={cn((title || description) && 'mt-8')}>{children}</div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

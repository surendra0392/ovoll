import type { RefObject } from 'react';
import { useEffect } from 'react';

export function useFocusTrap(ref: RefObject<HTMLElement | null>, isActive: boolean = true): void {
    useEffect(() => {
        const node = ref.current;

        if (!isActive || !node) {
            return;
        }

        const focusableElements = node.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])',
        );

        if (focusableElements.length === 0) {
            return;
        }

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        const handleTabKey = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') {
                return;
            }

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        };

        node.addEventListener('keydown', handleTabKey);
        firstElement.focus();

        return () => {
            node.removeEventListener('keydown', handleTabKey);
        };
    }, [isActive, ref]);
}

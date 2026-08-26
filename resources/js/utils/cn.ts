import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names and correctly overrides tailwind utility classes
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Formats a date object or string into a localized string
 */
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
    const defaultOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    const d = typeof date === 'string' ? new Date(date) : date;

    return new Intl.DateTimeFormat('en-US', options || defaultOptions).format(d);
}

/**
 * Formats a number into a localized string with optional currency
 */
export function formatNumber(
    value: number,
    style: 'decimal' | 'currency' | 'percent' = 'decimal',
    currency = 'USD',
): string {
    const options: Intl.NumberFormatOptions = {
        style,
        ...(style === 'currency' && { currency }),
    };

    return new Intl.NumberFormat('en-US', options).format(value);
}

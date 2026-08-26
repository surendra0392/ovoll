export function debounce<A extends unknown[], R>(
    func: (...args: A) => R,
    wait: number,
): (...args: A) => void {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return function (...args: A) {
        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            func(...args);
        }, wait);
    };
}

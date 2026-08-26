export function throttle<A extends unknown[], R>(
    func: (this: unknown, ...args: A) => R,
    limit: number,
): (this: unknown, ...args: A) => void {
    let inThrottle = false;

    return function (this: unknown, ...args: A) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

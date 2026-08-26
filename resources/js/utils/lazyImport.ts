import { lazy } from 'react';

/**
 * Utility for named imports with React.lazy
 * @example
 * const { Home } = lazyImport(() => import('./Home'), 'Home');
 */
export function lazyImport<I extends Record<K, React.ComponentType>, K extends keyof I>(
    factory: () => Promise<I>,
    name: K,
): I {
    return Object.create({
        [name]: lazy(() => factory().then((module) => ({ default: module[name] }))),
    });
}

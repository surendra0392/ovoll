import { useMemo } from 'react';

export type DeviceTier = 'low' | 'medium' | 'high';

interface DeviceCapability {
    tier: DeviceTier;
    isTouch: boolean;
    isLowMemory: boolean;
    prefersReducedMotion: boolean;
    maxPixelRatio: number;
    supportsWebGL: boolean;
    supportsWebGL2: boolean;
}

function detectTier(isTouch: boolean, cores: number, memoryGB: number): DeviceTier {
    if (isTouch || cores <= 4 || memoryGB <= 4) {
        return 'low';
    }

    if (cores <= 8 || memoryGB <= 8) {
        return 'medium';
    }

    return 'high';
}

function checkWebGLSupport(): { webgl: boolean; webgl2: boolean } {
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl');
        const gl2 = canvas.getContext('webgl2');

        return {
            webgl: !!gl,
            webgl2: !!gl2,
        };
    } catch {
        return { webgl: false, webgl2: false };
    }
}
export function useDeviceCapability(): DeviceCapability {
    return useMemo<DeviceCapability>(() => {
        // SSR-safe: none of these globals exist during server rendering, so
        // fall back to conservative defaults instead of crashing the render.
        const isServer = typeof window === 'undefined';
        const isTouch = !isServer && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
        const cores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4;
        const memoryGB =
            typeof navigator !== 'undefined'
                ? (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 8
                : 8;
        const { webgl, webgl2 } = checkWebGLSupport();
        const prefersReducedMotion =
            !isServer && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        return {
            tier: detectTier(isTouch, cores, memoryGB),
            isTouch,
            isLowMemory: memoryGB <= 4,
            prefersReducedMotion,
            maxPixelRatio: isServer ? 1 : isTouch ? 1.5 : Math.min(window.devicePixelRatio, 2),
            supportsWebGL: webgl,
            supportsWebGL2: webgl2,
        };
    }, []);
}

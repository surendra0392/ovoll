import inertia from '@inertiajs/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({

    plugins: [
        laravel({
            input: ['resources/js/app.tsx'],
            refresh: true,
        }),
        inertia(),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ],

    build: {
        rollupOptions: {
            output: {
                manualChunks(id: string) {
                    // Core React framework
                    if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/scheduler/')) {
                        return 'vendor-react';
                    }
                    // Inertia + routing
                    if (id.includes('node_modules/@inertiajs/')) {
                        return 'vendor-inertia';
                    }
                    // Animation libraries
                    if (id.includes('node_modules/framer-motion') || id.includes('node_modules/gsap/') || id.includes('node_modules/lenis/') || id.includes('node_modules/motion-dom') || id.includes('node_modules/motion-utils')) {
                        return 'vendor-animation';
                    }
                    // Three.js ecosystem (including stdlib used by drei)
                    if (id.includes('node_modules/three') || id.includes('node_modules/@react-three/') || id.includes('node_modules/three-stdlib')) {
                        return 'vendor-three';
                    }
                    // UI utility libraries
                    if (id.includes('node_modules/zustand') || id.includes('node_modules/sonner') || id.includes('node_modules/clsx') || id.includes('node_modules/tailwind-merge')) {
                        return 'vendor-utils';
                    }
                    // Form/validation
                    if (id.includes('node_modules/react-hook-form') || id.includes('node_modules/zod/') || id.includes('node_modules/@hookform/')) {
                        return 'vendor-forms';
                    }
                },
            },
        },
        // Warning threshold: vendor-three (948KB) is lazy-loaded via React.lazy,
        // vendor-inertia (307KB) is essential Inertia runtime
        chunkSizeWarningLimit: 1000,
    },
});

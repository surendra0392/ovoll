import { defineConfig, devices } from '@playwright/test';

/**
 * E2E tests for the preloader / first-paint experience.
 *
 * Requires a current production build (`npm run build`) and Laravel serving on
 * port 8000. The webServer entry reuses an already-running server, so the
 * tests work against the dev machine's live server as-is.
 */
export default defineConfig({
    testDir: 'tests/e2e',
    // The overlay timings are global state and the pages are heavy (Three.js);
    // serialize the suite so load never skews the visibility windows.
    workers: 1,
    fullyParallel: false,
    retries: 0,
    timeout: 30_000,
    reporter: [['list']],
    use: {
        baseURL: 'http://127.0.0.1:8000',
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    webServer: {
        command: 'php artisan serve --port=8000',
        url: 'http://127.0.0.1:8000',
        reuseExistingServer: true,
        timeout: 30_000,
    },
});

import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

// Emulate reduced motion for deterministic preloader timing: the static variant
// is still a real render path, and skipping it also avoids the global WebGL
// BackgroundCanvas, whose shader compile stalls the main thread for seconds
// under headless/software rendering and delays the overlay's timer-driven
// removal. (Applied per-test — the config-level option is ignored by the
// installed Playwright, so this is explicit.)
test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
});

/**
 * The splash (static, server-rendered in the blade) and the site-wide preloader
 * (React portal from PageLoader) share the same visual shell: a fixed, inset-0,
 * opaque overlay with role="status". The preloader is the same overlay minus
 * the #splash id.
 */
const splash = (page: Page) => page.locator('#splash');
const overlay = (page: Page) => page.locator('[role="status"].fixed.inset-0');
const preloader = (page: Page) => page.locator('[role="status"].fixed.inset-0:not(#splash)');
const navLinks = (page: Page) => page.locator('header nav[aria-label="Main navigation"] a');
const navLink = (page: Page, href: string) =>
    page.locator(`header nav[aria-label="Main navigation"] a[href="${href}"]`);

// PageLoader guarantees the overlay leaves the DOM: minimum 900ms visible +
// 500ms exit on a normal visit, and a 5000ms watchdog as the fail-safe.
const SETTLE_TIMEOUT = 10_000;

test('shows the brand splash on first paint, then hands off to the preloader', async ({ page }) => {
    // The splash is static HTML in the blade, so it IS the very first paint —
    // assert it's part of the served document itself.
    const response = await page.goto('/');
    const html = await response!.text();
    expect(html).toContain('id="splash"');

    // In the browser: hydration removes the splash, shows the preloader, then
    // the compositor-driven exit clears it.
    await expect(splash(page)).toBeHidden({ timeout: SETTLE_TIMEOUT });
    await expect(preloader(page)).toBeVisible({ timeout: SETTLE_TIMEOUT });
    await expect(overlay(page)).toHaveCount(0, { timeout: SETTLE_TIMEOUT });
});

test('shows the preloader on every navigation and always clears it', async ({ page }) => {
    await page.goto('/');
    // First-load cycle (splash → preloader) must finish before we navigate.
    await expect(overlay(page)).toHaveCount(0, { timeout: SETTLE_TIMEOUT });

    // Navigate via the real header menu, whatever it points at (CMS or default).
    const hrefs = await navLinks(page).evaluateAll((links) =>
        links
            .map((link) => link.getAttribute('href'))
            .filter((href): href is string => !!href && href !== '/'),
    );
    expect(hrefs.length).toBeGreaterThan(0);

    for (const href of hrefs.slice(0, 3)) {
        await navLink(page, href).click();

        // The preloader appears the moment the visit starts…
        await expect(preloader(page)).toBeVisible({ timeout: 5_000 });

        // …and is always removed afterwards (guaranteed hard unmount).
        await expect(overlay(page)).toHaveCount(0, { timeout: SETTLE_TIMEOUT });
        await expect(page).toHaveURL(new RegExp(`${href}/?$`));
    }
});

test('never leaves the overlay stuck, even when a visit never completes', async ({ page }) => {
    await page.goto('/');
    await expect(overlay(page)).toHaveCount(0, { timeout: SETTLE_TIMEOUT });

    // Abort every Inertia request so 'start' fires but 'finish' never arrives.
    await page.route('**/*', (route) => {
        if (route.request().headers()['x-inertia'] === 'true') {
            route.abort();
        } else {
            route.continue();
        }
    });

    // Pick one deterministic target: /about when present, else the first nav link.
    const hrefs = await navLinks(page).evaluateAll((links) =>
        links
            .map((link) => link.getAttribute('href'))
            .filter((href): href is string => !!href && href !== '/'),
    );
    const targetHref = hrefs.includes('/about') ? '/about' : hrefs[0];
    await navLink(page, targetHref).click();

    // The visit started, so the preloader is up…
    await expect(preloader(page)).toBeVisible({ timeout: 5_000 });

    // …but its exit is compositor-driven, so it stops covering the page ~1.45s
    // later even though the visit hangs and the watchdog hasn't fired yet.
    await expect(preloader(page)).not.toBeVisible({ timeout: 5_000 });

    // The fail-safe watchdog (MAX_VISIBLE_MS = 5s) then removes it from the
    // DOM — it can never stay stuck.
    await expect(overlay(page)).toHaveCount(0, { timeout: SETTLE_TIMEOUT });

    // The scroll lock released with the overlay.
    const overflow = await page.evaluate(() => document.body.style.overflow);
    expect(overflow).not.toBe('hidden');
});

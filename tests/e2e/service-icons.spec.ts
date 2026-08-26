import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

/**
 * Every service detail page's hero (`ServiceCanvas`) floats local brand marks
 * from `public/tech-icons` around its scene. This locks in three guarantees:
 *   1. the hero renders at least 3 tech icons (the scenes that used to render
 *      zero — product-design, printing-services — and the 1-badge scenes);
 *   2. no icon file is missing or blocked, which the `TechBadge` onError path
 *      would silently mask by swapping the <img> for a two-letter monogram
 *      (this is the exact failure mode of the old remote devicon CDN URLs,
 *      which our img-src CSP blocked);
 *   3. zero broken images anywhere on the page.
 * Slugs are derived from the hub page's own links, so the test tracks the CMS
 * data instead of a hardcoded list.
 */

// Same convention as the preloader suite: reduced motion skips the heavy
// WebGL background so the lazy hero canvas settles fast under headless
// rendering (the config-level option is ignored by the installed Playwright).
test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
});

const readSlugs = async (page: Page): Promise<string[]> => {
    const hrefs = await page
        .locator('a[href^="/services/"]')
        .evaluateAll((links) =>
            links
                .map((link) => link.getAttribute('href'))
                .filter(
                    (href): href is string =>
                        !!href &&
                        href.startsWith('/services/') &&
                        href !== '/services',
                ),
        );
    return [...new Set(hrefs)].map((href) => href.slice('/services/'.length));
};

const serviceSlugs = async (page: Page): Promise<string[]> => {
    await page.goto('/services');

    // The hub's service cards mount with React, so poll until the full set of
    // detail links is present (the seeder ships 13 detail services; a shorter
    // list would make the test silently pass on an empty set).
    await expect
        .poll(async () => (await readSlugs(page)).length, {
            timeout: 15_000,
        })
        .toBeGreaterThanOrEqual(13);

    return readSlugs(page);
};

test('every service detail page hero renders at least 3 local tech icons with zero broken images', async ({
    page,
}) => {
    // 13 heavy pages (lazy canvas + WebGL) legitimately take ~30s+, so the
    // default 30s test timeout flakes on slow runs.
    test.setTimeout(90_000);

    const slugs = await serviceSlugs(page);

    const consoleErrors: string[] = [];
    page.on('console', (message) => {
        if (message.type() === 'error') consoleErrors.push(message.text());
    });
    page.on('pageerror', (error) =>
        consoleErrors.push(`pageerror: ${error.message}`),
    );

    for (const slug of slugs) {
        await test.step(`/services/${slug}`, async () => {
            await page.goto(`/services/${slug}`, { waitUntil: 'load' });

            // The hero canvas is a lazy React chunk — wait for it to mount.
            const heroIcons = page.locator('img[src*="/tech-icons/"]');
            await expect(heroIcons.first()).toBeVisible({ timeout: 20_000 });

            // Every badge in a scene mounts in the same render commit, so once
            // the count is stable the scene is fully assembled.
            await expect(async () => {
                const first = await heroIcons.count();
                await page.waitForTimeout(300);
                expect(await heroIcons.count()).toBe(first);
            }).toPass({ timeout: 10_000 });

            // 1. The hero renders a real icon set.
            expect(await heroIcons.count()).toBeGreaterThanOrEqual(3);

            // 2. No badge silently fell back to its monogram placeholder
            //    (span.font-display.text-[10px] is unique to TechBadge's
            //    onError fallback), which would mean a missing/blocked icon.
            expect(
                await page.locator('span.font-display.text-\\[10px\\]').count(),
            ).toBe(0);

            // 3. Zero broken images anywhere on the page.
            const broken = await page.evaluate(() =>
                [...document.images]
                    .filter(
                        (img) =>
                            img.complete && img.naturalWidth === 0 && img.src,
                    )
                    .map((img) => img.src),
            );
            expect(broken).toEqual([]);
        });
    }

    // Give late console events a beat, then require a clean page.
    await page.waitForTimeout(500);
    expect(consoleErrors).toEqual([]);
});

test('every tech brand mark on the services hub loads locally with no fallback', async ({
    page,
}) => {
    await page.goto('/services');

    // Hub TechLogo icons are loading="lazy", so scroll the whole tech-stack
    // section through the viewport first — only then is a missing file forced
    // to hit its onError fallback.
    const hubIcons = page.locator('img[alt$=" logo"]');
    await expect(hubIcons.first()).toBeAttached({ timeout: 15_000 });
    await page.mouse.move(700, 400);
    for (let i = 0; i < 60; i++) {
        const lastInView = await hubIcons.last().evaluate((el) => {
            const r = el.getBoundingClientRect();
            return r.top < window.innerHeight * 0.9 && r.bottom > 0;
        });
        if (lastInView) break;
        await page.mouse.wheel(0, 500);
        await page.waitForTimeout(80);
    }
    await expect(hubIcons.last()).toBeInViewport({ timeout: 15_000 });

    // Let the lazy images settle, then confirm every rendered mark is a real
    // <img> — a missing/blocked file swaps in a teal monogram span
    // (span.font-display.text-sm.text-[#2EC4A5], unique to Hub's TechLogo).
    const fallback = page.locator('span.font-display.text-sm.text-\\[\\#2EC4A5\\]');
    await expect(async () => {
        await page.waitForTimeout(300);
        expect(await hubIcons.count()).toBeGreaterThanOrEqual(20);
        expect(await fallback.count()).toBe(0);
    }).toPass({ timeout: 10_000 });

    // Zero broken images anywhere on the page.
    const broken = await page.evaluate(() =>
        [...document.images]
            .filter((img) => img.complete && img.naturalWidth === 0 && img.src)
            .map((img) => img.src),
    );
    expect(broken).toEqual([]);

    // The tech section must have been reachable and every mark loaded, so the
    // checks above cannot have passed vacuously on an empty section.
    expect(await hubIcons.last().evaluate((el) => el.complete && el.naturalWidth > 0)).toBe(
        true,
    );
});

test('home tech orbit renders all 12 stack icons locally with no broken marks', async ({
    page,
}) => {
    await page.goto('/', { waitUntil: 'load' });

    // The orbit section is deferred-mounted (DeferredMount + React.lazy).
    // Wheel down in steps so IntersectionObserver fires progressively.
    await page.mouse.move(400, 400);
    for (let i = 0; i < 40; i++) {
        await page.mouse.wheel(0, 600);
        await page.waitForTimeout(100);
    }
    // Wait for lazy chunk download + Three.js canvas mount
    await page.waitForTimeout(3000);

    // The orbit's TechIcon renders a local <img> for every name its map knows;
    // an unknown name would silently swap in an arrow-glyph SVG instead. The
    // home stack is a hardcoded 12-entry array, so an exact count is the
    // no-fallback guarantee: any un-mapped or renamed entry breaks it.
    const orbitIcons = page.locator('img[src*="/tech-icons/"]');
    await expect
        .poll(async () => orbitIcons.count(), { timeout: 30_000 })
        .toBe(12);

    // The marks are loading="lazy" and below the fold — wheel through the
    // section until every mark has actually been requested and decoded.
    await page.mouse.move(700, 400);
    for (let i = 0; i < 60; i++) {
        const allLoaded = await orbitIcons.evaluateAll((imgs) =>
            imgs.every((img) => img.complete),
        );
        if (allLoaded) break;
        await page.mouse.wheel(0, 500);
        await page.waitForTimeout(80);
    }

    // No broken marks: TechIcon has no onError fallback, so a missing file
    // would surface as a broken image (naturalWidth 0 after decode).
    const broken = await orbitIcons.evaluateAll((imgs) =>
        imgs
            .filter((img) => img.complete && img.naturalWidth === 0)
            .map((img) => img.src),
    );
    expect(broken).toEqual([]);

    // Every mark was actually requested — none left pending by lazy loading.
    const pending = await orbitIcons.evaluateAll(
        (imgs) => imgs.filter((img) => !img.complete).length,
    );
    expect(pending).toBe(0);

    // Zero broken images anywhere else on the page.
    const brokenPage = await page.evaluate(() =>
        [...document.images]
            .filter((img) => img.complete && img.naturalWidth === 0 && img.src)
            .map((img) => img.src),
    );
    expect(brokenPage).toEqual([]);
});

test('studio pages render no broken images or broken brand marks', async ({ page }) => {
    // Studio currently renders its per-tool icons as bundled lucide components
    // (the tools' DB `icon` key is never rendered), so there are no local
    // brand marks to count. The meaningful invariants: every page renders
    // with zero broken images and a clean console, and any brand mark that is
    // ever added must load (the page-wide broken check covers that).
    test.setTimeout(60_000);

    const consoleErrors: string[] = [];
    page.on('console', (message) => {
        if (message.type() === 'error') consoleErrors.push(message.text());
    });
    page.on('pageerror', (error) =>
        consoleErrors.push(`pageerror: ${error.message}`),
    );

    // One representative tool per category, plus the index.
    const pages = [
        '/studio',
        '/studio/tool/color-palette-generator',
        '/studio/tool/easing-curve-lab',
        '/studio/tool/glsl-fragment-sandbox',
        '/studio/tool/prompt-builder',
        '/studio/tool/aria-role-inspector',
        '/studio/tool/bundle-size-analyzer',
        '/studio/tool/regex-tester',
        '/studio/tool/logo-grid-constructor',
        '/studio/tool/cursor-trail-composer',
    ];

    for (const path of pages) {
        await test.step(path, async () => {
            await page.goto(path, { waitUntil: 'load' });
            // Let the lazy tool chunk mount before evaluating the page.
            await page.waitForTimeout(800);

            const broken = await page.evaluate(() =>
                [...document.images]
                    .filter(
                        (img) =>
                            img.complete && img.naturalWidth === 0 && img.src,
                    )
                    .map((img) => img.src),
            );
            expect(broken).toEqual([]);
        });
    }

    // Give late console events a beat, then require a clean page.
    await page.waitForTimeout(500);
    expect(consoleErrors).toEqual([]);
});

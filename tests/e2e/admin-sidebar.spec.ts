import { expect, test } from '@playwright/test';

/**
 * Filament's sidebar store persists `collapsedGroups` with a null default
 * (`Alpine.$persist(null)`) and then calls `.includes()` on it, so a clean
 * browser (no localStorage entry) throws "Cannot read properties of null
 * (reading 'includes')" on every load — and the persist effect writes the
 * broken `"null"` value back, making it permanent. The app seeds valid values
 * in <head> before the panel core bundle evaluates the store; these tests lock
 * that behavior in. The admin login page is used because it loads the full
 * panel bundle (where the store registers) without needing credentials, and a
 * fresh Playwright context is precisely the clean state that triggers the bug.
 */
const storeReady = () =>
    window.Alpine && typeof Alpine.store('sidebar')?.groupIsCollapsed === 'function';

const panelErrors = (page: Parameters<typeof test>[0]['page']) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    page.on('console', (message) => {
        if (message.type() === 'error') consoleErrors.push(message.text());
    });
    page.on('pageerror', (error) => pageErrors.push(error.message));
    return { consoleErrors, pageErrors };
};

test('seeds the sidebar persist keys and the store does not throw on a clean context', async ({
    page,
}) => {
    const { consoleErrors, pageErrors } = panelErrors(page);

    // The seed must actually be present — it is injected by the panel render hook.
    await page.goto('/admin/login');
    await expect(
        page.locator('script[src*="ovoll-sidebar-persist-seed"]'),
    ).toHaveCount(1);

    await page.waitForFunction(storeReady, null, { timeout: 15_000 });

    const result = await page.evaluate(() => {
        const sidebar = Alpine.store('sidebar');
        let threw: string | null = null;
        let collapsed: unknown = null;
        try {
            collapsed = sidebar.groupIsCollapsed('Website');
        } catch (error) {
            threw = (error as Error).message;
        }
        return {
            threw,
            collapsed,
            stored: {
                collapsedGroups: localStorage.getItem('collapsedGroups'),
                isOpen: localStorage.getItem('isOpen'),
                isOpenDesktop: localStorage.getItem('isOpenDesktop'),
            },
        };
    });

    expect(result.threw).toBeNull();
    expect(typeof result.collapsed).toBe('boolean');
    expect(result.stored).toEqual({
        collapsedGroups: '[]',
        isOpen: 'true',
        isOpenDesktop: 'true',
    });
    expect(pageErrors).toEqual([]);
    expect(consoleErrors).toEqual([]);
});

test('heals a browser whose persist keys were already poisoned to null', async ({ page }) => {
    // Simulate the broken state the bug itself writes back to localStorage.
    await page.addInitScript(() => {
        localStorage.setItem('collapsedGroups', 'null');
        localStorage.setItem('isOpen', 'null');
        localStorage.setItem('isOpenDesktop', 'null');
    });

    await page.goto('/admin/login');
    await page.waitForFunction(storeReady, null, { timeout: 15_000 });

    const result = await page.evaluate(() => {
        try {
            return {
                collapsedType: typeof Alpine.store('sidebar').groupIsCollapsed('Website'),
                stored: localStorage.getItem('collapsedGroups'),
            };
        } catch (error) {
            return {
                threw: (error as Error).message,
                stored: localStorage.getItem('collapsedGroups'),
            };
        }
    });

    expect(result).toEqual({ collapsedType: 'boolean', stored: '[]' });
});

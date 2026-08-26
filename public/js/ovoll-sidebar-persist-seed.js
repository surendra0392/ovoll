// Workaround for a Filament panel bug (5.6.x): the sidebar store persists
// `collapsedGroups` with a null default (`Alpine.$persist(null)`) and then
// calls `.includes()` on it, so any browser without a previously stored array
// throws "Cannot read properties of null (reading 'includes')" on every load —
// and the persist effect then writes `"null"` back to localStorage, making the
// broken state permanent. This script runs in <head>, before the panel core
// bundle evaluates the store, seeding valid values (and healing the `"null"`
// values the bug itself wrote). It is an external, same-origin file so it
// passes the app's CSP in both dev ('unsafe-inline') and prod (nonce) modes.
(() => {
    const defaults = {
        collapsedGroups: [],
        isOpen: true,
        isOpenDesktop: true,
    }

    for (const [key, fallback] of Object.entries(defaults)) {
        let raw = null
        try {
            raw = localStorage.getItem(key)
        } catch (e) {
            return
        }

        let valid = false
        if (raw !== null) {
            try {
                const parsed = JSON.parse(raw)
                valid = Array.isArray(fallback)
                    ? Array.isArray(parsed)
                    : typeof parsed === typeof fallback
            } catch (e) {
                valid = false
            }
        }

        if (!valid) {
            try {
                localStorage.setItem(key, JSON.stringify(fallback))
            } catch (e) {
                return
            }
        }
    }
})()

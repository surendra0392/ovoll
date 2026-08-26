import { usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { useNavStore } from '@/store/useNavStore';
import { cn } from '@/utils';

interface NavItem {
    label: string;
    href: string;
}

/** Built-in defaults — used when no "header" menu is configured in the admin. */
const defaultMobileLinks: NavItem[] = [
    { label: 'Services', href: '/services' },
    { label: 'Products', href: '/products' },
    { label: 'About', href: '/about' },
    { label: 'Insights', href: '/insights' },
    { label: 'Hub', href: '/hub' },
    { label: 'Studio', href: '/studio' },
    { label: 'Contact', href: '/contact' },
];

export function MobileMenu() {
    const { isMobileMenuOpen, setMobileMenuOpen } = useNavStore();
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const { props } = usePage();

    // Mirror the desktop header: prefer the admin-managed "header" menu, and
    // fall back to the built-in defaults so the design is unchanged when empty.
    const cmsLinks = (props.navigation as Record<string, NavItem[]> | undefined)?.header;
    const navLinks = cmsLinks && cmsLinks.length > 0 ? cmsLinks : defaultMobileLinks;

    // Focus management: trap focus inside the menu when open,
    // return focus to the toggle button on close.
    useEffect(() => {
        if (!menuRef.current) {
            return;
        }

        if (isMobileMenuOpen) {
            // Auto-focus the close button so keyboard users land on the first interactive element
            closeButtonRef.current?.focus();
        }
    }, [isMobileMenuOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isMobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isMobileMenuOpen, setMobileMenuOpen]);

    // Close on route change — any imperative navigation will collapse the menu
    useEffect(() => {
        const handleRouteChange = () => {
            if (isMobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener('popstate', handleRouteChange);

        return () => window.removeEventListener('popstate', handleRouteChange);
    }, [isMobileMenuOpen, setMobileMenuOpen]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Close on Escape from within the menu
        if (e.key === 'Escape') {
            setMobileMenuOpen(false);
        }
    };

    return (
        <div
            ref={menuRef}
            role="dialog"
            aria-modal={isMobileMenuOpen}
            aria-label="Navigation menu"
            aria-hidden={!isMobileMenuOpen}
            inert={!isMobileMenuOpen ? true : undefined}
            onKeyDown={handleKeyDown}
            className={cn(
                'bg-surface-raised/95 fixed inset-0 z-[var(--z-index-modal)] flex flex-col backdrop-blur-xl transition-all duration-500 ease-[var(--ease-out)] md:hidden',
                isMobileMenuOpen
                    ? 'pointer-events-auto opacity-100'
                    : 'pointer-events-none opacity-0',
            )}
        >
            {/* Decorative ambient glow */}
            <div className="pointer-events-none absolute top-0 left-0 h-[400px] w-full bg-[radial-gradient(ellipse_at_top,_rgba(20,184,166,0.15)_0%,_transparent_70%)]" />

            <div className="relative z-10 flex justify-end p-6">
                <button
                    ref={closeButtonRef}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-white/50 transition-colors duration-260 ease-[var(--ease-out)] hover:text-white"
                    aria-label="Close Menu"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="18" x2="6" y1="6" y2="18" />
                        <line x1="6" x2="18" y1="6" y2="18" />
                    </svg>
                </button>
            </div>

            <nav
                className="relative z-10 flex flex-1 flex-col items-center justify-center gap-10 text-4xl font-bold tracking-tighter"
                aria-label="Mobile navigation"
            >
                {navLinks.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="group relative text-white/60 transition-colors duration-260 ease-[var(--ease-out)] hover:text-white"
                    >
                        {link.label}
                        <span className="absolute -bottom-2 left-0 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-[#14B8A6] to-[#00D1FF] transition-transform duration-260 ease-[var(--ease-out)] group-hover:scale-x-100" />
                    </a>
                ))}
            </nav>
        </div>
    );
}

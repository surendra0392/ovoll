import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavStore } from '@/store/useNavStore';
import { cn, MOTION_DURATION, MOTION_EASE } from '@/utils';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';

interface NavItem {
    label: string;
    href: string;
    target?: string;
}

/** Built-in defaults — used when no "header" menu is configured in the admin. */
const defaultNavLinks: NavItem[] = [
    { label: 'Services', href: '/services' },
    { label: 'Products', href: '/products' },
    { label: 'About', href: '/about' },
    { label: 'Insights', href: '/insights' },
    { label: 'Hub', href: '/hub' },
    { label: 'Studio', href: '/studio' },
];

export function Header() {
    const { isScrolled, toggleMobileMenu, isMobileMenuOpen, setScrolled } = useNavStore();
    const { url, props } = usePage();
    const settings = props.settings ?? {};
    const siteSettings = settings.site ?? {};

    // Prefer the admin-managed "header" menu; fall back to built-in defaults so
    // the design is unchanged when the CMS menu is empty or unseeded.
    const cmsLinks = (props.navigation as Record<string, NavItem[]> | undefined)?.header;
    const navLinks = cmsLinks && cmsLinks.length > 0 ? cmsLinks : defaultNavLinks;

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, [setScrolled]);

    return (
        <header
            className={cn(
                'fixed top-0 right-0 left-0 z-[var(--z-index-nav)] w-full transition-all duration-300 ease-[var(--ease-out)]',
                isScrolled
                    ? 'bg-surface-raised/95 border-b border-[#2EC4A5]/15 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl'
                    : 'border-b border-transparent bg-transparent py-6',
            )}
        >
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 md:px-8">
                {/* Logo */}
                <Link
                    href="/"
                    className="group relative flex items-center gap-2"
                    aria-label="OVOLL Home"
                >
                    {siteSettings.header_logo_url ? (
                        <img
                            src={siteSettings.header_logo_url}
                            alt={siteSettings.site_name || 'OVOLL'}
                            loading="lazy"
                            className={cn(
                                'h-8 w-auto object-contain transition-all duration-300 ease-[var(--ease-out)]',
                                isScrolled ? 'scale-90' : 'scale-100',
                            )}
                        />
                    ) : (
                        <Logo
                            variant="wordmark"
                            animated={isScrolled}
                            className={cn(
                                'transition-all duration-300 ease-[var(--ease-out)]',
                                isScrolled ? 'scale-90' : 'scale-100',
                            )}
                        />
                    )}
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
                    {navLinks.map((link) => {
                        const isActive = url.startsWith(link.href);

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    'group typo-label relative px-5 py-2 transition-colors duration-260 ease-[var(--ease-out)]',
                                    isActive
                                        ? 'text-gradient font-semibold'
                                        : 'text-white/60 hover:text-white',
                                )}
                            >
                                {link.label}
                                {/* Active indicator — brand accent underline */}
                                {isActive && (
                                    <motion.span
                                        layoutId="nav-indicator"
                                        className="absolute inset-x-4 -bottom-1 h-[2px] rounded-full bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF] shadow-[0_0_8px_rgba(0,209,255,0.6)]"
                                        transition={{
                                            duration: MOTION_DURATION.normal,
                                            ease: MOTION_EASE.out,
                                        }}
                                    />
                                )}
                                {/* Hover indicator */}
                                {!isActive && (
                                    <span className="absolute inset-x-4 -bottom-1 h-[2px] scale-x-0 rounded-full bg-white/20 transition-transform duration-260 ease-[var(--ease-out)] group-hover:scale-x-100" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-3">
                    <Link href="/contact" className="hidden md:block">
                        <Button
                            variant="gradient"
                            size="sm"
                            className="text-surface-base rounded-full bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF] px-6 font-semibold shadow-[0_0_20px_rgba(46,196,165,0.25)] transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(46,196,165,0.4)]"
                        >
                            Start a Project
                        </Button>
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="relative h-10 w-10 rounded-lg text-white transition-colors hover:bg-white/5 md:hidden"
                        onClick={toggleMobileMenu}
                        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isMobileMenuOpen}
                    >
                        <span className="absolute top-1/2 left-1/2 block w-5 -translate-x-1/2 -translate-y-1/2">
                            <span
                                className={cn(
                                    'block h-[1.5px] w-full rounded-full bg-current transition-all duration-260 ease-[var(--ease-out)]',
                                    isMobileMenuOpen
                                        ? 'translate-y-[0px] rotate-45'
                                        : '-translate-y-1.5',
                                )}
                            />
                            <span
                                className={cn(
                                    'mt-[5px] block h-[1.5px] w-full rounded-full bg-current transition-all duration-260 ease-[var(--ease-out)]',
                                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100',
                                )}
                            />
                            <span
                                className={cn(
                                    'mt-[5px] block h-[1.5px] w-full rounded-full bg-current transition-all duration-260 ease-[var(--ease-out)]',
                                    isMobileMenuOpen
                                        ? '-translate-y-[11.5px] -rotate-45'
                                        : 'translate-y-0',
                                )}
                            />
                        </span>
                    </button>
                </div>
            </div>
        </header>
    );
}

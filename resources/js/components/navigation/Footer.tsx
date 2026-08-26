import { Link, usePage } from '@inertiajs/react';
import { ArrowUpRight, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { siteConfig } from '@/config/site';
import { Logo } from '../ui/Logo';

interface NavItem {
    label: string;
    href: string;
}

/** Built-in defaults — used when the matching CMS menu is empty or unseeded. */
const defaultCompanyLinks: NavItem[] = [
    { label: 'About', href: '/about' },
    { label: 'Products', href: '/products' },
    { label: 'Insights', href: '/insights' },
    { label: 'Contact', href: '/contact' },
];

const defaultServiceLinks: NavItem[] = [
    { label: 'Branding', href: '/services/branding' },
    { label: 'Product Design', href: '/services/product-design' },
    { label: 'Website Development', href: '/services/website-design-development' },
    { label: 'Web App Development', href: '/services/web-app-development' },
];

const defaultLegalLinks: NavItem[] = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
];

const socialLinks = [
    {
        label: 'X / Twitter',
        href: siteConfig.links.twitter,
        icon: (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
    {
        label: 'LinkedIn',
        href: siteConfig.links.linkedin,
        icon: (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        label: 'GitHub',
        href: siteConfig.links.github,
        icon: (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
        ),
    },
    {
        label: 'Instagram',
        href: 'https://instagram.com/ovoll',
        icon: (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
            </svg>
        ),
    },
];

function FooterLink({ href, label }: { href: string; label: string }) {
    return (
        <Link
            href={href}
            className="group/link typo-label inline-flex items-center gap-1.5 text-white/50 transition-colors duration-300 hover:text-white"
        >
            <span className="relative overflow-hidden">
                {label}
                <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-[#14B8A6] to-[#00D1FF] transition-transform duration-300 ease-out group-hover/link:scale-x-100" />
            </span>
            <ArrowUpRight className="h-3 w-3 -translate-y-px opacity-0 transition-all duration-300 group-hover/link:translate-x-0.5 group-hover/link:opacity-100" />
        </Link>
    );
}

export function Footer() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const { props } = usePage();
    const settings = props.settings ?? {};
    const siteSettings = settings.site ?? {};
    const contact = settings.contact ?? {};
    const social = settings.social ?? {};

    const activeContactDetails = [
        {
            label: 'Email',
            value: contact.email || siteConfig.company.email,
            href: `mailto:${contact.email || siteConfig.company.email}`,
            icon: <Mail className="h-4 w-4" />,
        },
        {
            label: 'Phone',
            value: contact.telephone || siteConfig.company.telephone,
            href: `tel:${(contact.telephone || siteConfig.company.telephone).replace(/[^+\d]/g, '')}`,
            icon: <Phone className="h-4 w-4" />,
        },
        {
            label: 'Studio',
            value: contact.address || siteConfig.company.address,
            href: null,
            icon: <MapPin className="h-4 w-4" />,
        },
    ];

    const activeSocialLinks = socialLinks
        .map((link) => {
            let href = link.href;

            if (link.label === 'X / Twitter' && social.twitter) {
                href = social.twitter;
            }

            if (link.label === 'LinkedIn' && social.linkedin) {
                href = social.linkedin;
            }

            if (link.label === 'GitHub' && social.github) {
                href = social.github;
            }

            if (link.label === 'Instagram' && social.instagram) {
                href = social.instagram;
            }

            return { ...link, href };
        })
        .filter((link) => link.href);

    // Prefer admin-managed footer menus; fall back to built-in defaults so the
    // layout is unchanged when the CMS menus are empty or unseeded.
    const nav = props.navigation as Record<string, NavItem[]> | undefined;
    const pick = (menu: NavItem[] | undefined, fallback: NavItem[]) =>
        menu && menu.length > 0 ? menu : fallback;

    const companyLinks = pick(nav?.footer_company, defaultCompanyLinks);
    const serviceLinks = pick(nav?.footer_services, defaultServiceLinks);
    const legalLinks = pick(nav?.footer_legal, defaultLegalLinks);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim()) {
            return;
        }

        // ponytail: no newsletter endpoint yet — optimistic UI only. Wire to a
        // POST route when the backend list exists.
        setSubscribed(true);
        setEmail('');
    };

    return (
        <footer className="bg-surface-raised relative overflow-hidden border-t border-[#14B8A6]/20 text-white">
            {/* Premium glowing top divider */}
            <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#14B8A6]/60 to-transparent shadow-[0_0_15px_rgba(20,184,166,0.5)]" />

            {/* Decorative orbital rings */}
            <div className="pointer-events-none absolute -top-48 -right-48 h-[600px] w-[600px] animate-[spin_60s_linear_infinite] opacity-[0.06]">
                <svg viewBox="0 0 400 400" fill="none" className="h-full w-full">
                    <circle
                        cx="200"
                        cy="200"
                        r="180"
                        stroke="#14B8A6"
                        strokeWidth="1"
                        strokeDasharray="40 30"
                    />
                    <circle
                        cx="200"
                        cy="200"
                        r="140"
                        stroke="#00D1FF"
                        strokeWidth="0.5"
                        strokeDasharray="20 40"
                    />
                    <circle
                        cx="200"
                        cy="200"
                        r="100"
                        stroke="#14B8A6"
                        strokeWidth="0.5"
                        strokeDasharray="30 50"
                    />
                </svg>
            </div>

            {/* Ambient glow */}
            <div className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,_rgba(20,184,166,0.08)_0%,_transparent_70%)]" />

            <div className="container-editorial relative z-10">
                {/* ── CTA STRIP ── */}
                <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 py-16 md:flex-row md:items-center">
                    <div className="space-y-3">
                        <span className="typo-caption text-[#2EC4A5]">Have a project in mind?</span>
                        <h2 className="typo-heading-l max-w-xl leading-tight font-extrabold text-white">
                            Let&apos;s build something{' '}
                            <span className="text-gradient bg-gradient-to-r from-[#14B8A6] to-[#00D1FF]">
                                unforgettable
                            </span>{' '}
                            together.
                        </h2>
                    </div>
                    <Link
                        href="/contact"
                        className="group text-surface-raised inline-flex shrink-0 items-center gap-3 rounded-full bg-gradient-to-r from-[#14B8A6] to-[#00D1FF] px-8 py-4 font-semibold shadow-[0_0_25px_rgba(20,184,166,0.25)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,209,255,0.5)]"
                    >
                        Start a Project
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* ── MAIN GRID — 4 columns in one row (brand wider) ── */}
                <div className="grid gap-12 py-16 sm:grid-cols-2 md:grid-cols-12 lg:gap-16">
                    {/* Brand (wider) + contact + social */}
                    <div className="space-y-8 sm:col-span-2 md:col-span-4">
                        {siteSettings.footer_logo_url ? (
                            <img
                                src={siteSettings.footer_logo_url}
                                alt={siteSettings.site_name || 'OVOLL'}
                                loading="lazy"
                                className="h-8 w-auto object-contain"
                            />
                        ) : (
                            <Logo variant="wordmark" />
                        )}
                        <p className="max-w-sm text-sm leading-relaxed text-white/50">
                            {siteSettings.footer_description ||
                                'Premium Digital Growth Company. We craft brands, design products, build SaaS platforms, and engineer AI solutions for ambitious companies that demand excellence.'}
                        </p>

                        {/* Contact details */}
                        <ul className="space-y-3">
                            {activeContactDetails.map((item) => (
                                <li key={item.label} className="flex items-center gap-3 text-sm">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#2EC4A5]">
                                        {item.icon}
                                    </span>
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            className="text-white/60 transition-colors duration-300 hover:text-white"
                                        >
                                            {item.value}
                                        </a>
                                    ) : (
                                        <span className="text-white/60">{item.value}</span>
                                    )}
                                </li>
                            ))}
                        </ul>

                        {/* Social */}
                        <div className="flex items-center gap-3">
                            {activeSocialLinks.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/50 transition-all duration-300 hover:border-[#14B8A6]/50 hover:bg-[#14B8A6]/10 hover:text-white"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Company */}
                    <div className="md:col-span-2">
                        <h3 className="typo-caption mb-6 text-[#2EC4A5]">Company</h3>
                        <ul className="space-y-4">
                            {companyLinks.map((link) => (
                                <li key={link.href}>
                                    <FooterLink href={link.href} label={link.label} />
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="md:col-span-3">
                        <h3 className="typo-caption mb-6 text-[#2EC4A5]">Services</h3>
                        <ul className="space-y-4">
                            {serviceLinks.map((link) => (
                                <li key={link.href}>
                                    <FooterLink href={link.href} label={link.label} />
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="md:col-span-3">
                        <h3 className="typo-caption mb-6 text-[#2EC4A5]">Stay in the loop</h3>
                        {subscribed ? (
                            <p className="rounded-xl border border-[#14B8A6]/30 bg-[#14B8A6]/5 px-4 py-3 text-sm text-white/80">
                                Thanks — you&apos;re on the list. Watch your inbox.
                            </p>
                        ) : (
                            <form onSubmit={handleSubscribe} className="space-y-3">
                                <p className="text-sm leading-relaxed text-white/50">
                                    Occasional insights on design, engineering, and growth. No spam.
                                </p>
                                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1.5 transition-colors duration-300 focus-within:border-[#14B8A6]/50">
                                    <input
                                        id="newsletter-email"
                                        name="email"
                                        autoComplete="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@company.com"
                                        aria-label="Email address"
                                        className="min-w-0 flex-1 bg-transparent px-3 py-1.5 text-sm text-white placeholder:text-white/30 focus:outline-none"
                                    />
                                    <button
                                        type="submit"
                                        aria-label="Subscribe"
                                        className="group text-surface-raised flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#14B8A6] to-[#00D1FF] transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(0,209,255,0.5)]"
                                    >
                                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                {/* ── BOTTOM BAR ── */}
                <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 py-8 md:flex-row">
                    <p className="typo-body-small text-white/45">
                        &copy; {new Date().getFullYear()} {siteConfig.company.name}. All rights
                        reserved.
                    </p>

                    <ul className="flex items-center gap-6">
                        {legalLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="typo-body-small text-white/45 transition-colors duration-300 hover:text-white"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <p className="typo-body-small text-white/35">
                        Designed &amp; Engineered by{' '}
                        <span className="text-gradient font-medium">OVOLL</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}

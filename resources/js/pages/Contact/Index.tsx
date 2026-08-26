import { motion } from 'framer-motion';
import { Shield, Award, Terminal, Heart, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

import React, { useState } from 'react';
import { Reveal } from '@/animations';
import { CustomCursor } from '@/components/motion/CustomCursor';
import { PageBreadcrumbs } from '@/components/navigation/PageBreadcrumbs';
import { SeoHead } from '@/components/seo/SeoHead';
import { Badge, Card } from '@/components/ui';
import { siteConfig } from '@/config';

import { LandingLayout } from '@/layouts';
import type { SiteSettings } from '@/types/cms';
import SmartContactForm from './SmartContactForm';

interface ContactProps {
    settings?: SiteSettings;
    faqs?: unknown[];
    offices?: unknown[];
}

export default function Contact({ settings }: ContactProps) {
    const [activeTimelineStep, setActiveTimelineStep] = useState<number>(0);
    const [mousePos, setMousePos] = useState({ x: 700, y: 350 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    // Core Principles data (Section 03)
    const whyUs = [
        {
            title: 'Obsidian Engineering',
            desc: 'Strict <50ms server response goals, clean database schemas, and structured cache matrices.',
            icon: <Terminal className="h-5 w-5 text-[#00D1FF]" />,
        },
        {
            title: 'Mechanical Design Language',
            desc: 'Typography coordinates, custom back-blur coefficients, and cubic-bezier motion guidelines.',
            icon: <Award className="h-5 w-5 text-[#2EC4A5]" />,
        },
        {
            title: 'Zero Latency Policy',
            desc: 'WebGL InstancedMesh coordinate limits to preserve battery life and lock frame rates.',
            icon: <Shield className="h-5 w-5 text-[#00D1FF]" />,
        },
        {
            title: 'Long-Term Partnership',
            desc: 'Continuous weekly maintenance support retainers and transparent code delivery.',
            icon: <Heart className="h-5 w-5 text-[#2EC4A5]" />,
        },
    ];

    // Read timeline dynamically from settings, or fallback to default stages
    const timelineSteps = settings?.partnership_timeline || [
        {
            step: '01',
            title: 'Inquiry received',
            description:
                'Your project parameters are securely registered in our system within 12 hours.',
        },
        {
            step: '02',
            title: 'Review',
            description:
                'Our lead engineering and design architects audit the parameters and constraints.',
        },
        {
            step: '03',
            title: 'Discovery call',
            description:
                'A 30-minute structured dialogue to align on technical and business strategy.',
        },
        {
            step: '04',
            title: 'Proposal',
            description:
                'A comprehensive scope blueprint detailing latency budgets and interface tokens.',
        },
        {
            step: '05',
            title: 'Planning',
            description: 'Mapping milestones, sprint schedules, and architectural specifications.',
        },
        {
            step: '06',
            title: 'Kickoff',
            description:
                'Initializing the shared repository and initiating collaborative design sprints.',
        },
    ];

    const contactSchemas = [
        {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            '@id': 'https://ovoll.in/contact#contactpage',
            name: 'Initiate Partnership — OVOLL Contact',
            description: 'Get in touch with OVOLL to discuss brand identity systems, custom web applications, 3D WebGL experiences, or autonomous AI automation projects.',
            url: 'https://ovoll.in/contact',
            mainEntity: {
                '@type': 'Organization',
                name: 'OVOLL',
                url: 'https://ovoll.in',
                email: 'hello@ovoll.in',
                telephone: '+1-555-0123',
                contactPoint: {
                    '@type': 'ContactPoint',
                    contactType: 'customer service',
                    email: 'hello@ovoll.in',
                    availableLanguage: ['English'],
                },
            },
        },
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: 'https://ovoll.in',
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Contact',
                    item: 'https://ovoll.in/contact',
                },
            ],
        },
    ];

    return (
        <>
            <SeoHead
                title={settings?.seo_meta?.title || 'Initiate Partnership — OVOLL Contact'}
                description={settings?.seo_meta?.description || 'Get in touch with OVOLL to discuss brand identity systems, custom web applications, 3D WebGL experiences, or autonomous AI automation projects.'}
                canonical="https://ovoll.in/contact"
                type="website"
                schema={contactSchemas}
            />
            <CustomCursor />

            <PageBreadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

            <div
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="relative z-10 min-h-screen overflow-hidden bg-[#060B14] font-sans text-white"
            >
                {/* 1. INTERACTIVE MOUSE SPOTLIGHT */}
                <div
                    className="pointer-events-none absolute inset-0 transition-opacity duration-700 ease-out select-none"
                    style={{
                        opacity: isHovering ? 1 : 0.6,
                        background: `radial-gradient(850px circle at ${mousePos.x}px ${mousePos.y}px, rgba(46, 196, 165, 0.14), rgba(0, 209, 255, 0.05) 40%, transparent 80%)`,
                    }}
                />

                {/* 2. PRECISION TELEMETRY GRID WITH CROSSHAIRS */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-30 select-none"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(46, 196, 165, 0.12) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(46, 196, 165, 0.12) 1px, transparent 1px)
                        `,
                        backgroundSize: '44px 44px',
                        maskImage: 'radial-gradient(ellipse 85% 70% at 50% 35%, #000 30%, transparent 90%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 85% 70% at 50% 35%, #000 30%, transparent 90%)',
                    }}
                />

                {/* 3. GLOBAL TELEMETRY SVG BLUEPRINT */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-25 select-none">
                    <svg
                        viewBox="0 0 1200 1200"
                        className="h-[1300px] w-[1300px] max-w-none text-[#00D1FF]"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="600" cy="600" r="480" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" opacity="0.3" />
                        <circle cx="600" cy="600" r="320" stroke="#2EC4A5" strokeWidth="1" strokeDasharray="6 12" opacity="0.25" />
                        <circle cx="600" cy="600" r="160" stroke="currentColor" strokeWidth="1" opacity="0.3" />

                        {/* Broadcast Radians */}
                        <line x1="600" y1="50" x2="600" y2="1150" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />
                        <line x1="50" y1="600" x2="1150" y2="600" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />

                        {/* Nodes */}
                        <circle cx="600" cy="160" r="5" fill="#2EC4A5" />
                        <circle cx="920" cy="600" r="5" fill="#00D1FF" />
                        <circle cx="600" cy="920" r="5" fill="#8B5CF6" />
                        <circle cx="280" cy="600" r="5" fill="#2EC4A5" />
                    </svg>
                </div>

                {/* 4. MASSIVE STENCIL WATERMARK */}
                <div className="pointer-events-none absolute top-40 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-[0.025] select-none">
                    <span className="font-sans text-[180px] font-black tracking-widest text-white uppercase sm:text-[240px] lg:text-[300px]">
                        CONNECT OVOLL
                    </span>
                </div>

                {/* 5. ATMOSPHERIC NEBULA GLOWS */}
                <div className="pointer-events-none absolute inset-0 select-none">
                    <div className="absolute -top-32 -left-32 h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(46,196,165,0.15)_0%,transparent_70%)] blur-[140px]" />
                    <div className="absolute top-1/3 -right-32 h-[750px] w-[750px] rounded-full bg-[radial-gradient(circle,rgba(0,209,255,0.12)_0%,transparent_70%)] blur-[140px]" />
                </div>

                <div className="h-6" />

                {/* ---------------------------------------------------- */}
                {/* SECTION 01 — Welcome */}
                {/* ---------------------------------------------------- */}
                <section className="container-editorial relative px-6 py-20 md:py-32">
                    <div className="relative z-10 mx-auto max-w-5xl space-y-8 border-b border-white/10 pb-16 text-center select-none">
                        <div className="absolute bottom-[5px] -left-1 font-mono text-[9px] text-white/30 select-none">
                            +
                        </div>
                        <div className="absolute -right-1 bottom-[5px] font-mono text-[9px] text-white/30 select-none">
                            +
                        </div>

                        <Badge
                            variant="default"
                            size="sm"
                            className="font-mono text-xs tracking-widest uppercase"
                        >
                            PARTNERSHIP INIT // CHAPTER 01
                        </Badge>
                        <h1 className="typo-display-xl mx-auto max-w-4xl leading-none text-white uppercase">
                            Let's create something <br />
                            <span className="text-gradient bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF]">
                                extraordinary together.
                            </span>
                        </h1>
                        <p className="typo-body-large mx-auto max-w-xl leading-relaxed font-light text-white/50">
                            {settings?.hero_content?.subheadline ||
                                'We design, engineer, and deploy high-performance web systems and interactive visual worlds. Speak directly to our lead architects.'}
                        </p>
                    </div>
                </section>

                {/* ---------------------------------------------------- */}
                {/* SECTION 02 — Project Discovery (Wizard Form) */}
                {/* ---------------------------------------------------- */}
                <div className="container-editorial relative z-10">
                    <SmartContactForm settings={settings} />
                </div>

                {/* ---------------------------------------------------- */}
                {/* SECTION 02.5 — Direct Channels (Contact Details) */}
                {/* ---------------------------------------------------- */}
                <section className="container-editorial relative border-b border-white/5 py-24">
                    <div className="mx-auto max-w-7xl space-y-16">
                        <Reveal width="full" className="space-y-4 select-none">
                            <span className="typo-caption font-mono text-[10px] tracking-wider text-[#2EC4A5] uppercase">
                                Section 02 — Direct Channels
                            </span>
                            <h2 className="typo-heading-l tracking-tight text-white uppercase">
                                Reach Us Directly
                            </h2>
                            <p className="typo-body-small max-w-xl font-light text-white/50">
                                Prefer a direct line? Our channels route straight to the team — no
                                gatekeeping, no bots.
                            </p>
                        </Reveal>

                        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-none border border-white/5 bg-white/5 md:grid-cols-3">
                            {[
                                {
                                    label: 'Email',
                                    value: settings?.contact?.email || siteConfig.company.email,
                                    href: `mailto:${settings?.contact?.email || siteConfig.company.email}`,
                                    hint: 'For projects & partnerships',
                                    icon: <Mail className="h-5 w-5 text-[#00D1FF]" />,
                                },
                                {
                                    label: 'Phone',
                                    value:
                                        settings?.contact?.telephone ||
                                        siteConfig.company.telephone,
                                    href: `tel:${(settings?.contact?.telephone || siteConfig.company.telephone).replace(/[^+\d]/g, '')}`,
                                    hint: 'Mon–Fri, 9am–6pm',
                                    icon: <Phone className="h-5 w-5 text-[#2EC4A5]" />,
                                },
                                {
                                    label: 'Studio',
                                    value: settings?.contact?.address || siteConfig.company.address,
                                    href: `https://maps.google.com/?q=${encodeURIComponent(settings?.contact?.address || siteConfig.company.address)}`,
                                    hint: 'By appointment',
                                    icon: <MapPin className="h-5 w-5 text-[#00D1FF]" />,
                                },
                            ].map((channel, idx) => (
                                <Reveal
                                    key={channel.label}
                                    variant="fade"
                                    delay={idx * 0.08}
                                    className="h-full"
                                >
                                    <a
                                        href={channel.href}
                                        target={
                                            channel.href.startsWith('http') ? '_blank' : undefined
                                        }
                                        rel="noopener noreferrer"
                                        className="group relative flex h-full flex-col gap-6 bg-[#0E1624]/60 p-8 transition-colors duration-300 hover:bg-[#0E1624]"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="rounded-none border border-white/5 bg-white/3 p-3">
                                                {channel.icon}
                                            </div>
                                            <ArrowUpRight className="h-4 w-4 text-white/20 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#2EC4A5]" />
                                        </div>
                                        <div className="space-y-2">
                                            <span className="font-mono text-[9px] tracking-widest text-white/40 uppercase">
                                                {channel.label}
                                            </span>
                                            <div className="text-base font-bold tracking-tight text-white transition-colors group-hover:text-[#00D1FF]">
                                                {channel.value}
                                            </div>
                                            <p className="text-[11px] leading-relaxed font-light text-white/40">
                                                {channel.hint}
                                            </p>
                                        </div>
                                    </a>
                                </Reveal>
                            ))}
                        </div>

                        {/* Social channels */}
                        <div className="flex flex-wrap items-center gap-4 select-none">
                            <span className="font-mono text-[9px] tracking-widest text-white/40 uppercase">
                                Follow //
                            </span>
                            {[
                                {
                                    label: 'Twitter / X',
                                    href: settings?.social?.twitter || siteConfig.links.twitter,
                                },
                                {
                                    label: 'LinkedIn',
                                    href: settings?.social?.linkedin || siteConfig.links.linkedin,
                                },
                                {
                                    label: 'GitHub',
                                    href: settings?.social?.github || siteConfig.links.github,
                                },
                            ].map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-none border border-white/10 px-4 py-2 font-mono text-[9px] tracking-widest text-white/60 uppercase transition-colors duration-300 hover:border-[#2EC4A5]/40 hover:text-[#00D1FF]"
                                >
                                    {social.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ---------------------------------------------------- */}
                {/* SECTION 03 — Why Work With OVOLL */}
                {/* ---------------------------------------------------- */}

                <section className="container-editorial relative border-b border-white/5 py-24">
                    <div className="mx-auto max-w-7xl space-y-16">
                        <div className="space-y-4 select-none">
                            <Reveal width="full" className="space-y-4 select-none">
                                <span className="typo-caption font-mono text-[10px] tracking-wider text-[#2EC4A5] uppercase">
                                    Section 03 — Core Principles
                                </span>
                                <h2 className="typo-heading-l tracking-tight text-white uppercase">
                                    {settings?.trust_section?.headline || 'Why Partner with OVOLL?'}
                                </h2>
                            </Reveal>
                        </div>

                        <div className="grid grid-cols-1 gap-6 select-none md:grid-cols-2 lg:gap-8">
                            {whyUs.map((item, idx) => (
                                <Reveal
                                    key={idx}
                                    variant="fade"
                                    delay={(idx % 2) * 0.08}
                                    className="h-full"
                                >
                                    <Card
                                        variant="glass"
                                        className="group h-full rounded-none border border-white/5 p-0 transition-all duration-300 hover:border-[#2EC4A5]/25"
                                    >
                                        <div className="flex h-full items-start gap-6 p-8">
                                            <div className="shrink-0 rounded-none border border-white/5 bg-white/3 p-3">
                                                {item.icon}
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="typo-heading-s font-bold tracking-tight text-white uppercase">
                                                    {item.title}
                                                </h3>
                                                <p className="text-xs leading-relaxed font-light text-white/50">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ---------------------------------------------------- */}
                {/* SECTION 04 — What Happens Next (Timeline) */}
                {/* ---------------------------------------------------- */}
                <section className="container-editorial relative border-b border-white/5 py-24">
                    <div className="mx-auto max-w-7xl space-y-16">
                        <div className="space-y-4 select-none">
                            <span className="typo-caption font-mono text-[10px] tracking-wider text-[#2EC4A5] uppercase">
                                Section 04 — Progression
                            </span>
                            <h2 className="typo-heading-l tracking-tight text-white uppercase">
                                Engagement Timeline
                            </h2>
                            <p className="typo-body-small max-w-xl font-light text-white/50">
                                Trace our collaborative roadmap from initial parameters review to
                                repository initialization. Select a step to view details.
                            </p>
                        </div>

                        {/* Interactive Timeline layout */}
                        <div className="relative grid grid-cols-1 gap-6 font-mono text-[10px] select-none md:grid-cols-6">
                            {timelineSteps.map((step, idx: number) => {
                                const isActive = activeTimelineStep === idx;

                                return (
                                    <div
                                        key={idx}
                                        onClick={() => setActiveTimelineStep(idx)}
                                        className={`relative z-10 cursor-pointer space-y-3 border-t pt-4 transition-all duration-300 ${
                                            isActive
                                                ? 'border-[#2EC4A5]'
                                                : 'border-white/10 opacity-50 hover:opacity-80'
                                        }`}
                                    >
                                        <div
                                            className={`text-[9px] tracking-wider uppercase ${isActive ? 'text-[#00D1FF]' : 'text-white/40'}`}
                                        >
                                            {step.step} / {step.title}
                                        </div>
                                        <p className="font-sans text-[11px] leading-relaxed font-light text-white/60">
                                            {step.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ---------------------------------------------------- */}
                {/* SECTION 05 — Final Invitation */}
                {/* ---------------------------------------------------- */}
                <section className="container-editorial relative overflow-hidden py-32 text-center select-none">
                    <div className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,_rgba(46,196,165,0.05)_0%,_transparent_75%)] blur-[40px]" />

                    <div className="relative z-10 mx-auto max-w-4xl space-y-8">
                        <Badge
                            variant="default"
                            size="sm"
                            className="font-mono text-xs tracking-widest uppercase"
                        >
                            {settings?.final_cta?.button_text || 'Initiate Dialogue'}
                        </Badge>
                        <h2 className="typo-heading-xl tracking-tight text-white uppercase">
                            {settings?.final_cta?.headline ||
                                'Ready to configure your system parameters?'}
                        </h2>
                        <p className="typo-body mx-auto max-w-md text-xs leading-relaxed font-light text-white/50">
                            {settings?.final_cta?.subheadline ||
                                'Select the primary options in the Project Discovery module above to transmit details securely to our team.'}
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
}

Contact.layout = (page: React.ReactNode) => <LandingLayout>{page}</LandingLayout>;

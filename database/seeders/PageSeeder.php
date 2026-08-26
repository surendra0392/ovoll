<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Home Page
        Page::updateOrCreate(
            ['slug' => 'home'],
            [
                'name' => 'Home Page',
                'content' => [
                    'hero' => [
                        'rotatingHeadlines' => [
                            'measurable growth.',
                            'lasting brands.',
                            'real revenue.',
                            'loyal customers.',
                        ],
                    ],
                    'growthPillars' => [
                        [
                            'num' => '01',
                            'title' => 'Strategy-First Architecture',
                            'desc' => 'We audit market telemetry, competitor positions, and user intent before drawing a single frame. Every design choice is anchored to a measurable business target.',
                            'icon' => 'Compass',
                        ],
                        [
                            'num' => '02',
                            'title' => 'Unified Design & Code',
                            'desc' => 'No handoff friction between designers and developers. Brand identity, design systems, and frontend code are crafted synchronously under one roof.',
                            'icon' => 'PenTool',
                        ],
                        [
                            'num' => '03',
                            'title' => 'Performance & Sub-30ms Budgets',
                            'desc' => 'We engineer for sub-30ms database responses and 60fps UI animations. Blazing-fast performance directly drives higher search rankings and lower bounce rates.',
                            'icon' => 'Gauge',
                        ],
                        [
                            'num' => '04',
                            'title' => 'Predictable Demand Pipeline',
                            'desc' => 'We build data-backed conversion paths that turn anonymous visitors into qualified leads, lower acquisition costs, and generate compounding ROI.',
                            'icon' => 'LineChart',
                        ],
                        [
                            'num' => '05',
                            'title' => 'Cross-Channel System Consistency',
                            'desc' => 'Whether on mobile screens, desktop web apps, packaging, or physical collateral, your visual identity stays 100% unified and instantly recognizable.',
                            'icon' => 'Package',
                        ],
                        [
                            'num' => '06',
                            'title' => 'Continuous Optimization & Scale',
                            'desc' => 'Launch is just day one. We continuously analyze user behavior, test conversion hypotheses, and iterate to ensure long-term, scalable growth.',
                            'icon' => 'ShieldCheck',
                        ],
                    ],
                    'solutionCards' => [
                        [
                            'title' => 'Brand Clarity',
                            'desc' => 'A sharp position and identity system so the right customers instantly understand why you matter.',
                            'icon' => 'Compass',
                        ],
                        [
                            'title' => 'Demand & Pipeline',
                            'desc' => 'Marketing that turns spend into tracked leads, lower acquisition cost, and repeatable revenue.',
                            'icon' => 'LineChart',
                        ],
                        [
                            'title' => 'Conversion Platforms',
                            'desc' => 'Websites and products engineered to load fast and move visitors to action.',
                            'icon' => 'LayoutGrid',
                        ],
                        [
                            'title' => 'Consistent Presence',
                            'desc' => 'Packaging and print that carry one identity from screen to shelf, everywhere you show up.',
                            'icon' => 'Package',
                        ],
                    ],
                    'marqueeItems' => [
                        'Brand Strategy',
                        'Identity Systems',
                        'Website Development',
                        'Digital Marketing',
                        'Packaging & Print',
                        'Growth Consulting',
                    ],
                    'services' => [
                        [
                            'num' => '01',
                            'title' => 'Brand Strategy & Identity',
                            'desc' => 'We define your positioning, narrative, and visual language from the ground up — market research, naming, logo systems, typography, and comprehensive brand guidelines that keep every touchpoint consistent and impossible to imitate.',
                            'icon' => 'Compass',
                            'tags' => ['Positioning', 'Naming', 'Logo Systems', 'Guidelines'],
                        ],
                        [
                            'num' => '02',
                            'title' => 'Website Development',
                            'desc' => 'From marketing sites and e-commerce to SaaS platforms, dashboards, and complex web apps — we build any type of website on Laravel and React, engineered for speed, SEO, and conversion with motion and 3D built in from the start.',
                            'icon' => 'LayoutGrid',
                            'tags' => ['Marketing Sites', 'E-commerce', 'SaaS Platforms', 'Web Apps'],
                        ],
                        [
                            'num' => '03',
                            'title' => 'App Development',
                            'desc' => 'Native and cross-platform mobile apps for iOS and Android, plus progressive web apps — designed and built end to end with the same performance budgets, clean architecture, and polish as everything else we ship.',
                            'icon' => 'Smartphone',
                            'tags' => ['iOS', 'Android', 'Cross-Platform', 'PWA'],
                        ],
                        [
                            'num' => '04',
                            'title' => 'Digital Marketing',
                            'desc' => 'SEO, paid media, content, email, and social operated as one accountable system — so every rupee of spend is tracked to leads, lower acquisition cost, and a pipeline you can forecast against.',
                            'icon' => 'Megaphone',
                            'tags' => ['SEO', 'Paid Media', 'Content', 'Social'],
                        ],
                        [
                            'num' => '05',
                            'title' => 'Design & Print',
                            'desc' => 'Any design you need and any format you print — packaging, brochures, business stationery, signage, banners, and large-format collateral. We handle creative and production so your brand looks identical from screen to shelf.',
                            'icon' => 'Package',
                            'tags' => ['Packaging', 'Brochures', 'Stationery', 'Large Format'],
                        ],
                        [
                            'num' => '06',
                            'title' => 'Growth Consulting',
                            'desc' => 'Post-launch analytics, conversion-rate optimisation, and retention programs that keep compounding — turning a strong launch into sustained, measurable business growth instead of a one-off spike.',
                            'icon' => 'LineChart',
                            'tags' => ['Analytics', 'CRO', 'Retention', 'Reporting'],
                        ],
                    ],
                    'pillars' => [
                        [
                            'num' => '01',
                            'title' => 'Strategy before pixels',
                            'desc' => 'We audit the market, your customers, and the real numbers before a single layout is drawn. Every design and engineering decision traces back to a business goal you can actually measure — no guessing, no vanity metrics.',
                            'icon' => 'Compass',
                        ],
                        [
                            'num' => '02',
                            'title' => 'Design that converts',
                            'desc' => 'Premium, considered interfaces engineered to move people to act — not just to win awards or look good in a portfolio.',
                            'icon' => 'PenTool',
                        ],
                        [
                            'num' => '03',
                            'title' => 'Engineered for speed',
                            'desc' => 'Sub-30ms query budgets and 60fps interaction targets. Fast sites rank higher, convert more, and simply feel better to use.',
                            'icon' => 'Gauge',
                        ],
                        [
                            'num' => '04',
                            'title' => 'Accountable to numbers',
                            'desc' => 'We report on the metrics that matter — traffic, leads, conversion, revenue — and iterate against real telemetry, not opinion.',
                            'icon' => 'LineChart',
                        ],
                        [
                            'num' => '05',
                            'title' => 'One unified team',
                            'desc' => 'Strategy, design, and engineering sitting in the same room. No silos, no miscommunications, no hand-off failures.',
                            'icon' => 'Sparkles',
                        ],
                        [
                            'num' => '06',
                            'title' => 'Continuous evolution',
                            'desc' => 'We measure performance, test optimizations, and continuously refine your digital assets to drive compounding growth over time.',
                            'icon' => 'ShieldCheck',
                        ],
                    ],
                    'techStack' => [
                        ['name' => 'Laravel', 'slug' => 'laravel', 'desc' => 'Robust backend architecture.'],
                        ['name' => 'React', 'slug' => 'react', 'desc' => 'Dynamic frontend interfaces.'],
                        ['name' => 'TypeScript', 'slug' => 'typescript', 'desc' => 'Type-safe development.'],
                        ['name' => 'Tailwind', 'slug' => 'tailwindcss', 'desc' => 'Utility-first styling.'],
                        ['name' => 'Figma', 'slug' => 'figma', 'desc' => 'UI/UX design system.'],
                        ['name' => 'PostgreSQL', 'slug' => 'postgresql', 'desc' => 'Relational database.'],
                        ['name' => 'Redis', 'slug' => 'redis', 'desc' => 'In-memory caching.'],
                        ['name' => 'AWS', 'slug' => 'amazonaws', 'desc' => 'Cloud infrastructure.'],
                    ],
                ],
            ]
        );

        // 2. About Page
        Page::updateOrCreate(
            ['slug' => 'about'],
            [
                'name' => 'About Page',
                'content' => [
                    'hero' => [
                        'title' => 'We engineer digital scale.',
                        'subtitle' => 'OVOLL is a premium design and engineering studio. We combine strategic product architecture, cinematic WebGL interfaces, and modular type-safe codebases to build platforms that scale.',
                    ],
                    'capabilities' => [
                        [
                            'title' => 'Strategic Product Architecture',
                            'description' => 'We design structured systems rooted in real workflows, clear data models, and a scalable foundation — not throwaway prototypes.',
                            'icon' => 'laravel',
                            'bar' => 'from-[#2EC4A5] to-[#00D1FF]',
                            'glow' => 'rgba(46,196,165,0.18)',
                            'shadow' => 'rgba(46,196,165,0.45)',
                            'iconColor' => 'text-[#2EC4A5]',
                        ],
                        [
                            'title' => 'Premium Engineering & Design',
                            'description' => 'Type-safe React and Laravel paired with cinematic, GPU-accelerated interfaces that feel considered down to the last pixel.',
                            'icon' => 'react',
                            'bar' => 'from-[#00D1FF] to-[#6366F1]',
                            'glow' => 'rgba(0,209,255,0.18)',
                            'shadow' => 'rgba(0,209,255,0.45)',
                            'iconColor' => 'text-[#00D1FF]',
                        ],
                        [
                            'title' => 'Digital Growth Execution',
                            'description' => 'From launch to scale, we ship performant, SEO-ready platforms instrumented for measurable, compounding growth.',
                            'icon' => 'googleanalytics',
                            'bar' => 'from-[#6366F1] to-[#8B5CF6]',
                            'glow' => 'rgba(99,102,241,0.18)',
                            'shadow' => 'rgba(99,102,241,0.45)',
                            'iconColor' => 'text-[#818CF8]',
                        ],
                        [
                            'title' => 'Long-Term Product Partnership',
                            'description' => 'We work as engineering partners — not vendors — accountable to your roadmap and the business impact behind it.',
                            'icon' => 'typescript',
                            'bar' => 'from-[#8B5CF6] to-[#EC4899]',
                            'glow' => 'rgba(139,92,246,0.18)',
                            'shadow' => 'rgba(139,92,246,0.45)',
                            'iconColor' => 'text-[#A78BFA]',
                        ],
                    ],
                    'processSteps' => [
                        [
                            'step' => '01',
                            'title' => 'Discovery & Positioning',
                            'description' => 'We map your users, domain, and objectives to define a sharp product direction before a single line of code.',
                            'accent' => 'from-[#2EC4A5] to-[#00D1FF]',
                        ],
                        [
                            'step' => '02',
                            'title' => 'Product Architecture',
                            'description' => 'We shape the data models, systems, and interface language that keep the build consistent as it grows.',
                            'accent' => 'from-[#00D1FF] to-[#6366F1]',
                        ],
                        [
                            'step' => '03',
                            'title' => 'Engineering & Design',
                            'description' => 'We ship in tight, tested increments — production-grade code and interfaces refined in the same loop.',
                            'accent' => 'from-[#6366F1] to-[#8B5CF6]',
                        ],
                        [
                            'step' => '04',
                            'title' => 'Growth Optimization',
                            'description' => 'We refine continuously with analytics, performance budgets, and iteration built around real usage.',
                            'accent' => 'from-[#8B5CF6] to-[#EC4899]',
                        ],
                    ],
                    'clientGains' => [
                        ['title' => 'A structured, scalable product foundation built to last'],
                        ['title' => 'Cinematic, performance-obsessed interfaces at 60fps'],
                        ['title' => 'Type-safe, test-covered code you actually own'],
                        ['title' => 'A partner accountable to measurable business impact'],
                    ],
                ],
            ]
        );

        // 3. Privacy Policy
        Page::updateOrCreate(
            ['slug' => 'privacy'],
            [
                'name' => 'Privacy Policy',
                'content' => [
                    'sections' => [
                        [
                            'heading' => 'Overview',
                            'body' => 'OVOLL respects your privacy and is committed to protecting the personal data you share with us. This Privacy Policy explains what information we collect, how we use it, the legal bases we rely on, and the choices available to you. By using our website or services, you agree to the collection and use of information in accordance with this policy. If you do not agree, please discontinue use of the site.',
                        ],
                    ],
                ],
            ]
        );

        // 4. Terms of Service
        Page::updateOrCreate(
            ['slug' => 'terms'],
            [
                'name' => 'Terms of Service',
                'content' => [
                    'sections' => [
                        [
                            'heading' => 'Agreement to Terms',
                            'body' => 'These Terms of Service ("Terms") govern your access to and use of the website and services provided by OVOLL. By accessing or using the site, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the site or our services.',
                        ],
                    ],
                ],
            ]
        );

        // 5. Services Hub
        Page::updateOrCreate(
            ['slug' => 'services'],
            [
                'name' => 'Services Page',
                'content' => [
                    'hero' => [
                        'badge' => 'Blueprints & Strategy',
                        'titleLead' => 'We build digital ecosystems that accelerate',
                        'titleHighlight' => 'business transformation.',
                        'subtitle' => 'OVOLL replaces standard templates with custom, database-driven visual architectures mapped directly to your commercial objectives.',
                    ],
                ],
            ]
        );

        // 6. Products
        Page::updateOrCreate(
            ['slug' => 'products'],
            [
                'name' => 'Products Page',
                'content' => [
                    'hero' => [
                        'badge' => 'Products We Build',
                        'titleLead' => 'The kinds of products we',
                        'titleHighlight' => 'design and engineer.',
                        'subtitle' => 'From enterprise systems to on-demand marketplaces, OVOLL builds custom platforms end to end — every one tuned for speed, security, and scale. Explore the product types we ship.',
                    ],
                ],
            ]
        );

        // 7. Studio
        Page::updateOrCreate(
            ['slug' => 'studio'],
            [
                'name' => 'Studio Page',
                'content' => [
                    'hero' => [
                        'badge' => 'R&D LAB STATUS: ACTIVE // SEC_ALIGN_SYS_B09',
                        'titleLead' => 'OVOLL',
                        'titleHighlight' => 'Studio.',
                        'subtitle' => 'Our public innovation laboratory. We believe in showing our homework. Below, explore our live design system parameters, interactive engineering prototypes, practical AI webhooks, and downloadable utility templates.',
                    ],
                ],
            ]
        );

        // 8. Insights
        Page::updateOrCreate(
            ['slug' => 'insights'],
            [
                'name' => 'Insights Page',
                'content' => [
                    'hero' => [
                        'badge' => 'OVOLL TECHNICAL JOURNAL // VOLUME 01',
                        'titleLead' => 'Knowledge',
                        'titleHighlight' => 'Explorer.',
                        'subtitle' => 'Explanations of technical decisions, interface blueprints, and growth systems written by OVOLL partners and senior architects.',
                    ],
                ],
            ]
        );

        // 9. Discover (Project Estimator)
        Page::updateOrCreate(
            ['slug' => 'discover'],
            [
                'name' => 'Discover Page',
                'content' => [
                    'hero' => [
                        'badge' => 'Conversion Engine',
                        'titleLead' => 'Project Discovery Suite',
                        'titleHighlight' => '',
                        'subtitle' => 'Evaluate return on investment, configure scopes, and validate your business goals.',
                    ],
                ],
            ]
        );
    }
}

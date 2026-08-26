<?php

namespace Database\Seeders;

use App\Models\HomepageSection;
use Illuminate\Database\Seeder;

class HomepageSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sections = [
            [
                'key' => 'hero',
                'title' => 'Hero Experience',
                'type' => 'hero',
                'variant' => '3d',
                'sort_order' => 1,
                'content' => [
                    'headline' => 'We architect the digital vanguard.',
                    'subtitle' => 'Creating premium design systems, motion engines, and interactive Three.js experiences for the world\'s most ambitious brands.',
                    'primary_cta' => 'Initiate Project',
                    'primary_url' => '#contact',
                    'secondary_cta' => 'Explore Labs',
                    'secondary_url' => '/dev/lab',
                    'badge' => 'OVOLL — CREATIVE TECHNOLOGY STUDIO',
                    'trust_text' => 'Trusted by product innovators worldwide',
                ],
                'settings' => [
                    'theme' => 'dark',
                    'particle_count' => 150,
                    'rotation_speed' => 0.5,
                    'radial_glow' => true,
                    'crystal_color' => '#ffffff',
                ],
            ],
            [
                'key' => 'logos',
                'title' => 'Client Marquee',
                'type' => 'logos',
                'variant' => 'marquee',
                'sort_order' => 2,
                'content' => [
                    'logos' => [
                        ['name' => 'Stripe', 'icon' => 'stripe'],
                        ['name' => 'Vercel', 'icon' => 'vercel'],
                        ['name' => 'Linear', 'icon' => 'linear'],
                        ['name' => 'Framer', 'icon' => 'framer'],
                        ['name' => 'OpenAI', 'icon' => 'openai'],
                        ['name' => 'Figma', 'icon' => 'figma'],
                    ],
                ],
                'settings' => [
                    'marquee_speed' => 25,
                    'direction' => 'left',
                    'hover_pause' => true,
                ],
            ],
            [
                'key' => 'what_we_do',
                'title' => 'What We Do',
                'type' => 'what_we_do',
                'sort_order' => 3,
                'content' => [
                    'services' => [
                        [
                            'title' => 'Creative Direction',
                            'description' => 'Shaping memorable brand experiences that resonate across all digital touchpoints with stunning visual coherence.',
                            'expanded' => 'We work hand-in-hand with founders and leadership to design cohesive brand worlds. This includes editorial design, dynamic art direction, typography guidelines, and digital storytelling paradigms.',
                        ],
                        [
                            'title' => 'Interactive Systems',
                            'description' => 'Building state-of-the-art web architectures with modular design systems, clean animations, and solid React logic.',
                            'expanded' => 'Our design playground and UI systems are built using Tailwind v4, custom utility layers, and robust TypeScript architectures to ensure modularity, scalability, and 100% testable code.',
                        ],
                        [
                            'title' => 'VFX Engineering',
                            'description' => 'Integrating advanced 3D scenes, WebGL shaders, and high-performance motion choreography using Three.js and GSAP.',
                            'expanded' => 'Every single animation has a purpose. We leverage Web Audio oscillators, custom shaders with mesh transmission materials, and optimized layout changes to achieve 60FPS even on low-end hardware.',
                        ],
                    ],
                ],
                'settings' => [
                    'cols' => 3,
                    'glass_intensity' => '0.04',
                ],
            ],
            [
                'key' => 'capabilities',
                'title' => 'Featured Capabilities',
                'type' => 'capabilities',
                'sort_order' => 4,
                'content' => [
                    'headline' => 'Superpowers for modern products.',
                    'description' => 'We engineer tailored capabilities across design and technology layers.',
                    'items' => [
                        [
                            'title' => 'Branding & Identity',
                            'description' => 'Defining logomarks, typography scales, colors, and layout systems.',
                            'metric' => '100%',
                            'metric_label' => 'Brand Consistency',
                        ],
                        [
                            'title' => 'Product Design',
                            'description' => 'Building interactive mockups, user research flows, and complex layouts.',
                            'metric' => '0.01s',
                            'metric_label' => 'Avg Interaction Latency',
                        ],
                        [
                            'title' => 'Advanced Frontend',
                            'description' => 'Using Next.js, Vite, and React 19 to develop lightning-fast SPAs.',
                            'metric' => '99',
                            'metric_label' => 'Lighthouse Score',
                        ],
                        [
                            'title' => 'Motion Design',
                            'description' => 'GSAP timelines, scroll triggers, custom split text, and transitions.',
                            'metric' => '60fps',
                            'metric_label' => 'Guaranteed Performance',
                        ],
                    ],
                ],
                'settings' => [
                    'grid_cols' => 2,
                    'card_hover' => 'lift',
                ],
            ],
            [
                'key' => 'work',
                'title' => 'Selected Work',
                'type' => 'work',
                'sort_order' => 5,
                'content' => [
                    'headline' => 'Proving it by building it.',
                    'works' => [
                        [
                            'title' => 'Aether Core',
                            'category' => '3D Ecosystem',
                            'description' => 'A real-time WebGL control center tracking industrial IoT telemetry.',
                            'metric' => '1.2M events/s',
                            'image' => '/assets/work_aether.jpg',
                            'link' => '#',
                        ],
                        [
                            'title' => 'Veridian Labs',
                            'category' => 'AI SaaS Interface',
                            'description' => 'An ultra-fast workspace built for next-generation generative coding.',
                            'metric' => '8.4x speedup',
                            'image' => '/assets/work_veridian.jpg',
                            'link' => '#',
                        ],
                        [
                            'title' => 'Helios OS',
                            'category' => 'Design System',
                            'description' => 'A headless, fully responsive canvas system for automated product scaling.',
                            'metric' => '42+ sites served',
                            'image' => '/assets/work_helios.jpg',
                            'link' => '#',
                        ],
                    ],
                ],
                'settings' => [
                    'layout' => 'split',
                    'hover_scale' => true,
                ],
            ],
            [
                'key' => 'solutions',
                'title' => 'Industry Solutions',
                'type' => 'solutions',
                'sort_order' => 6,
                'content' => [
                    'headline' => 'Adapting to your industry.',
                    'solutions' => [
                        ['title' => 'Healthcare', 'desc' => 'HIPAA-compliant layouts, medical visualization, and patient portals.'],
                        ['title' => 'Manufacturing', 'desc' => 'High-throughput telemetry dashboards, IoT mapping, and monitoring systems.'],
                        ['title' => 'Education', 'desc' => 'Accessible, structured portals built for universal learning models.'],
                        ['title' => 'Restaurants', 'desc' => 'Fast, elegant ordering platforms with real-time feedback loops.'],
                        ['title' => 'Technology', 'desc' => 'Developer documentation hubs, API explorers, and SaaS websites.'],
                        ['title' => 'Retail', 'desc' => 'Immersive, high-performance checkout experiences built for speed.'],
                    ],
                ],
                'settings' => [
                    'cols' => 3,
                ],
            ],
            [
                'key' => 'process',
                'title' => 'Our Process',
                'type' => 'process',
                'sort_order' => 7,
                'content' => [
                    'headline' => 'A precise, modular path to launch.',
                    'steps' => [
                        ['num' => '01', 'title' => 'Discovery', 'desc' => 'Deep dive into brand goals, functional scope, and creative ambitions.'],
                        ['num' => '02', 'title' => 'Prototype', 'desc' => 'Isolating every layout, button state, and theme transition in our design playground.'],
                        ['num' => '03', 'title' => 'Motion & VFX', 'desc' => 'Adding procedural audio feeds, GSAP timelines, and Three.js crystal assets.'],
                        ['num' => '04', 'title' => 'Integration', 'desc' => 'Plugging in clean Laravel controllers, Filament resource dashboards, and database seeders.'],
                    ],
                ],
                'settings' => [
                    'direction' => 'horizontal',
                ],
            ],
            [
                'key' => 'tech_orbit',
                'title' => 'Technology Stack',
                'type' => 'tech_orbit',
                'sort_order' => 8,
                'content' => [
                    'headline' => 'The OVOLL stack.',
                    'description' => 'Modern, tested technologies engineered for maximum stability and speed.',
                    'techs' => [
                        ['name' => 'Laravel', 'desc' => 'Artisan backend v13'],
                        ['name' => 'React', 'desc' => 'Virtual DOM v19'],
                        ['name' => 'Three.js', 'desc' => '3D engine via R3F'],
                        ['name' => 'GSAP', 'desc' => 'Fluid timelines'],
                        ['name' => 'Tailwind v4', 'desc' => 'Premium utility styling'],
                        ['name' => 'Framer Motion', 'desc' => 'Smooth UI animations'],
                    ],
                ],
                'settings' => [
                    'orbit_radius' => 170,
                    'orbit_speed' => 20,
                ],
            ],
            [
                'key' => 'testimonials',
                'title' => 'Testimonials',
                'type' => 'testimonials',
                'sort_order' => 9,
                'content' => [
                    'headline' => 'Hear from our partners.',
                    'items' => [
                        [
                            'quote' => 'Demonstration Content: This testimonial slot is configured to show how verified product design metrics render in the dashboard interface once active client reviews are saved.',
                            'author' => 'Illustrative Profile 01',
                            'role' => 'Demonstration Role',
                            'company' => 'OVOLL Illustrative Case',
                        ],
                        [
                            'quote' => 'Demonstration Content: This testimonial represents visual choreography benchmarks achieved in simulated repository sprints.',
                            'author' => 'Illustrative Profile 02',
                            'role' => 'Demonstration Role',
                            'company' => 'OVOLL Illustrative Case',
                        ],
                    ],
                ],
                'settings' => [
                    'autoplay' => true,
                    'duration' => 6000,
                ],
            ],
            [
                'key' => 'insights',
                'title' => 'Insights',
                'type' => 'insights',
                'sort_order' => 10,
                'content' => [
                    'headline' => 'Vanguard ideas.',
                    'articles' => [
                        [
                            'title' => 'Designing Refractive Materials in WebGL',
                            'category' => 'Development',
                            'time' => '5 min read',
                            'date' => 'July 10, 2026',
                        ],
                        [
                            'title' => 'Building Speed-Agnostic UI Audio Layers',
                            'category' => 'Design Systems',
                            'time' => '8 min read',
                            'date' => 'July 08, 2026',
                        ],
                        [
                            'title' => 'Tailwind v4 & React 19: A Production Review',
                            'category' => 'Engineering',
                            'time' => '4 min read',
                            'date' => 'July 05, 2026',
                        ],
                    ],
                ],
                'settings' => [
                    'limit' => 3,
                ],
            ],
            [
                'key' => 'final_cta',
                'title' => 'Final CTA',
                'type' => 'final_cta',
                'sort_order' => 11,
                'content' => [
                    'headline' => 'Let\'s build the future together.',
                    'subtitle' => 'Contact our creative technology team to initiate your digital transformation.',
                    'button_text' => 'Initiate Project',
                    'button_url' => '#contact',
                ],
                'settings' => [
                    'glow_effect' => true,
                    'alignment' => 'center',
                ],
            ],
            [
                'key' => 'footer',
                'title' => 'Footer',
                'type' => 'footer',
                'sort_order' => 12,
                'content' => [
                    'copyright' => '© 2026 OVOLL. All rights reserved.',
                    'description' => 'OVOLL is a premium creative technology studio building immersive digital products.',
                    'links' => [
                        ['label' => 'Labs', 'url' => '/dev/lab'],
                        ['label' => 'VFX Engine', 'url' => '/dev/effects'],
                        ['label' => 'UI Playground', 'url' => '/dev/ui'],
                        ['label' => 'Showcase', 'url' => '/showcase'],
                    ],
                ],
                'settings' => [
                    'layout' => 'editorial',
                ],
            ],
        ];

        foreach ($sections as $section) {
            HomepageSection::updateOrCreate(
                ['key' => $section['key']],
                [
                    'title' => $section['title'],
                    'type' => $section['type'],
                    'variant' => $section['variant'] ?? 'default',
                    'sort_order' => $section['sort_order'],
                    'content' => $section['content'],
                    'settings' => $section['settings'],
                    'is_enabled' => true,
                ]
            );
        }
    }
}

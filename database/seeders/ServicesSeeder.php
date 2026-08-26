<?php

namespace Database\Seeders;

use App\Models\Service;
use App\Models\ServiceCategory;
use Illuminate\Database\Seeder;

class ServicesSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Seed Categories
        $brandCategory = ServiceCategory::updateOrCreate(
            ['slug' => 'brand-experience'],
            [
                'name' => 'Brand Experience',
                'icon' => 'heroicon-o-sparkles',
                'description' => 'Elevating brand equity through bespoke design systems, 3D physical modeling, FMCG packaging, and high-fidelity print specifications.',
                'sort_order' => 1,
                'is_featured' => true,
                'is_enabled' => true,
            ]
        );

        $productsCategory = ServiceCategory::updateOrCreate(
            ['slug' => 'digital-products'],
            [
                'name' => 'Digital Products',
                'icon' => 'heroicon-o-rectangle-stack',
                'description' => 'Designing and engineering high-impact web applications, React Native mobile suites, SaaS platforms, and enterprise UI/UX systems.',
                'sort_order' => 2,
                'is_featured' => true,
                'is_enabled' => true,
            ]
        );

        $engineeringCategory = ServiceCategory::updateOrCreate(
            ['slug' => 'engineering'],
            [
                'name' => 'Engineering & Tech',
                'icon' => 'heroicon-o-cpu-chip',
                'description' => 'Building 3D WebGL interfaces, custom API networks, sub-30ms database pipelines, and cloud DevOps architectures.',
                'sort_order' => 3,
                'is_featured' => true,
                'is_enabled' => true,
            ]
        );

        $aiCategory = ServiceCategory::updateOrCreate(
            ['slug' => 'ai-automation'],
            [
                'name' => 'AI & Automation',
                'icon' => 'heroicon-o-sparkles',
                'description' => 'Integrating semantic routing hubs, autonomous LLM agents, enterprise RAG search, and automated workflows.',
                'sort_order' => 4,
                'is_featured' => true,
                'is_enabled' => true,
            ]
        );

        $growthCategory = ServiceCategory::updateOrCreate(
            ['slug' => 'growth'],
            [
                'name' => 'Performance & Growth',
                'icon' => 'heroicon-o-arrow-trending-up',
                'description' => 'Generative Engine Optimization (GEO), Core Web Vitals engineering, CRO conversion lifts, and campaign telemetry.',
                'sort_order' => 5,
                'is_featured' => true,
                'is_enabled' => true,
            ]
        );

        $categoriesMap = [
            'brand-experience' => $brandCategory->id,
            'digital-products' => $productsCategory->id,
            'engineering' => $engineeringCategory->id,
            'ai-automation' => $aiCategory->id,
            'growth' => $growthCategory->id,
        ];

        Service::updateOrCreate(
            ['slug' => 'branding'],
            [
                'category_id' => $categoriesMap['brand-experience'],
                'name' => 'Brand Identity & Strategy',
                'description' => 'Cinematic visual systems, strategic positioning, and identity coordinates compiled to scale modern entities.',
                'is_featured' => true,
                'is_enabled' => true,
                'sort_order' => 1,
                'problem_solution' => [
                    'problem' => 'Firms struggle to command premium pricing because their visual systems are generic, inconsistent, and fail to convey market authority.',
                    'solution' => 'We create cohesive brand systems, defining typography coordinates, HSL color tokens, and custom logomark presets.',
                ],
                'deliverables' => [
                    ['title' => 'Core Logo Guidelines', 'description' => 'Vector assets optimized for dark-mode high-blur environments.'],
                    ['title' => 'Typography Style Guide', 'description' => 'Definitive settings for headings, body text, and layout spans.'],
                    ['title' => 'Brand Voice & Messaging Framework', 'description' => 'Tone, value propositions, and positioning pillars.'],
                ],
                'process_timeline' => [
                    ['title' => 'Market Audit', 'desc' => 'Analyzing competitor styling indices and industry gaps.'],
                    ['title' => 'Visual Drafting', 'desc' => 'Creating vector sketches and tone coordinates.'],
                    ['title' => 'Asset Delivery', 'desc' => 'Handing over vector files and branding guidelines.'],
                ],
                'technologies' => [
                    ['name' => 'Figma', 'desc' => 'For collaborative identity guidelines and digital token specs.'],
                    ['name' => 'Adobe Illustrator', 'desc' => 'For precision geometric vector marks and typography design.'],
                    ['name' => 'Adobe Photoshop', 'desc' => 'For brand imagery retouching, realistic mockups, and textures.'],
                    ['name' => 'Adobe InDesign', 'desc' => 'For multi-page brand books and corporate stationery systems.'],
                    ['name' => 'Blender 3D', 'desc' => 'For custom 3D spatial emblems and material rendering.'],
                    ['name' => 'Canva Enterprise', 'desc' => 'For client-facing editable social media templates.'],
                ],
                'settings' => [
                    'timeline' => '4-6 weeks',
                    'ideal_project' => 'Firms launching new products or completing major rebranding sprints.',
                    'outcome' => 'A cohesive visual system that commands immediate brand equity.',
                ],
            ]
        );
        Service::updateOrCreate(
            ['slug' => 'packaging-design'],
            [
                'category_id' => $categoriesMap['brand-experience'],
                'name' => 'FMCG Packaging Architecture',
                'description' => 'Tactile print production setups, dielines, and unboxing narratives calibrated for maximum shelf presence.',
                'is_featured' => false,
                'is_enabled' => true,
                'sort_order' => 2,
                'problem_solution' => [
                    'problem' => 'Physical goods get lost on crowded shelves due to flat layout hierarchies and inadequate print material calibrations.',
                    'solution' => 'We engineer high-tactile dielines with foil-stamping accents, custom finish tokens, and clear regulatory hierarchy.',
                ],
                'deliverables' => [
                    ['title' => 'Production Ready Dielines', 'description' => 'Vector dieline files with defined bleed, cut, and fold layers.'],
                    ['title' => '3D Shelf Previews', 'description' => 'Photorealistic studio renders under multiple lighting profiles.'],
                    ['title' => 'Finishing Specification Deck', 'description' => 'Detailed substrate, foil, embossing, and ink breakdown.'],
                ],
                'process_timeline' => [
                    ['title' => 'Dieline Blueprinting', 'desc' => 'Structural analysis, container dimensioning, and substrate selection.'],
                    ['title' => 'Artwork Construction', 'desc' => 'Surface layout composition, spot-varnish channels, and typography.'],
                    ['title' => 'Print-Ready Handover', 'desc' => 'Color separation checks and press operator handoff decks.'],
                ],
                'technologies' => [
                    ['name' => 'Adobe Illustrator', 'desc' => 'For dieline construction, vector artwork, and barcode integration.'],
                    ['name' => 'Adobe Dimension', 'desc' => 'For photorealistic 3D box, pouch, and bottle rendering.'],
                    ['name' => 'Blender 3D', 'desc' => 'For custom structural packaging animation and spatial lighting.'],
                    ['name' => 'Adobe Photoshop', 'desc' => 'For luxury surface texturing, foil stamping, and emboss proofing.'],
                    ['name' => 'Adobe InDesign', 'desc' => 'For regulatory compliance label layouts and multi-lingual tables.'],
                    ['name' => 'Figma', 'desc' => 'For packaging component design systems and asset distribution.'],
                ],
                'settings' => [
                    'timeline' => '3-5 weeks',
                    'ideal_project' => 'CPG and retail brands introducing new SKUs or modernizing packaging lines.',
                    'outcome' => 'High-conversion shelf packaging with flawless press-ready dielines.',
                ],
            ]
        );
        Service::updateOrCreate(
            ['slug' => 'stationery-kits'],
            [
                'category_id' => $categoriesMap['brand-experience'],
                'name' => 'Corporate Collateral & Stationery Kits',
                'description' => 'Executive business suites, letterheads, invoice templates, and physical presentation folders.',
                'is_featured' => false,
                'is_enabled' => true,
                'sort_order' => 3,
                'problem_solution' => [
                    'problem' => 'Inconsistent corporate documents and slapdash templates degrade institutional trust during high-stakes deals.',
                    'solution' => 'We design unified corporate collateral suites with strict grid governance and tactile print calibrations.',
                ],
                'deliverables' => [
                    ['title' => 'Executive Stationery Suite', 'description' => 'Letterhead, corporate envelope, and business card vector master files.'],
                    ['title' => 'Digital Document Templates', 'description' => 'Locked Google Docs, MS Word, and Keynote presentation formats.'],
                    ['title' => 'Print Production Guide', 'description' => 'Paper stock recommendations (GSM, texture, spot colors).'],
                ],
                'process_timeline' => [
                    ['title' => 'Grid Definition', 'desc' => 'Establishing mathematical margins, typographic hierarchy, and alignments.'],
                    ['title' => 'Collateral Prototyping', 'desc' => 'Drafting physical mockups with spot-UV and deboss variations.'],
                    ['title' => 'Asset Packaging', 'desc' => 'Delivering vector press files and digital office template suites.'],
                ],
                'technologies' => [
                    ['name' => 'Adobe InDesign', 'desc' => 'For precision grid alignment across letterheads and envelopes.'],
                    ['name' => 'Adobe Illustrator', 'desc' => 'For crisp vector logos and spot-color vector graphics.'],
                    ['name' => 'Adobe Photoshop', 'desc' => 'For realistic corporate collateral mockups and paper finishes.'],
                    ['name' => 'Figma', 'desc' => 'For collaborative stationery spec libraries and digital exports.'],
                    ['name' => 'Adobe Acrobat Pro', 'desc' => 'For pre-flight PDF proofing and CMYK separation verification.'],
                ],
                'settings' => [
                    'timeline' => '2-3 weeks',
                    'ideal_project' => 'Enterprises and advisory firms standardizing internal and client-facing documents.',
                    'outcome' => 'An immaculate, institutional stationery system built for dealmaking.',
                ],
            ]
        );
        Service::updateOrCreate(
            ['slug' => 'product-design'],
            [
                'category_id' => $categoriesMap['brand-experience'],
                'name' => 'Industrial & Physical Styling',
                'description' => 'From initial ergonomics sketching to CAD-ready surface models for hardware and physical devices.',
                'is_featured' => false,
                'is_enabled' => true,
                'sort_order' => 4,
                'problem_solution' => [
                    'problem' => 'Hardware startups often fail to reconcile electronic component constraints with sleek consumer ergonomics.',
                    'solution' => 'We design form-factor geometries that balance thermal efficiency, assembly logic, and iconic industrial aesthetics.',
                ],
                'deliverables' => [
                    ['title' => 'Industrial Concept Deck', 'description' => 'Exploded-view diagrams, form studies, and ergonomic grip analyses.'],
                    ['title' => 'Surface CAD Model', 'description' => 'STEP/IGES geometry ready for tooling evaluation and CNC prototyping.'],
                    ['title' => 'CMF Specification Document', 'description' => 'Color, Material, Finish tokens with Pantone and mold-texture codes.'],
                ],
                'process_timeline' => [
                    ['title' => 'Ergonomics Exploration', 'desc' => 'Hand-feel studies, component enclosure constraints, and rough sketching.'],
                    ['title' => '3D Surface Modeling', 'desc' => 'Building precision CAD models with parting-line and draft angle logic.'],
                    ['title' => 'CMF Specification', 'desc' => 'Finalizing surface textures, anodization shades, and tolerance logs.'],
                ],
                'technologies' => [
                    ['name' => 'SolidWorks', 'desc' => 'For parametric CAD engineering and mechanical tolerances.'],
                    ['name' => 'Blender 3D', 'desc' => 'For organic surface modeling, material shaders, and animation.'],
                    ['name' => 'Figma', 'desc' => 'For digital ergonomics, interactive touch-points, and CMF specs.'],
                    ['name' => 'Adobe Illustrator', 'desc' => 'For vector technical schematics and product decals.'],
                    ['name' => 'Adobe Photoshop', 'desc' => 'For concept rendering, texture mapping, and lighting passes.'],
                ],
                'settings' => [
                    'timeline' => '6-10 weeks',
                    'ideal_project' => 'Hardware teams preparing for initial tooling or injection-molding runs.',
                    'outcome' => 'Tooling-ready 3D CAD files paired with an iconic industrial form factor.',
                ],
            ]
        );
        Service::updateOrCreate(
            ['slug' => 'printing-services'],
            [
                'category_id' => $categoriesMap['brand-experience'],
                'name' => 'Print Asset Sanitation & Proofing',
                'description' => 'Pre-flight file preparation, color-profile trapping, and press-check supervision for critical print runs.',
                'is_featured' => false,
                'is_enabled' => true,
                'sort_order' => 5,
                'problem_solution' => [
                    'problem' => 'RGB-to-CMYK shifts, incorrect bleed alignments, and font rasterization ruin expensive print runs.',
                    'solution' => 'We run comprehensive pre-flight sanitation, trapping corrections, and density calibrations before ink touches paper.',
                ],
                'deliverables' => [
                    ['title' => 'Pre-Flight Sanitation Report', 'description' => 'Diagnostic of ink limits, resolution thresholds, and trapping zones.'],
                    ['title' => 'Press-Ready Master PDFs', 'description' => 'PDF/X-1a files with embedded ICC profiles and crop registers.'],
                    ['title' => 'Color Proof Sign-Off Deck', 'description' => 'Spectral delta-E verification logs against target Pantone swatches.'],
                ],
                'process_timeline' => [
                    ['title' => 'Asset Ingestion & Scan', 'desc' => 'Deep-scanning incoming artwork for low-res bitmaps and color mismatches.'],
                    ['title' => 'Trapping & Color Remapping', 'desc' => 'Applying overprint rules, rich-black calibrations, and spot separations.'],
                    ['title' => 'Final Sign-Off Proofing', 'desc' => 'Generating press-ready composite PDFs for offset or digital machinery.'],
                ],
                'technologies' => [
                    ['name' => 'Adobe Acrobat Pro', 'desc' => 'For pre-press verification, bleed inspection, and PDF/X-1a output.'],
                    ['name' => 'Adobe Illustrator', 'desc' => 'For spot UV, foil stamp, and die-cut layer separations.'],
                    ['name' => 'Adobe InDesign', 'desc' => 'For large-run catalog imposition and color profile binding.'],
                    ['name' => 'Adobe Photoshop', 'desc' => 'For high-DPI image upscaling and CMYK density calibration.'],
                ],
                'settings' => [
                    'timeline' => '1-2 weeks',
                    'ideal_project' => 'High-value annual reports, packaging runs, or luxury catalogs heading to offset press.',
                    'outcome' => 'Flawless print output with zero color shift or production waste.',
                ],
            ]
        );
        Service::updateOrCreate(
            ['slug' => 'design-systems'],
            [
                'category_id' => $categoriesMap['brand-experience'],
                'name' => 'Design Systems & Token Architecture',
                'description' => 'Tokenized multi-platform design systems bridging Figma, Tailwind, and React component libraries.',
                'is_featured' => false,
                'is_enabled' => true,
                'sort_order' => 6,
                'problem_solution' => [
                    'problem' => 'Fragmented UI components slow down engineering velocity and create visual dissonance across web and mobile products.',
                    'solution' => 'We construct unified design token architectures that compile directly into production-ready Tailwind and React tokens.',
                ],
                'deliverables' => [
                    ['title' => 'Comprehensive Figma Token Library', 'description' => 'Atomic color, typography, spacing, and elevation tokens.'],
                    ['title' => 'Component Code Registry', 'description' => 'Accessible, headless React components mapped 1:1 with design tokens.'],
                    ['title' => 'Documentation & Governance Guide', 'description' => 'Guidelines for team contribution, versioning, and token deprecation.'],
                ],
                'process_timeline' => [
                    ['title' => 'UI Inventory Audit', 'desc' => 'Cataloging duplicate styles, colors, and components across existing codebases.'],
                    ['title' => 'Token Matrix Construction', 'desc' => 'Defining semantic variables, dark-mode tokens, and responsive breakpoints.'],
                    ['title' => 'Engineering Bridge Deployment', 'desc' => 'Setting up automated token sync from Figma into Tailwind configuration files.'],
                ],
                'technologies' => [
                    ['name' => 'Figma', 'desc' => 'Atomic design component libraries, auto-layout, and token definitions.'],
                    ['name' => 'Adobe XD', 'desc' => 'Enterprise UI kits, symbol hierarchies, and documentation specs.'],
                    ['name' => 'Tailwind CSS', 'desc' => 'Automated design-token translation into utility class architecture.'],
                    ['name' => 'TypeScript', 'desc' => 'Strict component prop interfaces and typed design token exports.'],
                    ['name' => 'React', 'desc' => 'Accessible, headless component primitives with ARIA compliance.'],
                    ['name' => 'Sketch', 'desc' => 'Shared symbol libraries and cross-team visual asset repos.'],
                ],
                'settings' => [
                    'timeline' => '4-8 weeks',
                    'ideal_project' => 'Growing product teams needing a unified design foundation to scale engineering velocity.',
                    'outcome' => 'A centralized, automated design system slashing UI delivery time by 50%.',
                ],
            ]
        );
        Service::updateOrCreate(
            ['slug' => 'motion-design'],
            [
                'category_id' => $categoriesMap['brand-experience'],
                'name' => 'Motion Design & Choreography',
                'description' => 'High-performance UI micro-interactions, Lottie animations, and 60fps interactive gesture transitions.',
                'is_featured' => false,
                'is_enabled' => true,
                'sort_order' => 7,
                'problem_solution' => [
                    'problem' => 'Static, lifeless interfaces feel sluggish and fail to guide user attention toward high-value conversion actions.',
                    'solution' => 'We engineer buttery-smooth 60fps spring-physics motion systems that feel tactile, responsive, and alive.',
                ],
                'deliverables' => [
                    ['title' => 'Lottie & SVG Animation Suite', 'description' => 'Lightweight JSON motion files optimized for instant web playback.'],
                    ['title' => 'Framer Motion Choreography Deck', 'description' => 'Reusable spring easing presets and layout animation hooks.'],
                    ['title' => 'Interactive Gesture Prototypes', 'description' => 'Touch-reactive swipe, pull, and drag physics implementations.'],
                ],
                'process_timeline' => [
                    ['title' => 'Choreography Storyboarding', 'desc' => 'Mapping motion curves, spatial hierarchy, and kinetic timing.'],
                    ['title' => 'Vector Keyframe Animation', 'desc' => 'Crafting micro-interactions and illustration sequences in After Effects.'],
                    ['title' => 'Web Runtime Optimization', 'desc' => 'Compiling to GPU-accelerated Lottie and GSAP code with reduced bundle size.'],
                ],
                'technologies' => [
                    ['name' => 'After Effects & Lottie', 'desc' => 'Keyframe animation rendering lightweight JSON vector playback.'],
                    ['name' => 'GSAP & ScrollTrigger', 'desc' => 'Hardware-accelerated web animation timelines and scroll triggers.'],
                    ['name' => 'Framer Motion', 'desc' => 'Spring-physics UI choreography and layout-shift animations.'],
                    ['name' => 'Blender 3D', 'desc' => 'Spatial 3D motion graphics, camera moves, and particle bursts.'],
                    ['name' => 'Adobe Illustrator', 'desc' => 'Vector asset preparation and anchor point optimization for motion.'],
                ],
                'settings' => [
                    'timeline' => '2-4 weeks',
                    'ideal_project' => 'Modern digital products looking to elevate their polish with world-class micro-interactions.',
                    'outcome' => 'Delightful, buttery-smooth 60fps micro-interactions with zero performance cost.',
                ],
            ]
        );
        Service::updateOrCreate(
            ['slug' => 'web-design'],
            [
                'category_id' => $categoriesMap['digital-products'],
                'name' => 'Custom Web Design & Art Direction',
                'description' => 'Bespoke, cinematic web design with custom art direction, fluid responsive typography, and high-conversion visual hierarchy across Figma, Adobe XD, Photoshop, Illustrator, and Framer.',
                'is_featured' => true,
                'is_enabled' => true,
                'sort_order' => 8,
                'problem_solution' => [
                    'problem' => 'Generic website templates and outdated aesthetics fail to impress high-value prospects and reflect poorly on your product quality.',
                    'solution' => 'We design custom, award-winning digital experiences from scratch with bespoke art direction, interactive prototypes, and modular design tokens.',
                ],
                'deliverables' => [
                    ['title' => 'High-Fidelity Design Systems', 'description' => 'Complete multi-breakpoint responsive UI layouts across Figma and Adobe XD.'],
                    ['title' => 'Design Token Architecture', 'description' => 'Tailwind-ready color palettes, type scales, and spacing token libraries.'],
                    ['title' => 'Custom Vector & Asset Library', 'description' => 'Handcrafted icons, Photoshop retouching, and Illustrator graphics.'],
                ],
                'process_timeline' => [
                    ['title' => 'Brand & Visual Discovery', 'desc' => 'Moodboarding, competitor positioning audit, and art direction alignment.'],
                    ['title' => 'Wireframing & UX Flow', 'desc' => 'Architecting intuitive user journeys and high-conversion wireframes.'],
                    ['title' => 'High-Fidelity Visual Design', 'desc' => 'Crafting pixel-perfect responsive layouts and micro-interaction states.'],
                ],
                'technologies' => [
                    ['name' => 'Figma', 'desc' => 'For collaborative multi-breakpoint component systems, auto-layout, and prototyping.'],
                    ['name' => 'Adobe XD', 'desc' => 'For wireframe flows, interactive micro-states, and client design reviews.'],
                    ['name' => 'Adobe Photoshop', 'desc' => 'For high-end creative photo manipulation, luxury visual assets, and textures.'],
                    ['name' => 'Adobe Illustrator', 'desc' => 'For precision vector graphics, custom iconography, and brand marks.'],
                    ['name' => 'Sketch', 'desc' => 'For enterprise UI kits, symbols, and vector art direction.'],
                    ['name' => 'Framer & Webflow', 'desc' => 'For interactive visual canvas prototyping, transitions, and staging.'],
                    ['name' => 'InVision & Principle', 'desc' => 'For high-fidelity UX motion choreography and stakeholder walk-throughs.'],
                    ['name' => 'Tailwind CSS & CSS Grid', 'desc' => 'For design-token compliant responsive styling specifications.'],
                    ['name' => 'Blender 3D', 'desc' => 'For custom spatial 3D elements, glass spheres, and isometric illustrations.'],
                    ['name' => 'Lottie & After Effects', 'desc' => 'For lightweight vector animation exports and interactive loops.'],
                ],
                'settings' => [
                    'timeline' => '3-5 weeks',
                    'ideal_project' => 'Brands seeking a distinctive, world-class digital flagship presence that stands out.',
                    'outcome' => 'A custom, award-caliber web design that commands authority and drives conversions.',
                ],
            ]
        );
        Service::updateOrCreate(
            ['slug' => 'website-redesign'],
            [
                'category_id' => $categoriesMap['digital-products'],
                'name' => 'Website Redesign & Modernization',
                'description' => 'Transforming legacy, slow websites into lightning-fast, high-converting digital flagships without losing SEO rankings.',
                'is_featured' => true,
                'is_enabled' => true,
                'sort_order' => 9,
                'problem_solution' => [
                    'problem' => 'Legacy websites with outdated design, sluggish page load times, and poor mobile UX leak revenue and hurt brand perception.',
                    'solution' => 'We overhaul your entire web presence with a ground-up redesign, modern tech stack, sub-second page speed, and strict SEO redirect preservation.',
                ],
                'deliverables' => [
                    ['title' => 'Modernized Visual Identity & UI', 'description' => 'Contemporary, dark/light mode responsive layout tailored for modern buyers.'],
                    ['title' => 'Sub-Second Speed Architecture', 'description' => 'Replaced legacy bloat with high-performance Laravel and React architecture.'],
                    ['title' => 'SEO Equity & 301 Migration Map', 'description' => 'Comprehensive URL mapping ensuring 100% preservation of search rankings.'],
                ],
                'process_timeline' => [
                    ['title' => 'Legacy Audit & Heatmap Analysis', 'desc' => 'Diagnosing user drop-offs, slow queries, and SEO ranking keywords.'],
                    ['title' => 'Modern Architecture & UI Design', 'desc' => 'Drafting high-conversion layouts, modern typography, and fast user flows.'],
                    ['title' => 'Migration, Testing & Relaunch', 'desc' => 'Safe data migration, 301 redirect setup, speed optimization, and launch.'],
                ],
                'technologies' => [
                    ['name' => 'Figma', 'desc' => 'Modern visual redesign system with updated branding and tokens.'],
                    ['name' => 'Adobe XD', 'desc' => 'User flow wireframes comparing legacy vs modern interaction steps.'],
                    ['name' => 'Laravel', 'desc' => 'Seamless legacy code migration and 301 redirect SEO protection.'],
                    ['name' => 'React & Next.js', 'desc' => 'Sub-second SPA page speed replacing slow legacy monolithic sites.'],
                    ['name' => 'Tailwind CSS & Bootstrap', 'desc' => 'Clean modern responsive CSS replacing bloated legacy stylesheets.'],
                    ['name' => 'Google Search Console', 'desc' => 'Preserving all existing search ranking equity during relaunch.'],
                    ['name' => 'Lighthouse', 'desc' => 'Verifying 90+ performance scores across all modernized templates.'],
                ],
                'settings' => [
                    'timeline' => '4-7 weeks',
                    'ideal_project' => 'Companies with 3+ year old websites struggling with slow load times and low conversion rates.',
                    'outcome' => 'A modernized, ultra-fast website that drives 2-3x higher user conversions.',
                ],
            ]
        );
        Service::updateOrCreate(
            ['slug' => 'mobile-app-design'],
            [
                'category_id' => $categoriesMap['digital-products'],
                'name' => 'Native Mobile App UI/UX Design',
                'description' => 'Pixel-perfect mobile application interface and user experience design for iOS and Android with strict HIG and Material 3 compliance.',
                'is_featured' => true,
                'is_enabled' => true,
                'sort_order' => 10,
                'problem_solution' => [
                    'problem' => 'Poor mobile UX, clumsy navigation, and uninspired app design result in immediate uninstalls and low App Store ratings.',
                    'solution' => 'We design intuitive, gesture-driven mobile app experiences that users love, adhering strictly to Apple HIG and Google Material guidelines.',
                ],
                'deliverables' => [
                    ['title' => 'Complete iOS & Android UI Kit', 'description' => 'Production-ready screen layouts for all mobile screen sizes and notches.'],
                    ['title' => 'Interactive Gesture Prototypes', 'description' => 'Tactile prototype demonstrations with fluid page transitions and haptics.'],
                    ['title' => 'App Store & Play Store Assets', 'description' => 'High-converting screenshots, icon vectors, and feature banners.'],
                ],
                'process_timeline' => [
                    ['title' => 'Mobile UX Flow & Wireframes', 'desc' => 'Mapping thumb zones, bottom navigation tabs, and onboarding journeys.'],
                    ['title' => 'High-Fidelity Visual Styling', 'desc' => 'Designing dark/light mode UI components, cards, and modal sheets.'],
                    ['title' => 'Developer Handover & Specs', 'desc' => 'Exporting inspectable Figma tokens, SVG icons, and animation JSON.'],
                ],
                'technologies' => [
                    ['name' => 'Figma', 'desc' => 'Pixel-perfect mobile UI design with native iOS and Android kits.'],
                    ['name' => 'Adobe XD', 'desc' => 'Interactive mobile prototyping with gesture and swipe transitions.'],
                    ['name' => 'Sketch', 'desc' => 'Reusable mobile UI component symbols and design libraries.'],
                    ['name' => 'Apple iOS', 'desc' => 'Human Interface Guidelines (HIG) compliance for App Store approval.'],
                    ['name' => 'Android SDK', 'desc' => 'Material Design 3 system compliance for Google Play devices.'],
                    ['name' => 'After Effects & Lottie', 'desc' => 'Fluid mobile micro-interactions, haptic feedback, and loaders.'],
                    ['name' => 'Framer', 'desc' => 'Interactive mobile canvas staging for real-device usability testing.'],
                ],
                'settings' => [
                    'timeline' => '4-6 weeks',
                    'ideal_project' => 'Startups and enterprises launching new iOS and Android mobile apps.',
                    'outcome' => 'An engaging, intuitive mobile app design ready for native or cross-platform engineering.',
                ],
            ]
        );
        Service::updateOrCreate(
            ['slug' => 'ui-ux'],
            [
                'category_id' => $categoriesMap['digital-products'],
                'name' => 'Experience Design (UI/UX)',
                'description' => 'High-fidelity interface layouts, typography specs, and user experience maps designed to maximize user engagement.',
                'is_featured' => true,
                'is_enabled' => true,
                'sort_order' => 11,
                'problem_solution' => [
                    'problem' => 'Confusing navigation, disjointed information architecture, and unvalidated user flows create high bounce rates.',
                    'solution' => 'We create ergonomic user journeys, clear information hierarchy, and high-fidelity prototypes tested against real user tasks.',
                ],
                'deliverables' => [
                    ['title' => 'User Journey & Flow Maps', 'description' => 'Architectural maps detailing every user decision branch and error state.'],
                    ['title' => 'High-Fidelity UI Screens', 'description' => 'Component-driven Figma layouts with responsive auto-layout logic.'],
                    ['title' => 'Interactive Clickable Prototype', 'description' => 'Realistic prototype validating micro-interactions and transitions.'],
                ],
                'process_timeline' => [
                    ['title' => 'UX Research & Wireframing', 'desc' => 'Information architecture, low-fidelity wireframes, and usability mapping.'],
                    ['title' => 'Visual UI Crafting', 'desc' => 'Applying color tokens, typography scales, and rich component states.'],
                    ['title' => 'Prototyping & Validation', 'desc' => 'Building interactive flows and testing with representative user groups.'],
                ],
                'technologies' => [
                    ['name' => 'Figma', 'desc' => 'For collaborative design systems, auto-layout, and interactive prototypes.'],
                    ['name' => 'Adobe XD', 'desc' => 'For rapid user flow validation, wireframing, and stakeholder walk-throughs.'],
                    ['name' => 'Sketch', 'desc' => 'For modular UI symbol architecture and cross-platform design kits.'],
                    ['name' => 'Framer', 'desc' => 'For production-grade interactive micro-interactions and staging.'],
                    ['name' => 'InVision', 'desc' => 'For user journey validation and design feedback collaboration.'],
                    ['name' => 'After Effects & Lottie', 'desc' => 'For fluid motion choreography and vector UI animation.'],
                    ['name' => 'Tailwind CSS', 'desc' => 'For strict design-token alignment with engineering codebases.'],
                ],
                'settings' => [
                    'timeline' => '4-6 weeks',
                    'ideal_project' => 'SaaS platforms or client portals needing intuitive web interfaces.',
                    'outcome' => 'User-tested layout designs with documented design systems.',
                ],
            ]
        );
        Service::updateOrCreate(
            ['slug' => 'web-app-development'],
            [
                'category_id' => $categoriesMap['digital-products'],
                'name' => 'Full-Stack Enterprise Systems',
                'description' => 'Architecting robust web applications with Laravel, React, Inertia, and Postgres database pipelines.',
                'is_featured' => true,
                'is_enabled' => true,
                'sort_order' => 12,
                'problem_solution' => [
                    'problem' => 'SaaS businesses struggle with fragmented backend architectures, slow data loading, and chaotic state management.',
                    'solution' => 'We engineer secure database structures using Laravel, Filament admin panels, and fully synchronized state hooks.',
                ],
                'deliverables' => [
                    ['title' => 'Laravel Backend Application', 'description' => 'PHP backend code complying with PSR-12 conventions.'],
                    ['title' => 'React Frontend SPA', 'description' => 'Component architecture integrated via Inertia.js with no manual REST glue.'],
                    ['title' => 'Database Migrations & Schema', 'description' => 'PostgreSQL schemas with optimized foreign-key indexes.'],
                ],
                'process_timeline' => [
                    ['title' => 'Data Modeling', 'desc' => 'Database schema mapping, indexing plans, and entity relationship diagrams.'],
                    ['title' => 'Full-Stack Implementation', 'desc' => 'Building controllers, middleware, and reactive UI components in tandem.'],
                    ['title' => 'Testing & Hardening', 'desc' => 'Writing Pest tests and validating endpoint response times under load.'],
                ],
                'technologies' => [
                    ['name' => 'Laravel', 'desc' => 'Robust enterprise MVC backend with queues, events, and Eloquent ORM.'],
                    ['name' => 'Core PHP & CakePHP', 'desc' => 'High-speed PHP runtime, custom controllers, and legacy migration.'],
                    ['name' => 'React & Next.js', 'desc' => 'Concurrent UI components with SSR and optimized client hydration.'],
                    ['name' => 'Vue.js', 'desc' => 'Reactive frontend framework with Composition API and Pinia state.'],
                    ['name' => 'Inertia.js', 'desc' => 'Seamless monolith bridge coupling Laravel routing with client SPAs.'],
                    ['name' => 'TypeScript', 'desc' => 'End-to-end static type safety across frontend and API boundaries.'],
                    ['name' => 'PostgreSQL & MySQL', 'desc' => 'ACID-compliant relational database cluster with sub-20ms queries.'],
                    ['name' => 'Redis', 'desc' => 'High-throughput in-memory caching, session store, and queue broker.'],
                    ['name' => 'Docker', 'desc' => 'Isolated container runtimes with automated CI/CD pipeline deployment.'],
                    ['name' => 'Tailwind CSS', 'desc' => 'Utility-first modern styling engine with zero CSS bloat.'],
                ],
                'settings' => [
                    'timeline' => '6-12 weeks',
                    'ideal_project' => 'Complex internal tools, transactional dashboards, and high-velocity SaaS products.',
                    'outcome' => 'A scalable web platform with sub-50ms database response budgets.',
                ],
            ]
        );
        Service::updateOrCreate(
            ['slug' => 'app-development'],
            [
                'category_id' => $categoriesMap['digital-products'],
                'name' => 'Cross-Platform Mobile Products',
                'description' => 'Developing fluid mobile applications with React Native and native runtime integrations.',
                'is_featured' => true,
                'is_enabled' => true,
                'sort_order' => 13,
                'problem_solution' => [
                    'problem' => 'Maintaining dual iOS and Android codebases doubles engineering costs and leads to diverging feature parity.',
                    'solution' => 'We build single-codebase React Native applications that deliver true 60fps native feel across both mobile operating systems.',
                ],
                'deliverables' => [
                    ['title' => 'React Native Application Bundle', 'description' => 'TypeScript codebase targeting iOS and Android simultaneously.'],
                    ['title' => 'Offline-First Storage Pipeline', 'description' => 'Local SQLite sync ensuring the app works smoothly without connectivity.'],
                    ['title' => 'Push Notification Pipeline', 'description' => 'Configured APNs and Firebase Cloud Messaging notification dispatch.'],
                ],
                'process_timeline' => [
                    ['title' => 'Architecture & State Setup', 'desc' => 'Configuring navigation stacks, local databases, and authentication tokens.'],
                    ['title' => 'Feature Development', 'desc' => 'Building screens, camera/biometric hooks, and native module bridges.'],
                    ['title' => 'Store Submission Readiness', 'desc' => 'Sign-off against Apple HIG and Google Play policy standards.'],
                ],
                'technologies' => [
                    ['name' => 'React Native', 'desc' => 'Cross-platform mobile applications with native UI performance.'],
                    ['name' => 'Flutter', 'desc' => 'High-performance compiled native apps for iOS and Android.'],
                    ['name' => 'Apple iOS', 'desc' => 'Native iOS framework integration, Swift, and App Store compliance.'],
                    ['name' => 'Android SDK', 'desc' => 'Kotlin native Android architecture and Google Play deployment.'],
                    ['name' => 'TypeScript', 'desc' => 'Strict typed contracts for mobile stores, reducers, and APIs.'],
                    ['name' => 'Firebase', 'desc' => 'Cloud Firestore, real-time sync, and mobile push notifications.'],
                    ['name' => 'Supabase', 'desc' => 'PostgreSQL backend with instant row-level security and auth.'],
                    ['name' => 'Tailwind CSS', 'desc' => 'NativeWind styling engine for uniform responsive mobile UI.'],
                ],
                'settings' => [
                    'timeline' => '6-10 weeks',
                    'ideal_project' => 'Consumer utilities, field service apps, and mobile companions to existing SaaS.',
                    'outcome' => 'A production mobile app ready for App Store and Google Play distribution.',
                ],
            ]
        );
        Service::updateOrCreate(
            ['slug' => 'saas-platforms'],
            [
                'category_id' => $categoriesMap['digital-products'],
                'name' => 'Multi-Tenant SaaS Architecture',
                'description' => 'Subscription billing, team workspace isolation, and automated onboarding funnels engineered for scale.',
                'is_featured' => false,
                'is_enabled' => true,
                'sort_order' => 14,
                'problem_solution' => [
                    'problem' => 'Early-stage SaaS products get stuck when retrofitting multi-tenancy, subscription tiers, and team role permissions.',
                    'solution' => 'We build turnkey multi-tenant scaffolding with automated workspace provisioning, Stripe billing, and granular RBAC.',
                ],
                'deliverables' => [
                    ['title' => 'Multi-Tenant Data Scaffolding', 'description' => 'Isolated database schemas per tenant with automated tenant routing.'],
                    ['title' => 'Subscription Billing Engine', 'description' => 'Stripe integration with metered usage, trials, and proration handling.'],
                    ['title' => 'Team & Permission Controls', 'description' => 'Role-based access control (Admin, Member, Viewer) with invite links.'],
                ],
                'process_timeline' => [
                    ['title' => 'Tenancy & Data Isolation', 'desc' => 'Establishing tenant resolution middleware and scoped database models.'],
                    ['title' => 'Billing & Account Workflows', 'desc' => 'Building checkout sessions, portal redirects, and webhook listeners.'],
                    ['title' => 'Telemetry & Launch', 'desc' => 'Configuring churn monitoring, trial expiration jobs, and health checks.'],
                ],
                'technologies' => [
                    ['name' => 'Laravel', 'desc' => 'Multi-tenant database architectures, subscriptions, and RBAC.'],
                    ['name' => 'Core PHP', 'desc' => 'High-performance backend modules and custom enterprise logic.'],
                    ['name' => 'React & Next.js', 'desc' => 'Interactive customer dashboards, data tables, and analytics charts.'],
                    ['name' => 'Vue.js', 'desc' => 'Lightweight reactive portal components with instant UI reactivity.'],
                    ['name' => 'Inertia.js', 'desc' => 'Modern monolith bridge pairing Laravel controllers with React/Vue.'],
                    ['name' => 'PostgreSQL & MySQL', 'desc' => 'Isolated schema tenancy with automated backup encryption.'],
                    ['name' => 'Redis', 'desc' => 'Real-time telemetry cache and background job queue manager.'],
                    ['name' => 'Docker & Cloudflare', 'desc' => 'Scalable container clusters with global DDoS and SSL defense.'],
                    ['name' => 'Tailwind CSS', 'desc' => 'Design token system powering uniform multi-screen SaaS styling.'],
                ],
                'settings' => [
                    'timeline' => '8-14 weeks',
                    'ideal_project' => 'B2B software ventures needing a bulletproof foundation for subscription monetization.',
                    'outcome' => 'An enterprise-grade multi-tenant SaaS ready to onboard paying customers.',
                ],
            ]
        );
        Service::updateOrCreate(
            ['slug' => 'ecommerce-platforms'],
            [
                'category_id' => $categoriesMap['digital-products'],
                'name' => 'Custom Storefronts & E-Commerce',
                'description' => 'High-conversion checkout pipelines, inventory reconciliation, and custom commerce storefronts.',
                'is_featured' => false,
                'is_enabled' => true,
                'sort_order' => 15,
                'problem_solution' => [
                    'problem' => 'Generic commerce templates suffer from slow checkout latency, abandoned carts, and fragile inventory sync.',
                    'solution' => 'We engineer custom, headless commerce experiences with instant product filtering and frictionless checkout flows.',
                ],
                'deliverables' => [
                    ['title' => 'High-Speed Storefront Application', 'description' => 'Server-rendered product catalog with instant client-side filtering.'],
                    ['title' => 'Transactional Checkout Engine', 'description' => 'Multi-gateway payment processing with automated tax calculations.'],
                    ['title' => 'Inventory Sync Webhooks', 'description' => 'Real-time stock reservation with ERP/warehouse webhook bridges.'],
                ],
                'process_timeline' => [
                    ['title' => 'Catalog & Cart Architecture', 'desc' => 'Modeling product variants, attribute matrixes, and cart session caches.'],
                    ['title' => 'Checkout & Payment Integration', 'desc' => 'Implementing Stripe Elements, one-click checkout, and fraud checks.'],
                    ['title' => 'Order Pipeline Stress-Testing', 'desc' => 'Load-testing concurrent cart checkouts and inventory locking under flash sales.'],
                ],
                'technologies' => [
                    ['name' => 'Laravel', 'desc' => 'Custom e-commerce cart engines, inventory sync, and order pipelines.'],
                    ['name' => 'WordPress', 'desc' => 'Custom WooCommerce store builds and headless WP architectures.'],
                    ['name' => 'React & Next.js', 'desc' => 'Sub-second headless storefronts with instant product filtering.'],
                    ['name' => 'Inertia.js', 'desc' => 'Fast full-stack checkout flows with zero-latency page transitions.'],
                    ['name' => 'PostgreSQL & MySQL', 'desc' => 'ACID-safe transactional checkout databases with row locking.'],
                    ['name' => 'Redis', 'desc' => 'In-memory cart sessions and real-time inventory counter caching.'],
                    ['name' => 'Tailwind CSS & Bootstrap', 'desc' => 'Mobile-optimized product grids and high-converting checkout forms.'],
                ],
                'settings' => [
                    'timeline' => '6-10 weeks',
                    'ideal_project' => 'Direct-to-consumer brands and high-volume merchants outgrowing off-the-shelf templates.',
                    'outcome' => 'A lightning-fast, high-converting custom e-commerce store with zero vendor lock-in.',
                ],
            ]
        );
        Service::updateOrCreate(
            ['slug' => 'internal-portals'],
            [
                'category_id' => $categoriesMap['digital-products'],
                'name' => 'Enterprise Admin Dashboards & Portals',
                'description' => 'Bespoke operational panels, partner portals, and staff workflow management hubs built with Filament and React.',
                'is_featured' => false,
                'is_enabled' => true,
                'sort_order' => 16,
                'problem_solution' => [
                    'problem' => 'Operations teams waste thousands of hours manually copying data between messy spreadsheets and disjointed tools.',
                    'solution' => 'We build streamlined, type-safe internal admin portals with automated bulk actions, audit trails, and instant search.',
                ],
                'deliverables' => [
                    ['title' => 'Filament Admin Control Center', 'description' => 'Custom resource tables, relationship managers, and batch operations.'],
                    ['title' => 'Granular Audit Logging', 'description' => 'Complete change logs tracking every record edit, status change, and user IP.'],
                    ['title' => 'Custom Business Logic Actions', 'description' => 'One-click automated workflows (invoicing, refunds, PDF generation).'],
                ],
                'process_timeline' => [
                    ['title' => 'Workflow & Role Mapping', 'desc' => 'Interviewing staff, identifying bottlenecks, and defining permission tiers.'],
                    ['title' => 'Resource & Dashboard Build', 'desc' => 'Constructing resource schemas, interactive charts, and batch action buttons.'],
                    ['title' => 'Staff Onboarding & Security Sign-Off', 'desc' => 'Enforcing 2FA, session timeout policies, and running user acceptance testing.'],
                ],
                'technologies' => [
                    ['name' => 'Filament', 'desc' => 'Type-safe, modern admin dashboards with powerful resource tables.'],
                    ['name' => 'Laravel', 'desc' => 'Enterprise backend with role-based permissions and audit logs.'],
                    ['name' => 'Core PHP', 'desc' => 'High-speed business logic execution and enterprise ERP integrations.'],
                    ['name' => 'React & Inertia.js', 'desc' => 'Custom interactive workflow widgets and live data visualizations.'],
                    ['name' => 'PostgreSQL & MySQL', 'desc' => 'Relational database warehousing with complex analytical queries.'],
                    ['name' => 'Tailwind CSS', 'desc' => 'Clean, high-density dashboard layouts optimized for enterprise staff.'],
                ],
                'settings' => [
                    'timeline' => '3-6 weeks',
                    'ideal_project' => 'Operational teams and service businesses replacing manual spreadsheet workflows.',
                    'outcome' => 'A centralized operational control hub that eliminates manual overhead.',
                ],
            ]
        );
        Service::updateOrCreate(
            ['slug' => 'web-development'],
            [
                'category_id' => $categoriesMap['engineering'],
                'name' => 'Modern Web Development & CMS Engineering',
                'description' => 'Clean, lightning-fast full-stack web development across Laravel, Core PHP, CakePHP, React, Vue.js, Inertia, WordPress, and Headless CMS architectures.',
                'is_featured' => true,
                'is_enabled' => true,
                'sort_order' => 17,
                'problem_solution' => [
                    'problem' => 'Bloated legacy codebases, fragmented stacks, and fragile plugins create slow page loads, security vulnerabilities, and painful content management.',
                    'solution' => 'We engineer rock-solid, maintainable web applications across modern frameworks and robust enterprise PHP/JS ecosystems with sub-second performance.',
                ],
                'deliverables' => [
                    ['title' => 'Full-Stack Web Architecture', 'description' => 'Production-ready Laravel, Core PHP, React, or Vue.js application.'],
                    ['title' => 'Intuitive Admin CMS Portal', 'description' => 'Custom Filament or headless CMS control panel for friction-free publishing.'],
                    ['title' => 'SEO & Speed Optimization', 'description' => 'Server-side rendering, semantic schema markup, and sub-second asset delivery.'],
                ],
                'process_timeline' => [
                    ['title' => 'Architecture & Schema Planning', 'desc' => 'Database modeling, route design, and third-party API integration planning.'],
                    ['title' => 'Frontend & Backend Engineering', 'desc' => 'Developing responsive components, controller logic, and reactive states.'],
                    ['title' => 'Testing & Production Deployment', 'desc' => 'Comprehensive Pest test coverage, SSL setup, and zero-downtime deployment.'],
                ],
                'technologies' => [
                    ['name' => 'Laravel', 'desc' => 'Robust enterprise backend with elegant routing, queues, and Eloquent ORM.'],
                    ['name' => 'Core PHP & CakePHP', 'desc' => 'Native high-performance PHP runtime, CakePHP, and custom MVC patterns.'],
                    ['name' => 'React & Next.js', 'desc' => 'Component-based UI engine with modern concurrency, SSR, and reactive state.'],
                    ['name' => 'Vue.js', 'desc' => 'Progressive, highly reactive frontend framework with Composition API.'],
                    ['name' => 'Inertia.js', 'desc' => 'Modern monolith bridge pairing backend controllers with client-side SPAs.'],
                    ['name' => 'WordPress & Headless CMS', 'desc' => 'Custom Gutenberg blocks, headless WP REST/GraphQL APIs, and theme engineering.'],
                    ['name' => 'Tailwind CSS & Bootstrap', 'desc' => 'Modern utility-first styling and flexible enterprise grid systems.'],
                    ['name' => 'TypeScript & JavaScript', 'desc' => 'Strict end-to-end type safety, modern ES standards, and modular architecture.'],
                    ['name' => 'Node.js & Express', 'desc' => 'Fast asynchronous server runtimes, microservices, and webhook listeners.'],
                    ['name' => 'PostgreSQL & MySQL', 'desc' => 'High-throughput ACID relational database storage with sub-20ms indexing.'],
                    ['name' => 'Docker & Cloudflare', 'desc' => 'Containerized isolated environments and global edge CDN caching.'],
                    ['name' => 'HTMX & WebSockets', 'desc' => 'Real-time live updates, push events, and lightweight dynamic hypermedia.'],
                ],
                'settings' => [
                    'timeline' => '4-8 weeks',
                    'ideal_project' => 'Companies requiring a custom, scalable web platform without third-party plugin bloat.',
                    'outcome' => 'Blazing-fast, maintainable web application with effortless content management.',
                ],
            ]
        );
        Service::updateOrCreate(
            ['slug' => 'website-design-development'],
            [
                'category_id' => $categoriesMap['engineering'],
                'name' => 'Cinematic Creative Engineering (3D & WebGL)',
                'description' => 'Hardware-accelerated web experiences, Three.js spatial canvases, and interactive GLSL fragment shaders.',
                'is_featured' => true,
                'is_enabled' => true,
                'sort_order' => 18,
                'problem_solution' => [
                    'problem' => 'Most marketing websites look identical, lacking the immersive kinetic visual polish needed to command high prestige.',
                    'solution' => 'We engineer high-performance WebGL 3D scenes and fluid GSAP scroll timelines that maintain solid 60fps frame rates.',
                ],
                'deliverables' => [
                    ['title' => 'Three.js Spatial Canvas', 'description' => 'Optimized 3D geometry with custom materials, lighting, and camera controllers.'],
                    ['title' => 'GLSL Shader Pipeline', 'description' => 'Hardware-accelerated fragment and vertex shaders for generative ripples and distortion.'],
                    ['title' => 'GSAP Timeline Choreography', 'description' => 'ScrollTrigger timelines synchronized to precise user scroll velocity.'],
                ],
                'process_timeline' => [
                    ['title' => '3D Asset Optimization', 'desc' => 'Compressing GLTF/GLB meshes, baking ambient occlusion maps, and reducing draw calls.'],
                    ['title' => 'Shader & Canvas Integration', 'desc' => 'Wiring Three.js canvas into React layout with dynamic DPR scaling.'],
                    ['title' => 'Performance Profiling', 'desc' => 'Profiling GPU fill rates, memory leaks, and enforcing reduced-motion fallbacks.'],
                ],
                'technologies' => [
                    ['name' => 'Three.js & WebGL', 'desc' => 'Hardware-accelerated 3D spatial scenes, lighting, and cameras.'],
                    ['name' => 'React Three Fiber', 'desc' => 'Declarative Three.js components inside React component trees.'],
                    ['name' => 'GSAP & ScrollTrigger', 'desc' => 'Timeline-driven cinematic scroll animations and pin choreographies.'],
                    ['name' => 'Blender 3D', 'desc' => 'Custom 3D model authoring, GLTF optimization, and texture baking.'],
                    ['name' => 'Framer Motion', 'desc' => 'Physics-based spring gesture animations and layout transitions.'],
                    ['name' => 'Laravel & Inertia.js', 'desc' => 'Fast server-side backend routing paired with client-side canvas.'],
                    ['name' => 'Tailwind CSS', 'desc' => 'Modern CSS layout grid and responsive typography engine.'],
                ],
                'settings' => [
                    'timeline' => '4-8 weeks',
                    'ideal_project' => 'Luxury brands, tech product launches, and creative agencies aiming for Awwwards-level polish.',
                    'outcome' => 'A breathtaking 60fps WebGL digital flagship that sets a new industry standard.',
                ],
            ]
        );
        Service::updateOrCreate(
            ['slug' => 'mvp-development'],
            [
                'category_id' => $categoriesMap['engineering'],
                'name' => 'Rapid MVP Development for Startups',
                'description' => 'Turning startup concepts into battle-tested, revenue-ready production MVPs in 2-4 weeks with scalable architectures.',
                'is_featured' => true,
                'is_enabled' => true,
                'sort_order' => 19,
                'problem_solution' => [
                    'problem' => 'Startups burn runway on slow agency cycles and over-engineered stacks before validating market demand.',
                    'solution' => 'We engineer focused, production-grade MVPs with core features, authentication, payments, and analytics in rapid 14-day sprints.',
                ],
                'deliverables' => [
                    ['title' => 'Production Launchpad MVP', 'description' => 'Fully functional web or mobile application ready for immediate user onboarding.'],
                    ['title' => 'Stripe Monetization & Auth', 'description' => 'Turnkey billing, subscription plans, and secure user management.'],
                    ['title' => 'Scalable Database & API Foundation', 'description' => 'Clean PostgreSQL architecture ready to scale without needing rewrites.'],
                ],
                'process_timeline' => [
                    ['title' => 'Scope Pruning & Feature Freeze', 'desc' => 'Identifying the single core value proposition and discarding non-essential bloat.'],
                    ['title' => 'Sprint 1: Core Engine & Data Flow', 'desc' => 'Rapidly developing database models, API controllers, and primary user actions.'],
                    ['title' => 'Sprint 2: UI Polish, Payments & Launch', 'desc' => 'Integrating checkout, onboarding polish, analytics tracking, and going live.'],
                ],
                'technologies' => [
                    ['name' => 'Laravel', 'desc' => 'Rapid full-stack backend with built-in auth, queues, and migrations.'],
                    ['name' => 'Core PHP', 'desc' => 'High-performance custom logic and clean MVC architecture.'],
                    ['name' => 'React & Inertia.js', 'desc' => 'Modern reactive frontend SPA with frictionless server bridge.'],
                    ['name' => 'Vue.js', 'desc' => 'Progressive UI components built for fast iteration and features.'],
                    ['name' => 'PostgreSQL & MySQL', 'desc' => 'Scalable production database ready for startup growth.'],
                    ['name' => 'Tailwind CSS & Bootstrap', 'desc' => 'Speedy UI assembly with pre-built polished design patterns.'],
                    ['name' => 'Docker & Cloudflare', 'desc' => 'Instant staging deploy and global edge CDN distribution.'],
                ],
                'settings' => [
                    'timeline' => '2-4 weeks',
                    'ideal_project' => 'Early-stage founders needing to launch and acquire their first paying customers fast.',
                    'outcome' => 'A battle-tested production MVP deployed to users in under a month.',
                ],
            ]
        );
        Service::updateOrCreate(
            ['slug' => 'api-backends'],
            [
                'category_id' => $categoriesMap['engineering'],
                'name' => 'High-Throughput API Infrastructure',
                'description' => 'Designing RESTful and GraphQL API backends handling thousands of requests per second with sub-20ms latency.',
                'is_featured' => false,
                'is_enabled' => true,
                'sort_order' => 20,
                'problem_solution' => [
                    'problem' => 'Monolithic backends choke under concurrent spikes due to unindexed database queries and lack of caching.',
                    'solution' => 'We design high-throughput API gateways with Redis object caching, rate-limiting, and async queue pipelines.',
                ],
                'deliverables' => [
                    ['title' => 'OpenAPI / Swagger Documentation', 'description' => 'Interactive API documentation with auto-generated TypeScript schemas.'],
                    ['title' => 'Sub-20ms Indexed Endpoints', 'description' => 'Optimized Eloquent/SQL queries with Redis cache layers and eager loading.'],
                    ['title' => 'Token & OAuth2 Authentication', 'description' => 'Secure JWT token issuance with granular scope-based permission gates.'],
                ],
                'process_timeline' => [
                    ['title' => 'API Contract & Schema Design', 'desc' => 'Authoring JSON:API schemas, validation rules, and error response structures.'],
                    ['title' => 'Controller & Middleware Build', 'desc' => 'Implementing route controllers, rate limiting, and request transformation layers.'],
                    ['title' => 'Concurrency Benchmarking', 'desc' => 'Stress-testing endpoints with k6 to verify sub-20ms response under high load.'],
                ],
                'technologies' => [
                    ['name' => 'PHP & Laravel', 'desc' => 'Enterprise RESTful & JSON:API endpoints with Eloquent Resources.'],
                    ['name' => 'Node.js & Express', 'desc' => 'Asynchronous microservices, WebSockets, and real-time event relays.'],
                    ['name' => 'Python', 'desc' => 'High-throughput data transformations and AI inference gateway APIs.'],
                    ['name' => 'PostgreSQL & MySQL', 'desc' => 'High-concurrency indexed data storage with sub-15ms response.'],
                    ['name' => 'Redis', 'desc' => 'API rate limiting, token caching, and Pub/Sub event broadcasting.'],
                    ['name' => 'Docker & Cloudflare', 'desc' => 'Zero-downtime containerized deployments and global edge routing.'],
                ],
                'settings' => [
                    'timeline' => '4-8 weeks',
                    'ideal_project' => 'Mobile apps, multi-platform services, and partner integrations needing rock-solid APIs.',
                    'outcome' => 'A robust, self-documenting API backend built to handle millions of requests.',
                ],
            ]
        );
        Service::updateOrCreate(
            ['slug' => 'cloud-devops'],
            [
                'category_id' => $categoriesMap['engineering'],
                'name' => 'Cloud Infrastructure & CI/CD Pipelines',
                'description' => 'Automated deployment pipelines, Docker container orchestration, and Cloudflare edge computing.',
                'is_featured' => false,
                'is_enabled' => true,
                'sort_order' => 21,
                'problem_solution' => [
                    'problem' => 'Manual server deploys cause frequent downtime, missing environment variables, and zero rollback safety.',
                    'solution' => 'We engineer automated GitHub Actions CI/CD pipelines with zero-downtime blue/green rollouts and automated backups.',
                ],
                'deliverables' => [
                    ['title' => 'Zero-Downtime CI/CD Pipeline', 'description' => 'Automated GitHub Actions running Pest test suites, linting, and deploy scripts.'],
                    ['title' => 'Containerized Production Stacks', 'description' => 'Optimized multi-stage Dockerfiles with non-root security profiles.'],
                    ['title' => 'Cloudflare Edge WAF & Cache Rules', 'description' => 'Global edge CDN caching, DDoS mitigation, and automatic SSL provisioning.'],
                ],
                'process_timeline' => [
                    ['title' => 'Infra Architecture Review', 'desc' => 'Auditing current compute, network topology, and database backup routines.'],
                    ['title' => 'Pipeline & Containerization', 'desc' => 'Authoring Docker compose files, deploy runners, and health check routes.'],
                    ['title' => 'Failover & Chaos Testing', 'desc' => 'Simulating server crashes and validating automated failover and rollback speed.'],
                ],
                'technologies' => [
                    ['name' => 'Docker', 'desc' => 'Multi-stage container builds ensuring identical dev and prod runtimes.'],
                    ['name' => 'Kubernetes', 'desc' => 'Automated container orchestration, self-healing, and auto-scaling.'],
                    ['name' => 'AWS', 'desc' => 'EC2, S3, RDS, and Lambda serverless infrastructure architecture.'],
                    ['name' => 'Cloudflare', 'desc' => 'Global edge CDN caching, WAF security, and DNS management.'],
                    ['name' => 'PHP & Laravel', 'desc' => 'Automated deployment optimization and cache warming pipelines.'],
                ],
                'settings' => [
                    'timeline' => '3-5 weeks',
                    'ideal_project' => 'Growing companies needing zero-downtime deployment pipelines.',
                    'outcome' => 'Automated, safe deployments with instant rollback capabilities.',
                ],
            ]
        );
        Service::updateOrCreate(
            ['slug' => 'realtime-systems'],
            [
                'category_id' => $categoriesMap['engineering'],
                'name' => 'Real-Time WebSockets & Streaming',
                'description' => 'Bi-directional live data broadcasting, real-time collaboration, and streaming telemetry pipelines.',
                'is_featured' => false,
                'is_enabled' => true,
                'sort_order' => 22,
                'problem_solution' => [
                    'problem' => 'Repetitive HTTP polling drains server resources, creates noticeable UI lag, and eats mobile battery life.',
                    'solution' => 'We deploy persistent WebSocket architectures with Laravel Reverb and Redis Pub/Sub for sub-10ms push updates.',
                ],
                'deliverables' => [
                    ['title' => 'Laravel Reverb Server Setup', 'description' => 'High-throughput native WebSocket server configured for high concurrency.'],
                    ['title' => 'Private Channel Auth System', 'description' => 'Secure presence and private channel authentication gates.'],
                    ['title' => 'Real-Time React State Hooks', 'description' => 'Optimistic client listeners with auto-reconnection and event deduplication.'],
                ],
                'process_timeline' => [
                    ['title' => 'Event Topology Mapping', 'desc' => 'Defining broadcast event payloads, channel namespaces, and auth tokens.'],
                    ['title' => 'WebSocket Server Deployment', 'desc' => 'Configuring Reverb/Redis daemons, SSL proxying, and horizontal scaling.'],
                    ['title' => 'Connection Stress-Testing', 'desc' => 'Simulating thousands of concurrent sockets and verifying broadcast latency.'],
                ],
                'technologies' => [
                    ['name' => 'Laravel Reverb', 'desc' => 'High-performance native WebSocket server built for Laravel apps.'],
                    ['name' => 'Laravel Echo', 'desc' => 'Client-side event subscription and channel authentication.'],
                    ['name' => 'Redis', 'desc' => 'Ultra-fast in-memory Pub/Sub message broker and presence storage.'],
                    ['name' => 'Node.js', 'desc' => 'Real-time bi-directional streaming servers and socket handlers.'],
                    ['name' => 'React', 'desc' => 'Real-time reactive state updates without full-page reloads.'],
                    ['name' => 'Tailwind CSS', 'desc' => 'Animated live notification badges and reactive status tickers.'],
                ],
                'settings' => [
                    'timeline' => '3-5 weeks',
                    'ideal_project' => 'Collaborative canvases, live tracking dashboards, and real-time chat/notification apps.',
                    'outcome' => 'Sub-10ms instant bi-directional updates with minimal server load.',
                ],
            ]
        );
        Service::updateOrCreate(
            ['slug' => 'security-hardening'],
            [
                'category_id' => $categoriesMap['engineering'],
                'name' => 'Cybersecurity, Pen-Testing & Hardening',
                'description' => 'Zero-trust architecture, automated vulnerability scanning, OWASP compliance, and defensive code audits.',
                'is_featured' => true,
                'is_enabled' => true,
                'sort_order' => 23,
                'problem_solution' => [
                    'problem' => 'Vulnerable endpoints, outdated dependencies, and misconfigured servers expose customer data to disastrous breaches.',
                    'solution' => 'We perform full-stack penetration testing, enforce zero-trust container security, and implement strict WAF protection.',
                ],
                'deliverables' => [
                    ['title' => 'Comprehensive Penetration Test Audit', 'description' => 'Executive risk assessment report with actionable vulnerability remediation steps.'],
                    ['title' => 'Cloudflare WAF & DDoS Rule Suite', 'description' => 'Hardened firewall rules blocking malicious botnets, SQL injection, and XSS.'],
                    ['title' => 'Zero-Trust Infrastructure Scaffolding', 'description' => 'Non-root container isolation, encrypted storage, and least-privilege IAM policies.'],
                ],
                'process_timeline' => [
                    ['title' => 'Attack Surface Reconnaissance', 'desc' => 'Scanning open ports, DNS records, API routes, and dependency CVE logs.'],
                    ['title' => 'Defensive Hardening & Patching', 'desc' => 'Remediating auth flaws, sanitizing inputs, and encrypting secrets at rest.'],
                    ['title' => 'Continuous Security Monitoring', 'desc' => 'Deploying real-time intrusion detection and automated vulnerability alerts.'],
                ],
                'technologies' => [
                    ['name' => 'Cloudflare', 'desc' => 'DDoS mitigation, Web Application Firewall (WAF), and Bot Management.'],
                    ['name' => 'AWS', 'desc' => 'Security groups, IAM least-privilege policies, and KMS encryption.'],
                    ['name' => 'Docker', 'desc' => 'Hardened container images running as non-root with read-only rootfs.'],
                    ['name' => 'PHP & Laravel', 'desc' => 'CSRF protection, SQL injection prevention, and secure session cookies.'],
                    ['name' => 'Python', 'desc' => 'Automated vulnerability scanning scripts and security header checkers.'],
                ],
                'settings' => [
                    'timeline' => '2-4 weeks',
                    'ideal_project' => 'Fintech, healthcare, and enterprise apps handling sensitive customer transactions.',
                    'outcome' => 'An impenetrable, compliant web platform resilient against modern cyber threats.',
                ],
            ]
        );
        Service::updateOrCreate(
            ['slug' => 'ai-workflows'],
            [
                'category_id' => $categoriesMap['ai-automation'],
                'name' => 'AI Agents & Process Automation',
                'description' => 'Integrating autonomous LLM agents, semantic reasoning pipelines, and intelligent back-office automations.',
                'is_featured' => true,
                'is_enabled' => true,
                'sort_order' => 24,
                'problem_solution' => [
                    'problem' => 'Repetitive human data entry and document triage drain staff bandwidth and introduce expensive operational errors.',
                    'solution' => 'We deploy autonomous AI agents with structured output schemas to extract, validate, and process complex workflows.',
                ],
                'deliverables' => [
                    ['title' => 'Autonomous Agent Workflow Pipeline', 'description' => 'Self-healing LLM workflow queue processing complex multi-step tasks.'],
                    ['title' => 'Structured Data Extraction Engine', 'description' => 'Zero-hallucination JSON extraction from unformatted documents and PDFs.'],
                    ['title' => 'Cost & Token Telemetry Dashboard', 'description' => 'Real-time tracking of API consumption, cache hit rates, and model latency.'],
                ],
                'process_timeline' => [
                    ['title' => 'Process Flow Decomposition', 'desc' => 'Breaking manual workflows into deterministic rules and probabilistic agent steps.'],
                    ['title' => 'Prompt Architecture & Tool-Calling', 'desc' => 'Authoring few-shot system prompts with strict JSON Schema validations.'],
                    ['title' => 'Queue Integration & Failover', 'desc' => 'Wiring agents into Laravel Horizon queues with automated model fallback.'],
                ],
                'technologies' => [
                    ['name' => 'Anthropic Claude', 'desc' => 'Deep reasoning, automated document synthesis, and code analysis.'],
                    ['name' => 'OpenAI GPT-4o', 'desc' => 'Multi-modal inference, structured JSON extraction, and tools.'],
                    ['name' => 'Google Gemini', 'desc' => 'High-throughput enterprise AI search and multimodal processing.'],
                    ['name' => 'Laravel Queue Systems', 'desc' => 'Fault-tolerant background job workers and async AI queues.'],
                    ['name' => 'Python', 'desc' => 'Custom AI pipeline orchestration and data vector transformations.'],
                    ['name' => 'Node.js', 'desc' => 'High-concurrency streaming event relays and webhook processors.'],
                    ['name' => 'PostgreSQL', 'desc' => 'Vector similarity storage via pgvector with sub-50ms search.'],
                ],
                'settings' => [
                    'timeline' => '4-8 weeks',
                    'ideal_project' => 'Operations-heavy businesses looking to automate complex document or ticket processing.',
                    'outcome' => 'Automated AI pipelines replacing 80% of repetitive operational bottlenecks.',
                ],
            ]
        );
        Service::updateOrCreate(
            ['slug' => 'workflow-automation'],
            [
                'category_id' => $categoriesMap['ai-automation'],
                'name' => 'Workflow Orchestration & Scraping',
                'description' => 'Headless browser scraping, asynchronous event orchestrations, and high-volume data transformation queues.',
                'is_featured' => false,
                'is_enabled' => true,
                'sort_order' => 25,
                'problem_solution' => [
                    'problem' => 'Siloed third-party software and lack of official APIs prevent critical data from flowing into core business systems.',
                    'solution' => 'We engineer resilient Puppeteer/Playwright browser automation and webhook pipelines with automated proxy rotation.',
                ],
                'deliverables' => [
                    ['title' => 'Automated Data Extraction Pipeline', 'description' => 'Headless browser scraper handling JavaScript rendering, captchas, and pagination.'],
                    ['title' => 'Queue Orchestration Engine', 'description' => 'Laravel Horizon job pipeline with automated retry and dead-letter queues.'],
                    ['title' => 'Data Sanitation & Export Bridge', 'description' => 'Structured ETL pipeline outputting clean relational records or JSON streams.'],
                ],
                'process_timeline' => [
                    ['title' => 'Target Flow Reverse-Engineering', 'desc' => 'Analyzing target web application DOM trees, network requests, and auth cookies.'],
                    ['title' => 'Scraper Script Engineering', 'desc' => 'Writing resilient Playwright scripts with stealth headers and proxy pools.'],
                    ['title' => 'Queue Scheduler Deployment', 'desc' => 'Scheduling automated runs with error notifications via Slack or email.'],
                ],
                'technologies' => [
                    ['name' => 'Puppeteer & Playwright', 'desc' => 'Headless browser automation for complex data scraping and testing.'],
                    ['name' => 'Laravel Horizon', 'desc' => 'Real-time dashboard and queue metrics for Redis workers.'],
                    ['name' => 'Node.js', 'desc' => 'Asynchronous background script runners and webhook ingestors.'],
                    ['name' => 'Python', 'desc' => 'Custom data parsing, cleanup, and third-party API transformers.'],
                    ['name' => 'Redis', 'desc' => 'High-throughput job queues with exponential retry policies.'],
                ],
                'settings' => [
                    'timeline' => '3-5 weeks',
                    'ideal_project' => 'Market research aggregators, pricing intelligence platforms, and back-office sync tools.',
                    'outcome' => 'Reliable, 24/7 automated data pipeline running with zero manual oversight.',
                ],
            ]
        );
        Service::updateOrCreate(
            ['slug' => 'rag-enterprise-search'],
            [
                'category_id' => $categoriesMap['ai-automation'],
                'name' => 'Enterprise RAG & Semantic Search',
                'description' => 'Retrieval-Augmented Generation systems indexing internal knowledge bases with sub-50ms vector search.',
                'is_featured' => false,
                'is_enabled' => true,
                'sort_order' => 26,
                'problem_solution' => [
                    'problem' => 'Generic LLMs hallucinate inaccurate facts and have no visibility into proprietary company documentation.',
                    'solution' => 'We deploy custom RAG architectures using pgvector to ground AI responses directly in your verified documents.',
                ],
                'deliverables' => [
                    ['title' => 'Vector Database Architecture', 'description' => 'PostgreSQL pgvector cluster storing document embeddings with HNSW indexes.'],
                    ['title' => 'Document Chunking & Sync Pipeline', 'description' => 'Automated ingestion pipeline parsing Markdown, PDF, and DOCX files into vectors.'],
                    ['title' => 'Semantic Query API', 'description' => 'Hybrid search API combining dense embeddings with sparse keyword matching.'],
                ],
                'process_timeline' => [
                    ['title' => 'Corpus Ingestion & Chunking', 'desc' => 'Cleaning raw documentation, testing chunk overlap sizes, and embedding strategies.'],
                    ['title' => 'Vector Indexing & Hybrid Search', 'desc' => 'Setting up HNSW vector indexes and building re-ranking query pipelines.'],
                    ['title' => 'RAG Generation & Guardrails', 'desc' => 'Grounding prompt templates with strict citation requirements and hallucination checks.'],
                ],
                'technologies' => [
                    ['name' => 'PostgreSQL', 'desc' => 'Vector similarity search powered by pgvector index extension.'],
                    ['name' => 'Anthropic Claude', 'desc' => 'Accurate document synthesis and context-grounded citations.'],
                    ['name' => 'OpenAI GPT-4o', 'desc' => 'Dense vector embedding generation and semantic extraction.'],
                    ['name' => 'Python', 'desc' => 'Document chunking, tokenization, and vector indexing pipelines.'],
                    ['name' => 'Laravel', 'desc' => 'Enterprise API middleware, user access control, and query caches.'],
                    ['name' => 'React', 'desc' => 'Sub-second instant search UI with highlighted markdown streaming.'],
                ],
                'settings' => [
                    'timeline' => '4-8 weeks',
                    'ideal_project' => 'Enterprises with extensive documentation, legal contracts, or technical manuals.',
                    'outcome' => 'An accurate, hallucination-free internal search engine with instant citations.',
                ],
            ]
        );
        Service::updateOrCreate(
            ['slug' => 'computer-vision'],
            [
                'category_id' => $categoriesMap['ai-automation'],
                'name' => 'Computer Vision & Media Intelligence',
                'description' => 'Automated image classification, facial recognition, OCR text extraction, and visual anomaly detection.',
                'is_featured' => false,
                'is_enabled' => true,
                'sort_order' => 27,
                'problem_solution' => [
                    'problem' => 'Manual visual inspection and manual document parsing are slow, expensive, and subject to human fatigue.',
                    'solution' => 'We deploy custom PyTorch and OpenCV models capable of classifying thousands of images per minute with 99%+ accuracy.',
                ],
                'deliverables' => [
                    ['title' => 'Trained Neural Network Weights', 'description' => 'Optimized PyTorch/ONNX model weights ready for GPU edge deployment.'],
                    ['title' => 'High-Speed Vision Pipeline API', 'description' => 'FastAPI/Laravel bridge processing multipart image uploads with sub-100ms inference.'],
                    ['title' => 'Visual Annotation & Bounding Box UI', 'description' => 'React canvas overlay rendering detected objects and confidence percentages.'],
                ],
                'process_timeline' => [
                    ['title' => 'Dataset Preparation & Labeling', 'desc' => 'Collecting image datasets, applying augmentations, and formatting training splits.'],
                    ['title' => 'Model Fine-Tuning & Quantization', 'desc' => 'Training CNN/Vision Transformer backbones and quantizing to INT8 for speed.'],
                    ['title' => 'Production API Gateway Build', 'desc' => 'Deploying model endpoints with async task queues and signed S3 image URLs.'],
                ],
                'technologies' => [
                    ['name' => 'PyTorch', 'desc' => 'Deep learning neural networks for custom image classification.'],
                    ['name' => 'OpenCV', 'desc' => 'Real-time computer vision processing, contours, and edge filters.'],
                    ['name' => 'TensorFlow', 'desc' => 'Edge-deployable machine learning models for mobile and web.'],
                    ['name' => 'AWS', 'desc' => 'Cloud vision APIs and high-volume OCR document processing.'],
                    ['name' => 'Python', 'desc' => 'Asynchronous image processing pipelines and CUDA acceleration.'],
                    ['name' => 'Laravel', 'desc' => 'Secure file intake, signed S3 upload URLs, and result dispatch.'],
                ],
                'settings' => [
                    'timeline' => '6-10 weeks',
                    'ideal_project' => 'Security platforms, manufacturing QA lines, and automated KYC document verification apps.',
                    'outcome' => 'High-speed automated visual intelligence processing thousands of frames in real time.',
                ],
            ]
        );
        Service::updateOrCreate(
            ['slug' => 'conversational-ai'],
            [
                'category_id' => $categoriesMap['ai-automation'],
                'name' => 'Conversational AI & Support Retainers',
                'description' => 'Intelligent multi-turn AI chatbots, voice synthesis agents, and automated 24/7 customer support copilots.',
                'is_featured' => false,
                'is_enabled' => true,
                'sort_order' => 28,
                'problem_solution' => [
                    'problem' => 'Support teams get overwhelmed by repetitive inquiries, resulting in long ticket wait times and lost customers.',
                    'solution' => 'We deploy context-aware conversational AI copilots that resolve 70%+ of customer issues instantly in real time.',
                ],
                'deliverables' => [
                    ['title' => 'Streaming Chatbot Widget', 'description' => 'Embedded React chat widget with real-time markdown streaming and quick actions.'],
                    ['title' => 'Conversation State & Memory Buffer', 'description' => 'Multi-turn Redis session memory preserving user preferences across messages.'],
                    ['title' => 'Human-in-the-Loop Handover Bridge', 'description' => 'Seamless escalation protocol transferring chats to live human support agents.'],
                ],
                'process_timeline' => [
                    ['title' => 'Conversation Tree & Intent Mapping', 'desc' => 'Analyzing past support transcripts to identify top customer intents and pain points.'],
                    ['title' => 'Chatbot Integration & Tool-Calling', 'desc' => 'Wiring AI to backend account APIs to perform actions like order lookups and refunds.'],
                    ['title' => 'Guardrail Testing & Deployment', 'desc' => 'Simulating edge-case prompts and enforcing strict brand tone guardrails.'],
                ],
                'technologies' => [
                    ['name' => 'Anthropic Claude', 'desc' => 'Context-aware customer service dialog with strict brand guardrails.'],
                    ['name' => 'OpenAI GPT-4o', 'desc' => 'High-speed conversational tokens with tool-calling capabilities.'],
                    ['name' => 'Google Gemini', 'desc' => 'Enterprise multimodal chat processing with large context windows.'],
                    ['name' => 'Laravel', 'desc' => 'Conversation session persistence, audit logging, and auth tokens.'],
                    ['name' => 'React & Inertia.js', 'desc' => 'Streaming chat UI with optimistic typing indicators and markdown.'],
                    ['name' => 'Redis', 'desc' => 'Low-latency dialog state cache and token window tracking.'],
                ],
                'settings' => [
                    'timeline' => '4-6 weeks',
                    'ideal_project' => 'E-commerce stores and SaaS products looking to scale customer support around the clock.',
                    'outcome' => 'A 24/7 automated support copilot resolving the vast majority of customer requests.',
                ],
            ]
        );
        Service::updateOrCreate(
            ['slug' => 'landing-page-design'],
            [
                'category_id' => $categoriesMap['growth'],
                'name' => 'High-Conversion Landing Pages',
                'description' => 'Precision-engineered landing pages built for marketing campaigns, product launches, and maximum visitor-to-customer conversion.',
                'is_featured' => true,
                'is_enabled' => true,
                'sort_order' => 29,
                'problem_solution' => [
                    'problem' => 'Expensive ad spend is wasted when campaigns send traffic to generic, slow landing pages with confusing messaging.',
                    'solution' => 'We engineer hyper-focused, sub-second landing pages tailored directly to your ad audience to maximize conversion yield.',
                ],
                'deliverables' => [
                    ['title' => 'High-Conversion Layout & Copy', 'description' => 'Persuasive narrative structure with crystal-clear CTAs and trust proof.'],
                    ['title' => 'Instant-Load Sub-Second Speed', 'description' => 'Lightweight assets and pre-warmed edge caching ensuring zero drop-off.'],
                    ['title' => 'Ad Pixel & Telemetry Setup', 'description' => 'Complete Meta CAPI, Google Ads, and analytics tracking integration.'],
                ],
                'process_timeline' => [
                    ['title' => 'Audience & Offer Alignment', 'desc' => 'Analyzing target ad angles, objections, and conversion triggers.'],
                    ['title' => 'Design & Copywriting Sprint', 'desc' => 'Crafting high-impact hero typography, social proof cards, and pricing tables.'],
                    ['title' => 'Build, Pixel Setup & Live A/B Launch', 'desc' => 'Developing responsive React/Tailwind code, tracking pixels, and going live.'],
                ],
                'technologies' => [
                    ['name' => 'Figma', 'desc' => 'High-conversion visual layout design, hero typography, and CTAs.'],
                    ['name' => 'Adobe XD', 'desc' => 'Interactive mobile and desktop wireframes with conversion triggers.'],
                    ['name' => 'React & Next.js', 'desc' => 'Instant-load landing page architecture with zero client lag.'],
                    ['name' => 'Tailwind CSS', 'desc' => 'Modular utility styling with high-contrast buttons and badges.'],
                    ['name' => 'Google Tag Manager', 'desc' => 'Ad tracking and conversion pixel integration for ad campaigns.'],
                    ['name' => 'Google Analytics', 'desc' => 'Real-time telemetry tracking visitor scroll depth and CTA clicks.'],
                ],
                'settings' => [
                    'timeline' => '1-2 weeks',
                    'ideal_project' => 'Campaign launches, product drops, or SaaS lead generation funnels requiring rapid turnaround.',
                    'outcome' => 'A high-converting landing page that turns expensive ad traffic into paying customers.',
                ],
            ]
        );
        Service::updateOrCreate(
            ['slug' => 'seo'],
            [
                'category_id' => $categoriesMap['growth'],
                'name' => 'Search & Generative Engine Optimization (SEO/GEO)',
                'description' => 'Technical search engine indexing, Core Web Vitals optimization, semantic schema markup, and AI engine citation authority.',
                'is_featured' => true,
                'is_enabled' => true,
                'sort_order' => 30,
                'problem_solution' => [
                    'problem' => 'Websites miss out on high-intent organic traffic due to technical crawl errors and poor visibility on AI search engines.',
                    'solution' => 'We execute deep technical SEO sanitation, semantic Schema.org markup, and structured citation authority for Google and AI engines.',
                ],
                'deliverables' => [
                    ['title' => 'Technical Crawl & Indexing Audit', 'description' => 'Eliminating 404s, redirect loops, canonical mismatches, and orphan pages.'],
                    ['title' => 'Schema.org Structured Data Matrix', 'description' => 'Complete JSON-LD schema integration for rich snippets and AI search citations.'],
                    ['title' => 'Content & Keyword Authority Plan', 'description' => 'Strategic topic clustering targeting high-converting commercial search queries.'],
                ],
                'process_timeline' => [
                    ['title' => 'Technical Crawl Diagnostic', 'desc' => 'Running deep crawls to identify indexing roadblocks, slow routes, and broken tags.'],
                    ['title' => 'On-Page & Schema Remediation', 'desc' => 'Deploying semantic JSON-LD schemas, OpenGraph tags, and clean sitemaps.'],
                    ['title' => 'Rank Tracking & Telemetry', 'desc' => 'Monitoring query positions, impression share, and click-through velocity.'],
                ],
                'technologies' => [
                    ['name' => 'Google Search Console', 'desc' => 'Indexing telemetry, query rankings, and core search diagnostics.'],
                    ['name' => 'Google Analytics', 'desc' => 'User acquisition funnels, conversion tracking, and session flow.'],
                    ['name' => 'Lighthouse', 'desc' => 'Core Web Vitals auditing for LCP, FID, and CLS performance.'],
                    ['name' => 'Screaming Frog', 'desc' => 'Deep crawl analysis for broken links, duplicate tags, and redirects.'],
                    ['name' => 'Tailwind CSS', 'desc' => 'Lightweight semantic markup ensuring maximum crawl efficiency.'],
                    ['name' => 'Laravel', 'desc' => 'Server-side rendered dynamic meta tags, OpenGraph, and XML sitemaps.'],
                ],
                'settings' => [
                    'timeline' => '4-8 weeks',
                    'ideal_project' => 'Businesses looking to build an enduring inbound traffic moat from search and AI recommendations.',
                    'outcome' => 'Top-tier technical search rankings and automated Schema.org visibility across Google and AI search engines.',
                ],
            ]
        );
        Service::updateOrCreate(
            ['slug' => 'digital-marketing'],
            [
                'category_id' => $categoriesMap['growth'],
                'name' => 'Performance Campaigns & Telemetry',
                'description' => 'Multi-channel acquisition funnels, attribution tracking, and conversion rate optimization campaigns.',
                'is_featured' => false,
                'is_enabled' => true,
                'sort_order' => 31,
                'problem_solution' => [
                    'problem' => 'Marketing spend gets burned on unmeasured traffic with zero visibility into which ads actually generate paying customers.',
                    'solution' => 'We engineer end-to-end telemetry pipelines with server-side CAPI tracking to attribute every dollar of ad spend accurately.',
                ],
                'deliverables' => [
                    ['title' => 'Server-Side CAPI Tracking Pipeline', 'description' => 'Resilient Meta and Google conversion tracking bypassing browser ad-blockers.'],
                    ['title' => 'High-Converting Campaign Creative', 'description' => 'Tailored ad graphics and persuasive landing page variations.'],
                    ['title' => 'Multi-Touch Attribution Dashboard', 'description' => 'Real-time ROI dashboard tracking CAC, LTV, and cohort payback windows.'],
                ],
                'process_timeline' => [
                    ['title' => 'Attribution & Pixel Audit', 'desc' => 'Auditing current tag setups, deduplication keys, and event firing accuracy.'],
                    ['title' => 'Creative & Landing Build', 'desc' => 'Designing high-converting ad assets and matching landing page variants.'],
                    ['title' => 'Campaign Scaling & Optimization', 'desc' => 'Iterating based on live cost-per-acquisition telemetry.'],
                ],
                'technologies' => [
                    ['name' => 'Google Tag Manager', 'desc' => 'Server-side and client-side conversion event orchestration.'],
                    ['name' => 'Google Analytics', 'desc' => 'Cross-channel attribution and multi-touch ROI telemetry.'],
                    ['name' => 'Meta Pixel & CAPI', 'desc' => 'Server-side Conversions API integration for ad attribution.'],
                    ['name' => 'React', 'desc' => 'High-conversion campaign landing page components with instant load.'],
                    ['name' => 'Tailwind CSS', 'desc' => 'Optimized CSS payloads for maximum ad campaign quality scores.'],
                ],
                'settings' => [
                    'timeline' => '4-6 weeks',
                    'ideal_project' => 'Brands scaling paid acquisition across Meta, Google Ads, and LinkedIn.',
                    'outcome' => 'Crystal-clear attribution telemetry with lower CAC and higher ROAS.',
                ],
            ]
        );
        Service::updateOrCreate(
            ['slug' => 'cro-optimization'],
            [
                'category_id' => $categoriesMap['growth'],
                'name' => 'Conversion Rate Optimization (CRO)',
                'description' => 'Heatmap analytics, checkout friction reduction, and iterative A/B testing designed to lift revenue.',
                'is_featured' => false,
                'is_enabled' => true,
                'sort_order' => 32,
                'problem_solution' => [
                    'problem' => 'Websites attract qualified traffic but suffer from low checkout completion and form abandonment.',
                    'solution' => 'We identify friction hotspots via session heatmaps and run rigorous A/B tests to double your conversion yield.',
                ],
                'deliverables' => [
                    ['title' => 'Friction Hotspot Audit Deck', 'description' => 'Data-backed analysis of form drop-offs, click rage, and mobile dead ends.'],
                    ['title' => 'Statistically Significant A/B Variants', 'description' => 'Engineered challenger templates testing high-leverage hypotheses.'],
                    ['title' => 'Conversion Uplift Summary', 'description' => 'Verified lift metrics across checkout and lead generation funnels.'],
                ],
                'process_timeline' => [
                    ['title' => 'Heatmap & Session Analysis', 'desc' => 'Reviewing thousands of user recordings to uncover exact points of friction.'],
                    ['title' => 'Hypothesis & Variant Engineering', 'desc' => 'Building streamlined single-column checkout forms and value triggers.'],
                    ['title' => 'A/B Testing & Winner Deployment', 'desc' => 'Splitting live traffic and hardcoding verified winning variations into production.'],
                ],
                'technologies' => [
                    ['name' => 'Google Analytics', 'desc' => 'Granular funnel drop-off analytics and micro-conversion tracking.'],
                    ['name' => 'Lighthouse', 'desc' => 'Performance speed optimization to eliminate visitor bounce rates.'],
                    ['name' => 'React', 'desc' => 'Frictionless multi-step checkout forms and instant lead capture.'],
                    ['name' => 'Tailwind CSS', 'desc' => 'High-contrast visual hierarchy and thumb-friendly mobile CTAs.'],
                    ['name' => 'Laravel', 'desc' => 'Server-side A/B test variant assignment and database metrics.'],
                ],
                'settings' => [
                    'timeline' => '4-8 weeks',
                    'ideal_project' => 'E-commerce stores and SaaS funnels wanting more revenue from existing traffic.',
                    'outcome' => 'A measured 20-50%+ uplift in checkout and lead conversion rates.',
                ],
            ]
        );
        Service::updateOrCreate(
            ['slug' => 'speed-optimization'],
            [
                'category_id' => $categoriesMap['growth'],
                'name' => 'Technical Site Speed Engineering',
                'description' => 'Sub-second page load engineering, Core Web Vitals remediation, and edge cache optimization.',
                'is_featured' => false,
                'is_enabled' => true,
                'sort_order' => 33,
                'problem_solution' => [
                    'problem' => 'Slow websites lose 50%+ of mobile visitors before the page even finishes loading, tanking SEO and conversions.',
                    'solution' => 'We perform deep code-level optimization, asset tree-shaking, and edge caching to achieve 100/100 Lighthouse performance.',
                ],
                'deliverables' => [
                    ['title' => 'Core Web Vitals Remediation', 'description' => 'LCP under 1.2s, INP under 50ms, and CLS at zero across all device viewports.'],
                    ['title' => 'Asset Tree-Shaking & Compression', 'description' => 'Modern WebP/AVIF images, brotli compression, and purged unused CSS.'],
                    ['title' => 'Edge Caching Configuration', 'description' => 'Cloudflare edge cache rules serving pages instantly from global points of presence.'],
                ],
                'process_timeline' => [
                    ['title' => 'Waterfall & Bundle Profiling', 'desc' => 'Diagnosing render-blocking scripts, unoptimized images, and TTFB delays.'],
                    ['title' => 'Code Optimization & Shaking', 'desc' => 'Deferring non-critical scripts, compressing assets, and pre-loading key fonts.'],
                    ['title' => 'Lighthouse Verification & Audit', 'desc' => 'Verifying 95-100 performance scores on mobile and desktop devices.'],
                ],
                'technologies' => [
                    ['name' => 'Vite', 'desc' => 'Next-gen asset bundler with tree-shaking and modern ES modules.'],
                    ['name' => 'Cloudflare', 'desc' => 'Global edge CDN caching, HTTP/3 protocol, and early hints.'],
                    ['name' => 'Lighthouse', 'desc' => 'Verification suite achieving 100/100 Core Web Vitals scores.'],
                    ['name' => 'Redis', 'desc' => 'In-memory page cache and database query result caching.'],
                    ['name' => 'Laravel', 'desc' => 'OPCache pre-loading, route compilation, and view optimization.'],
                    ['name' => 'Tailwind CSS', 'desc' => 'Purged, sub-15kB production stylesheet compilation.'],
                ],
                'settings' => [
                    'timeline' => '1-3 weeks',
                    'ideal_project' => 'Websites suffering from poor Google page speed scores and high mobile bounce rates.',
                    'outcome' => 'Flawless 100/100 Core Web Vitals scores and sub-second page loads globally.',
                ],
            ]
        );
        Service::updateOrCreate(
            ['slug' => 'growth-consulting'],
            [
                'category_id' => $categoriesMap['growth'],
                'name' => 'Growth Consulting & Revenue Architecture',
                'description' => 'Data-driven growth strategies, pricing model experimentation, retention loops, and product-led acquisition.',
                'is_featured' => false,
                'is_enabled' => true,
                'sort_order' => 34,
                'problem_solution' => [
                    'problem' => 'Companies hit growth plateaus because their pricing models, onboarding flows, and referral loops are unoptimized.',
                    'solution' => 'We design product-led growth (PLG) loops, optimize pricing tiers, and engineer automated reactivation triggers.',
                ],
                'deliverables' => [
                    ['title' => 'PLG Loop & Onboarding Blueprint', 'description' => 'Architected user onboarding path maximizing time-to-value.'],
                    ['title' => 'Pricing & Packaging Matrix', 'description' => 'Data-backed pricing tier recommendations with value metrics and add-ons.'],
                    ['title' => 'Retention & Re-engagement System', 'description' => 'Automated email and in-app triggers re-engaging churning accounts.'],
                ],
                'process_timeline' => [
                    ['title' => 'Funnel & Unit Economics Audit', 'desc' => 'Analyzing customer acquisition costs, churn rates, and expansion revenue.'],
                    ['title' => 'Growth Experiment Design', 'desc' => 'Authoring prioritized experiment roadmaps targeting the highest-leverage growth levers.'],
                    ['title' => 'Execution & Telemetry Tracking', 'desc' => 'Deploying interactive ROI tools, onboarding flows, and monitoring uplift.'],
                ],
                'technologies' => [
                    ['name' => 'Google Analytics', 'desc' => 'Cohort retention analysis and revenue attribution modeling.'],
                    ['name' => 'Google Tag Manager', 'desc' => 'Enterprise event tracking setup for paid acquisition channels.'],
                    ['name' => 'Laravel', 'desc' => 'Custom revenue telemetry, MRR tracking, and churn analytics.'],
                    ['name' => 'React', 'desc' => 'High-converting interactive ROI calculators and onboarding flows.'],
                ],
                'settings' => [
                    'timeline' => '4-8 weeks',
                    'ideal_project' => 'B2B SaaS and commerce brands looking to unlock their next inflection point of growth.',
                    'outcome' => 'A scalable, compounding product-led acquisition and retention engine.',
                ],
            ]
        );

        // Populate bespoke FAQs for all services
        $faqTemplates = [
            'brand-experience' => [
                ['question' => 'What assets and specifications are delivered upon project completion?', 'answer' => 'You receive production-ready master vector files (.AI, .SVG, .EPS), high-resolution exports (.PNG, .WebP), interactive Figma design token specifications, typography license matrices, and comprehensive brand guideline decks detailing exact color codes (HEX, RGB, CMYK, Pantone).'],
                ['question' => 'How does the revision and creative direction process work?', 'answer' => 'We operate in structured weekly milestone sprints. Each phase begins with strategic exploration decks, followed by collaborative feedback rounds in Figma before finalizing and compiling the master production asset library.'],
                ['question' => 'Does our company own 100% of the intellectual property and master files?', 'answer' => 'Yes. Upon final milestone sign-off and payment, all intellectual property rights, copyright assignments, and master source files are transferred unconditionally to your organization.'],
                ['question' => 'Can this design system scale across digital UI and physical print collateral?', 'answer' => 'Absolutely. Every identity system we author is engineered with responsive mathematical grids and multi-format tokens calibrated for both dark-mode OLED displays and CMYK/spot-color offset printing machinery.'],
            ],
            'digital-products' => [
                ['question' => 'What tech stack and architecture do you recommend for our product?', 'answer' => 'We engineer scalable architectures utilizing Laravel backends, React/Inertia.js single-page applications, and PostgreSQL databases, styled with Tailwind CSS for sub-second page performance and effortless long-term maintainability.'],
                ['question' => 'What is the typical timeline from architectural blueprint to production launch?', 'answer' => 'Standard product builds typically span 4 to 8 weeks, structured into strategy & wireframing (Weeks 1-2), high-fidelity design & frontend assembly (Weeks 3-5), and backend integration, security audits, and deployment (Weeks 6-8).'],
                ['question' => 'How do you ensure fluid performance and sub-second load times?', 'answer' => 'We enforce strict sub-30ms database indexing budgets, modern ES module tree-shaking, lazy-loaded Three.js canvases, responsive WebP/AVIF media delivery, and Cloudflare edge CDN caching.'],
                ['question' => 'Do you offer ongoing technical retainers, maintenance, and feature iteration?', 'answer' => 'Yes. We provide dedicated monthly engineering retainers covering security patching, performance monitoring, continuous integration pipelines, and iterative feature development.'],
            ],
            'engineering' => [
                ['question' => 'How do you guarantee 60fps animations and sub-30ms database response budgets?', 'answer' => 'We profile GPU draw calls with hardware-accelerated WebGL/Three.js shaders, utilize composite CSS properties, and structure PostgreSQL schemas with compound indexes and Redis in-memory cache layers.'],
                ['question' => 'How are deployment pipelines, staging environments, and CI/CD managed?', 'answer' => 'We set up automated GitHub Actions CI/CD workflows with automated Pest test suites, zero-downtime blue/green deployments, Docker container isolation, and staging environments for stakeholder verification.'],
                ['question' => 'What cybersecurity standards and code audits are enforced during development?', 'answer' => 'We adhere strictly to OWASP Top 10 security standards, automated CSRF/XSS sanitation, parameterized queries, non-root Docker execution, and Cloudflare WAF firewall rate-limiting.'],
                ['question' => 'Can our in-house engineering team easily take over and maintain the codebase?', 'answer' => 'Yes. All code is authored with strict TypeScript types, PSR-12 standard PHP formatting, modular directory architecture, comprehensive inline documentation, and full Pest test coverage.'],
            ],
            'ai-automation' => [
                ['question' => 'How do you prevent hallucinations and ensure accurate AI agent execution?', 'answer' => 'We employ Retrieval-Augmented Generation (RAG) backed by pgvector similarity search, strict JSON schema validation, multi-turn verification loops, and deterministic fallback rules.'],
                ['question' => 'Where is our proprietary company data processed and stored?', 'answer' => 'All enterprise data remains within your private VPC or dedicated PostgreSQL database. We use enterprise AI APIs with strict zero-data-retention agreements to guarantee your data is never used for public model training.'],
                ['question' => 'How do you manage API token consumption, latency, and cost efficiency?', 'answer' => 'We implement semantic prompt caching, lightweight classification routers to delegate queries to smaller models, and asynchronous Laravel Horizon queues to optimize throughput and minimize API overhead.'],
                ['question' => 'Can these automated AI workflows integrate with our existing CRM and ERP tools?', 'answer' => 'Yes. We build bi-directional webhook relays and API connectors integrating directly with Salesforce, HubSpot, Stripe, Slack, custom PostgreSQL databases, and internal ERP systems.'],
            ],
            'growth' => [
                ['question' => 'How does your technical SEO and GEO (Generative Engine Optimization) strategy work?', 'answer' => 'We engineer deep semantic Schema.org JSON-LD data graphs, server-side rendered meta tags, sub-second Core Web Vitals speeds, and structured entity authority to maximize citations across Google, ChatGPT, Claude, and Perplexity.'],
                ['question' => 'How do you track campaign attribution without relying on third-party cookies?', 'answer' => 'We deploy server-side Conversions API (CAPI) pipelines through Google Tag Manager and Laravel backend event listeners, ensuring 100% accurate conversion telemetry that bypasses browser ad-blockers.'],
                ['question' => 'How quickly will we see measurable conversion rate and traffic lifts?', 'answer' => 'Conversion rate optimizations and technical speed improvements deliver immediate lifts within 7-14 days of deployment. Technical SEO indexation and AI search authority typically compound over 30 to 90 days.'],
                ['question' => 'How do you verify 100/100 Core Web Vitals across mobile and desktop devices?', 'answer' => 'We audit Largest Contentful Paint (LCP < 1.2s), Interaction to Next Paint (INP < 50ms), and Cumulative Layout Shift (CLS = 0) using Google Lighthouse and Chrome User Experience (CrUX) field data.'],
            ],
        ];

        foreach (Service::with('category')->get() as $s) {
            $catSlug = $s->category->slug ?? 'digital-products';
            $faqs = $faqTemplates[$catSlug] ?? $faqTemplates['digital-products'];
            $customFaq = [
                'question' => "What makes OVOLL's approach to {$s->name} unique?",
                'answer' => 'We combine elite design aesthetics with deep full-stack engineering rigor. Instead of delivering static mockups or bloated templates, we engineer production-ready digital flagships optimized for speed, conversion, and market authority.',
            ];
            $s->faqs = array_merge([$customFaq], $faqs);
            $s->save();
        }
    }
}

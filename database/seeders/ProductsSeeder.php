<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductsSeeder extends Seeder
{
    /**
     * Seed the product catalogue shown on /products.
     *
     * The frontend (resources/js/pages/Products/Index.tsx) groups products by
     * `category` and only recognises the six categories in its CATEGORY_META map
     * — each mapped to a hand-designed WebGL scene. It also reads a per-item icon
     * and tag list out of `features`, so every product stores:
     *   features => ['icon' => <lucide name>, 'tags' => [...]]
     * Keep the category strings and icon names in sync with that file.
     */
    public function run(): void
    {
        // Idempotent upsert keyed by slug. This NEVER deletes rows, so products
        // created or edited in the Filament admin (with their own slugs) survive
        // a re-seed untouched — only the known demo catalogue below is kept in
        // sync. (The previous `Product::query()->delete()` wiped everything.)
        foreach ($this->products() as $product) {
            $product['slug'] = Str::slug($product['name']);
            $product['status'] = 'published';
            Product::updateOrCreate(['slug' => $product['slug']], $product);
        }
    }

    /**
     * @return array<int, array{name: string, description: string, price: string, category: string, is_featured: bool, features: array{icon: string, tags: array<int, string>}}>
     */
    private function products(): array
    {
        return [
            // Business & Enterprise -> variant "enterprise"
            [
                'name' => 'ERP & Operations Platform',
                'description' => 'A unified back-office system tying inventory, finance, and HR into one real-time source of truth with role-based access.',
                'price' => 'Custom',
                'category' => 'Business & Enterprise',
                'is_featured' => true,
                'features' => ['icon' => 'Building2', 'tags' => ['Laravel', 'RBAC', 'Reporting']],
            ],
            [
                'name' => 'CRM & Sales Pipeline',
                'description' => 'Lead capture, deal stages, and automated follow-ups wired to your funnel so nothing slips between quote and close.',
                'price' => 'Custom',
                'category' => 'Business & Enterprise',
                'is_featured' => false,
                'features' => ['icon' => 'Briefcase', 'tags' => ['Automation', 'Analytics']],
            ],
            [
                'name' => 'Internal Admin Dashboards',
                'description' => 'Filament-powered control panels that turn your data models into a production admin surface your team actually enjoys using.',
                'price' => 'Custom',
                'category' => 'Business & Enterprise',
                'is_featured' => false,
                'features' => ['icon' => 'UserCog', 'tags' => ['Filament', 'Dashboards']],
            ],

            // eCommerce & Marketplace -> variant "commerce"
            [
                'name' => 'Custom Storefront',
                'description' => 'A conversion-tuned online store with fast checkout, flexible catalogues, and payment gateways wired for your region.',
                'price' => 'Custom',
                'category' => 'eCommerce & Marketplace',
                'is_featured' => true,
                'features' => ['icon' => 'ShoppingCart', 'tags' => ['Checkout', 'Payments']],
            ],
            [
                'name' => 'Multi-Vendor Marketplace',
                'description' => 'Seller onboarding, commission splits, and per-vendor storefronts on one platform with unified search and reviews.',
                'price' => 'Custom',
                'category' => 'eCommerce & Marketplace',
                'is_featured' => false,
                'features' => ['icon' => 'Store', 'tags' => ['Vendors', 'Payouts']],
            ],
            [
                'name' => 'Subscription Commerce',
                'description' => 'Recurring billing, plan management, and dunning flows for box services and digital products that sell on repeat.',
                'price' => 'Custom',
                'category' => 'eCommerce & Marketplace',
                'is_featured' => false,
                'features' => ['icon' => 'ShoppingBasket', 'tags' => ['Recurring', 'Billing']],
            ],

            // On-Demand Apps -> variant "ondemand"
            [
                'name' => 'Delivery & Dispatch App',
                'description' => 'Real-time order routing, driver tracking, and live status updates for food, grocery, or courier operations.',
                'price' => 'Custom',
                'category' => 'On-Demand Apps',
                'is_featured' => true,
                'features' => ['icon' => 'Car', 'tags' => ['Realtime', 'Tracking']],
            ],
            [
                'name' => 'Booking & Reservations',
                'description' => 'Calendar-based scheduling with availability rules, reminders, and payments for services, venues, and appointments.',
                'price' => 'Custom',
                'category' => 'On-Demand Apps',
                'is_featured' => false,
                'features' => ['icon' => 'ListTodo', 'tags' => ['Scheduling', 'Payments']],
            ],
            [
                'name' => 'Home Services Marketplace',
                'description' => 'Connect customers with vetted professionals — quotes, live job status, and in-app payments in one flow.',
                'price' => 'Custom',
                'category' => 'On-Demand Apps',
                'is_featured' => false,
                'features' => ['icon' => 'Wrench', 'tags' => ['Matching', 'Escrow']],
            ],

            // Education & Healthcare -> variant "care"
            [
                'name' => 'Learning Management System',
                'description' => 'Courses, cohorts, and progress tracking with quizzes, certificates, and drip content for schools and academies.',
                'price' => 'Custom',
                'category' => 'Education & Healthcare',
                'is_featured' => true,
                'features' => ['icon' => 'School', 'tags' => ['Courses', 'Progress']],
            ],
            [
                'name' => 'Telehealth Platform',
                'description' => 'Secure video consultations, appointment scheduling, and patient records built with privacy and compliance in mind.',
                'price' => 'Custom',
                'category' => 'Education & Healthcare',
                'is_featured' => false,
                'features' => ['icon' => 'HeartPulse', 'tags' => ['Video', 'Records']],
            ],
            [
                'name' => 'Course & Content Portal',
                'description' => 'A knowledge library with structured lessons, downloadable resources, and gated access for members.',
                'price' => 'Custom',
                'category' => 'Education & Healthcare',
                'is_featured' => false,
                'features' => ['icon' => 'BookOpen', 'tags' => ['Library', 'Gated']],
            ],

            // Portals & Community -> variant "community"
            [
                'name' => 'Membership Community',
                'description' => 'Profiles, discussion spaces, and tiered access that turn an audience into an engaged, recurring community.',
                'price' => 'Custom',
                'category' => 'Portals & Community',
                'is_featured' => true,
                'features' => ['icon' => 'Users', 'tags' => ['Profiles', 'Tiers']],
            ],
            [
                'name' => 'Job & Listing Board',
                'description' => 'Searchable listings with employer dashboards, applicant tracking, and featured-post monetisation.',
                'price' => 'Custom',
                'category' => 'Portals & Community',
                'is_featured' => false,
                'features' => ['icon' => 'Newspaper', 'tags' => ['Search', 'Listings']],
            ],
            [
                'name' => 'Matchmaking Platform',
                'description' => 'Rule-based matching that connects the right people or resources, with messaging and reputation built in.',
                'price' => 'Custom',
                'category' => 'Portals & Community',
                'is_featured' => false,
                'features' => ['icon' => 'HeartHandshake', 'tags' => ['Matching', 'Messaging']],
            ],

            // Design & Print -> variant "design"
            [
                'name' => 'Brand Identity System',
                'description' => 'A cohesive visual language — logo, type scale, and color tokens — synced from Figma to production CSS.',
                'price' => 'From $2,900',
                'category' => 'Design & Print',
                'is_featured' => true,
                'features' => ['icon' => 'Palette', 'tags' => ['Branding', 'Tokens']],
            ],
            [
                'name' => 'FMCG Packaging Design',
                'description' => 'Print-ready die-cut layouts, CMYK calibration, and contrast hierarchy that make a product pop on a crowded shelf.',
                'price' => 'From $1,400',
                'category' => 'Design & Print',
                'is_featured' => false,
                'features' => ['icon' => 'Printer', 'tags' => ['Packaging', 'CMYK']],
            ],
            [
                'name' => 'Corporate Stationery Kit',
                'description' => 'Business cards, letterheads, and folders on a consistent grid — CMYK vectors ready for the press.',
                'price' => 'From $650',
                'category' => 'Design & Print',
                'is_featured' => false,
                'features' => ['icon' => 'Signature', 'tags' => ['Print', 'Vectors']],
            ],

            // SaaS & Cloud Platforms -> reuses variant "enterprise"
            [
                'name' => 'Multi-Tenant SaaS Platform',
                'description' => 'A production-ready multi-tenant foundation with per-tenant isolation, plan gating, and self-serve onboarding baked in.',
                'price' => 'Custom',
                'category' => 'SaaS & Cloud Platforms',
                'is_featured' => true,
                'features' => ['icon' => 'Cloud', 'tags' => ['Multi-Tenant', 'Billing']],
            ],
            [
                'name' => 'Usage & Metering Engine',
                'description' => 'Track events, meter consumption, and turn raw usage into accurate, real-time invoices without a billing team.',
                'price' => 'Custom',
                'category' => 'SaaS & Cloud Platforms',
                'is_featured' => false,
                'features' => ['icon' => 'LineChart', 'tags' => ['Metering', 'Analytics']],
            ],
            [
                'name' => 'Team Access & SSO',
                'description' => 'Organisations, roles, and single sign-on wired so enterprise customers can self-manage their own users securely.',
                'price' => 'Custom',
                'category' => 'SaaS & Cloud Platforms',
                'is_featured' => false,
                'features' => ['icon' => 'Shield', 'tags' => ['SSO', 'RBAC']],
            ],

            // Mobile Applications -> reuses variant "ondemand"
            [
                'name' => 'Cross-Platform Mobile App',
                'description' => 'One codebase shipping polished native iOS and Android apps with offline sync and push notifications.',
                'price' => 'Custom',
                'category' => 'Mobile Applications',
                'is_featured' => true,
                'features' => ['icon' => 'Smartphone', 'tags' => ['iOS', 'Android']],
            ],
            [
                'name' => 'Field Service App',
                'description' => 'Offline-first tooling for technicians — job routing, photo capture, and GPS check-ins that sync when back online.',
                'price' => 'Custom',
                'category' => 'Mobile Applications',
                'is_featured' => false,
                'features' => ['icon' => 'Rocket', 'tags' => ['Offline', 'GPS']],
            ],
            [
                'name' => 'Loyalty & Rewards App',
                'description' => 'Points, tiers, and targeted push campaigns that turn one-time buyers into repeat, engaged customers.',
                'price' => 'Custom',
                'category' => 'Mobile Applications',
                'is_featured' => false,
                'features' => ['icon' => 'Gift', 'tags' => ['Rewards', 'Push']],
            ],

            // Fintech & Payments -> reuses variant "commerce"
            [
                'name' => 'Digital Wallet & Payments',
                'description' => 'Stored balances, peer transfers, and gateway integrations with KYC and fraud checks built to compliance standards.',
                'price' => 'Custom',
                'category' => 'Fintech & Payments',
                'is_featured' => true,
                'features' => ['icon' => 'CreditCard', 'tags' => ['Wallet', 'KYC']],
            ],
            [
                'name' => 'Lending & Credit Platform',
                'description' => 'Application flows, risk scoring, and repayment schedules for consumer or SME lending, audit-ready by design.',
                'price' => 'Custom',
                'category' => 'Fintech & Payments',
                'is_featured' => false,
                'features' => ['icon' => 'Landmark', 'tags' => ['Scoring', 'Compliance']],
            ],
            [
                'name' => 'Invoicing & Billing Suite',
                'description' => 'Recurring invoices, tax handling, and reconciliation that keep cash flow and books in sync automatically.',
                'price' => 'Custom',
                'category' => 'Fintech & Payments',
                'is_featured' => false,
                'features' => ['icon' => 'ReceiptText', 'tags' => ['Invoices', 'Tax']],
            ],

            // AI & Automation -> reuses variant "community"
            [
                'name' => 'AI Chat Assistant',
                'description' => 'A retrieval-augmented assistant grounded in your own content, wired into the channels your customers already use.',
                'price' => 'Custom',
                'category' => 'AI & Automation',
                'is_featured' => true,
                'features' => ['icon' => 'Bot', 'tags' => ['LLM', 'RAG']],
            ],
            [
                'name' => 'Document Intelligence',
                'description' => 'Extract structured data from invoices, contracts, and forms with OCR and LLM parsing that learns your formats.',
                'price' => 'Custom',
                'category' => 'AI & Automation',
                'is_featured' => false,
                'features' => ['icon' => 'BrainCircuit', 'tags' => ['OCR', 'Extraction']],
            ],
            [
                'name' => 'Workflow Automation',
                'description' => 'Event-driven pipelines that connect your tools, trigger on real-world events, and remove repetitive manual work.',
                'price' => 'Custom',
                'category' => 'AI & Automation',
                'is_featured' => false,
                'features' => ['icon' => 'Cpu', 'tags' => ['Pipelines', 'Triggers']],
            ],

            // Media & Streaming -> reuses variant "design"
            [
                'name' => 'Video Streaming Platform',
                'description' => 'Adaptive HLS delivery, DRM protection, and a tuned player for on-demand or live audiences at scale.',
                'price' => 'Custom',
                'category' => 'Media & Streaming',
                'is_featured' => true,
                'features' => ['icon' => 'Video', 'tags' => ['HLS', 'DRM']],
            ],
            [
                'name' => 'Podcast & Audio Hub',
                'description' => 'Hosting, RSS distribution, and listener analytics for shows that need to publish everywhere from one place.',
                'price' => 'Custom',
                'category' => 'Media & Streaming',
                'is_featured' => false,
                'features' => ['icon' => 'Film', 'tags' => ['Audio', 'RSS']],
            ],
            [
                'name' => 'Digital Publishing',
                'description' => 'A modern editorial CMS with scheduling, paywalls, and multi-author workflows for content-driven brands.',
                'price' => 'Custom',
                'category' => 'Media & Streaming',
                'is_featured' => false,
                'features' => ['icon' => 'Layers', 'tags' => ['CMS', 'Paywall']],
            ],

            // --- Additional products expanding each remaining category ---

            [
                'name' => 'Supply Chain & Inventory',
                'description' => 'Real-time stock levels, purchase orders, and warehouse movements tracked across every location from one console.',
                'price' => 'Custom',
                'category' => 'Business & Enterprise',
                'is_featured' => false,
                'features' => ['icon' => 'PackageOpen', 'tags' => ['Inventory', 'Logistics']],
            ],
            [
                'name' => 'Headless Commerce API',
                'description' => 'A decoupled catalogue, cart, and checkout API that powers storefronts, apps, and kiosks from a single backend.',
                'price' => 'Custom',
                'category' => 'eCommerce & Marketplace',
                'is_featured' => false,
                'features' => ['icon' => 'Package', 'tags' => ['Headless', 'API']],
            ],
            [
                'name' => 'Food Delivery Network',
                'description' => 'Restaurant menus, live order tracking, and driver dispatch tuned for peak-hour throughput without dropped orders.',
                'price' => 'Custom',
                'category' => 'On-Demand Apps',
                'is_featured' => false,
                'features' => ['icon' => 'UtensilsCrossed', 'tags' => ['Dispatch', 'Realtime']],
            ],
            [
                'name' => 'Student & Patient Portal',
                'description' => 'A secure self-service hub for records, scheduling, and messaging that patients and students actually log back into.',
                'price' => 'Custom',
                'category' => 'Education & Healthcare',
                'is_featured' => false,
                'features' => ['icon' => 'Users', 'tags' => ['Portal', 'Records']],
            ],
            [
                'name' => 'Events & Ticketing',
                'description' => 'Listings, RSVPs, and QR ticketing with capacity rules and check-in flows for online and in-person events.',
                'price' => 'Custom',
                'category' => 'Portals & Community',
                'is_featured' => false,
                'features' => ['icon' => 'ListTodo', 'tags' => ['Events', 'Tickets']],
            ],
            [
                'name' => 'Pitch Deck & Presentation Design',
                'description' => 'Investor-ready decks with a consistent grid, custom charts, and on-brand typography that command the room.',
                'price' => 'From $900',
                'category' => 'Design & Print',
                'is_featured' => false,
                'features' => ['icon' => 'PenTool', 'tags' => ['Decks', 'Layout']],
            ],
            [
                'name' => 'Data Warehouse & Pipelines',
                'description' => 'ETL pipelines and a query-ready warehouse that unify product, billing, and marketing data for reliable reporting.',
                'price' => 'Custom',
                'category' => 'SaaS & Cloud Platforms',
                'is_featured' => false,
                'features' => ['icon' => 'Database', 'tags' => ['ETL', 'Warehouse']],
            ],
            [
                'name' => 'Fitness & Wellness App',
                'description' => 'Workout plans, habit streaks, and wearable sync that keep users coming back with progress they can feel.',
                'price' => 'Custom',
                'category' => 'Mobile Applications',
                'is_featured' => false,
                'features' => ['icon' => 'HeartPulse', 'tags' => ['Tracking', 'Wearables']],
            ],
            [
                'name' => 'Fraud & Risk Engine',
                'description' => 'Rule- and model-driven scoring that flags suspicious transactions in real time before they clear.',
                'price' => 'Custom',
                'category' => 'Fintech & Payments',
                'is_featured' => false,
                'features' => ['icon' => 'Shield', 'tags' => ['Fraud', 'Risk']],
            ],
            [
                'name' => 'Predictive Analytics',
                'description' => 'Forecasting models wired into your data that turn historical trends into demand, churn, and revenue predictions.',
                'price' => 'Custom',
                'category' => 'AI & Automation',
                'is_featured' => false,
                'features' => ['icon' => 'LineChart', 'tags' => ['ML', 'Forecasting']],
            ],
            [
                'name' => 'Live Events & Webinars',
                'description' => 'Low-latency live streaming with chat, Q&A, and recording for webinars, launches, and virtual conferences.',
                'price' => 'Custom',
                'category' => 'Media & Streaming',
                'is_featured' => false,
                'features' => ['icon' => 'Globe', 'tags' => ['Live', 'Low-Latency']],
            ],

            // --- Extra products so category counts vary (a random 4–6 spread) ---

            // Business & Enterprise -> 6
            [
                'name' => 'Business Intelligence Suite',
                'description' => 'Self-serve dashboards and scheduled reports that turn scattered operational data into decisions leadership can act on.',
                'price' => 'Custom',
                'category' => 'Business & Enterprise',
                'is_featured' => false,
                'features' => ['icon' => 'LineChart', 'tags' => ['BI', 'Dashboards']],
            ],
            [
                'name' => 'HR & Payroll System',
                'description' => 'Employee records, leave, and payroll runs with approvals and payslips handled in one compliant workflow.',
                'price' => 'Custom',
                'category' => 'Business & Enterprise',
                'is_featured' => false,
                'features' => ['icon' => 'Users', 'tags' => ['HR', 'Payroll']],
            ],

            // eCommerce & Marketplace -> 5
            [
                'name' => 'Loyalty & Coupons Engine',
                'description' => 'Points, referral rewards, and rule-based coupons that lift repeat purchase rate without eroding margins.',
                'price' => 'Custom',
                'category' => 'eCommerce & Marketplace',
                'is_featured' => false,
                'features' => ['icon' => 'Gift', 'tags' => ['Loyalty', 'Coupons']],
            ],

            // Education & Healthcare -> 6
            [
                'name' => 'Clinic Management System',
                'description' => 'Appointments, patient charts, and billing in one console that keeps a busy practice running without paperwork pileups.',
                'price' => 'Custom',
                'category' => 'Education & Healthcare',
                'is_featured' => false,
                'features' => ['icon' => 'HeartPulse', 'tags' => ['Scheduling', 'Billing']],
            ],
            [
                'name' => 'Online Exam & Proctoring',
                'description' => 'Timed assessments with question banks, auto-grading, and integrity checks for schools running remote exams.',
                'price' => 'Custom',
                'category' => 'Education & Healthcare',
                'is_featured' => false,
                'features' => ['icon' => 'BookOpen', 'tags' => ['Exams', 'Proctoring']],
            ],

            // Portals & Community -> 5
            [
                'name' => 'Forum & Q&A Platform',
                'description' => 'Threaded discussions, voting, and reputation that grow a knowledge base your community maintains for itself.',
                'price' => 'Custom',
                'category' => 'Portals & Community',
                'is_featured' => false,
                'features' => ['icon' => 'Newspaper', 'tags' => ['Forum', 'Reputation']],
            ],

            // SaaS & Cloud Platforms -> 6
            [
                'name' => 'Feature Flag & Rollout',
                'description' => 'Targeted flags and gradual rollouts that let you ship to a slice of users and roll back instantly if metrics dip.',
                'price' => 'Custom',
                'category' => 'SaaS & Cloud Platforms',
                'is_featured' => false,
                'features' => ['icon' => 'Cloud', 'tags' => ['Flags', 'Rollout']],
            ],
            [
                'name' => 'Status & Uptime Monitor',
                'description' => 'Health checks, incident timelines, and a public status page that keep customers informed before they open a ticket.',
                'price' => 'Custom',
                'category' => 'SaaS & Cloud Platforms',
                'is_featured' => false,
                'features' => ['icon' => 'Shield', 'tags' => ['Monitoring', 'Alerts']],
            ],

            // Mobile Applications -> 5
            [
                'name' => 'Social Networking App',
                'description' => 'Feeds, direct messaging, and notifications built to keep communities engaged with real-time interaction.',
                'price' => 'Custom',
                'category' => 'Mobile Applications',
                'is_featured' => false,
                'features' => ['icon' => 'Smartphone', 'tags' => ['Feed', 'Chat']],
            ],

            // Fintech & Payments -> 5
            [
                'name' => 'Expense Management',
                'description' => 'Receipt capture, approval chains, and card reconciliation that give finance real-time control over company spend.',
                'price' => 'Custom',
                'category' => 'Fintech & Payments',
                'is_featured' => false,
                'features' => ['icon' => 'ReceiptText', 'tags' => ['Expenses', 'Approvals']],
            ],

            // AI & Automation -> 5
            [
                'name' => 'Recommendation Engine',
                'description' => 'Personalised product and content suggestions driven by behavioural signals that lift engagement and average order value.',
                'price' => 'Custom',
                'category' => 'AI & Automation',
                'is_featured' => false,
                'features' => ['icon' => 'BrainCircuit', 'tags' => ['Personalisation', 'ML']],
            ],

            // Design & Print -> 6
            [
                'name' => 'Marketing Collateral Suite',
                'description' => 'Brochures, flyers, and social templates on one grid so every campaign asset stays on-brand and press-ready.',
                'price' => 'From $750',
                'category' => 'Design & Print',
                'is_featured' => false,
                'features' => ['icon' => 'Newspaper', 'tags' => ['Collateral', 'Templates']],
            ],
            [
                'name' => 'Signage & Environmental Graphics',
                'description' => 'Large-format wayfinding, banners, and booth graphics with production-accurate colour and scale for physical spaces.',
                'price' => 'From $1,100',
                'category' => 'Design & Print',
                'is_featured' => false,
                'features' => ['icon' => 'Printer', 'tags' => ['Signage', 'Large-Format']],
            ],
        ];
    }
}

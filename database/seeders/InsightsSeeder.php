<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\ArticleCategory;
use App\Models\ArticleTag;
use App\Models\Author;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class InsightsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * Articles are intentionally tied to OVOLL's real offering — the five
     * solution ecosystems (Brand Experience, Digital Products, Engineering &
     * WebGL, AI & Automation, Performance & Growth) and the productized kits
     * (Vanguard UI Kit, Obsidian WebGL Boilerplate, packaging + stationery
     * packs). No filler topics.
     */
    public function run(): void
    {
        // Clear existing records first
        Schema::disableForeignKeyConstraints();
        Article::truncate();
        Author::truncate();
        ArticleCategory::truncate();
        ArticleTag::truncate();
        Schema::enableForeignKeyConstraints();

        // 1. Authors
        $authors = [
            [
                'name' => 'Sarah Connor',
                'slug' => 'sarah-connor',
                'bio' => 'Editorial Director covering the intersection of luxury brand systems, packaging, and high-fidelity interface design.',
                'role' => 'Editorial Director',
                'expertise' => ['Brand Strategy', 'UI/UX', 'Motion Systems'],
            ],
            [
                'name' => 'Marcus Chen',
                'slug' => 'marcus-chen',
                'bio' => 'Lead Engineer writing about Laravel + React architecture, WebGL shaders, AI automation, and performance scaling.',
                'role' => 'Lead Engineer',
                'expertise' => ['Full-Stack Engineering', 'WebGL Shaders', 'AI Automation'],
            ],
            [
                'name' => 'Priya Nair',
                'slug' => 'priya-nair',
                'bio' => 'Growth Strategist focused on Generative Engine Optimization, Core Web Vitals, and conversion telemetry.',
                'role' => 'Growth Strategist',
                'expertise' => ['SEO / GEO', 'Performance', 'Conversion'],
            ],
        ];

        $authorModels = [];
        foreach ($authors as $author) {
            $authorModels[$author['slug']] = Author::create($author);
        }

        // 2. Categories — mirror the studio's public solution ecosystems
        $categories = [
            ['name' => 'Brand & Design', 'slug' => 'design', 'description' => 'Brand systems, packaging architecture, print proofing, and interface aesthetics.'],
            ['name' => 'Engineering Systems', 'slug' => 'engineering', 'description' => 'Laravel + React architecture, WebGL, mobile, and AI automation.'],
            ['name' => 'Growth & Strategy', 'slug' => 'business', 'description' => 'GEO/SEO, Core Web Vitals, conversion telemetry, and product strategy.'],
        ];

        foreach ($categories as $category) {
            ArticleCategory::create($category);
        }

        // 3. Tags
        $tags = [
            ['name' => 'React', 'slug' => 'react'],
            ['name' => 'Laravel', 'slug' => 'laravel'],
            ['name' => 'Three.js', 'slug' => 'threejs'],
            ['name' => 'TypeScript', 'slug' => 'typescript'],
            ['name' => 'AI', 'slug' => 'ai'],
            ['name' => 'Branding', 'slug' => 'branding'],
            ['name' => 'SEO', 'slug' => 'seo'],
        ];

        $tagModels = [];
        foreach ($tags as $tag) {
            $tagModels[] = ArticleTag::create($tag);
        }

        // Small helper to keep article definitions terse.
        $text = fn (string $html): array => ['type' => 'text', 'data' => ['content' => $html]];
        $quote = fn (string $q, string $who, string $role): array => ['type' => 'quote', 'data' => ['quote' => $q, 'author' => $who, 'role' => $role]];
        $code = fn (string $lang, string $c): array => ['type' => 'code', 'data' => ['language' => $lang, 'code' => $c]];
        $callout = fn (string $type, string $title, string $msg): array => ['type' => 'callout', 'data' => ['type' => $type, 'title' => $title, 'message' => $msg]];

        // 4. Articles tied to OVOLL services, products & concept
        $articlesData = [
            // ---------- Brand & Design ----------
            [
                'title' => 'Building a Brand System That Commands Premium Pricing',
                'category_slug' => 'design',
                'author_slug' => 'sarah-connor',
                'excerpt' => 'How OVOLL turns typography coordinates, HSL color tokens, and logomark presets into a cohesive identity that lets a firm charge more.',
                'is_featured' => true,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Consistency Is the Product</h2><p>Generic, inconsistent visual systems are the single biggest reason firms fail to command premium pricing. A brand system fixes this by codifying every decision — type scale, HSL color tokens, spacing — into one referenceable source of truth.</p>'),
                    $quote('A brand isn\'t a logo; it\'s the discipline of never contradicting yourself.', 'Sarah Connor', 'Editorial Director'),
                ],
            ],
            [
                'title' => 'FMCG Packaging Architecture: Winning the Shelf in 3 Seconds',
                'category_slug' => 'design',
                'author_slug' => 'sarah-connor',
                'excerpt' => 'Die-cut outlines, CMYK calibration, and contrast hierarchy — the packaging decisions that make a product pop on a crowded retail shelf.',
                'is_featured' => false,
                'is_pinned' => true,
                'content' => [
                    $text('<h2>The Three-Second Test</h2><p>A shopper scans a shelf in seconds. Packaging that relies on bland colors and low-contrast type disappears. We draft vector layouts with deliberate contrast hierarchy and print-ready die-cut coordinates that survive the CMYK conversion.</p>'),
                    $callout('info', 'Bleed Rule', 'Always build packaging artwork with a 3mm bleed and keep critical text 5mm inside the trim to survive real-world cutting tolerances.'),
                ],
            ],
            [
                'title' => 'Corporate Collateral: Why Stationery Still Signals Authority',
                'category_slug' => 'design',
                'author_slug' => 'sarah-connor',
                'excerpt' => 'Business cards, letterheads, and folders remain the physical handshake of a brand. How uniform layout constraints keep them coherent.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>The Physical Handshake</h2><p>Mismatched stationery quietly erodes trust in client meetings. A cohesive kit enforces logo spacing constraints, a shared type scale, and premium paper selection so every touchpoint reinforces the same story.</p>'),
                ],
            ],
            [
                'title' => 'Mathematical Easing Curves in Premium Interaction Design',
                'category_slug' => 'design',
                'author_slug' => 'sarah-connor',
                'excerpt' => 'Why bouncy transitions read as amateurish and how a deterministic cubic-bezier (0.16, 1, 0.3, 1) projects luxury-engineering.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>The Mechanics of Easing</h2><p>Motion is a silent communicator of build quality. Excessive bounce feels game-like; a deterministic ease-out feels confident and mechanical. We standardize primary transitions on one curve.</p>'),
                    $code('css', ".ease-editorial {\n    transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);\n}"),
                ],
            ],
            [
                'title' => 'Design Tokens: Syncing Figma, Tailwind v4, and CSS Variables',
                'category_slug' => 'design',
                'author_slug' => 'sarah-connor',
                'excerpt' => 'A single token pipeline keeps color, spacing, and radius identical across design tools and production CSS — no more drift.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>One Source of Truth</h2><p>When designers and engineers keep separate values, layouts drift. We map every metric to CSS custom properties so a token change propagates everywhere at once.</p>'),
                    $code('css', ":root {\n    --spacing-editorial: 24px;\n    --color-brand-primary: hsl(174, 80%, 40%);\n}"),
                ],
            ],
            [
                'title' => 'Inside the Vanguard UI Kit: 80+ Components That Stay On-Brand',
                'category_slug' => 'design',
                'author_slug' => 'sarah-connor',
                'excerpt' => 'A look at how our copy-paste React + Tailwind v4 component system ships glass matrices, kinetic scroll layouts, and motion presets.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Speed Without Sacrificing Taste</h2><p>The Vanguard UI Kit exists to remove the blank-canvas tax. Over 80 responsive components arrive pre-wired with motion presets and Tailwind v4 tokens, so teams ship fast while staying on-brand.</p>'),
                    $callout('info', 'Composition First', 'Every Vanguard component is built to compose — no locked variants. You own the source and extend it inline.'),
                ],
            ],
            [
                'title' => 'Print Proofing: Eliminating Muddy Color Before It Ships',
                'category_slug' => 'design',
                'author_slug' => 'sarah-connor',
                'excerpt' => 'Vector sanitation, GSM paper selection, and pre-flight CMYK checks that keep printed assets crisp instead of offset and dull.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>The Last Mile of Design</h2><p>A perfect layout still fails if the print run is muddy. We pre-flight vector files, verify CMYK percentages, and specify paper stock weight and finish before anything reaches a press.</p>'),
                ],
            ],
            [
                'title' => 'Industrial Styling: Validating Ergonomics Before Tooling',
                'category_slug' => 'design',
                'author_slug' => 'sarah-connor',
                'excerpt' => 'Interactive 3D mockups and vector specification drawings catch ergonomic and assembly problems before expensive manufacturing.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Fix It in CAD, Not in Tooling</h2><p>Physical products designed without ergonomic research force costly manufacturing changes. We validate form with interactive 3D mockups and dimension drawings before a single mold is cut.</p>'),
                ],
            ],

            // ---------- Engineering Systems ----------
            [
                'title' => 'Latency Budgeting: Keeping Laravel Routes Under 50ms',
                'category_slug' => 'engineering',
                'author_slug' => 'marcus-chen',
                'excerpt' => 'SQL index strategy, banning lazy loading, and Redis cache architecture required to lock controller responses below 50ms.',
                'is_featured' => false,
                'is_pinned' => true,
                'content' => [
                    $text('<h2>Establishing Latency Bounds</h2><p>Every millisecond of wait is a drop in conversion. In production we enforce a 50ms response ceiling on web routes, which demands pre-compiled relations and zero lazy loading.</p>'),
                    $code('php', "// AppServiceProvider.php\npublic function boot(): void {\n    Model::preventLazyLoading(! \$this->app->isProduction());\n}"),
                ],
            ],
            [
                'title' => 'Full-Stack Enterprise Systems with Laravel 13 + Inertia + React 19',
                'category_slug' => 'engineering',
                'author_slug' => 'marcus-chen',
                'excerpt' => 'How we wire secure database schemas, Filament v5 admin panels, and synchronized React state into one coherent SaaS platform.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>One Mental Model, Front to Back</h2><p>Inertia lets us keep server-side routing while shipping a client-rendered SPA. Laravel 13 owns the data and auth; React 19 owns the interaction; Filament v5 owns the admin surface.</p>'),
                    $callout('info', 'Deferred Props', 'Use Inertia deferred props for below-the-fold data so the first paint is never blocked on a slow query.'),
                ],
            ],
            [
                'title' => 'GPU InstancedMesh Sanitation for Ambient WebGL Canvases',
                'category_slug' => 'engineering',
                'author_slug' => 'marcus-chen',
                'excerpt' => 'Rendering thousands of floating nodes at 60fps on mobile by sharing geometry buffers and capping device pixel ratio.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>WebGL Buffer Sanitation</h2><p>Separate meshes explode draw calls. InstancedMesh shares one buffer across thousands of nodes, holding 60fps on standard mobile displays.</p>'),
                    $code('javascript', "const mesh = new THREE.InstancedMesh(geometry, material, count);\nfor (let i = 0; i < count; i++) {\n    transform.setPosition(x, y, z);\n    mesh.setMatrixAt(i, transform);\n}"),
                ],
            ],
            [
                'title' => 'Inside the Obsidian WebGL Boilerplate: Vite + R3F + GLSL',
                'category_slug' => 'engineering',
                'author_slug' => 'marcus-chen',
                'excerpt' => 'A tour of our production skeleton — custom GLSL backdrop shaders, instanced-mesh controls, and a GSAP ScrollTrigger timeline builder.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Skip the Setup Tax</h2><p>Obsidian is the starting point we wished existed: a Vite + TypeScript + React Three Fiber skeleton with a GLSL particle gravity shader and 60fps guard clauses already wired in.</p>'),
                    $callout('warning', 'Dispose Everything', 'Every geometry, material, and texture must be disposed on unmount. Obsidian ships a disposal hook so leaks never reach production.'),
                ],
            ],
            [
                'title' => 'Cinematic Scroll Choreography with GSAP ScrollTrigger',
                'category_slug' => 'engineering',
                'author_slug' => 'marcus-chen',
                'excerpt' => 'Pinning sections, sequencing reveals, and keeping scroll-driven animation smooth without janking the main thread.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Scroll as a Timeline</h2><p>ScrollTrigger treats the scrollbar as a playhead. We pin sections, sequence reveals, and scrub WebGL parameters — all while keeping work off the main thread to protect frame rate.</p>'),
                    $code('javascript', "gsap.to(mesh.rotation, {\n    y: Math.PI * 2,\n    scrollTrigger: { trigger: '#stage', scrub: 1, pin: true },\n});"),
                ],
            ],
            [
                'title' => 'State Synchronization Across Inertia.js Navigations',
                'category_slug' => 'engineering',
                'author_slug' => 'marcus-chen',
                'excerpt' => 'Preserving scroll position, layout state, and animation continuity between page visits without full repaints.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Handling Session State</h2><p>Preserving scroll and animation state across visits is what makes an SPA feel native. Inertia v3 layout wrappers cache local props and swap content without a repaint.</p>'),
                    $callout('warning', 'Preserve Flags', 'Add preserveState and preserveScroll to navigation links so visual layouts stay intact between visits.'),
                ],
            ],
            [
                'title' => 'Type-Safe API Contracts Between Laravel and React 19',
                'category_slug' => 'engineering',
                'author_slug' => 'marcus-chen',
                'excerpt' => 'Generating TypeScript interfaces from Eloquent models so a schema change surfaces as a compile error, not a runtime crash.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Type Safety Across the Wire</h2><p>Mismatched PHP and TypeScript schemas cause silent runtime breaks. We generate TS interfaces directly from Eloquent models so drift becomes a compile-time error.</p>'),
                ],
            ],
            [
                'title' => 'Cross-Platform Mobile with React Native: Feature Parity Done Right',
                'category_slug' => 'engineering',
                'author_slug' => 'marcus-chen',
                'excerpt' => 'Caching layers, hardware-accelerated animation, and a modular state architecture that keeps iOS and Android in lockstep.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>One Codebase, Two Stores</h2><p>Sluggish mobile apps usually come from unshared logic and blocked animation threads. We build modular RN hooks, cache aggressively, and push animation onto the native driver.</p>'),
                ],
            ],
            [
                'title' => 'AI Agents & Process Automation: Cutting Admin Time by 70%',
                'category_slug' => 'engineering',
                'author_slug' => 'marcus-chen',
                'excerpt' => 'Semantic routing hubs, secure API pipelines, and Laravel queue-driven agents that run continuously in the background.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Automate the Repetitive Loop</h2><p>Manual admin, data sync, and support loops burn hundreds of hours. We wire LLM agents to internal models over secure pipelines and run them on Laravel queues for continuous, observable execution.</p>'),
                    $callout('info', 'Queue First', 'Long-running AI calls belong on a queue with retries and a dead-letter path — never inside a web request.'),
                ],
            ],
            [
                'title' => 'Structured Prompt Engineering for Reliable JSON Payloads',
                'category_slug' => 'engineering',
                'author_slug' => 'marcus-chen',
                'excerpt' => 'Framing system instructions with explicit target keys and few-shot examples so LLMs return parseable JSON with zero hallucinated fields.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Preventing Parser Failures</h2><p>Parsing free-form model output crashes servers. System prompts must declare target keys, a strict schema, and few-shot formatting examples to guarantee valid JSON.</p>'),
                    $code('json', "{\n    \"intent\": \"string\",\n    \"confidence\": 0.0,\n    \"entities\": []\n}"),
                ],
            ],
            [
                'title' => 'The Digital Product Incubator: From Scope to Edge Deployment',
                'category_slug' => 'engineering',
                'author_slug' => 'marcus-chen',
                'excerpt' => 'How a disciplined cycle — spec, tested code, edge deploy with telemetry — kills scope creep and gets MVPs to funding.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Discipline Beats Heroics</h2><p>Most products stall on vague specs and scope creep. Our incubator runs a strict loop: written system spec, feature-tested code, then edge deployment with monitoring from day one.</p>'),
                ],
            ],

            // ---------- Growth & Strategy ----------
            [
                'title' => 'Generative Engine Optimization: Ranking in AI Search, Not Just Google',
                'category_slug' => 'business',
                'author_slug' => 'priya-nair',
                'excerpt' => 'JSON-LD schema, semantic HTML5, and content structure that make platforms citable by ChatGPT, Perplexity, and Google alike.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Beyond Blue Links</h2><p>AI answer engines cite structured, semantic content. We inject JSON-LD, enforce a clean heading hierarchy, and write for extractability so a brand becomes a source the model quotes.</p>'),
                    $code('html', "<script type=\"application/ld+json\">\n{ \"@type\": \"Organization\", \"name\": \"OVOLL\" }\n</script>"),
                ],
            ],
            [
                'title' => 'Core Web Vitals as a Revenue Lever, Not a Checkbox',
                'category_slug' => 'business',
                'author_slug' => 'priya-nair',
                'excerpt' => 'Why a 100ms delay measurably drops conversions, and the LCP/CLS/INP fixes that protect the funnel.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Speed Is Money</h2><p>A 100ms load delay can shave over 1% off checkout conversion. Core Web Vitals aren\'t a compliance checkbox — LCP, CLS, and INP directly gate revenue.</p>'),
                    $callout('info', 'Measure Real Users', 'Optimize against field data (CrUX / RUM), not just lab scores — lab tools miss real-device variance.'),
                ],
            ],
            [
                'title' => 'Performance Campaigns: Turning Ad Traffic Into Qualified Leads',
                'category_slug' => 'business',
                'author_slug' => 'priya-nair',
                'excerpt' => 'High-converting landing pages, event tracking, and automated nurture flows that capture leads instead of leaking them.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Traffic Is Not the Goal</h2><p>Random ad traffic without capture is wasted spend. We pair intent-matched landing pages with tracked events and automated email nurture so every qualified lead is caught and worked.</p>'),
                ],
            ],
            [
                'title' => 'Clean Architecture as a Balance-Sheet Asset',
                'category_slug' => 'business',
                'author_slug' => 'priya-nair',
                'excerpt' => 'Why acquirers pay more for standardized design tokens and modular controllers — technical debt is measurable depreciation.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Due Diligence Reads Your Code</h2><p>During acquisition, buyers inspect architecture. Modular controllers, standardized tokens, and test coverage prove portability and directly raise valuation multipliers.</p>'),
                    $quote('Clean code is not an expense; it is a balance-sheet asset that reduces technical depreciation.', 'Priya Nair', 'Growth Strategist'),
                ],
            ],
            [
                'title' => 'Building Brand Trust Through Technical Transparency',
                'category_slug' => 'business',
                'author_slug' => 'priya-nair',
                'excerpt' => 'Why publishing your processes, tokens, and engineering parameters wins sophisticated clients before the first sales call.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Show the Work</h2><p>Sophisticated buyers trust demonstrated authority over logos. Publishing our design tokens, architecture, and R&D proves capability and shortens the path to a signed engagement.</p>'),
                ],
            ],
            [
                'title' => 'Motion Systems: A Reusable Animation Language for Product Teams',
                'category_slug' => 'design',
                'author_slug' => 'sarah-connor',
                'excerpt' => 'Codifying duration, easing, and stagger into named tokens so every team ships motion that feels like one product.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Motion Deserves Tokens Too</h2><p>Color and spacing get tokenized, but motion is usually improvised. We define named duration, easing, and stagger tokens so animation stays coherent across an entire product surface.</p>'),
                    $code('typescript', "export const motion = {\n    fast: 0.2,\n    base: 0.4,\n    ease: [0.16, 1, 0.3, 1],\n} as const;"),
                ],
            ],
            [
                'title' => 'Custom GLSL Shaders: Writing Your First Fragment Backdrop',
                'category_slug' => 'engineering',
                'author_slug' => 'marcus-chen',
                'excerpt' => 'A gentle path into fragment shaders — UVs, time uniforms, and noise — to build the ambient backdrops behind OVOLL sites.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Pixels as Math</h2><p>A fragment shader runs once per pixel. With a UV coordinate, a time uniform, and a noise function you can generate living gradient backdrops that cost almost nothing to animate.</p>'),
                    $code('glsl', "void main() {\n    vec2 uv = gl_FragCoord.xy / u_resolution;\n    float n = sin(uv.x * 6.0 + u_time);\n    gl_FragColor = vec4(vec3(0.18, 0.77, 0.65) * n, 1.0);\n}"),
                ],
            ],
            [
                'title' => 'Filament v5 Admin Panels: Shipping an Ops Dashboard in Days',
                'category_slug' => 'engineering',
                'author_slug' => 'marcus-chen',
                'excerpt' => 'Resources, relation managers, and custom actions that turn Eloquent models into a production admin surface fast.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Admin Is a Product Too</h2><p>Internal tools decide whether a team actually adopts a system. Filament v5 turns Eloquent models into a polished admin surface — resources, relation managers, and custom actions — in days, not sprints.</p>'),
                    $callout('info', 'Policies Still Apply', 'Filament respects your model policies. Wire authorization once and both the API and the panel stay in sync.'),
                ],
            ],
            [
                'title' => 'Positioning a Studio: Selling Outcomes, Not Hours',
                'category_slug' => 'business',
                'author_slug' => 'priya-nair',
                'excerpt' => 'Why hourly billing caps a studio\'s value and how outcome-based scoping aligns incentives with the client\'s result.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Price the Result</h2><p>Hourly billing punishes efficiency and caps upside. Scoping around a defined outcome — a shipped platform, a ranking gain — aligns incentives and lets a studio price on value delivered.</p>'),
                ],
            ],
            [
                'title' => 'Accessible by Default: WCAG AA+ Without Sacrificing Aesthetics',
                'category_slug' => 'design',
                'author_slug' => 'sarah-connor',
                'excerpt' => 'Semantic structure, focus states, and contrast discipline that keep a cinematic interface usable by everyone.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Beauty and Access Are Not Opposites</h2><p>Accessibility is a design constraint, not a compromise. Semantic landmarks, visible focus states, and disciplined contrast keep even a heavily animated interface usable — and rank better while doing it.</p>'),
                    $callout('info', 'Focus Is Visible', 'Never remove focus outlines without replacing them. Keyboard users need a clear, styled focus indicator on every interactive element.'),
                ],
            ],
            [
                'title' => 'Edge Caching Strategy with Vercel and Cloudflare',
                'category_slug' => 'engineering',
                'author_slug' => 'marcus-chen',
                'excerpt' => 'Static routes, stale-while-revalidate, and cache keys that push response times to the edge without stale data risk.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Serve From the Edge</h2><p>The fastest query is the one you never run. We push static and semi-static routes to edge caches with stale-while-revalidate, keeping responses near the user while a background refresh keeps data fresh.</p>'),
                    $callout('warning', 'Key Your Cache', 'Cache by the full varying surface — locale, auth state, query — or you will leak one user\'s response to another.'),
                ],
            ],

            // ============================================================
            //  Expanded catalogue — 50 additional in-depth articles across
            //  all three ecosystems (Brand & Design, Engineering, Growth).
            // ============================================================

            // ---------- Brand & Design (17) ----------
            [
                'title' => 'Color Theory for Dark Interfaces: Luminance Over Hue',
                'category_slug' => 'design',
                'author_slug' => 'sarah-connor',
                'excerpt' => 'Why dark UIs live or die on luminance steps, not saturated hues, and how to build an elevation-aware surface palette.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Elevation Is Light</h2><p>On a dark canvas, depth is communicated by luminance, not shadow. Each surface layer steps a few percent lighter than the one beneath it, so panels read as physically stacked rather than outlined.</p>'),
                    $text('<p>Saturated accents should be reserved for a single call to action per view. Flooding a dark interface with vivid hues destroys the calm that makes dark mode feel premium.</p>'),
                    $callout('info', 'Test at 30% Brightness', 'Review dark palettes on a dimmed display. Steps that look distinct at full brightness often collapse into one flat plane on real phones outdoors.'),
                ],
            ],
            [
                'title' => 'Type Scale Systems: Choosing a Modular Ratio That Scales',
                'category_slug' => 'design',
                'author_slug' => 'sarah-connor',
                'excerpt' => 'How a single modular ratio generates a harmonious type scale, and when to break the ratio for display headlines.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>One Ratio, Many Sizes</h2><p>A modular scale multiplies a base size by a fixed ratio to derive every step. A 1.25 (major third) ratio feels editorial and calm; 1.333 (perfect fourth) adds drama for marketing pages.</p>'),
                    $code('css', ":root {\n    --step-0: 1rem;\n    --step-1: 1.25rem;\n    --step-2: 1.563rem;\n    --step-3: 1.953rem;\n    --step-4: 2.441rem;\n}"),
                    $text('<p>Break the ratio deliberately for hero display type — a large jump signals hierarchy — but keep body and UI text strictly on-scale so reading rhythm never wobbles.</p>'),
                ],
            ],
            [
                'title' => 'Grid Systems: The Invisible Structure Behind Premium Layouts',
                'category_slug' => 'design',
                'author_slug' => 'sarah-connor',
                'excerpt' => 'A 12-column grid with a consistent gutter is the skeleton that makes editorial layouts feel intentional instead of arbitrary.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Alignment Is Perceived Quality</h2><p>Users cannot name a grid, but they feel its absence. Snapping every element to a shared column and baseline grid removes the low-grade visual noise that makes an interface feel cheap.</p>'),
                    $callout('info', 'Gutter Discipline', 'Pick one gutter value and reuse it everywhere. Mixed gutters are the fastest way to make a considered layout look accidental.'),
                ],
            ],
            [
                'title' => 'Micro-Interactions That Signal Craftsmanship',
                'category_slug' => 'design',
                'author_slug' => 'sarah-connor',
                'excerpt' => 'The tiny state changes — hover, press, success — that tell users a product was built with care rather than assembled.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Feedback Is Trust</h2><p>Every interactive element should acknowledge input within 100ms. A subtle scale on press, a color shift on hover, a checkmark on success — these confirm the system heard the user and is working.</p>'),
                    $code('css', ".btn:active {\n    transform: scale(0.97);\n    transition: transform 0.1s ease-out;\n}"),
                ],
            ],
            [
                'title' => 'Designing Empty States That Keep Users Engaged',
                'category_slug' => 'design',
                'author_slug' => 'sarah-connor',
                'excerpt' => 'The first screen a new user sees is usually empty. Treat it as onboarding, not an error, to lift activation.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Nothing Is an Opportunity</h2><p>An empty list is a teaching moment. Instead of a blank void, show a short explanation of the feature, a single primary action, and a hint of the value the user will get once data exists.</p>'),
                    $callout('info', 'One Action Only', 'Empty states should offer exactly one obvious next step. Multiple competing buttons paralyze a user who has no context yet.'),
                ],
            ],
            [
                'title' => 'Iconography Systems: Consistent Strokes, Consistent Trust',
                'category_slug' => 'design',
                'author_slug' => 'sarah-connor',
                'excerpt' => 'Mixed icon styles quietly fracture a brand. A single stroke width, grid, and corner radius keep an icon set coherent.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Icons Are Typography</h2><p>An icon set is a typeface for actions. Every glyph should share a stroke width, optical grid, and corner treatment so buttons and menus read as one considered system rather than a stock-icon grab bag.</p>'),
                    $text('<p>When you must mix a third-party set with custom marks, redraw the outliers to match your stroke — the inconsistency is more visible than any single missing icon.</p>'),
                ],
            ],
            [
                'title' => 'The Psychology of Whitespace in Luxury Brands',
                'category_slug' => 'design',
                'author_slug' => 'sarah-connor',
                'excerpt' => 'Generous negative space signals confidence and value. Why cramming content reads as discount and space reads as premium.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Space Is a Statement</h2><p>Discount brands fill every pixel because they fear wasting attention. Premium brands leave room to breathe, signaling that each element is important enough to stand alone. Whitespace is a claim about value.</p>'),
                    $quote('Whitespace is not empty; it is the frame that tells the eye what matters.', 'Sarah Connor', 'Editorial Director'),
                ],
            ],
            [
                'title' => 'Responsive Typography with CSS clamp()',
                'category_slug' => 'design',
                'author_slug' => 'sarah-connor',
                'excerpt' => 'Fluid type that scales smoothly between breakpoints using clamp(), removing the stair-step jumps of media queries.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Fluid Beats Stepped</h2><p>Media-query type scaling jumps abruptly at each breakpoint. clamp() interpolates a size against the viewport, so headlines grow smoothly and never feel oversized on a tablet or cramped on a phone.</p>'),
                    $code('css', "h1 {\n    font-size: clamp(2rem, 1.2rem + 4vw, 4.5rem);\n}"),
                    $callout('warning', 'Cap Both Ends', 'Always set a minimum and maximum in clamp(). An uncapped vw unit produces unreadable extremes on ultrawide and tiny screens.'),
                ],
            ],
            [
                'title' => 'Building a Component Library Designers Actually Use',
                'category_slug' => 'design',
                'author_slug' => 'sarah-connor',
                'excerpt' => 'Adoption fails when a library is rigid. How named tokens, sensible defaults, and escape hatches keep a system alive.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Flexible or Forgotten</h2><p>A component library that locks every variant gets abandoned the moment a real design need falls outside it. The durable approach ships strong defaults but exposes tokens and slots so teams extend rather than fork.</p>'),
                    $callout('info', 'Document the Why', 'Pair each component with the rationale for its defaults. Designers respect a rule they understand and route around one they do not.'),
                ],
            ],
            [
                'title' => 'Logo Clear-Space and Minimum-Size Rules That Protect the Mark',
                'category_slug' => 'design',
                'author_slug' => 'sarah-connor',
                'excerpt' => 'Defining clear-space as a multiple of a logo feature keeps the mark legible and uncrowded on every surface.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Give the Mark Room</h2><p>A logo crowded by text or edges loses its authority. Define clear-space as a multiple of a repeatable feature — the height of the logotype\'s cap, say — so the buffer scales with the mark at any size.</p>'),
                    $text('<p>Set a hard minimum size in both pixels and millimetres. Below that threshold, switch to a simplified logomark rather than letting fine detail turn to mud.</p>'),
                ],
            ],
            [
                'title' => 'Designing for Print and Screen from One Source File',
                'category_slug' => 'design',
                'author_slug' => 'sarah-connor',
                'excerpt' => 'A vector-first workflow that exports crisp RGB for screen and calibrated CMYK for press without redrawing anything.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Vector Is the Master</h2><p>When print and digital assets diverge into separate files, they drift. Keeping a single vector master and exporting RGB for screen and CMYK for press guarantees the brand looks identical in a browser and on a business card.</p>'),
                    $callout('warning', 'Convert, Then Proof', 'RGB-to-CMYK conversion shifts vivid blues and greens. Always soft-proof the CMYK export before approving a print run.'),
                ],
            ],
            [
                'title' => 'Gradient Meshes: Adding Depth Without Images',
                'category_slug' => 'design',
                'author_slug' => 'sarah-connor',
                'excerpt' => 'Layered CSS radial gradients create rich, performant backdrops that never pixelate and add zero image weight.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Depth for Free</h2><p>Stacking a few radial gradients with soft, low-opacity color pools produces an atmospheric backdrop that scales to any resolution and ships no image bytes — ideal for hero sections that must stay fast.</p>'),
                    $code('css', "background:\n    radial-gradient(circle at 20% 20%, rgba(46,196,165,0.12), transparent 60%),\n    radial-gradient(circle at 80% 30%, rgba(0,209,255,0.10), transparent 60%);"),
                ],
            ],
            [
                'title' => 'Dark Mode Done Right: Beyond Inverting Colors',
                'category_slug' => 'design',
                'author_slug' => 'sarah-connor',
                'excerpt' => 'True dark mode re-tunes contrast, desaturates accents, and softens pure white text to avoid eye strain and halation.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Inversion Is Not Dark Mode</h2><p>Flipping a light theme produces harsh, glowing interfaces. Real dark mode uses off-white text near #E6E6E6, desaturated accents, and elevation-based surfaces to prevent halation and fatigue during long sessions.</p>'),
                    $callout('info', 'Dim the Whites', 'Pure white text on near-black vibrates. Drop it a notch to reduce halation, especially for long-form reading.'),
                ],
            ],
            [
                'title' => 'Designing Data-Dense Dashboards Without Clutter',
                'category_slug' => 'design',
                'author_slug' => 'sarah-connor',
                'excerpt' => 'Progressive disclosure, a strict visual hierarchy, and restrained color keep a metrics-heavy dashboard readable.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Hierarchy Before Density</h2><p>Dashboards fail when everything shouts. Establish one primary metric per card, demote secondary figures to muted type, and reserve color for state — good, warning, bad — so the eye lands where it should first.</p>'),
                    $text('<p>Use progressive disclosure for detail: summaries on the surface, drill-downs on click. A dashboard\'s job is to answer the first question instantly and the second on demand.</p>'),
                ],
            ],
            [
                'title' => 'Sound Design in Interfaces: The Overlooked Layer',
                'category_slug' => 'design',
                'author_slug' => 'sarah-connor',
                'excerpt' => 'Subtle, optional audio cues can reinforce success and error states — when they respect user control and accessibility.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Audio as Confirmation</h2><p>A short, soft tone on a completed payment or a sent message adds a layer of confidence that visuals alone cannot. The rules are strict: short, quiet, semantically distinct, and always mutable.</p>'),
                    $callout('warning', 'Default to Silent', 'Never autoplay interface sound. Offer it as an opt-in and respect the OS reduced-motion and silent-mode signals.'),
                ],
            ],
            [
                'title' => 'Choosing Brand Fonts That License Cleanly',
                'category_slug' => 'design',
                'author_slug' => 'sarah-connor',
                'excerpt' => 'A beautiful typeface with the wrong license becomes a legal liability. How to vet web, app, and embedding rights.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>License Before Love</h2><p>Teams fall for a typeface, then discover it forbids app embedding or caps pageviews. Vet web, desktop, app, and logo-embedding rights up front, and budget for the tier your real traffic will hit.</p>'),
                    $text('<p>Variable fonts often license as one file covering many weights, which is both cheaper and lighter to serve than a stack of static cuts.</p>'),
                ],
            ],
            [
                'title' => 'Card Design Patterns: Elevation, Hierarchy, and Focus',
                'category_slug' => 'design',
                'author_slug' => 'sarah-connor',
                'excerpt' => 'The anatomy of a card that guides the eye — a clear title, restrained metadata, one action, and a considered hover.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Anatomy of a Good Card</h2><p>A card is a self-contained unit of meaning. It needs a dominant title, a short supporting line, at most one primary action, and enough internal padding that the content never touches the edge.</p>'),
                    $callout('info', 'Hover With Purpose', 'A hover state should hint at interactivity, not perform. A small lift and border shift is enough; animated confetti is noise.'),
                ],
            ],

            // ---------- Engineering Systems (18) ----------
            [
                'title' => 'Queue Architecture in Laravel: Horizon, Retries, and Backoff',
                'category_slug' => 'engineering',
                'author_slug' => 'marcus-chen',
                'excerpt' => 'Designing a resilient queue tier — dedicated connections, tuned retry/backoff, and Horizon supervision for observability.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Work Off the Request Path</h2><p>Anything slow or failure-prone — email, third-party calls, image processing — belongs on a queue. The web request returns instantly while workers absorb the load, and a single connection outage no longer becomes a user-facing 500.</p>'),
                    $code('php', "public int \$tries = 5;\n\npublic function backoff(): array\n{\n    return [10, 30, 60, 120, 300];\n}"),
                    $callout('info', 'Supervise Everything', 'Run workers under Horizon or Supervisor. An unmonitored worker that dies silently turns a queue into a black hole.'),
                ],
            ],
            [
                'title' => 'Database Indexing Playbook for Read-Heavy Apps',
                'category_slug' => 'engineering',
                'author_slug' => 'marcus-chen',
                'excerpt' => 'Composite indexes, covering indexes, and the query patterns that turn a 400ms table scan into a 4ms lookup.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Index the Query, Not the Column</h2><p>Indexes should mirror how you actually query. A composite index on (status, created_at) serves a filtered, sorted feed far better than two single-column indexes the planner can only partially use.</p>'),
                    $code('sql', "CREATE INDEX idx_articles_status_date\n    ON articles (status, published_at DESC);"),
                    $callout('warning', 'Read EXPLAIN', 'Never add an index on a hunch. Run EXPLAIN, confirm the planner uses it, and watch for indexes that only bloat writes.'),
                ],
            ],
            [
                'title' => 'Shrinking Your JavaScript Bundle Below 200KB',
                'category_slug' => 'engineering',
                'author_slug' => 'marcus-chen',
                'excerpt' => 'Route-level code splitting, lazy-loading heavy libraries, and tree-shaking imports to protect first paint.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Ship Less JavaScript</h2><p>The heaviest cost of a modern app is parsing JavaScript on a mid-range phone. Splitting by route and lazy-loading heavyweight libraries like a 3D renderer keeps the initial bundle small and interactive fast.</p>'),
                    $code('typescript', "const Editor = lazy(() => import('./Editor'));\n// Only fetched when the editor route mounts."),
                    $callout('info', 'Analyze the Bundle', 'Run a bundle visualizer regularly. A single accidental default import of a date library can double your payload.'),
                ],
            ],
            [
                'title' => 'Image Optimization: From Multi-MB to Kilobytes',
                'category_slug' => 'engineering',
                'author_slug' => 'marcus-chen',
                'excerpt' => 'Modern formats, responsive srcsets, and lazy loading that protect LCP without dropping visual quality.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>The Biggest Easy Win</h2><p>Unoptimized hero images are the most common cause of a poor Largest Contentful Paint. Serving AVIF or WebP at device-appropriate widths routinely cuts image weight by 80% with no visible loss.</p>'),
                    $code('html', "<img\n    src=\"hero-800.avif\"\n    srcset=\"hero-400.avif 400w, hero-800.avif 800w, hero-1600.avif 1600w\"\n    sizes=\"(max-width: 600px) 100vw, 800px\"\n    loading=\"lazy\"\n    decoding=\"async\" />"),
                ],
            ],
            [
                'title' => 'Writing Testable Laravel Controllers with Pest',
                'category_slug' => 'engineering',
                'author_slug' => 'marcus-chen',
                'excerpt' => 'Thin controllers, dependency injection, and feature tests that lock behavior so refactors never silently break routes.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Thin Controllers, Fat Tests</h2><p>A controller should validate, delegate, and respond — nothing more. Pushing logic into actions or services makes it trivial to cover with fast feature tests that document exactly what each route promises.</p>'),
                    $code('php', "it('publishes an article', function () {\n    \$this->actingAs(User::factory()->create())\n        ->post('/articles', ['title' => 'Hello'])\n        ->assertRedirect();\n\n    expect(Article::where('title', 'Hello')->exists())->toBeTrue();\n});"),
                ],
            ],
            [
                'title' => 'Real-Time Features with Laravel Reverb and WebSockets',
                'category_slug' => 'engineering',
                'author_slug' => 'marcus-chen',
                'excerpt' => 'Broadcasting events over a first-party WebSocket server for live notifications, presence, and collaborative UI.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Push, Do Not Poll</h2><p>Polling for updates wastes requests and lags behind reality. Broadcasting Eloquent events over Reverb pushes changes to connected clients instantly — the foundation for live dashboards, notifications, and presence.</p>'),
                    $code('php', "class OrderShipped implements ShouldBroadcast\n{\n    public function broadcastOn(): Channel\n    {\n        return new PrivateChannel('orders.'.\$this->order->id);\n    }\n}"),
                    $callout('warning', 'Authorize Channels', 'Private channels need an authorization callback. Skipping it lets any client subscribe to another user\'s stream.'),
                ],
            ],
            [
                'title' => 'Caching Strategies: When to Reach for Redis',
                'category_slug' => 'engineering',
                'author_slug' => 'marcus-chen',
                'excerpt' => 'Cache-aside, write-through, and tagged invalidation patterns — and the discipline to avoid serving stale data.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Cache the Expensive, Not the Cheap</h2><p>Caching a 2ms query adds complexity for nothing. Reserve Redis for genuinely expensive aggregates and hot lookups, and pair every cached value with a clear invalidation trigger so freshness is never a mystery.</p>'),
                    $code('php', "\$stats = Cache::remember('dashboard:stats', 300, function () {\n    return Order::selectRaw('count(*) c, sum(total) t')->first();\n});"),
                ],
            ],
            [
                'title' => 'Securing File Uploads in Laravel Applications',
                'category_slug' => 'engineering',
                'author_slug' => 'marcus-chen',
                'excerpt' => 'MIME validation, storage outside the web root, and signed URLs that keep user uploads from becoming an attack vector.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Treat Uploads as Hostile</h2><p>An upload field is a direct path from a stranger to your disk. Validate real MIME types, never trust the client-supplied extension, store files with private visibility, and serve them through signed, expiring URLs.</p>'),
                    $callout('warning', 'Private by Default', 'Laravel storage defaults to private for a reason. Only mark a disk public when the content is genuinely meant for anonymous access.'),
                ],
            ],
            [
                'title' => 'Building a Type-Safe Form Layer with React Hook Form + Zod',
                'category_slug' => 'engineering',
                'author_slug' => 'marcus-chen',
                'excerpt' => 'One schema drives validation and TypeScript types, so a field rename becomes a compile error instead of a runtime bug.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>One Schema, Two Guarantees</h2><p>Defining a Zod schema gives you runtime validation and an inferred TypeScript type from the same source. Rename a field and every consumer fails to compile — the safest kind of failure.</p>'),
                    $code('typescript', "const schema = z.object({\n    email: z.string().email(),\n    age: z.number().min(18),\n});\ntype FormValues = z.infer<typeof schema>;"),
                ],
            ],
            [
                'title' => 'Optimistic UI Updates with Inertia v3',
                'category_slug' => 'engineering',
                'author_slug' => 'marcus-chen',
                'excerpt' => 'Applying a change instantly and rolling back on failure makes an app feel native — with automatic reconciliation.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Feel Fast, Stay Correct</h2><p>Waiting for a round trip to toggle a like feels slow. Inertia v3 optimistic updates apply the change immediately and reconcile — or roll back — when the server responds, so the UI feels instant without lying about state.</p>'),
                    $callout('info', 'Roll Back Loudly', 'When an optimistic update fails, surface it. A silent revert confuses users who saw their action succeed a moment ago.'),
                ],
            ],
            [
                'title' => 'Debouncing, Throttling, and rAF in Interactive UIs',
                'category_slug' => 'engineering',
                'author_slug' => 'marcus-chen',
                'excerpt' => 'Choosing the right rate-limiter for search inputs, scroll handlers, and resize events to keep the main thread free.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Match the Tool to the Event</h2><p>Debounce a search box so it waits for a pause in typing. Throttle a scroll handler so it fires at a steady cap. Use requestAnimationFrame for anything that paints, so work aligns with the browser\'s frame budget.</p>'),
                    $code('typescript', "let raf = 0;\nwindow.addEventListener('scroll', () => {\n    cancelAnimationFrame(raf);\n    raf = requestAnimationFrame(updateHeader);\n});"),
                ],
            ],
            [
                'title' => 'Managing Environment Config Across Staging and Production',
                'category_slug' => 'engineering',
                'author_slug' => 'marcus-chen',
                'excerpt' => 'A single source of config truth, validated at boot, so a missing key fails fast instead of at 2am in production.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Fail Fast on Boot</h2><p>A missing environment variable should crash the app on deploy, not surface as a null three screens deep. Validating required config at boot turns a silent production incident into an obvious build failure.</p>'),
                    $callout('warning', 'Never Commit Secrets', 'Keep .env out of version control and rotate any key that touches a repository, even a private one.'),
                ],
            ],
            [
                'title' => 'Rate Limiting APIs Without Punishing Real Users',
                'category_slug' => 'engineering',
                'author_slug' => 'marcus-chen',
                'excerpt' => 'Per-user and per-IP limits, sensible burst allowances, and clear 429 responses that clients can back off against.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Protect Without Blocking</h2><p>A rate limit exists to stop abuse, not to frustrate power users. Keying limits per authenticated user, allowing short bursts, and returning a Retry-After header lets well-behaved clients self-regulate.</p>'),
                    $code('php', "RateLimiter::for('api', function (Request \$request) {\n    return Limit::perMinute(60)->by(\$request->user()?->id ?: \$request->ip());\n});"),
                ],
            ],
            [
                'title' => 'Background Job Idempotency: Exactly-Once in a Retry World',
                'category_slug' => 'engineering',
                'author_slug' => 'marcus-chen',
                'excerpt' => 'Queues guarantee at-least-once delivery, so jobs must be safe to run twice. How idempotency keys prevent double charges.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Assume Every Job Runs Twice</h2><p>A worker can crash after doing work but before acking, so the job reruns. Charging a card or sending an email twice is unacceptable. An idempotency key recorded before the side effect makes the second run a no-op.</p>'),
                    $callout('info', 'Record Before Acting', 'Write the idempotency marker in the same transaction as the effect, or a crash between them reopens the exact gap you closed.'),
                ],
            ],
            [
                'title' => 'Server-Side Pagination That Stays Fast at Scale',
                'category_slug' => 'engineering',
                'author_slug' => 'marcus-chen',
                'excerpt' => 'Why OFFSET pagination degrades on deep pages and how keyset (cursor) pagination stays constant-time at any depth.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>OFFSET Does Not Scale</h2><p>OFFSET 100000 forces the database to count and discard a hundred thousand rows before returning any. Keyset pagination seeks directly to a cursor value, so page one million costs the same as page one.</p>'),
                    $code('sql', "SELECT * FROM articles\n    WHERE published_at < :cursor\n    ORDER BY published_at DESC\n    LIMIT 20;"),
                ],
            ],
            [
                'title' => 'Feature Flags: Shipping Safely to a Slice of Users',
                'category_slug' => 'engineering',
                'author_slug' => 'marcus-chen',
                'excerpt' => 'Decoupling deploy from release with flags enables gradual rollouts, instant kill switches, and painless experiments.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Deploy Is Not Release</h2><p>Merging code and exposing a feature are separate decisions. Feature flags let you deploy dormant code, enable it for 1% of traffic, watch the metrics, and roll back instantly without a redeploy.</p>'),
                    $callout('warning', 'Clean Up Stale Flags', 'A flag is temporary scaffolding. Old flags that never get removed become a combinatorial testing nightmare.'),
                ],
            ],
            [
                'title' => 'Observability: Logs, Metrics, and Traces That Matter',
                'category_slug' => 'engineering',
                'author_slug' => 'marcus-chen',
                'excerpt' => 'The three pillars of observability and how structured logging plus request tracing turn a mystery outage into a five-minute fix.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>You Cannot Fix What You Cannot See</h2><p>Structured logs answer what happened, metrics answer how often, and traces answer where the time went. Together they turn an ambiguous "the site is slow" report into a specific, fixable span.</p>'),
                    $code('php', "Log::info('order.placed', [\n    'order_id' => \$order->id,\n    'total' => \$order->total,\n    'duration_ms' => \$ms,\n]);"),
                ],
            ],
            [
                'title' => 'Migrations Without Downtime: Expand-and-Contract',
                'category_slug' => 'engineering',
                'author_slug' => 'marcus-chen',
                'excerpt' => 'A three-phase schema-change pattern that lets old and new code coexist so deploys never require a maintenance window.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Change Schema Live</h2><p>Renaming a column in one migration breaks the running old code mid-deploy. The expand-and-contract pattern adds the new column, backfills and dual-writes, migrates reads, then drops the old column in a later release — zero downtime.</p>'),
                    $callout('info', 'Backfill in Batches', 'Never backfill millions of rows in one query. Chunk it on the queue so you do not lock the table under production load.'),
                ],
            ],

            // ---------- Growth & Strategy (15) ----------
            [
                'title' => 'Technical SEO Foundations for Single-Page Apps',
                'category_slug' => 'business',
                'author_slug' => 'priya-nair',
                'excerpt' => 'Server-side rendering, canonical tags, and structured data that keep an Inertia/React app fully crawlable.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Crawlable by Construction</h2><p>SPAs can be invisible to crawlers that do not execute JavaScript. Server rendering the first response, emitting canonical tags, and shipping real anchor links ensures both search engines and AI answer engines can read every route.</p>'),
                    $callout('info', 'One Canonical Per Page', 'Duplicate or conflicting canonical tags confuse crawlers. Emit exactly one absolute canonical URL per route.'),
                ],
            ],
            [
                'title' => 'Structured Data: Schema.org Types Worth Implementing',
                'category_slug' => 'business',
                'author_slug' => 'priya-nair',
                'excerpt' => 'Article, Organization, FAQ, and Breadcrumb schema that earn rich results and make content citable by AI engines.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Speak the Engines\' Language</h2><p>JSON-LD structured data tells search and answer engines exactly what a page is. Article, Organization, FAQPage, and BreadcrumbList are the highest-leverage types for a studio or content site.</p>'),
                    $code('json', "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"FAQPage\",\n  \"mainEntity\": [{ \"@type\": \"Question\", \"name\": \"...\" }]\n}"),
                ],
            ],
            [
                'title' => 'Landing Page Conversion Audit: A Practical Checklist',
                'category_slug' => 'business',
                'author_slug' => 'priya-nair',
                'excerpt' => 'Message match, a single primary CTA, social proof, and event tracking — the pass before any campaign goes live.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Every Element Earns Its Place</h2><p>A converting landing page matches the ad that sent the visitor, states one clear promise, offers one primary action, and proves credibility with specific social proof. Anything that does not serve the conversion is a distraction.</p>'),
                    $callout('info', 'One Primary CTA', 'Competing calls to action split intent. Keep one primary button and demote everything else to a text link.'),
                ],
            ],
            [
                'title' => 'Pricing Psychology for Digital Products',
                'category_slug' => 'business',
                'author_slug' => 'priya-nair',
                'excerpt' => 'Anchoring, tier framing, and the decoy effect that guide buyers toward the plan you want them to choose.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Price Is a Signal</h2><p>Buyers evaluate price in relation to alternatives, not in isolation. A visible premium tier anchors the middle tier as reasonable, and a well-placed decoy makes your target plan feel like the obvious choice.</p>'),
                    $quote('Nobody knows what a thing should cost; they only know what it should cost relative to the option beside it.', 'Priya Nair', 'Growth Strategist'),
                ],
            ],
            [
                'title' => 'Retention Over Acquisition: The Cheaper Growth Lever',
                'category_slug' => 'business',
                'author_slug' => 'priya-nair',
                'excerpt' => 'Why a small lift in retention compounds harder than any acquisition push, and where to invest to keep users.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Leaky Buckets Never Fill</h2><p>Pouring acquisition spend into a product users abandon is a treadmill. A few points of improved retention compound month over month, lowering payback period and raising lifetime value far more cheaply than new traffic.</p>'),
                    $callout('info', 'Fix Week One', 'Most churn happens in the first week. Invest in onboarding and the first success moment before spending another cent on ads.'),
                ],
            ],
            [
                'title' => 'Content That Ranks in Both Google and AI Answers',
                'category_slug' => 'business',
                'author_slug' => 'priya-nair',
                'excerpt' => 'Answer-first structure, clear headings, and factual density that satisfy classic SEO and generative engines together.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Write for Extraction</h2><p>AI engines quote content that states an answer plainly near a clear heading. Leading with the answer, then supporting it, wins both the featured snippet and the AI citation — the same structure serves both audiences.</p>'),
                    $callout('info', 'Front-Load the Answer', 'Put the direct answer in the first sentence under each heading. Burying it three paragraphs down loses both the snippet and the AI quote.'),
                ],
            ],
            [
                'title' => 'Analytics Without Creepiness: Privacy-First Tracking',
                'category_slug' => 'business',
                'author_slug' => 'priya-nair',
                'excerpt' => 'Measuring what matters with aggregate, cookieless analytics that respect users and survive tightening regulation.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Respect Is a Feature</h2><p>You do not need to fingerprint users to understand a funnel. Aggregate, cookieless analytics capture the trends that drive decisions while sidestepping consent fatigue and the regulatory risk of invasive tracking.</p>'),
                    $callout('warning', 'Collect Less', 'Every field you store is a liability in a breach. Capture the minimum that answers a real question and nothing more.'),
                ],
            ],
            [
                'title' => 'The Metrics That Actually Predict Churn',
                'category_slug' => 'business',
                'author_slug' => 'priya-nair',
                'excerpt' => 'Leading indicators — activation, feature depth, and login cadence — that flag at-risk accounts before they cancel.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Churn Is a Lagging Signal</h2><p>By the time an account cancels, the decision was made weeks earlier. Declining login cadence, shrinking feature depth, and unmet activation milestones are the leading indicators that let you intervene while there is still a relationship to save.</p>'),
                    $text('<p>Score accounts on these signals and route the at-risk ones to a human before the renewal date, not after the cancel click.</p>'),
                ],
            ],
            [
                'title' => 'Positioning Against Cheaper Competitors',
                'category_slug' => 'business',
                'author_slug' => 'priya-nair',
                'excerpt' => 'Competing on value, risk reduction, and total cost of ownership instead of racing a low-price rival to the bottom.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Never Win on Price</h2><p>A cheaper competitor will always undercut you further. The durable strategy reframes the decision around total cost of ownership, risk, and outcome — where a higher upfront price is clearly the lower long-term cost.</p>'),
                    $quote('If the only reason a client stays is price, you have no client — you have a lease.', 'Priya Nair', 'Growth Strategist'),
                ],
            ],
            [
                'title' => 'Email Nurture Flows That Do Not Feel Like Spam',
                'category_slug' => 'business',
                'author_slug' => 'priya-nair',
                'excerpt' => 'Behavior-triggered sequences that teach and help, earning the open instead of exhausting the subscriber.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Earn the Open</h2><p>Blast-everyone campaigns train subscribers to ignore you. Behavior-triggered emails — sent because a user did something specific — arrive relevant and welcome, and they carry the sender reputation that keeps you out of the spam folder.</p>'),
                    $callout('info', 'Value Before Ask', 'Lead a nurture sequence with genuinely useful content. Earn several helpful touches before the first sales ask.'),
                ],
            ],
            [
                'title' => 'Turning Case Studies Into Sales Assets',
                'category_slug' => 'business',
                'author_slug' => 'priya-nair',
                'excerpt' => 'Structuring a case study around problem, approach, and measurable result so it closes deals instead of decorating a page.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Proof Beats Promise</h2><p>A prospect discounts your claims but trusts a peer\'s results. A case study structured as concrete problem, specific approach, and measured outcome — with a real number — becomes the asset that closes a hesitant deal.</p>'),
                    $callout('info', 'Lead With the Number', 'Open a case study with the result — "cut load time 62%" — then earn it back with the story. The metric is the hook.'),
                ],
            ],
            [
                'title' => 'A/B Testing: Reaching Statistical Significance Honestly',
                'category_slug' => 'business',
                'author_slug' => 'priya-nair',
                'excerpt' => 'Sample size, test duration, and the discipline to avoid peeking early and calling a false winner.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Patience or Noise</h2><p>Calling an A/B test after a promising first day is how teams ship changes that later hurt conversion. Decide the sample size and duration in advance, resist peeking, and let the result reach real significance before acting.</p>'),
                    $callout('warning', 'Do Not Peek', 'Repeatedly checking a running test and stopping at the first significant blip dramatically inflates your false-positive rate.'),
                ],
            ],
            [
                'title' => 'Internationalization as a Growth Strategy',
                'category_slug' => 'business',
                'author_slug' => 'priya-nair',
                'excerpt' => 'Localized content, hreflang, and currency handling that open new markets without cannibalizing existing rankings.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Translate the Intent, Not Just the Words</h2><p>Machine-translated pages rank poorly and convert worse. Real localization adapts examples, currency, and search intent per market, and hreflang tags stop your language variants from competing with each other in search.</p>'),
                    $callout('info', 'Hreflang in Pairs', 'Every hreflang reference must be reciprocal. A one-way tag is ignored and wastes the signal entirely.'),
                ],
            ],
            [
                'title' => 'Measuring the ROI of a Website Redesign',
                'category_slug' => 'business',
                'author_slug' => 'priya-nair',
                'excerpt' => 'Baselining conversion, speed, and task success before a redesign so you can prove the rebuild actually paid for itself.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Baseline or Guess</h2><p>A redesign without a before-picture is an aesthetic opinion, not an investment. Capturing conversion rate, Core Web Vitals, and task-success metrics ahead of the rebuild turns "it looks better" into "it earns more."</p>'),
                    $text('<p>Hold the launch metrics against the baseline for a full business cycle before declaring success — seasonality can flatter or bury a genuine result.</p>'),
                ],
            ],
            [
                'title' => 'Building an Authority Content Moat',
                'category_slug' => 'business',
                'author_slug' => 'priya-nair',
                'excerpt' => 'A compounding library of deep, interlinked expert content that competitors cannot cheaply replicate.',
                'is_featured' => false,
                'is_pinned' => false,
                'content' => [
                    $text('<h2>Depth Compounds</h2><p>A handful of shallow posts is easy to copy; a deep, interlinked body of genuine expertise is not. Publishing consistently on a focused domain builds topical authority that search engines reward and rivals cannot shortcut.</p>'),
                    $quote('Content is a moat only when it is too expensive for a competitor to fake.', 'Priya Nair', 'Growth Strategist'),
                ],
            ],
        ];

        foreach ($articlesData as $index => $data) {
            $category = ArticleCategory::where('slug', $data['category_slug'])->first();
            $author = $authorModels[$data['author_slug']] ?? null;

            if (! $category || ! $author) {
                continue;
            }

            $article = Article::create([
                'title' => $data['title'],
                'slug' => Str::slug($data['title']),
                'excerpt' => $data['excerpt'],
                'status' => 'published',
                'published_at' => now()->subDays($index * 2),
                'is_featured' => $data['is_featured'],
                'is_pinned' => $data['is_pinned'],
                'reading_time' => max(3, (int) ceil(count($data['content']) * 2.5)),
                'author_id' => $author->id,
                'article_category_id' => $category->id,
                'content' => $data['content'],
            ]);

            $article->tags()->sync([
                $tagModels[rand(0, 4)]->id,
                $tagModels[rand(5, 6)]->id,
            ]);
        }

        // Establish related-article relationships
        $allArticles = Article::all();
        foreach ($allArticles as $article) {
            $related = $allArticles->where('id', '!=', $article->id)->random(3);
            $article->relatedArticles()->sync($related->pluck('id')->toArray());
        }
    }
}

<?php

namespace Database\Seeders;

use App\Models\Author;
use App\Models\Resource;
use App\Models\ResourceCategory;
use App\Models\ResourceTag;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class KnowledgeHubSeeder extends Seeder
{
    /**
     * Seed the Knowledge Hub with guides, articles, checklists, and downloads.
     *
     * Content is tied to OVOLL's real offering — brand systems, Laravel + React
     * engineering, WebGL, AI automation, and performance/growth — so the hub
     * reads as a genuine resource library, not filler.
     */
    public function run(): void
    {
        // Clear existing hub records (leave Insights' Author rows intact — we reuse them).
        Schema::disableForeignKeyConstraints();
        Resource::truncate();
        ResourceCategory::truncate();
        ResourceTag::truncate();
        Schema::enableForeignKeyConstraints();

        // 1. Authors — reuse the Insights authors when present, otherwise create them
        //    so this seeder also runs standalone.
        $authorSpecs = [
            'sarah-connor' => [
                'name' => 'Sarah Connor',
                'bio' => 'Editorial Director covering the intersection of luxury brand systems, packaging, and high-fidelity interface design.',
                'role' => 'Editorial Director',
                'expertise' => ['Brand Strategy', 'UI/UX', 'Motion Systems'],
            ],
            'marcus-chen' => [
                'name' => 'Marcus Chen',
                'bio' => 'Lead Engineer writing about Laravel + React architecture, WebGL shaders, AI automation, and performance scaling.',
                'role' => 'Lead Engineer',
                'expertise' => ['Full-Stack Engineering', 'WebGL Shaders', 'AI Automation'],
            ],
            'priya-nair' => [
                'name' => 'Priya Nair',
                'bio' => 'Growth Strategist focused on Generative Engine Optimization, Core Web Vitals, and conversion telemetry.',
                'role' => 'Growth Strategist',
                'expertise' => ['SEO / GEO', 'Performance', 'Conversion'],
            ],
        ];

        $authors = [];
        foreach ($authorSpecs as $slug => $spec) {
            $authors[$slug] = Author::firstOrCreate(['slug' => $slug], $spec);
        }

        // 2. Categories
        $categorySpecs = [
            ['name' => 'Design & Brand', 'slug' => 'design-brand', 'icon' => 'palette', 'description' => 'Brand systems, design tokens, packaging, and interface craft.', 'sort_order' => 1],
            ['name' => 'Engineering', 'slug' => 'engineering', 'icon' => 'code', 'description' => 'Laravel, React, Inertia, WebGL, and architecture playbooks.', 'sort_order' => 2],
            ['name' => 'AI & Automation', 'slug' => 'ai-automation', 'icon' => 'cpu', 'description' => 'LLM workflows, prompt engineering, and process automation.', 'sort_order' => 3],
            ['name' => 'Growth & SEO', 'slug' => 'growth-seo', 'icon' => 'trending-up', 'description' => 'GEO/SEO, Core Web Vitals, conversion, and analytics.', 'sort_order' => 4],
            ['name' => 'Performance', 'slug' => 'performance', 'icon' => 'zap', 'description' => 'Latency budgets, caching, bundle size, and rendering.', 'sort_order' => 5],
        ];

        $categories = [];
        foreach ($categorySpecs as $spec) {
            $categories[$spec['slug']] = ResourceCategory::create($spec);
        }

        // 3. Tags
        $tagNames = [
            'Laravel', 'React', 'Inertia', 'Three.js', 'TypeScript', 'Tailwind',
            'AI', 'Prompting', 'SEO', 'GEO', 'Branding', 'Accessibility',
            'Performance', 'Caching', 'Conversion', 'Design Tokens',
        ];

        $tags = [];
        foreach ($tagNames as $name) {
            $tags[$name] = ResourceTag::create(['name' => $name, 'slug' => Str::slug($name)]);
        }

        // Terse content-block builders matching KnowledgeHub/Show.tsx BlockRenderer.
        $text = fn (string $html): array => ['type' => 'text', 'data' => ['content' => $html]];
        $code = fn (string $lang, string $c): array => ['type' => 'code', 'data' => ['language' => $lang, 'code' => $c]];
        $quote = fn (string $q, string $who): array => ['type' => 'quote', 'data' => ['text' => $q, 'author' => $who]];

        // 4. Resources
        $resources = [
            // ---------- Design & Brand ----------
            [
                'title' => 'The Complete Guide to Design Tokens',
                'type' => 'guide', 'category' => 'design-brand', 'author' => 'sarah-connor',
                'excerpt' => 'A field guide to modeling color, spacing, and typography as tokens that stay in sync across Figma, Tailwind v4, and production CSS.',
                'tags' => ['Design Tokens', 'Tailwind', 'Branding'],
                'content' => [
                    $text('<h2>One Source of Truth</h2><p>Design tokens turn every visual decision into a named, referenceable value. When designers and engineers keep separate numbers, drift is inevitable. A token pipeline collapses that into one map.</p>'),
                    $code('css', ":root {\n    --spacing-4: 1rem;\n    --color-brand-primary: hsl(174, 80%, 40%);\n}"),
                    $quote('A token is a promise that a value means the same thing everywhere it appears.', 'Sarah Connor'),
                ],
            ],
            [
                'title' => 'Building a Brand System That Commands Premium Pricing',
                'type' => 'article', 'category' => 'design-brand', 'author' => 'sarah-connor',
                'excerpt' => 'How codifying type scale, HSL color tokens, and logomark rules into one system lets a firm charge more with confidence.',
                'tags' => ['Branding', 'Design Tokens'],
                'content' => [
                    $text('<h2>Consistency Is the Product</h2><p>Inconsistent visual systems are the single biggest reason firms fail to command premium pricing. A brand system fixes this by codifying every decision into one referenceable source of truth.</p>'),
                ],
            ],
            [
                'title' => 'Packaging Artwork Pre-Flight Checklist',
                'type' => 'checklist', 'category' => 'design-brand', 'author' => 'sarah-connor',
                'excerpt' => 'Bleed, trim, CMYK conversion, and paper stock — the checks that keep printed packaging crisp instead of muddy.',
                'tags' => ['Branding'],
                'content' => [
                    $text('<h2>Before It Goes to Press</h2><ul><li>3mm bleed on every edge</li><li>Critical text 5mm inside the trim</li><li>Convert RGB assets to CMYK and check ink coverage</li><li>Confirm GSM paper weight and finish</li></ul>'),
                ],
            ],
            [
                'title' => 'Mathematical Easing Curves in Premium Interaction Design',
                'type' => 'article', 'category' => 'design-brand', 'author' => 'sarah-connor',
                'excerpt' => 'Why bouncy transitions read as amateurish and how a deterministic cubic-bezier projects luxury-engineering.',
                'tags' => ['Design Tokens', 'Accessibility'],
                'content' => [
                    $text('<h2>The Mechanics of Easing</h2><p>Motion silently communicates build quality. Excessive bounce feels game-like; a deterministic ease-out feels confident and mechanical.</p>'),
                    $code('css', ".ease-editorial {\n    transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);\n}"),
                ],
            ],
            [
                'title' => 'Accessible Color Palettes Without Sacrificing Aesthetics',
                'type' => 'guide', 'category' => 'design-brand', 'author' => 'sarah-connor',
                'excerpt' => 'Contrast discipline, luminance math, and token strategy that keep a cinematic interface usable by everyone.',
                'tags' => ['Accessibility', 'Design Tokens'],
                'content' => [
                    $text('<h2>Beauty and Access Are Not Opposites</h2><p>Accessibility is a design constraint, not a compromise. Relative luminance — not perceived brightness — is what the WCAG contrast ratio measures.</p>'),
                ],
            ],
            [
                'title' => 'Motion System Starter Tokens (Download)',
                'type' => 'download', 'category' => 'design-brand', 'author' => 'sarah-connor',
                'excerpt' => 'A ready-to-import set of duration, easing, and stagger tokens for Framer Motion and CSS.',
                'tags' => ['Design Tokens', 'Tailwind'],
                'content' => [
                    $text('<p>This pack includes named motion tokens you can drop straight into a design system.</p>'),
                    $code('typescript', "export const motion = {\n    fast: 0.2,\n    base: 0.4,\n    ease: [0.16, 1, 0.3, 1],\n} as const;"),
                ],
            ],
            [
                'title' => 'Logo Clear-Space and Minimum-Size Rules',
                'type' => 'article', 'category' => 'design-brand', 'author' => 'sarah-connor',
                'excerpt' => 'Defining clear-space as a multiple of a logo feature so the mark stays legible and uncrowded on every surface.',
                'tags' => ['Branding'],
                'content' => [
                    $text('<h2>Give the Mark Room</h2><p>Clear-space defined in fixed pixels breaks at scale. Tie it to a feature of the logo itself and it holds from favicon to billboard.</p>'),
                ],
            ],

            // ---------- Engineering ----------
            [
                'title' => 'Laravel 13 + Inertia + React 19: A Full-Stack Blueprint',
                'type' => 'guide', 'category' => 'engineering', 'author' => 'marcus-chen',
                'excerpt' => 'Wiring secure schemas, Filament v5 admin panels, and synchronized React state into one coherent SPA-like platform.',
                'tags' => ['Laravel', 'React', 'Inertia'],
                'content' => [
                    $text('<h2>One Mental Model, Front to Back</h2><p>Inertia keeps server-side routing while shipping a client-rendered SPA. Laravel owns data and auth; React owns interaction; Filament owns the admin surface.</p>'),
                    $code('php', "return Inertia::render('Dashboard', [\n    'stats' => Inertia::defer(fn () => \$this->slowStats()),\n]);"),
                ],
            ],
            [
                'title' => 'Latency Budgeting: Keeping Laravel Routes Under 50ms',
                'type' => 'article', 'category' => 'engineering', 'author' => 'marcus-chen',
                'excerpt' => 'Index strategy, banning lazy loading, and Redis caching required to lock controller responses below 50ms.',
                'tags' => ['Laravel', 'Performance', 'Caching'],
                'content' => [
                    $text('<h2>Establishing Latency Bounds</h2><p>Every millisecond of wait is a drop in conversion. In production we enforce a 50ms response ceiling, which demands pre-compiled relations and zero lazy loading.</p>'),
                    $code('php', "public function boot(): void {\n    Model::preventLazyLoading(! \$this->app->isProduction());\n}"),
                ],
            ],
            [
                'title' => 'Type-Safe API Contracts Between Laravel and React',
                'type' => 'guide', 'category' => 'engineering', 'author' => 'marcus-chen',
                'excerpt' => 'Generating TypeScript interfaces from Eloquent models so a schema change surfaces as a compile error, not a runtime crash.',
                'tags' => ['Laravel', 'TypeScript', 'React'],
                'content' => [
                    $text('<h2>Type Safety Across the Wire</h2><p>Mismatched PHP and TypeScript schemas cause silent runtime breaks. Generate TS interfaces directly from Eloquent models so drift becomes a compile-time error.</p>'),
                ],
            ],
            [
                'title' => 'GPU InstancedMesh Sanitation for Ambient WebGL',
                'type' => 'article', 'category' => 'engineering', 'author' => 'marcus-chen',
                'excerpt' => 'Rendering thousands of floating nodes at 60fps on mobile by sharing geometry buffers and capping device pixel ratio.',
                'tags' => ['Three.js', 'Performance'],
                'content' => [
                    $text('<h2>WebGL Buffer Sanitation</h2><p>Separate meshes explode draw calls. InstancedMesh shares one buffer across thousands of nodes, holding 60fps on standard mobile displays.</p>'),
                    $code('javascript', "const mesh = new THREE.InstancedMesh(geometry, material, count);\nfor (let i = 0; i < count; i++) {\n    transform.setPosition(x, y, z);\n    mesh.setMatrixAt(i, transform);\n}"),
                ],
            ],
            [
                'title' => 'Your First GLSL Fragment Backdrop',
                'type' => 'guide', 'category' => 'engineering', 'author' => 'marcus-chen',
                'excerpt' => 'A gentle path into fragment shaders — UVs, time uniforms, and noise — to build living ambient backdrops.',
                'tags' => ['Three.js', 'TypeScript'],
                'content' => [
                    $text('<h2>Pixels as Math</h2><p>A fragment shader runs once per pixel. With a UV coordinate, a time uniform, and a noise function you can generate living gradient backdrops that cost almost nothing to animate.</p>'),
                    $code('glsl', "void main() {\n    vec2 uv = gl_FragCoord.xy / u_resolution;\n    float n = sin(uv.x * 6.0 + u_time);\n    gl_FragColor = vec4(vec3(0.18, 0.77, 0.65) * n, 1.0);\n}"),
                ],
            ],
            [
                'title' => 'State Synchronization Across Inertia Navigations',
                'type' => 'article', 'category' => 'engineering', 'author' => 'marcus-chen',
                'excerpt' => 'Preserving scroll position, layout state, and animation continuity between visits without full repaints.',
                'tags' => ['Inertia', 'React'],
                'content' => [
                    $text('<h2>Handling Session State</h2><p>Preserving scroll and animation state across visits is what makes an SPA feel native. Inertia layout wrappers cache local props and swap content without a repaint.</p>'),
                    $code('tsx', "<Link href={url} preserveState preserveScroll>\n    Next\n</Link>"),
                ],
            ],
            [
                'title' => 'Filament v5 Admin Panels in Days, Not Sprints',
                'type' => 'guide', 'category' => 'engineering', 'author' => 'marcus-chen',
                'excerpt' => 'Resources, relation managers, and custom actions that turn Eloquent models into a production admin surface fast.',
                'tags' => ['Laravel'],
                'content' => [
                    $text('<h2>Admin Is a Product Too</h2><p>Internal tools decide whether a team adopts a system. Filament turns Eloquent models into a polished admin surface — resources, relation managers, custom actions — in days.</p>'),
                ],
            ],
            [
                'title' => 'Production Deployment Checklist for Laravel Apps',
                'type' => 'checklist', 'category' => 'engineering', 'author' => 'marcus-chen',
                'excerpt' => 'Config caching, queue workers, migrations, and rollback readiness — the gate before every production push.',
                'tags' => ['Laravel', 'Performance'],
                'content' => [
                    $text('<h2>Before You Ship</h2><ul><li>Run <code>config:cache</code> and <code>route:cache</code></li><li>Confirm queue workers and the scheduler are supervised</li><li>Run migrations with a tested rollback path</li><li>Verify env secrets and app key are set</li></ul>'),
                ],
            ],
            [
                'title' => 'Cinematic Scroll Choreography with GSAP ScrollTrigger',
                'type' => 'article', 'category' => 'engineering', 'author' => 'marcus-chen',
                'excerpt' => 'Pinning sections, sequencing reveals, and keeping scroll-driven animation off the main thread.',
                'tags' => ['Three.js', 'Performance'],
                'content' => [
                    $text('<h2>Scroll as a Timeline</h2><p>ScrollTrigger treats the scrollbar as a playhead. Pin sections, sequence reveals, and scrub parameters while keeping work off the main thread to protect frame rate.</p>'),
                    $code('javascript', "gsap.to(mesh.rotation, {\n    y: Math.PI * 2,\n    scrollTrigger: { trigger: '#stage', scrub: 1, pin: true },\n});"),
                ],
            ],
            [
                'title' => 'Cross-Platform Mobile with React Native',
                'type' => 'guide', 'category' => 'engineering', 'author' => 'marcus-chen',
                'excerpt' => 'Caching layers, native-driver animation, and modular state that keep iOS and Android in lockstep.',
                'tags' => ['React', 'Performance'],
                'content' => [
                    $text('<h2>One Codebase, Two Stores</h2><p>Sluggish mobile apps usually come from unshared logic and blocked animation threads. Build modular hooks, cache aggressively, and push animation onto the native driver.</p>'),
                ],
            ],

            // ---------- AI & Automation ----------
            [
                'title' => 'Structured Prompt Engineering for Reliable JSON',
                'type' => 'guide', 'category' => 'ai-automation', 'author' => 'marcus-chen',
                'excerpt' => 'Framing system instructions with explicit target keys and few-shot examples so LLMs return parseable JSON.',
                'tags' => ['AI', 'Prompting'],
                'content' => [
                    $text('<h2>Preventing Parser Failures</h2><p>Parsing free-form model output crashes servers. System prompts must declare target keys, a strict schema, and few-shot formatting examples to guarantee valid JSON.</p>'),
                    $code('json', "{\n    \"intent\": \"string\",\n    \"confidence\": 0.0,\n    \"entities\": []\n}"),
                ],
            ],
            [
                'title' => 'AI Agents That Cut Admin Time by 70%',
                'type' => 'article', 'category' => 'ai-automation', 'author' => 'marcus-chen',
                'excerpt' => 'Semantic routing, secure API pipelines, and Laravel queue-driven agents that run continuously in the background.',
                'tags' => ['AI', 'Laravel'],
                'content' => [
                    $text('<h2>Automate the Repetitive Loop</h2><p>Manual admin and support loops burn hundreds of hours. Wire LLM agents to internal models over secure pipelines and run them on Laravel queues for observable execution.</p>'),
                    $quote('Long-running AI calls belong on a queue with retries — never inside a web request.', 'Marcus Chen'),
                ],
            ],
            [
                'title' => 'Estimating LLM Feature Cost Before You Build',
                'type' => 'guide', 'category' => 'ai-automation', 'author' => 'priya-nair',
                'excerpt' => 'Token accounting across model tiers so an AI feature ships with a predictable, affordable spend curve.',
                'tags' => ['AI', 'Prompting'],
                'content' => [
                    $text('<h2>Forecast the Spend</h2><p>Output tokens usually dominate cost. Tokenize sample prompts, multiply by per-model input and output rates at your real volume, and trim completion length first.</p>'),
                ],
            ],
            [
                'title' => 'Semantic Search: Tuning Embedding Similarity Thresholds',
                'type' => 'article', 'category' => 'ai-automation', 'author' => 'marcus-chen',
                'excerpt' => 'Why a fixed cosine cutoff silently drops valid matches, and how to calibrate it against your own corpus.',
                'tags' => ['AI'],
                'content' => [
                    $text('<h2>Threshold Is Corpus-Specific</h2><p>The right similarity cutoff depends on your data. A default 0.8 that works for one corpus will drop valid matches in another — always calibrate against sampled pairs.</p>'),
                ],
            ],
            [
                'title' => 'Prompt Library Starter Pack (Download)',
                'type' => 'download', 'category' => 'ai-automation', 'author' => 'marcus-chen',
                'excerpt' => 'A curated set of system-prompt templates for extraction, classification, and structured generation.',
                'tags' => ['AI', 'Prompting'],
                'content' => [
                    $text('<p>Battle-tested prompt scaffolds you can adapt for production webhook and queue workflows.</p>'),
                ],
            ],

            // ---------- Growth & SEO ----------
            [
                'title' => 'Generative Engine Optimization: Ranking in AI Search',
                'type' => 'guide', 'category' => 'growth-seo', 'author' => 'priya-nair',
                'excerpt' => 'JSON-LD schema, semantic HTML, and content structure that make you citable by ChatGPT, Perplexity, and Google.',
                'tags' => ['GEO', 'SEO'],
                'content' => [
                    $text('<h2>Beyond Blue Links</h2><p>AI answer engines cite structured, semantic content. Inject JSON-LD, enforce a clean heading hierarchy, and write for extractability so a model quotes you as a source.</p>'),
                    $code('html', "<script type=\"application/ld+json\">\n{ \"@type\": \"Organization\", \"name\": \"OVOLL\" }\n</script>"),
                ],
            ],
            [
                'title' => 'Core Web Vitals as a Revenue Lever',
                'type' => 'article', 'category' => 'growth-seo', 'author' => 'priya-nair',
                'excerpt' => 'Why a 100ms delay measurably drops conversion, and the LCP/CLS/INP fixes that protect the funnel.',
                'tags' => ['Performance', 'Conversion', 'SEO'],
                'content' => [
                    $text('<h2>Speed Is Money</h2><p>A 100ms load delay can shave over 1% off checkout conversion. Core Web Vitals are not a compliance checkbox — LCP, CLS, and INP directly gate revenue.</p>'),
                    $quote('Optimize against field data, not lab scores — the 75th percentile decides whether you pass.', 'Priya Nair'),
                ],
            ],
            [
                'title' => 'Landing Page Conversion Audit Checklist',
                'type' => 'checklist', 'category' => 'growth-seo', 'author' => 'priya-nair',
                'excerpt' => 'Message match, single primary CTA, social proof, and event tracking — the pass before a campaign goes live.',
                'tags' => ['Conversion', 'SEO'],
                'content' => [
                    $text('<h2>Before You Send Traffic</h2><ul><li>Headline matches the ad promise</li><li>One primary call to action above the fold</li><li>Proof: testimonials, logos, or metrics</li><li>Conversion events fire and are verified</li></ul>'),
                ],
            ],
            [
                'title' => 'Turning Ad Traffic Into Qualified Leads',
                'type' => 'article', 'category' => 'growth-seo', 'author' => 'priya-nair',
                'excerpt' => 'High-converting landing pages, event tracking, and automated nurture flows that capture leads instead of leaking them.',
                'tags' => ['Conversion'],
                'content' => [
                    $text('<h2>Traffic Is Not the Goal</h2><p>Random ad traffic without capture is wasted spend. Pair intent-matched landing pages with tracked events and automated nurture so every qualified lead is worked.</p>'),
                ],
            ],
            [
                'title' => 'Technical SEO Foundations for Single-Page Apps',
                'type' => 'guide', 'category' => 'growth-seo', 'author' => 'priya-nair',
                'excerpt' => 'Server-side rendering, canonical tags, and structured data that keep an Inertia/React app fully crawlable.',
                'tags' => ['SEO', 'Inertia'],
                'content' => [
                    $text('<h2>Crawlable by Default</h2><p>SPAs lose rankings when crawlers see empty shells. Render meaningful markup server-side, set canonical URLs, and emit structured data on every route.</p>'),
                ],
            ],
            [
                'title' => 'Clean Architecture as a Balance-Sheet Asset',
                'type' => 'article', 'category' => 'growth-seo', 'author' => 'priya-nair',
                'excerpt' => 'Why acquirers pay more for standardized tokens and modular controllers — technical debt is measurable depreciation.',
                'tags' => ['Conversion'],
                'content' => [
                    $text('<h2>Due Diligence Reads Your Code</h2><p>During acquisition, buyers inspect architecture. Modular controllers, standardized tokens, and test coverage prove portability and raise valuation multipliers.</p>'),
                ],
            ],

            // ---------- Performance ----------
            [
                'title' => 'Edge Caching Strategy with Vercel and Cloudflare',
                'type' => 'guide', 'category' => 'performance', 'author' => 'marcus-chen',
                'excerpt' => 'Static routes, stale-while-revalidate, and cache keys that push response times to the edge without stale data.',
                'tags' => ['Caching', 'Performance'],
                'content' => [
                    $text('<h2>Serve From the Edge</h2><p>The fastest query is the one you never run. Push static routes to edge caches with stale-while-revalidate, keeping responses near the user while a background refresh keeps data fresh.</p>'),
                    $quote('Key your cache by the full varying surface — locale, auth, query — or you will leak one user\'s response to another.', 'Marcus Chen'),
                ],
            ],
            [
                'title' => 'Shrinking Your JavaScript Bundle',
                'type' => 'article', 'category' => 'performance', 'author' => 'marcus-chen',
                'excerpt' => 'Finding the imports that inflate a build and the code-splitting moves that bring first paint back under budget.',
                'tags' => ['Performance', 'TypeScript'],
                'content' => [
                    $text('<h2>Measure Before You Cut</h2><p>A single mis-imported date or icon library often outweighs the entire app code. Rank modules by gzipped size, then split routes and lazy-load the heavy tail.</p>'),
                ],
            ],
            [
                'title' => 'Database Indexing Playbook for Read-Heavy Apps',
                'type' => 'guide', 'category' => 'performance', 'author' => 'marcus-chen',
                'excerpt' => 'Composite indexes, covering indexes, and the query patterns that turn a 400ms scan into a 4ms lookup.',
                'tags' => ['Laravel', 'Performance', 'Caching'],
                'content' => [
                    $text('<h2>Indexes Follow Queries</h2><p>Index the columns your <code>WHERE</code> and <code>ORDER BY</code> actually use, in that order. A covering index that answers a query from the index alone avoids the table read entirely.</p>'),
                    $code('sql', "CREATE INDEX idx_posts_status_published\n    ON posts (status, published_at DESC);"),
                ],
            ],
            [
                'title' => 'Performance Budget Worksheet (Download)',
                'type' => 'download', 'category' => 'performance', 'author' => 'priya-nair',
                'excerpt' => 'A worksheet for setting and tracking LCP, INP, bundle-size, and response-time budgets per route.',
                'tags' => ['Performance', 'Conversion'],
                'content' => [
                    $text('<p>Define hard ceilings for each metric and route, then track them against real field data every release.</p>'),
                ],
            ],
            [
                'title' => 'Image Optimization: From Multi-MB to Kilobytes',
                'type' => 'article', 'category' => 'performance', 'author' => 'marcus-chen',
                'excerpt' => 'Modern formats, responsive srcsets, and lazy loading that protect LCP without dropping visual quality.',
                'tags' => ['Performance', 'SEO'],
                'content' => [
                    $text('<h2>The Biggest Easy Win</h2><p>Images are usually the largest bytes on a page. Serve AVIF/WebP with responsive srcsets, lazy-load below the fold, and set explicit dimensions to protect CLS.</p>'),
                ],
            ],
        ];

        foreach ($resources as $index => $data) {
            $resource = Resource::create([
                'title' => $data['title'],
                'slug' => Str::slug($data['title']),
                'type' => $data['type'],
                'excerpt' => $data['excerpt'],
                'content' => $data['content'],
                'author_id' => $authors[$data['author']]->id,
                'resource_category_id' => $categories[$data['category']]->id,
                'status' => 'published',
                'published_at' => now()->subDays($index * 2),
                'downloads_count' => $data['type'] === 'download' ? random_int(80, 1200) : 0,
                'views_count' => random_int(120, 5400),
            ]);

            $resourceTags = collect($data['tags'] ?? [])
                ->map(fn (string $name) => $tags[$name]->id ?? null)
                ->filter()
                ->all();

            if ($resourceTags !== []) {
                $resource->tags()->sync($resourceTags);
            }
        }
    }
}

<?php

namespace Database\Seeders;

use App\Models\Tool;
use App\Models\ToolCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class StudioSeeder extends Seeder
{
    /**
     * Run the database seeds for OVOLL Digital Laboratory.
     */
    public function run(): void
    {
        // Clean out existing models sequentially
        Tool::query()->delete();
        ToolCategory::query()->delete();

        // 1. Studio R&D Categories
        $categories = [
            ['name' => 'Design Systems', 'slug' => 'design-systems', 'icon' => 'squares-plus', 'description' => 'Interactive UI components, atomic structures, and token scales.', 'color' => '#2EC4A5', 'sort_order' => 1],
            ['name' => 'Motion Design', 'slug' => 'motion-design', 'icon' => 'arrow-path', 'description' => 'Physics springs, micro-easing states, and keyframe transitions.', 'color' => '#00D1FF', 'sort_order' => 2],
            ['name' => 'Three.js & Shaders', 'slug' => 'threejs', 'icon' => 'cube', 'description' => 'WebGL canvases, particle nodes, and custom GLSL vertex shaders.', 'color' => '#a855f7', 'sort_order' => 3],
            ['name' => 'AI Workflows', 'slug' => 'ai-workflows', 'icon' => 'brain', 'description' => 'Generative prompts, semantic parsing, and automation agents.', 'color' => '#ec4899', 'sort_order' => 4],
            ['name' => 'Accessibility', 'slug' => 'accessibility', 'icon' => 'eye', 'description' => 'Keyboard tab navigation, ARIA mappings, and screen reader tests.', 'color' => '#eab308', 'sort_order' => 5],
            ['name' => 'Performance', 'slug' => 'performance', 'icon' => 'bolt', 'description' => 'Sub-30ms database tuning, memory buffers, and caching layers.', 'color' => '#f97316', 'sort_order' => 6],
            ['name' => 'Developer Tools', 'slug' => 'developer-tools', 'icon' => 'wrench', 'description' => 'Command line wrappers, compilers, and pipeline builders.', 'color' => '#6366f1', 'sort_order' => 7],
            ['name' => 'Brand Exploration', 'slug' => 'brand-exploration', 'icon' => 'sparkles', 'description' => 'Phonetic presets and styling guides for modern entities.', 'color' => '#10b981', 'sort_order' => 8],
            ['name' => 'Interaction Design', 'slug' => 'interaction-design', 'icon' => 'fingerprint', 'description' => 'Custom cursor-trailing, touch controls, and spring animations.', 'color' => '#3b82f6', 'sort_order' => 9],
        ];

        foreach ($categories as $catData) {
            ToolCategory::updateOrCreate(['slug' => $catData['slug']], $catData);
        }

        // Terse builder for the R&D case-study settings block every tool carries.
        $lab = fn (string $question, string $approach, string $outcome, string $lessons): array => [
            'question' => $question,
            'approach' => $approach,
            'outcome' => $outcome,
            'lessons' => $lessons,
        ];

        // 2. High-Fidelity Studio Prototypes.
        // The first six map to real, shipped React components in ToolRegistry.tsx.
        // The remainder are seeded R&D records that render the "coming soon" state
        // on their detail page but populate the catalog, filters and trending rails.
        $tools = [
            [
                'category' => 'brand-exploration',
                'name' => 'Brand Name Generator',
                'component' => 'BrandNameGenerator',
                'description' => 'An automated generator that produces unique, domain-available name combinations aligned to your industry.',
                'icon' => 'type',
                'featured' => true,
                'new' => false,
                'usage' => 4820,
                'settings' => $lab(
                    'Can we deterministically compile unique, phonetic brand name combinations based on industry categories?',
                    'Constructing word arrays (prefixes and suffixes) and filtering output options against common domain naming specifications.',
                    'Generates 50+ phonetically clean name options in sub-2ms, completely offline without external API latency.',
                    'Deterministic array maps yield cleaner and more organic name variations than simple random concatenations.',
                ),
            ],
            [
                'category' => 'design-systems',
                'name' => 'Color Palette Generator',
                'component' => 'ColorPaletteGenerator',
                'description' => 'Generate and export WCAG-accessible HSL color tokens directly compatible with Tailwind configurations.',
                'icon' => 'palette',
                'featured' => true,
                'new' => false,
                'usage' => 6310,
                'settings' => $lab(
                    'Can we dynamically generate WCAG-compliant primary, secondary, and background HSL color scales in React?',
                    'Calculating contrast ratios between text and background values while scaling base HSL hue inputs.',
                    'A real-time contrast checker verifying WCAG AAA ratings (4.5:1 ratio minimum) with live CSS variable output.',
                    'Luminance calculations are more reliable than simple saturation adjustments for contrast compliance.',
                ),
            ],
            [
                'category' => 'design-systems',
                'name' => 'Gradient Generator',
                'component' => 'GradientGenerator',
                'description' => 'Create CSS backdrop reflection layers and radial mesh glows with a live canvas preview.',
                'icon' => 'paint-bucket',
                'featured' => true,
                'new' => false,
                'usage' => 3990,
                'settings' => $lab(
                    'How do we create lightweight CSS glows that mimic Three.js mesh gradients without performance drops?',
                    'Layering multiple radial-gradient elements and applying hardware-accelerated animations to backdrop filters.',
                    'GPU rendering load reduced to 0%, achieving a locked 60fps scrolling experience across mobile viewports.',
                    'Stacking backdrop blur layers is performant if opacity limits are configured below 15%.',
                ),
            ],
            [
                'category' => 'developer-tools',
                'name' => 'Meta Tag Generator',
                'component' => 'MetaTagGenerator',
                'description' => 'Build complete, validated SEO meta structures and OpenGraph cards for crawling spiders.',
                'icon' => 'code',
                'featured' => true,
                'new' => false,
                'usage' => 5170,
                'settings' => $lab(
                    'Can we build a visual previewer that crawls and validates SEO and OpenGraph tag setups?',
                    'Parsing text inputs to verify card descriptions sizes and structuring headers in a mock social feed preview.',
                    'Validates structured JSON-LD schemas and raises tag accuracy index ratings by up to 40% before deploy.',
                    'Mocking search crawler outputs reduces pre-flight verification overhead and ensures index tags are clean.',
                ),
            ],
            [
                'category' => 'performance',
                'name' => 'ROI Calculator',
                'component' => 'ROICalculator',
                'description' => 'Calculate return metrics and conversion gains to validate platform engineering investment.',
                'icon' => 'trending-up',
                'featured' => true,
                'new' => false,
                'usage' => 2740,
                'settings' => $lab(
                    'How do we calculate conversion rate increases based on latency budgets and page speed improvements?',
                    'Modeling load time metrics (e.g. 100ms load time decrease equals 1% checkout increase) against traffic volumes.',
                    'An interactive financial estimator that helps teams validate development investment targets.',
                    'Translating milliseconds to revenue metrics aligns technical budgets to business targets immediately.',
                ),
            ],
            [
                'category' => 'ai-workflows',
                'name' => 'Prompt Builder',
                'component' => 'PromptBuilder',
                'description' => 'Configure structured instructions for LLM parsing to execute webhook automation flows.',
                'icon' => 'zap',
                'featured' => true,
                'new' => false,
                'usage' => 3550,
                'settings' => $lab(
                    'Can we standardize instructions formatting for LLM parsing to execute webhook automation flows?',
                    'Dividing user intents into structured prompt blocks (instructions, examples, format constraints) and testing parser responses.',
                    'Prompt syntax errors reduced to 0%, ensuring reliable semantic data routing internally.',
                    'Explicit formatting examples inside system messages prevent LLM hallucination in production webhook feeds.',
                ),
            ],

            // ---------- Design Systems ----------
            [
                'category' => 'design-systems',
                'name' => 'Type Scale Composer',
                'component' => 'TypeScaleComposer',
                'description' => 'Generate a modular type ramp from a base size and ratio, exported as CSS clamp() tokens.',
                'icon' => 'text',
                'new' => true,
                'usage' => 1180,
                'settings' => $lab(
                    'How do we produce a fluid, responsive type scale that stays legible from mobile to ultrawide?',
                    'Multiplying a base font size by a chosen musical ratio and wrapping each step in a viewport-aware clamp().',
                    'A copy-paste token set that removes manual breakpoint font overrides across the whole system.',
                    'Fluid clamp() ramps eliminate the jarring jumps that fixed breakpoint typography produces.',
                ),
            ],
            [
                'category' => 'design-systems',
                'name' => 'Spacing Token Builder',
                'component' => 'SpacingTokenBuilder',
                'description' => 'Derive a consistent 4px-based spacing scale and preview it against real component padding.',
                'icon' => 'ruler',
                'usage' => 940,
                'settings' => $lab(
                    'Can we enforce a single rhythmic spacing unit across padding, gap, and margin decisions?',
                    'Generating a geometric scale off a 4px base and rendering live component boxes at each step.',
                    'Design and engineering share one spacing vocabulary, cutting pixel-nudging review comments.',
                    'A visible preview at each step stops teams from inventing off-scale one-off values.',
                ),
            ],
            [
                'category' => 'design-systems',
                'name' => 'Shadow & Elevation Studio',
                'component' => 'ShadowElevationStudio',
                'description' => 'Compose layered box-shadows into a coherent elevation system with a live surface preview.',
                'icon' => 'layers',
                'usage' => 760,
                'settings' => $lab(
                    'How do we make elevation feel physically consistent instead of a pile of arbitrary shadows?',
                    'Stacking ambient and key light shadow layers keyed to a single elevation index.',
                    'Six named elevation levels that read as one light source across cards, modals, and menus.',
                    'Two stacked shadow layers per level read far more natural than a single heavy blur.',
                ),
            ],
            [
                'category' => 'design-systems',
                'name' => 'Border Radius Harmonizer',
                'component' => 'BorderRadiusHarmonizer',
                'description' => 'Calculate nested radii so inner and outer corners stay optically concentric.',
                'icon' => 'square',
                'new' => true,
                'usage' => 610,
                'settings' => $lab(
                    'Why do nested rounded containers look wrong even when both are rounded?',
                    'Subtracting inner padding from the outer radius to keep corner arcs concentric.',
                    'A radius token map that keeps buttons inside cards visually aligned at every size.',
                    'Concentric radii require the inner value to shrink by the padding, not match the outer.',
                ),
            ],

            // ---------- Motion Design ----------
            [
                'category' => 'motion-design',
                'name' => 'Easing Curve Lab',
                'component' => 'EasingCurveLab',
                'description' => 'Draft and preview cubic-bezier curves against a moving object, then export the timing token.',
                'icon' => 'activity',
                'featured' => true,
                'new' => true,
                'usage' => 2210,
                'settings' => $lab(
                    'How do we pick an easing curve that reads as premium instead of bouncy?',
                    'Rendering a draggable bezier editor that animates a sample element in real time.',
                    'A shared timing token (0.16, 1, 0.3, 1) adopted as the default across product surfaces.',
                    'Seeing the curve drive a real object beats guessing from the numeric control points.',
                ),
            ],
            [
                'category' => 'motion-design',
                'name' => 'Spring Physics Playground',
                'component' => 'SpringPhysicsPlayground',
                'description' => 'Tune stiffness, damping, and mass on a live spring and copy the resulting motion config.',
                'icon' => 'wind',
                'usage' => 1490,
                'settings' => $lab(
                    'Can we make spring-based motion predictable enough to standardize?',
                    'Exposing stiffness, damping, and mass sliders wired to a live Framer Motion spring.',
                    'A set of named spring presets (snappy, gentle, molasses) reused across the UI.',
                    'Damping ratio matters more than raw stiffness for whether motion feels controlled.',
                ),
            ],
            [
                'category' => 'motion-design',
                'name' => 'Stagger Sequencer',
                'component' => 'StaggerSequencer',
                'description' => 'Visualize list and grid stagger timing to find the delay that feels choreographed, not laggy.',
                'icon' => 'list',
                'usage' => 880,
                'settings' => $lab(
                    'What stagger delay makes a list reveal feel intentional rather than slow?',
                    'Animating a sample grid while sweeping per-item delay and total duration values.',
                    'A stagger token that keeps entrance animations under the 400ms perceived-instant ceiling.',
                    'Beyond ~60ms per item, stagger stops feeling choreographed and starts feeling broken.',
                ),
            ],

            // ---------- Three.js & Shaders ----------
            [
                'category' => 'threejs',
                'name' => 'GLSL Fragment Sandbox',
                'component' => 'GlslFragmentSandbox',
                'description' => 'Write fragment shaders against live uniforms and preview them on a full-screen quad.',
                'icon' => 'cube',
                'featured' => true,
                'new' => true,
                'pro' => true,
                'usage' => 1720,
                'settings' => $lab(
                    'How do we prototype ambient shader backdrops without a full Three.js scene setup?',
                    'Compiling user GLSL against time and resolution uniforms on a single full-screen triangle.',
                    'Instant shader iteration with hot compile errors surfaced inline for fast learning.',
                    'A full-screen triangle beats a quad — one fewer vertex and no diagonal seam.',
                ),
            ],
            [
                'category' => 'threejs',
                'name' => 'Particle Field Composer',
                'component' => 'ParticleFieldComposer',
                'description' => 'Configure instanced particle counts, gravity, and drift, then export a ready R3F component.',
                'icon' => 'sparkles',
                'pro' => true,
                'usage' => 1030,
                'settings' => $lab(
                    'Can we render thousands of ambient particles at 60fps on mid-range phones?',
                    'Sharing one geometry buffer via InstancedMesh and capping device pixel ratio at 2.',
                    'A tunable field that holds frame rate while scaling to 10k+ instanced points.',
                    'Draw-call count, not particle count, is what actually breaks mobile frame budgets.',
                ),
            ],
            [
                'category' => 'threejs',
                'name' => 'Mesh Gradient Weaver',
                'component' => 'MeshGradientWeaver',
                'description' => 'Blend animated color control points into a smooth mesh gradient with an exportable shader.',
                'icon' => 'grid',
                'new' => true,
                'usage' => 690,
                'settings' => $lab(
                    'How do we get the organic look of a mesh gradient without a heavy image asset?',
                    'Interpolating between animated color control points inside a lightweight fragment shader.',
                    'A living gradient backdrop that weighs kilobytes instead of a multi-megabyte export.',
                    'Shader-driven gradients stay crisp at any resolution where exported PNGs band and blur.',
                ),
            ],

            // ---------- AI Workflows ----------
            [
                'category' => 'ai-workflows',
                'name' => 'Token Cost Estimator',
                'component' => 'TokenCostEstimator',
                'description' => 'Estimate prompt and completion token spend across model tiers before you ship a feature.',
                'icon' => 'calculator',
                'new' => true,
                'usage' => 1340,
                'settings' => $lab(
                    'How do we forecast LLM feature cost before wiring it into production?',
                    'Tokenizing sample prompts and multiplying by per-model input and output rates at volume.',
                    'A monthly spend projection that catches unaffordable features before they are built.',
                    'Output tokens usually dominate cost — trimming completion length beats trimming the prompt.',
                ),
            ],
            [
                'category' => 'ai-workflows',
                'name' => 'Embedding Similarity Explorer',
                'component' => 'EmbeddingSimilarityExplorer',
                'description' => 'Paste snippets and visualize cosine similarity to tune semantic search thresholds.',
                'icon' => 'git-compare',
                'pro' => true,
                'usage' => 720,
                'settings' => $lab(
                    'What cosine threshold separates a real semantic match from noise?',
                    'Embedding sample snippets and plotting pairwise similarity against a movable cutoff.',
                    'A calibrated threshold that trims false positives from the semantic search hub.',
                    'The right cutoff is corpus-specific; a fixed 0.8 default silently drops valid matches.',
                ),
            ],
            [
                'category' => 'ai-workflows',
                'name' => 'JSON Schema Prompt Linter',
                'component' => 'JsonSchemaPromptLinter',
                'description' => 'Validate that an LLM prompt reliably returns your target JSON shape across sample runs.',
                'icon' => 'braces',
                'usage' => 560,
                'settings' => $lab(
                    'How do we guarantee an LLM returns parseable JSON in the exact shape we expect?',
                    'Running the prompt repeatedly and diffing each response against a declared schema.',
                    'A pass/fail confidence score that blocks fragile prompts from reaching the queue worker.',
                    'Declaring the target keys and a few-shot example inside the system message kills drift.',
                ),
            ],

            // ---------- Accessibility ----------
            [
                'category' => 'accessibility',
                'name' => 'Contrast Ratio Checker',
                'component' => 'ContrastRatioChecker',
                'description' => 'Test foreground and background pairs against WCAG AA and AAA thresholds in real time.',
                'icon' => 'eye',
                'featured' => true,
                'usage' => 2080,
                'settings' => $lab(
                    'How do we keep every text and background pair above WCAG contrast minimums?',
                    'Computing relative luminance and the contrast ratio the moment either color changes.',
                    'A live AA/AAA verdict that stops low-contrast tokens from entering the palette.',
                    'Relative luminance, not perceived brightness, is what the WCAG ratio actually measures.',
                ),
            ],
            [
                'category' => 'accessibility',
                'name' => 'Focus Order Visualizer',
                'component' => 'FocusOrderVisualizer',
                'description' => 'Overlay the tab sequence of a page to expose illogical or trapped keyboard focus paths.',
                'icon' => 'move',
                'new' => true,
                'usage' => 640,
                'settings' => $lab(
                    'Does the keyboard tab order match the visual reading order of the page?',
                    'Walking the focusable elements and drawing numbered arrows in their real tab sequence.',
                    'A visual map that surfaces focus traps and out-of-order jumps before an audit does.',
                    'Positive tabindex values are the usual culprit behind confusing focus sequences.',
                ),
            ],
            [
                'category' => 'accessibility',
                'name' => 'ARIA Role Inspector',
                'component' => 'AriaRoleInspector',
                'description' => 'Paste markup and flag missing labels, redundant roles, and invalid ARIA attribute combinations.',
                'icon' => 'shield',
                'usage' => 480,
                'settings' => $lab(
                    'Which ARIA roles and labels are missing or actively harmful in this markup?',
                    'Parsing the DOM and checking each role against the allowed-attribute matrix.',
                    'A remediation list that catches redundant roles screen readers announce twice.',
                    'Native HTML elements usually beat ARIA — the first fix is often deleting a role.',
                ),
            ],

            // ---------- Performance ----------
            [
                'category' => 'performance',
                'name' => 'Bundle Size Analyzer',
                'component' => 'BundleSizeAnalyzer',
                'description' => 'Break a build down by dependency to find the imports inflating your JavaScript payload.',
                'icon' => 'package',
                'featured' => true,
                'usage' => 1610,
                'settings' => $lab(
                    'Which dependencies are quietly bloating the production JavaScript bundle?',
                    'Parsing the build stats and ranking modules by gzipped contribution to the entry chunk.',
                    'A treemap that turns a vague "bundle is big" into a specific list of offenders.',
                    'A single mis-imported date or icon library often outweighs the entire app code.',
                ),
            ],
            [
                'category' => 'performance',
                'name' => 'Core Web Vitals Simulator',
                'component' => 'CoreWebVitalsSimulator',
                'description' => 'Model how LCP, CLS, and INP changes move the pass/fail line on real-world traffic.',
                'icon' => 'gauge',
                'new' => true,
                'usage' => 990,
                'settings' => $lab(
                    'How much does a given LCP or CLS improvement actually move the vitals pass rate?',
                    'Applying metric deltas to a sampled field-data distribution and recomputing the 75th percentile.',
                    'A before/after view that ties an engineering fix to the percentage of passing sessions.',
                    'The 75th percentile means tail devices, not the median, decide whether you pass.',
                ),
            ],
            [
                'category' => 'performance',
                'name' => 'Cache Header Planner',
                'component' => 'CacheHeaderPlanner',
                'description' => 'Compose Cache-Control and stale-while-revalidate headers for each asset class.',
                'icon' => 'server',
                'usage' => 520,
                'settings' => $lab(
                    'What Cache-Control policy is safe for each type of asset and route?',
                    'Mapping asset classes to max-age and stale-while-revalidate windows with a live header preview.',
                    'A per-route header set that pushes static content to the edge without staleness risk.',
                    'Immutable hashed assets can cache forever; HTML almost never should.',
                ),
            ],

            // ---------- Developer Tools ----------
            [
                'category' => 'developer-tools',
                'name' => 'Regex Tester',
                'component' => 'RegexTester',
                'description' => 'Build and debug regular expressions with live match highlighting and capture-group breakdown.',
                'icon' => 'search',
                'featured' => true,
                'usage' => 3120,
                'settings' => $lab(
                    'How do we debug a regex without trial-and-error against production strings?',
                    'Highlighting matches and named capture groups live as the pattern is edited.',
                    'A shareable tester that turns opaque patterns into visible, verifiable matches.',
                    'Naming capture groups makes patterns readable long after the author forgets them.',
                ),
            ],
            [
                'category' => 'developer-tools',
                'name' => 'Cron Expression Builder',
                'component' => 'CronExpressionBuilder',
                'description' => 'Translate schedules into cron syntax and preview the next run times in plain language.',
                'icon' => 'clock',
                'usage' => 1440,
                'settings' => $lab(
                    'How do we author a cron expression without misreading the five fields?',
                    'Rendering each field as a control and computing the next several fire times from the result.',
                    'A human-readable schedule preview that catches off-by-one field mistakes instantly.',
                    'The day-of-month and day-of-week fields are OR-ed, not AND-ed — a classic trap.',
                ),
            ],
            [
                'category' => 'developer-tools',
                'name' => 'JWT Decoder',
                'component' => 'JwtDecoder',
                'description' => 'Decode and inspect JWT header, payload, and expiry entirely client-side, never sending the token.',
                'icon' => 'key',
                'new' => true,
                'usage' => 1260,
                'settings' => $lab(
                    'Can we inspect a JWT safely without pasting it into a remote service?',
                    'Base64URL-decoding the header and payload entirely in the browser with no network call.',
                    'A local decoder that surfaces claims and expiry without ever transmitting the token.',
                    'A decoded JWT is still signed, not encrypted — never put secrets in the payload.',
                ),
            ],
            [
                'category' => 'developer-tools',
                'name' => 'UUID & ULID Generator',
                'component' => 'UuidUlidGenerator',
                'description' => 'Generate v4 UUIDs and lexicographically sortable ULIDs in bulk for seeding and testing.',
                'icon' => 'hash',
                'usage' => 830,
                'settings' => $lab(
                    'When should an identifier be a random UUID versus a sortable ULID?',
                    'Generating both formats in bulk and annotating their ordering and index behavior.',
                    'A quick reference that steers primary keys toward time-sortable ULIDs where it matters.',
                    'ULIDs keep insert order, so they avoid the index fragmentation random UUIDs cause.',
                ),
            ],

            // ---------- Brand Exploration ----------
            [
                'category' => 'brand-exploration',
                'name' => 'Logo Grid Constructor',
                'component' => 'LogoGridConstructor',
                'description' => 'Lay out a logomark on a proportional grid with clear-space and minimum-size rules.',
                'icon' => 'grid',
                'usage' => 710,
                'settings' => $lab(
                    'How do we enforce consistent logo clear-space and minimum sizing across placements?',
                    'Overlaying a proportional construction grid keyed to the mark height with live clear-space rings.',
                    'A spec sheet that keeps the logo legible and uncrowded on every surface.',
                    'Defining clear-space as a multiple of a logo feature scales better than fixed pixels.',
                ),
            ],
            [
                'category' => 'brand-exploration',
                'name' => 'Tagline Rhythm Tester',
                'component' => 'TaglineRhythmTester',
                'description' => 'Score candidate taglines on syllable rhythm, length, and read-aloud cadence.',
                'icon' => 'music',
                'new' => true,
                'usage' => 420,
                'settings' => $lab(
                    'What makes one tagline feel punchy and another feel flat?',
                    'Counting syllables and stress patterns to score candidate lines on cadence and length.',
                    'A ranking that favors short, rhythmic lines proven to be more memorable.',
                    'Lines that resolve on a stressed syllable read as more confident and quotable.',
                ),
            ],

            // ---------- Interaction Design ----------
            [
                'category' => 'interaction-design',
                'name' => 'Cursor Trail Composer',
                'component' => 'CursorTrailComposer',
                'description' => 'Design a custom cursor and trailing effect with tunable lag, size, and blend mode.',
                'icon' => 'mouse-pointer',
                'featured' => true,
                'new' => true,
                'usage' => 1180,
                'settings' => $lab(
                    'How do we add a signature cursor without hurting pointer precision?',
                    'Interpolating a trailing element toward the real pointer with a tunable lag factor.',
                    'A branded cursor effect that stays out of the way of actual click targets.',
                    'Keeping the true cursor visible under the effect preserves click accuracy and trust.',
                ),
            ],
            [
                'category' => 'interaction-design',
                'name' => 'Scroll Progress Designer',
                'component' => 'ScrollProgressDesigner',
                'description' => 'Prototype scroll-linked progress bars and reveal thresholds against a sample long page.',
                'icon' => 'chevrons-down',
                'usage' => 560,
                'settings' => $lab(
                    'Where should scroll-linked reveals fire so content feels responsive, not premature?',
                    'Mapping scroll offset to progress and letting reveal thresholds be dragged on a sample page.',
                    'A tuned reveal offset that triggers just as an element enters the comfortable read zone.',
                    'Firing reveals slightly before the viewport edge feels more responsive than dead-on.',
                ),
            ],
            [
                'category' => 'interaction-design',
                'name' => 'Haptic Feedback Mapper',
                'component' => 'HapticFeedbackMapper',
                'description' => 'Map interaction states to Web Vibration patterns and preview them on supported devices.',
                'icon' => 'smartphone',
                'pro' => true,
                'usage' => 380,
                'settings' => $lab(
                    'How do we add tactile feedback to web interactions without it feeling gimmicky?',
                    'Mapping UI states to short Vibration API patterns and previewing them on device.',
                    'A restrained haptic vocabulary reserved for confirmations and errors only.',
                    'Short, sparse pulses read as intentional; long buzzes read as a malfunction.',
                ),
            ],
        ];

        foreach ($tools as $toolData) {

            $category = ToolCategory::where('slug', $toolData['category'])->first();
            if (! $category) {
                continue;
            }

            Tool::updateOrCreate(
                ['slug' => Str::slug($toolData['name'])],
                [
                    'tool_category_id' => $category->id,
                    'name' => $toolData['name'],
                    'slug' => Str::slug($toolData['name']),
                    'description' => $toolData['description'],
                    'icon' => $toolData['icon'] ?? null,
                    'component_name' => $toolData['component'],
                    'is_featured' => $toolData['featured'] ?? false,
                    'is_new' => $toolData['new'] ?? false,
                    'is_pro' => $toolData['pro'] ?? false,
                    'usage_count' => $toolData['usage'] ?? 0,
                    'favorites_count' => (int) round(($toolData['usage'] ?? 0) * 0.12),
                    'status' => 'published',
                    'settings' => $toolData['settings'] ?? [],
                ]
            );
        }
    }
}

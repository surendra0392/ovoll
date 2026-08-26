<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\Service;
use App\Models\ServiceCategory;
use Inertia\Inertia;
use Inertia\Response;

class ServicesController extends Controller
{
    /**
     * Display the services hub (overview).
     */
    public function index(): Response
    {
        $categories = ServiceCategory::query()
            ->active()
            ->with(['services' => function ($q) {
                $q->active();
            }])
            ->orderBy('sort_order')
            ->get();

        $page = Page::where('slug', 'services')->first();

        return Inertia::render('Services/Hub', [
            'categories' => $categories,
            'page' => $page ? [
                'name' => $page->name,
                'slug' => $page->slug,
                'content' => $page->content,
            ] : null,
        ]);
    }

    /**
     * Display an individual service page by dynamically composing sections.
     */
    public function show(string $slug): Response
    {
        $service = Service::query()
            ->active()
            ->with('category')
            ->where('slug', $slug)
            ->firstOrFail();

        // Dynamically compose website sections for the landing page
        $sections = [];

        // 1. Hero Section
        $sections[] = [
            'id' => 'hero',
            'type' => 'hero',
            'variant' => $service->settings['hero_variant'] ?? 'split',
            'title' => $service->name,
            'subtitle' => $service->description,
            'badge' => $service->category->name,
            'ctas' => [
                ['label' => 'Initiate Project', 'url' => '#contact', 'variant' => 'primary'],
            ],
            'settings' => [
                'theme' => 'dark',
                'background' => 'mesh',
                'effects' => ['glow'],
            ],
        ];

        // 2. Problem & Solution Section (Sticky Features layout)
        if (! empty($service->problem_solution)) {
            $sections[] = [
                'id' => 'problem_solution',
                'type' => 'features',
                'variant' => 'sticky',
                'title' => 'Challenge & Core Approach',
                'subtitle' => 'Understanding the friction and how OVOLL resolves it.',
                'content' => [
                    'items' => [
                        [
                            'title' => 'The Friction Point',
                            'description' => $service->problem_solution['problem'] ?? '',
                            'metric' => 'Problem',
                            'metric_label' => 'Analysis',
                        ],
                        [
                            'title' => 'The Vanguard Resolution',
                            'description' => $service->problem_solution['solution'] ?? '',
                            'metric' => 'Resolution',
                            'metric_label' => 'Execution',
                        ],
                    ],
                ],
                'settings' => [
                    'theme' => 'dark',
                    'background' => 'none',
                ],
            ];
        }

        // 3. Deliverables Section (Bento grid services layout)
        if (! empty($service->deliverables)) {
            $sections[] = [
                'id' => 'deliverables',
                'type' => 'services',
                'variant' => 'bento',
                'title' => 'Key Deliverables',
                'subtitle' => 'Tangible assets engineered and handed over upon launch.',
                'content' => [
                    'services' => collect($service->deliverables)->map(function ($item, $idx) {
                        return [
                            'title' => $item['title'] ?? $item,
                            'description' => $item['description'] ?? 'High-fidelity deliverables matching global standards.',
                        ];
                    })->toArray(),
                ],
                'settings' => [
                    'theme' => 'dark',
                    'background' => 'noise',
                ],
            ];
        }

        // 4. Process Timeline Section (Stepper / workflow layout)
        if (! empty($service->process_timeline)) {
            $sections[] = [
                'id' => 'process',
                'type' => 'process',
                'variant' => 'horizontal',
                'title' => 'Development Phase',
                'subtitle' => 'Our structural roadmap from discovery to deployment.',
                'content' => [
                    'steps' => collect($service->process_timeline)->map(function ($step, $idx) {
                        return [
                            'num' => sprintf('%02d', $idx + 1),
                            'title' => $step['title'] ?? $step,
                            'desc' => $step['desc'] ?? 'Executing milestone check-ins regularly.',
                        ];
                    })->toArray(),
                ],
                'settings' => [
                    'theme' => 'dark',
                    'background' => 'none',
                ],
            ];
        }

        // 5. Stacks Section (Grid logo/tech layout)
        if (! empty($service->technologies)) {
            $sections[] = [
                'id' => 'technology',
                'type' => 'technology',
                'variant' => 'grid',
                'title' => 'Technology Matrix',
                'subtitle' => 'We engineer using only robust, future-ready stacks.',
                'content' => [
                    'techs' => collect($service->technologies)->map(function ($tech) {
                        return [
                            'name' => $tech['name'] ?? $tech,
                            'desc' => $tech['desc'] ?? 'Core Platform Stack',
                        ];
                    })->toArray(),
                ],
                'settings' => [
                    'theme' => 'dark',
                    'background' => 'gradient',
                ],
            ];
        }

        // 6. Pricing comparison (if configured)
        if (! empty($service->pricing_comparison)) {
            $sections[] = [
                'id' => 'pricing',
                'type' => 'services',
                'variant' => 'cards',
                'title' => 'Investment Structuring',
                'subtitle' => 'Clear, modular engagement models tailored to your growth velocity.',
                'content' => [
                    'services' => collect($service->pricing_comparison)->map(function ($tier) {
                        return [
                            'title' => $tier['name'],
                            'description' => sprintf('%s — %s', $tier['price'], $tier['desc'] ?? ''),
                        ];
                    })->toArray(),
                ],
                'settings' => [
                    'theme' => 'dark',
                    'background' => 'none',
                ],
            ];
        }

        // 7. FAQs (Collapsible accordion)
        if (! empty($service->faqs)) {
            $sections[] = [
                'id' => 'faq',
                'type' => 'faq',
                'variant' => 'accordion',
                'title' => 'Service FAQ',
                'subtitle' => 'Answers to key objections and execution questions.',
                'content' => [
                    'faqs' => $service->faqs,
                ],
                'settings' => [
                    'theme' => 'dark',
                    'background' => 'none',
                ],
            ];
        }

        // 8. Contact Section (Brief request form)
        $sections[] = [
            'id' => 'contact',
            'type' => 'contact',
            'variant' => 'project_brief',
            'title' => 'Ready to scale?',
            'subtitle' => 'Submit your brief and schedule a project validation call.',
            'settings' => [
                'theme' => 'dark',
                'background' => 'aurora',
            ],
        ];

        // 9. Footer Section
        $sections[] = [
            'id' => 'footer',
            'type' => 'footer',
            'variant' => 'mega',
            'content' => [
                'copyright' => '© 2026 OVOLL. All rights reserved.',
                'description' => 'A creative growth technology studio.',
                'links' => [
                    ['label' => 'Homepage', 'url' => '/'],
                    ['label' => 'Services Hub', 'url' => '/services'],
                    ['label' => 'Design Lab', 'url' => '/dev/lab'],
                ],
            ],
            'settings' => [
                'theme' => 'dark',
                'background' => 'none',
            ],
        ];

        return Inertia::render('Services/Show', [
            'service' => $service,
            'sections' => $sections,
        ]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\AboutSection;
use Illuminate\Database\Seeder;

class AboutSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sections = [
            [
                'key' => 'about_hero',
                'title' => 'About Hero',
                'type' => 'hero',
                'variant' => 'centered',
                'sort_order' => 1,
                'content' => [
                    'headline' => 'We architect world-class digital realities.',
                    'subtitle' => 'OVOLL is a premium design and engineering studio. We combine cinematic visuals, WebGL architectures, and modular codebases to shape memorable digital experiences.',
                    'badge' => 'ABOUT OVOLL',
                ],
                'settings' => [
                    'theme' => 'dark',
                    'padding' => 'lg',
                    'background' => 'aurora',
                ],
            ],
            [
                'key' => 'about_stats',
                'title' => 'Our Stats',
                'type' => 'stats',
                'sort_order' => 2,
                'content' => [
                    'headline' => 'Measurable engineering excellence.',
                    'stats' => [
                        [
                            'value' => '50',
                            'suffix' => '+',
                            'label' => 'Products Launched',
                        ],
                        [
                            'value' => '60',
                            'suffix' => 'fps',
                            'label' => 'Fluid Animation Standard',
                        ],
                        [
                            'value' => '99',
                            'suffix' => '%',
                            'label' => 'Lighthouse Performance Score',
                        ],
                        [
                            'value' => '100',
                            'suffix' => '%',
                            'label' => 'Test Coverage Standard',
                        ],
                    ],
                ],
                'settings' => [
                    'theme' => 'dark',
                    'padding' => 'md',
                    'background' => 'grid',
                ],
            ],
            [
                'key' => 'about_features',
                'title' => 'Our Values',
                'type' => 'features',
                'sort_order' => 3,
                'content' => [
                    'headline' => 'Code and design without compromises.',
                    'items' => [
                        [
                            'title' => 'Pure Craftsmanship',
                            'description' => 'We do not build average things. Every line of code, scroll step, and layout pixel is tailored to feel ultra-premium.',
                        ],
                        [
                            'title' => 'Open Engineering',
                            'description' => 'Our projects are completely modular, written in robust type-safe TypeScript, and built to stand the test of time.',
                        ],
                        [
                            'title' => 'Radical Transparency',
                            'description' => 'We share our ideas, code quality standards, and performance testing data openly with our partners.',
                        ],
                    ],
                ],
                'settings' => [
                    'theme' => 'dark',
                    'padding' => 'lg',
                    'background' => 'none',
                ],
            ],
            [
                'key' => 'about_cta',
                'title' => 'About CTA',
                'type' => 'cta',
                'sort_order' => 4,
                'content' => [
                    'headline' => 'Ready to architect your digital vanguard?',
                    'primary_cta' => 'Initiate Project',
                    'primary_url' => '/contact',
                ],
                'settings' => [
                    'theme' => 'glass',
                    'padding' => 'lg',
                    'background' => 'aurora',
                ],
            ],
        ];

        foreach ($sections as $section) {
            AboutSection::updateOrCreate(
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

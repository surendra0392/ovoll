<?php

namespace App\Filament\Widgets;

use App\Models\Article;
use App\Models\Product;
use App\Models\Resource;
use App\Models\Service;
use App\Models\Tool;
use Filament\Widgets\ChartWidget;

class ContentBreakdownChartWidget extends ChartWidget
{
    protected static ?int $sort = 3;

    protected ?string $heading = 'Ecosystem Offerings & Content';

    protected int|string|array $columnSpan = [
        'md' => 1,
        'xl' => 1,
    ];

    protected function getData(): array
    {
        $services = Service::count();
        $articles = Article::count();
        $products = Product::count();
        $resources = Resource::count();
        $tools = Tool::count();

        return [
            'datasets' => [
                [
                    'label' => 'Total Records',
                    'data' => [$services, $articles, $products, $resources, $tools],
                    'backgroundColor' => [
                        '#14b8a6', // Teal (Services)
                        '#06b6d4', // Cyan (Articles)
                        '#8b5cf6', // Purple (Products)
                        '#3b82f6', // Blue (Resources)
                        '#10b981', // Emerald (Tools)
                    ],
                    'hoverOffset' => 6,
                ],
            ],
            'labels' => ['Services', 'Articles', 'Products', 'Resources', 'Tools'],
        ];
    }

    protected function getType(): string
    {
        return 'doughnut';
    }
}

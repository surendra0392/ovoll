<?php

namespace App\Filament\Widgets;

use App\Models\Article;
use App\Models\Lead;
use App\Models\NewsletterSubscriber;
use App\Models\Product;
use App\Models\Service;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class CmsOverviewWidget extends StatsOverviewWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $leadsThisMonth = Lead::where('created_at', '>=', now()->startOfMonth())->count();
        $totalLeads = Lead::count();
        $qualifiedLeads = Lead::qualified()->count();
        $subscribers = NewsletterSubscriber::count();
        $publishedArticles = Article::published()->count();
        $totalServices = Service::where('is_enabled', true)->count();
        $totalProducts = Product::where('status', 'published')->count();

        // 7-day sparkline data for leads
        $leadSparkline = [];
        for ($i = 6; $i >= 0; $i--) {
            $day = now()->subDays($i);
            $leadSparkline[] = Lead::whereDate('created_at', $day->toDateString())->count();
        }

        // 7-day sparkline for subscribers
        $subSparkline = [];
        for ($i = 6; $i >= 0; $i--) {
            $day = now()->subDays($i);
            $subSparkline[] = NewsletterSubscriber::whereDate('created_at', $day->toDateString())->count();
        }

        return [
            Stat::make('Total Inquiries', number_format($totalLeads))
                ->description($leadsThisMonth.' new this month')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->chart(empty(array_filter($leadSparkline)) ? [2, 4, 3, 5, 4, 7, 8] : $leadSparkline)
                ->color('primary'),

            Stat::make('Qualified Pipeline', number_format($qualifiedLeads))
                ->description('High-intent prospects')
                ->descriptionIcon('heroicon-m-sparkles')
                ->chart([3, 5, 4, 6, 7, 8, 9])
                ->color('success'),

            Stat::make('Active Solutions', number_format($totalServices + $totalProducts))
                ->description("{$totalServices} Services · {$totalProducts} Products")
                ->descriptionIcon('heroicon-m-cube')
                ->chart([5, 6, 6, 7, 8, 8, 9])
                ->color('info'),

            Stat::make('Content & Audience', number_format($publishedArticles + $subscribers))
                ->description("{$publishedArticles} Articles · {$subscribers} Subscribers")
                ->descriptionIcon('heroicon-m-newspaper')
                ->chart(empty(array_filter($subSparkline)) ? [4, 5, 6, 8, 7, 9, 10] : $subSparkline)
                ->color('warning'),
        ];
    }
}

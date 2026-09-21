<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\ArticleCategory;
use App\Models\Author;
use App\Models\Resource;
use App\Models\ResourceCategory;
use App\Models\Service;
use App\Models\Tool;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $urls = [];

        // 1. Static Core Landing & Hub Pages
        $staticPages = [
            'home' => ['priority' => '1.0', 'changefreq' => 'weekly'],
            'services.index' => ['priority' => '0.9', 'changefreq' => 'weekly'],
            'products.index' => ['priority' => '0.9', 'changefreq' => 'weekly'],
            'insights.index' => ['priority' => '0.9', 'changefreq' => 'daily'],
            'hub.index' => ['priority' => '0.9', 'changefreq' => 'daily'],
            'studio.index' => ['priority' => '0.9', 'changefreq' => 'weekly'],
            'about' => ['priority' => '0.8', 'changefreq' => 'monthly'],
            'contact.index' => ['priority' => '0.8', 'changefreq' => 'monthly'],
            'leads.index' => ['priority' => '0.8', 'changefreq' => 'monthly'],
            'privacy' => ['priority' => '0.4', 'changefreq' => 'yearly'],
            'terms' => ['priority' => '0.4', 'changefreq' => 'yearly'],
        ];

        foreach ($staticPages as $route => $config) {
            $urls[] = [
                'loc' => route($route),
                'lastmod' => Carbon::now()->toAtomString(),
                'changefreq' => $config['changefreq'],
                'priority' => $config['priority'],
            ];
        }

        // 2. Services Detail Pages (34 Services)
        $services = Service::active()->get();
        foreach ($services as $service) {
            $urls[] = [
                'loc' => route('services.show', $service->slug),
                'lastmod' => ($service->updated_at ?? Carbon::now())->toAtomString(),
                'changefreq' => 'weekly',
                'priority' => '0.9',
            ];
        }

        // 3. Insights Articles
        $articles = Article::published()->get();
        foreach ($articles as $article) {
            $urls[] = [
                'loc' => route('insights.show', $article->slug),
                'lastmod' => ($article->updated_at ?? Carbon::now())->toAtomString(),
                'changefreq' => 'weekly',
                'priority' => '0.8',
            ];
        }

        // 4. Article Categories
        $articleCategories = ArticleCategory::all();
        foreach ($articleCategories as $category) {
            $urls[] = [
                'loc' => route('insights.category', $category->slug),
                'lastmod' => ($category->updated_at ?? Carbon::now())->toAtomString(),
                'changefreq' => 'weekly',
                'priority' => '0.7',
            ];
        }

        // 5. Authors
        $authors = Author::all();
        foreach ($authors as $author) {
            $urls[] = [
                'loc' => route('insights.author', $author->slug),
                'lastmod' => ($author->updated_at ?? Carbon::now())->toAtomString(),
                'changefreq' => 'monthly',
                'priority' => '0.6',
            ];
        }

        // 6. Knowledge Hub Resources
        $resources = Resource::published()->get();
        foreach ($resources as $resource) {
            $urls[] = [
                'loc' => route('hub.show', $resource->slug),
                'lastmod' => ($resource->updated_at ?? Carbon::now())->toAtomString(),
                'changefreq' => 'weekly',
                'priority' => '0.8',
            ];
        }

        // 7. Knowledge Hub Categories
        $resourceCategories = ResourceCategory::all();
        foreach ($resourceCategories as $category) {
            $urls[] = [
                'loc' => route('hub.category', $category->slug),
                'lastmod' => ($category->updated_at ?? Carbon::now())->toAtomString(),
                'changefreq' => 'weekly',
                'priority' => '0.7',
            ];
        }

        // 8. Studio Interactive Tools (34 Tools)
        $tools = Tool::published()->get();
        foreach ($tools as $tool) {
            $urls[] = [
                'loc' => route('studio.show', $tool->slug),
                'lastmod' => ($tool->updated_at ?? Carbon::now())->toAtomString(),
                'changefreq' => 'monthly',
                'priority' => '0.8',
            ];
        }

        // Build XML
        $xml = '<?xml version="1.0" encoding="UTF-8"?>'."\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'."\n";

        foreach ($urls as $url) {
            $xml .= '  <url>'."\n";
            $xml .= '    <loc>'.htmlspecialchars($url['loc']).'</loc>'."\n";
            if (isset($url['lastmod'])) {
                $xml .= '    <lastmod>'.$url['lastmod'].'</lastmod>'."\n";
            }
            if (isset($url['changefreq'])) {
                $xml .= '    <changefreq>'.$url['changefreq'].'</changefreq>'."\n";
            }
            if (isset($url['priority'])) {
                $xml .= '    <priority>'.$url['priority'].'</priority>'."\n";
            }
            $xml .= '  </url>'."\n";
        }

        $xml .= '</urlset>';

        return response($xml, 200)
            ->header('Content-Type', 'application/xml; charset=utf-8');
    }
}

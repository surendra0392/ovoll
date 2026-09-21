<?php

namespace App\Console\Commands;

use App\Models\Article;
use App\Models\ArticleCategory;
use App\Models\Author;
use App\Models\Resource;
use App\Models\ResourceCategory;
use App\Models\Service;
use App\Models\Tool;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

#[Signature('sitemap:generate')]
#[Description('Generate the sitemap.')]
class GenerateSitemap extends Command
{
    /**
     * Build the sitemap explicitly from routes and published content.
     *
     * The default crawler-based generator only finds `/` because the site is a
     * JS-rendered Inertia SPA whose internal links aren't followable by a plain
     * HTTP crawler. Listing every indexable URL here guarantees search engines
     * discover all static pages and dynamic content (services, articles, hub
     * resources, tools) — a prerequisite for ranking.
     */
    public function handle(): int
    {
        $sitemap = Sitemap::create();

        foreach ($this->staticUrls() as $path => $priority) {
            $sitemap->add(
                Url::create($this->canonicalUrl($path))
                    ->setPriority($priority)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
            );
        }

        $this->addDynamicUrls($sitemap);

        $sitemap->writeToFile(public_path('sitemap.xml'));

        $this->info('Sitemap generated successfully.');

        return self::SUCCESS;
    }

    /**
     * Resolve the canonical base URL for the sitemap (always https://ovoll.in in sitemaps).
     */
    private function canonicalUrl(string $path = ''): string
    {
        $appUrl = config('app.url', 'https://ovoll.in');
        $base = (empty($appUrl) || str_contains($appUrl, 'localhost') || str_contains($appUrl, '.test'))
            ? 'https://ovoll.in'
            : rtrim($appUrl, '/');

        return $base.($path === '/' ? '' : '/'.ltrim($path, '/'));
    }

    /**
     * Static, always-present pages mapped to their crawl priority.
     *
     * @return array<string, float>
     */
    private function staticUrls(): array
    {
        return [
            '/' => 1.0,
            '/services' => 0.9,
            '/products' => 0.9,
            '/about' => 0.8,
            '/insights' => 0.8,
            '/hub' => 0.8,
            '/studio' => 0.8,
            '/contact' => 0.7,
            '/discover' => 0.6,
            '/privacy' => 0.3,
            '/terms' => 0.3,
        ];
    }

    /**
     * Append published, slug-addressable content to the sitemap.
     */
    private function addDynamicUrls(Sitemap $sitemap): void
    {
        Service::query()->active()->select(['slug', 'updated_at'])->get()
            ->each(fn (Service $s) => $sitemap->add(
                Url::create($this->canonicalUrl("/services/{$s->slug}"))
                    ->setLastModificationDate($s->updated_at)
                    ->setPriority(0.7)
            ));

        Article::query()->published()->select(['slug', 'updated_at'])->get()
            ->each(fn (Article $a) => $sitemap->add(
                Url::create($this->canonicalUrl("/insights/{$a->slug}"))
                    ->setLastModificationDate($a->updated_at)
                    ->setPriority(0.7)
            ));

        ArticleCategory::query()->has('articles')->select(['slug', 'updated_at'])->get()
            ->each(fn (ArticleCategory $c) => $sitemap->add(
                Url::create($this->canonicalUrl("/insights/category/{$c->slug}"))->setPriority(0.5)
            ));

        Author::query()->select(['slug', 'updated_at'])->get()
            ->each(fn (Author $a) => $sitemap->add(
                Url::create($this->canonicalUrl("/insights/author/{$a->slug}"))->setPriority(0.4)
            ));

        Resource::query()->published()->select(['slug', 'updated_at'])->get()
            ->each(fn (Resource $r) => $sitemap->add(
                Url::create($this->canonicalUrl("/hub/{$r->slug}"))
                    ->setLastModificationDate($r->updated_at)
                    ->setPriority(0.6)
            ));

        ResourceCategory::query()->active()->select(['slug', 'updated_at'])->get()
            ->each(fn (ResourceCategory $c) => $sitemap->add(
                Url::create($this->canonicalUrl("/hub/category/{$c->slug}"))->setPriority(0.5)
            ));

        Tool::query()->published()->select(['slug', 'updated_at'])->get()
            ->each(fn (Tool $t) => $sitemap->add(
                Url::create($this->canonicalUrl("/studio/tool/{$t->slug}"))
                    ->setLastModificationDate($t->updated_at)
                    ->setPriority(0.6)
            ));
    }
}

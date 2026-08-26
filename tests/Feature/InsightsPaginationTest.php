<?php

use App\Http\Controllers\InsightsController;
use App\Models\Article;
use Database\Seeders\InsightsSeeder;

use function Pest\Laravel\get;

beforeEach(function () {
    $this->seed(InsightsSeeder::class);
});

it('seeds at least 30 published articles', function () {
    expect(Article::published()->count())->toBeGreaterThanOrEqual(30);
});

it('returns the first page of paginated articles with pagination meta', function () {
    get(route('insights.index'))
        ->assertInertia(fn ($page) => $page
            ->component('Insights/Index')
            ->has('articles', InsightsController::INDEX_PER_PAGE)
            ->where('pagination.current_page', 1)
            ->where('pagination.has_more', true)
        );
});

it('returns the next batch of articles for page two', function () {
    // The "load more" control requests ?page=2; the controller returns that
    // page's articles (Inertia merges them into the loaded set client-side).
    get(route('insights.index', ['page' => 2]))
        ->assertInertia(fn ($page) => $page
            ->component('Insights/Index')
            ->has('articles', InsightsController::INDEX_PER_PAGE)
            ->where('pagination.current_page', 2)
        );
});

it('marks the final page as having no more results', function () {
    // The seeder's article count grows over time, so derive the last page
    // from the actual data instead of hardcoding a page number.
    $lastPage = (int) ceil(Article::published()->count() / InsightsController::INDEX_PER_PAGE);

    get(route('insights.index', ['page' => $lastPage]))
        ->assertInertia(fn ($page) => $page
            ->where('pagination.has_more', false)
        );
});

<?php

use App\Models\Article;
use App\Models\ArticleCategory;
use App\Models\Author;
use Database\Seeders\InsightsSeeder;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->seed(InsightsSeeder::class);
});

test('insights index page can be rendered with dynamic props', function () {
    $response = $this->get('/insights');

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Insights/Index')
        ->has('featured')
        ->has('articles')
        ->has('categories')
    );
});

test('individual article page can be rendered with content blocks', function () {
    $article = Article::query()->first();

    $response = $this->get("/insights/{$article->slug}");

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Insights/Show')
        ->has('article')
    );
});

test('invalid article slug returns 404', function () {
    $response = $this->get('/insights/nonexistent-article-slug');

    $response->assertStatus(404);
});

test('category pages can be rendered', function () {
    $category = ArticleCategory::query()->first();

    $response = $this->get("/insights/category/{$category->slug}");

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Insights/Category')
        ->has('category')
        ->has('articles')
    );
});

test('author pages can be rendered', function () {
    $author = Author::query()->first();

    $response = $this->get("/insights/author/{$author->slug}");

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Insights/Author')
        ->has('author')
        ->has('articles')
    );
});

test('insights search page can query articles', function () {
    $response = $this->get('/insights/search?q=Easing');

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Insights/Search')
        ->has('articles')
        ->has('categories')
        ->has('filters')
    );
});

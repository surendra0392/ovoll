<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\ArticleCategory;
use App\Models\Author;
use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InsightsController extends Controller
{
    /**
     * Number of articles per page on the index — shared with the pagination
     * feature tests so the two can never drift.
     */
    public const INDEX_PER_PAGE = 9;

    public function index(Request $request)
    {
        $featured = Article::published()
            ->where('is_featured', true)
            ->with(['author', 'category'])
            ->latest('published_at')
            ->orderByDesc('id')
            ->first();

        // A stable secondary sort on `id` is required: many articles can share the
        // same `published_at`, and without a deterministic tiebreaker the database
        // returns those rows in arbitrary order — causing paginated results to
        // shuffle, duplicate, or drop posts across page loads and "load more" calls.
        $articles = Article::published()
            ->when($featured, fn ($q) => $q->where('id', '!=', $featured->id))
            ->with(['author', 'category'])
            ->orderByDesc('is_pinned')
            ->latest('published_at')
            ->orderByDesc('id')
            ->paginate(self::INDEX_PER_PAGE);

        $categories = ArticleCategory::withCount('articles')
            ->has('articles')
            ->get();

        return Inertia::render('Insights/Index', [
            'featured' => $featured,
            // Merge prop: partial reloads with a higher `page` append the next
            // batch to the already-loaded set (AJAX "load more", no full visit).
            // matchOn('id') dedupes by article id so re-merging page 1 on a repeat
            // visit can't duplicate or reshuffle already-loaded posts.
            'articles' => Inertia::merge(fn () => $articles->items())->matchOn('id'),
            'pagination' => [
                'current_page' => $articles->currentPage(),
                'last_page' => $articles->lastPage(),
                'has_more' => $articles->hasMorePages(),
            ],
            'categories' => $categories,
            'page' => $this->pageContent('insights'),
        ]);

    }

    private function pageContent(string $slug): ?array
    {
        $page = Page::where('slug', $slug)->first();

        return $page ? [
            'name' => $page->name,
            'slug' => $page->slug,
            'content' => $page->content,
        ] : null;
    }

    public function show(string $slug)
    {
        $article = Article::published()
            ->where('slug', $slug)
            ->with(['author', 'category', 'tags', 'series', 'relatedArticles' => function ($q) {
                $q->published()->limit(3);
            }])
            ->firstOrFail();

        // Increment view count (simple implementation, might want to debounce this in production)
        $article->increment('views_count');

        return Inertia::render('Insights/Show', [
            'article' => $article,
        ]);
    }

    public function category(string $slug)
    {
        $category = ArticleCategory::where('slug', $slug)->firstOrFail();

        $articles = Article::published()
            ->where('article_category_id', $category->id)
            ->with(['author', 'category'])
            ->latest('published_at')
            ->paginate(12);

        return Inertia::render('Insights/Category', [
            'category' => $category,
            'articles' => $articles,
        ]);
    }

    public function author(string $slug)
    {
        $author = Author::where('slug', $slug)->firstOrFail();

        $articles = Article::published()
            ->where('author_id', $author->id)
            ->with(['author', 'category'])
            ->latest('published_at')
            ->paginate(12);

        return Inertia::render('Insights/Author', [
            'author' => $author,
            'articles' => $articles,
        ]);
    }

    public function search(Request $request)
    {
        $query = $request->input('q');
        $categoryId = $request->input('category');

        $articles = Article::published()
            ->when($query, function ($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                    ->orWhere('excerpt', 'like', "%{$query}%");
            })
            ->when($categoryId, function ($q) use ($categoryId) {
                $q->where('article_category_id', $categoryId);
            })
            ->with(['author', 'category'])
            ->latest('published_at')
            ->paginate(12)
            ->withQueryString();

        $categories = ArticleCategory::withCount('articles')
            ->has('articles')
            ->get();

        return Inertia::render('Insights/Search', [
            'articles' => $articles,
            'categories' => $categories,
            'filters' => $request->only(['q', 'category']),
        ]);
    }
}

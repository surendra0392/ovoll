<?php

namespace App\Http\Controllers;

use App\Models\Resource;
use App\Models\ResourceCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KnowledgeHubController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Resource::published()->with(['author', 'category']);

        // Filter by category
        if ($request->has('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        // Filter by type
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        // Search
        if ($request->has('q')) {
            $search = $request->q;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('excerpt', 'like', "%{$search}%");
            });
        }

        $resources = $query->latest('published_at')->paginate(12)->withQueryString();

        $categories = ResourceCategory::active()->orderBy('sort_order')->get();

        return Inertia::render('KnowledgeHub/Index', [
            'resources' => $resources,
            'categories' => $categories,
            'filters' => $request->only(['category', 'type', 'q']),
        ]);
    }

    public function show(string $slug): Response
    {
        $resource = Resource::published()
            ->with(['author', 'category', 'tags'])
            ->where('slug', $slug)
            ->firstOrFail();

        // Increment views (in a real app, might want to use a job or debounce this)
        $resource->increment('views_count');

        $relatedResources = Resource::published()
            ->with(['author', 'category'])
            ->where('id', '!=', $resource->id)
            ->where(function ($q) use ($resource) {
                $q->where('resource_category_id', $resource->resource_category_id)
                    ->orWhere('type', $resource->type);
            })
            ->latest('published_at')
            ->take(3)
            ->get();

        return Inertia::render('KnowledgeHub/Show', [
            'resource' => $resource,
            'relatedResources' => $relatedResources,
        ]);
    }
}

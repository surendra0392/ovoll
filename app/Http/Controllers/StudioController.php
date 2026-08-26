<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\Tool;
use App\Models\ToolCategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StudioController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Tool::published()->with('category');

        if ($request->filled('q')) {
            $search = $request->q;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->filled('category')) {
            $query->whereHas('category', fn ($q) => $q->where('slug', $request->category));
        }

        $categories = ToolCategory::active()
            ->withCount(['publishedTools'])
            ->orderBy('sort_order')
            ->get();

        $allTools = $query->orderBy('name')->get();

        $page = Page::where('slug', 'studio')->first();

        return Inertia::render('Studio/Index', [
            'categories' => $categories,
            'allTools' => $allTools,
            'filters' => $request->only(['q', 'category']),
            'page' => $page ? [
                'name' => $page->name,
                'slug' => $page->slug,
                'content' => $page->content,
            ] : null,
        ]);

    }

    public function show(string $slug): Response
    {
        $tool = Tool::published()
            ->with('category')
            ->where('slug', $slug)
            ->firstOrFail();

        $relatedTools = Tool::published()
            ->with('category')
            ->where('tool_category_id', $tool->tool_category_id)
            ->where('id', '!=', $tool->id)
            ->orderByDesc('usage_count')
            ->take(4)
            ->get();

        return Inertia::render('Studio/Show', [
            'tool' => $tool,
            'relatedTools' => $relatedTools,
        ]);
    }

    public function track(Request $request, string $slug): JsonResponse
    {
        $tool = Tool::where('slug', $slug)->firstOrFail();
        $tool->recordUsage($request->session()->getId(), $request->input('metadata'));

        return response()->json(['success' => true]);
    }
}

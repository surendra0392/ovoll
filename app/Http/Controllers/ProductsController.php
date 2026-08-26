<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class ProductsController extends Controller
{
    public function index(): Response
    {
        $products = Product::published()->orderBy('category')->orderBy('name')->get();

        $productGroups = $products->groupBy('category')->map(function ($items, $category) {
            return [
                'category' => $category,
                'items' => $items->map(function ($item) {
                    return [
                        'name' => $item->name,
                        'icon' => $item->features['icon'] ?? 'Package',
                        'description' => $item->description,
                        'tags' => $item->features['tags'] ?? [],
                    ];
                })->values()->toArray(),
            ];
        })->values()->toArray();

        $page = Page::where('slug', 'products')->first();

        return Inertia::render('Products/Index', [
            'productGroups' => $productGroups,
            'page' => $page ? [
                'name' => $page->name,
                'slug' => $page->slug,
                'content' => $page->content,
            ] : null,
        ]);
    }
}

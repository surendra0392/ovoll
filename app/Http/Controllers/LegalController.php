<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Inertia\Inertia;
use Inertia\Response;

class LegalController extends Controller
{
    public function privacy(): Response
    {
        $page = Page::where('slug', 'privacy')->first();

        return Inertia::render('Legal/Privacy', [
            'page' => $page ? [
                'name' => $page->name,
                'slug' => $page->slug,
                'content' => $page->content,
                'updated_at' => $page->updated_at->format('F j, Y'),
            ] : null,
        ]);
    }

    public function terms(): Response
    {
        $page = Page::where('slug', 'terms')->first();

        return Inertia::render('Legal/Terms', [
            'page' => $page ? [
                'name' => $page->name,
                'slug' => $page->slug,
                'content' => $page->content,
                'updated_at' => $page->updated_at->format('F j, Y'),
            ] : null,
        ]);
    }
}

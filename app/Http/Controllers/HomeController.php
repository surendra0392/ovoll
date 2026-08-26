<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Display the OVOLL homepage with CMS content.
     */
    public function index(): Response
    {
        $page = Page::where('slug', 'home')->first();

        return Inertia::render('welcome', [
            'page' => $page ? [
                'name' => $page->name,
                'slug' => $page->slug,
                'content' => $page->content,
            ] : null,
        ]);
    }
}

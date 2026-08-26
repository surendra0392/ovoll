<?php

namespace App\Http\Controllers;

use App\Events\LeadCreated;
use App\Models\Lead;
use App\Models\Page;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LeadsController extends Controller
{
    /**
     * Show the Project Discovery Suite.
     */
    public function index(): Response
    {
        $page = Page::where('slug', 'discover')->first();

        return Inertia::render('Services/Discover', [
            'page' => $page ? [
                'name' => $page->name,
                'slug' => $page->slug,
                'content' => $page->content,
            ] : null,
        ]);
    }

    /**
     * Store a new qualified lead.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'first_name' => 'nullable|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:255',
            'company_name' => 'nullable|string|max:255',
            'company_size' => 'nullable|string|max:255',
            'industry' => 'nullable|string|max:255',
            'services' => 'nullable|array',
            'budget_range' => 'nullable|string|max:255',
            'timeline' => 'nullable|string|max:255',
            'goals_challenges' => 'nullable|string',
            'estimator_details' => 'nullable|array',
        ]);

        // Auto-assign default tag
        $validated['tags'] = ['discovery-wizard'];
        $validated['status'] = 'new';

        $lead = Lead::create($validated);

        // Fire notification event
        event(new LeadCreated($lead));

        return back()->with('success', 'Lead submitted successfully! Our strategy team will validate your brief.');
    }
}

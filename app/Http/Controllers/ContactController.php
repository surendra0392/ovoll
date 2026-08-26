<?php

namespace App\Http\Controllers;

use App\Mail\LeadReceivedMail;
use App\Mail\TeamNotificationMail;
use App\Models\Article;
use App\Models\Faq;
use App\Models\Lead;
use App\Models\Office;
use App\Support\SiteData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    #[Route('/contact', name: 'contact.index')]
    public function index(): Response
    {
        $shared = SiteData::shared();
        $settings = $shared['settings'] ?? [];
        $faqs = Faq::where('is_active', true)->orderBy('order')->get();
        $offices = Office::orderBy('is_primary', 'desc')->get();

        return Inertia::render('Contact/Index', [
            'settings' => $settings,
            'faqs' => $faqs,
            'offices' => $offices,
        ]);
    }

    #[Route('/contact', name: 'contact.store', methods: ['POST'])]
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:255',
            'company_name' => 'nullable|string|max:255',
            'industry' => 'nullable|string|max:255',
            'services' => 'nullable|array',
            'budget_range' => 'nullable|string|max:255',
            'timeline' => 'nullable|string|max:255',
            'goals_challenges' => 'nullable|string',
            'preferred_contact_method' => 'nullable|string|max:255',
            'attachments' => 'nullable|array',
            'attachments.*' => 'file|max:10240', // 10MB max per file
        ]);

        $attachments = [];
        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $path = $file->store('leads/attachments', 'public');
                $attachments[] = $path;
            }
        }
        $validated['attachments'] = $attachments;

        $lead = Lead::create($validated);

        try {
            Mail::to($lead->email)->queue(new LeadReceivedMail($lead));
            Mail::to('hello@ovoll.com')->queue(new TeamNotificationMail($lead));
        } catch (\Exception $e) {
            Log::error('Failed to queue contact emails', ['error' => $e->getMessage(), 'lead_id' => $lead->id]);
        }

        return redirect()->route('contact.success');
    }

    public function success(): Response
    {
        $articles = Article::published()
            ->with(['author', 'category'])
            ->latest('published_at')
            ->limit(3)
            ->get();

        return Inertia::render('Contact/Success', [
            'recommendedArticles' => $articles,
        ]);
    }
}

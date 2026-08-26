<?php

use App\Mail\LeadReceivedMail;
use App\Mail\TeamNotificationMail;
use App\Models\Article;
use App\Models\ArticleCategory;
use App\Models\Author;
use App\Models\EmailTemplate;
use Illuminate\Support\Facades\Mail;

test('contact index page renders with settings', function () {
    $response = $this->get('/contact');
    $response->assertStatus(200);
});

test('submitting contact form stores lead and queues notification emails', function () {
    Mail::fake();

    // Create confirmation templates to avoid null exceptions in mails
    EmailTemplate::create([
        'identifier' => 'visitor_confirmation',
        'subject' => 'Thank you {first_name}',
        'body' => 'Your submission is received.',
        'is_active' => true,
    ]);

    EmailTemplate::create([
        'identifier' => 'team_notification',
        'subject' => 'New Lead: {company_name}',
        'body' => 'Lead received.',
        'is_active' => true,
    ]);

    // _hp_time needs to be at least 3 seconds in the past to bypass HoneypotMiddleware
    $hpTime = time() - 5;

    $response = $this->post('/contact', [
        'first_name' => 'Alice',
        'last_name' => 'Smith',
        'email' => 'alice@company.com',
        'phone' => '123-456-7890',
        'company_name' => 'Alice Design',
        'services' => ['Website', 'AI Solution'],
        'budget_range' => '$25,000 - $50,000',
        'timeline' => '1 Month',
        'goals_challenges' => 'Integrate visual UI tools and dynamic analytics trackers.',
        'preferred_contact_method' => 'Video Call',
        '_hp_trap' => '',
        '_hp_time' => (string) $hpTime,
    ]);

    $response->assertRedirect('/contact/success');

    $this->assertDatabaseHas('leads', [
        'first_name' => 'Alice',
        'email' => 'alice@company.com',
        'preferred_contact_method' => 'Video Call',
    ]);

    Mail::assertQueued(LeadReceivedMail::class);
    Mail::assertQueued(TeamNotificationMail::class);
});

test('contact success page returns recommended insights articles', function () {
    // Seed some published articles
    $category = ArticleCategory::create(['name' => 'Engineering', 'slug' => 'engineering']);
    $author = Author::create(['name' => 'Lead Dev', 'slug' => 'lead-dev']);

    Article::create([
        'title' => 'Latency Budgets in Modern Web Apps',
        'slug' => 'latency-budgets-in-modern-web-apps',
        'excerpt' => 'How we optimize server response metrics.',
        'content' => ['block' => 'Content goes here.'],
        'article_category_id' => $category->id,
        'author_id' => $author->id,
        'status' => 'published',
        'published_at' => now(),
    ]);

    $response = $this->get('/contact/success');
    $response->assertStatus(200);

    // Verify recommendedArticles prop is passed with the latest article
    $response->assertInertia(fn ($page) => $page
        ->component('Contact/Success')
        ->has('recommendedArticles')
    );
});

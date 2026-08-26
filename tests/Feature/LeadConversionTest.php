<?php

use App\Events\LeadCreated;
use App\Models\Lead;
use Illuminate\Support\Facades\Event;

test('it can store a new lead and trigger event', function () {
    Event::fake();

    $response = $this->post('/leads', [
        'first_name' => 'John',
        'last_name' => 'Doe',
        'email' => 'john@acme.com',
        'phone' => '1234567890',
        'company_name' => 'Acme Corp',
        'company_size' => '10-100',
        'budget_range' => '$25,000 - $50,000',
        'timeline' => 'Immediate (1 month)',
        'goals_challenges' => 'Need a high-fidelity website redesign to double conversions.',
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('leads', [
        'email' => 'john@acme.com',
        'company_name' => 'Acme Corp',
    ]);

    Event::assertDispatched(LeadCreated::class);
});

test('it calculates high lead score for enterprise budgets and urgent timelines', function () {
    $lead = Lead::create([
        'email' => 'enterprise@acme.com',
        'budget_range' => '$50,000+ (Enterprise)', // 40 pts
        'timeline' => 'Immediate (1 month)',       // 30 pts
        'company_size' => '100+',                   // 20 pts
        'goals_challenges' => 'This is a long description detailing global enterprise infrastructure migration needs.', // 10 pts
    ]);

    // Should equal 40 + 30 + 20 + 10 = 100 points
    expect($lead->score)->toBe(100);
});

test('it calculates lower lead score for smaller budgets and flexible timelines', function () {
    $lead = Lead::create([
        'email' => 'startup@acme.com',
        'budget_range' => 'Under $10,000',       // 5 pts
        'timeline' => 'Flexible (3+ months)',     // 10 pts
        'company_size' => '1-10',                 // 5 pts
    ]);

    // Should equal 5 + 10 + 5 = 20 points
    expect($lead->score)->toBe(20);
});

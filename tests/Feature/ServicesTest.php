<?php

use App\Models\Service;
use Database\Seeders\ServicesSeeder;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->seed(ServicesSeeder::class);
});

test('services hub page can be rendered', function () {
    $response = $this->get('/services');

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Services/Hub')
        ->has('categories')
    );
});

test('individual service page can be rendered by slug', function () {
    $service = Service::query()->first();

    $response = $this->get("/services/{$service->slug}");

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Services/Show')
        ->has('service')
        ->has('sections')
    );
});

test('invalid service slug returns 404', function () {
    $response = $this->get('/services/invalid-service-slug-nonexistent');

    $response->assertStatus(404);
});

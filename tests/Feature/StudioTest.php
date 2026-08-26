<?php

use App\Models\Tool;
use Database\Seeders\StudioSeeder;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->seed(StudioSeeder::class);
});

test('studio index page can be rendered with dynamic props', function () {
    $response = $this->get('/studio');

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Studio/Index')
        ->has('categories')
        ->has('allTools')
        ->has('filters')
    );

});

test('individual prototype page can be rendered with diagnostic settings', function () {
    $tool = Tool::query()->published()->first();

    $response = $this->get(route('studio.show', $tool->slug));

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Studio/Show')
        ->has('tool')
        ->has('relatedTools')
        ->where('tool.settings.question', $tool->settings['question'] ?? null)
    );
});

test('invalid prototype slug returns 404', function () {
    $response = $this->get('/studio/nonexistent-experiment-slug');

    $response->assertStatus(404);
});

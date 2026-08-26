<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InsightsController;
use App\Http\Controllers\KnowledgeHubController;
use App\Http\Controllers\LeadsController;
use App\Http\Controllers\LegalController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\StudioController;
use App\Http\Middleware\HoneypotMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');
Route::get('/services', [ServicesController::class, 'index'])->name('services.index');
Route::get('/services/{slug}', [ServicesController::class, 'show'])->name('services.show');
Route::get('/about', [AboutController::class, 'index'])->name('about');

Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
Route::post('/contact', [ContactController::class, 'store'])
    ->middleware(['throttle:contact', HoneypotMiddleware::class])
    ->name('contact.store');
Route::get('/contact/success', [ContactController::class, 'success'])->name('contact.success');

Route::prefix('hub')->name('hub.')->group(function () {
    Route::get('/', [KnowledgeHubController::class, 'index'])->name('index');
    Route::get('/search', [KnowledgeHubController::class, 'search'])->name('search');
    Route::get('/category/{slug}', [KnowledgeHubController::class, 'category'])->name('category');
    Route::get('/{slug}', [KnowledgeHubController::class, 'show'])->name('show');
});

Route::prefix('insights')->name('insights.')->group(function () {
    Route::get('/', [InsightsController::class, 'index'])->name('index');
    Route::get('/search', [InsightsController::class, 'search'])->name('search');
    Route::get('/category/{slug}', [InsightsController::class, 'category'])->name('category');
    Route::get('/author/{slug}', [InsightsController::class, 'author'])->name('author');
    Route::get('/{slug}', [InsightsController::class, 'show'])->name('show');
});

Route::prefix('studio')->name('studio.')->group(function () {
    Route::get('/', [StudioController::class, 'index'])->name('index');
    Route::get('/tool/{slug}', [StudioController::class, 'show'])->name('show');
    Route::post('/tool/{slug}/track', [StudioController::class, 'track'])->name('track');
});

Route::get('/discover', [LeadsController::class, 'index'])->name('leads.index');
Route::post('/leads', [LeadsController::class, 'store'])->name('leads.store');
Route::get('/products', [ProductsController::class, 'index'])->name('products.index');

Route::get('/privacy', [LegalController::class, 'privacy'])->name('privacy');
Route::get('/terms', [LegalController::class, 'terms'])->name('terms');

if (app()->environment('local') || config('app.debug')) {
    Route::get('/dev/ui', function () {
        return Inertia::render('Dev/Playground');
    })->name('dev.ui');

    Route::get('/dev/effects', function () {
        return Inertia::render('Dev/EffectsPlayground');
    })->name('dev.effects');

    Route::get('/dev/lab', function () {
        return Inertia::render('Dev/LabDashboard');
    })->name('dev.lab');
}
